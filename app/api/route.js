import { NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
});

async function executeQuery(query, params) {
    let [values] = await connection.execute(query, params);
    return values
}

async function encryptPassword(password) {
    try {
        password = password.toString();
        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });

        return hash;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function oldEncryptPassword(password) {
    return crypto.createHash('sha3-512').update(password, 'utf8').digest('hex')
}

export async function POST(request) {
    const body = await request.json()
    const { type } = body

    const session = await getServerSession(options)
    let userid;
    if (session) {
        userid = session.user.id;
    }

    let rows;
    let query = '';
    let params = [1];
    let encryptedPassword;

    try {
        if (type === "selectUserByEmail") {
            query = 'SELECT * FROM `users` WHERE `email` = ?';
            params = [body.email]
            rows = await executeQuery(query, params);
        }
        else if (type === "createNewUser") {
            encryptedPassword = await encryptPassword(body.password);

            query = 'INSERT INTO `users` (name, email, password) VALUES (?, ?, ?)';
            params = [body.name, body.email, encryptedPassword]
            rows = await executeQuery(query, params);
            let id = rows.insertId

            query = 'INSERT INTO `settings` (user_id, theme, wake_up_time, bed_time, newsletter, language) VALUES (?, ?, ?, ?, ?, ?)';
            params = [id, 1, '07:00:00', '23:00:00', 1, "En"]
            rows = await executeQuery(query, params);
        }
        if (type === "loginUser") {
            query = 'SELECT * FROM `users` WHERE `email` = ?';
            params = [body.email]
            let user = await executeQuery(query, params);

            if (user.length > 0) {
                const storedHashedPassword = user[0].password;

                // New password encryption
                const isPasswordMatchBcrypt = await bcrypt.compare(body.password, storedHashedPassword);

                // Old password encryption
                const isPasswordMatchOld = (storedHashedPassword === oldEncryptPassword(body.password));

                if (isPasswordMatchBcrypt || isPasswordMatchOld) {
                    delete user[0].password;
                    rows = user;
                    if (isPasswordMatchOld) {
                        // set new encryption
                        encryptedPassword = await encryptPassword(body.password);

                        query = 'UPDATE `users` SET password = ? WHERE `id` = ?';
                        params = [encryptedPassword, user[0].id]
                        user = await executeQuery(query, params);
                    }
                } else {
                    rows = null;
                }
            } else {
                rows = null;
            }
        }
        else if (type === "addEnergylevel") {
            query = 'INSERT INTO `energy` (user_id, energylevel, notes, datetime) VALUES (?, ?, ?, ?)';
            params = [userid, body.energylevel, body.notes, body.datetime]
            rows = await executeQuery(query, params);

            let energyid = rows.insertId

            body.activities.map(async (activity) => {
                let queryT = 'INSERT INTO `energy_activities` (user_id, energy_id, activity_id) VALUES (?, ?, ?)';
                let paramsT = [userid, energyid, activity]
                await executeQuery(queryT, paramsT)
            })
        }
        else if (type === "updateEnergylevel") {
            query = 'UPDATE `energy` SET user_id=?, energylevel = ?, notes = ?, datetime = ? WHERE user_id = ? AND id = ?';
            params = [userid, body.energylevel, body.notes, body.datetime, userid, body.energyid]
            rows = await executeQuery(query, params);

            query = 'SELECT * FROM `energy_activities` WHERE user_id = ? AND energy_id = ?';
            params = [userid, body.energyid]
            rows = await executeQuery(query, params);

            body.activities.map(async (activity) => {
                let deletePos = rows.findIndex(row => row.activity_id === activity)
                if (deletePos != -1) {
                    // remove from rows
                    rows.splice(deletePos, 1)
                }
                else {
                    // add to db
                    query = 'INSERT INTO `energy_activities` (user_id, energy_id, activity_id) VALUES (?, ?, ?)';
                    params = [userid, body.energyid, activity]
                    rows = await executeQuery(query, params);
                }
            })
            rows.map(async (row) => {
                query = 'DELETE FROM `energy_activities` WHERE `user_id` = ? AND `id` = ?';
                params = [userid, row.id]
                rows = await executeQuery(query, params);
            })
        }
        else if (type === "getActivities") {
            query = 'SELECT * FROM `activities` WHERE `user_id` = ?';
            params = [userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "getActivitiesByEnergyId") {
            query = "SELECT ae.id, a.id as activity_id, a.name, ae.energy_id FROM `activities` AS a, `energy_activities` as ae WHERE a.user_id = ? AND ae.energy_id = ? AND a.id = ae.activity_id"
            params = [userid, body.energyid]
            rows = await executeQuery(query, params);
        }
        else if (type === 'getActivitiesById') {
            query = "SELECT e.id as energyId, e.datetime as datetime, a.name as activityName, a.id as activityId FROM `activities` AS a, energy_activities AS ea, energy as e WHERE e.id = ea.energy_id AND ea.activity_id = a.id AND e.user_id = ? AND (e.datetime BETWEEN ? AND ?)";
            params = [userid, body.startDate, body.endDate];
            rows = await executeQuery(query, params);
        }
        else if (type === "createActivity") {
            query = 'INSERT INTO `activities` (user_id, name) VALUES (?, ?)';
            params = [userid, body.name]
            rows = await executeQuery(query, params);
        }
        else if (type === "getEntriesByUserId") {
            query = 'SELECT * FROM `energy` WHERE `user_id` = ? AND (datetime BETWEEN ? AND ?) ORDER BY datetime DESC';
            params = [userid, body.startDate, body.endDate]
            rows = await executeQuery(query, params);
        }
        else if (type === "getEntryById") {
            query = 'SELECT * FROM `energy` WHERE `user_id` = ? AND `id` = ?';
            params = [userid, body.energyid]
            rows = await executeQuery(query, params);
        }
        else if (type === "deleteEntryById") {
            query = 'DELETE FROM `energy` WHERE `user_id` = ? AND `id` = ?';
            params = [userid, body.energyid]
            rows = await executeQuery(query, params);
        }
        else if (type === "getUserSettings") {
            query = 'SELECT * FROM `settings` WHERE `user_id` = ?';
            params = [userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "setUserSettings") {
            query = 'UPDATE `settings` SET `theme`= ?, `wake_up_time` = ?, `bed_time` = ?, `language` = ? WHERE `user_id` = ?';
            params = [body.theme, body.awakeTime, body.bedTime, body.language, userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "setResetToken") {
            query = 'INSERT INTO resettoken (user_id, token) VALUES(?,?)';
            params = [body.userid, body.token]
            rows = await executeQuery(query, params);
        }
        else if (type === "updatePassword") {
            // 1. check token and get userid
            query = 'SELECT * FROM `resettoken` WHERE `token` = ?';
            params = [body.token[0]]
            rows = await executeQuery(query, params);

            // 2. update password
            query = 'UPDATE `users` SET password = ? WHERE id = ?';
            params = [await encryptPassword(body.password), rows[0].user_id]
            rows = await executeQuery(query, params);
        }
        else if (type === "toggleActivityVisibility") {
            query = 'UPDATE `activities` SET hidden = ? WHERE id = ?';
            params = [body.state, body.activityId]
            rows = await executeQuery(query, params);
        }
        else if (type === "updateActivityById") {
            query = 'UPDATE `activities` SET name = ? WHERE id = ? AND user_id = ?';
            params = [body.activityName, body.activityId, userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "deleteActivityById") {
            query = 'DELETE FROM `activities` WHERE id = ? AND user_id = ?';
            params = [body.activityId, userid]
            rows = await executeQuery(query, params);

            query = 'DELETE FROM `energy_activities` WHERE activity_id = ? AND user_id = ?';
            params = [body.activityId, userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "getEntriesActivities") {
            query = 'SELECT e.id as energy_id, e.user_id as user_id, e.energylevel as energylevel, e.datetime as datetime, a.id as activity_id, a.name as activity_name FROM energy as e LEFT JOIN energy_activities as ea ON e.id = ea.energy_id LEFT JOIN activities as a ON ea.activity_id = a.id WHERE e.user_id = ? AND (ea.energy_id IS NULL OR NOT a.hidden) ORDER BY e.datetime asc;';
            params = [userid]
            rows = await executeQuery(query, params);
        }
    }
    catch (error) {
        // console.log("ERROR:" + error, "type: " + type)
    }
    return NextResponse.json({ data: rows }, { status: 200 });
}