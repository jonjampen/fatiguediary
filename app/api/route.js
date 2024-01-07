import { NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'fatigue-diary'
});

async function executeQuery(query, params) {
    let [values] = await connection.execute(query, params);
    return values
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

    // console.log(type)
    try {
        if (type === "selectUserByEmail") {
            query = 'SELECT * FROM `users` WHERE `email` = ?';
            params = [body.email]
            rows = await executeQuery(query, params);
        }
        else if (type === "createNewUser") {
            query = 'INSERT INTO `users` (name, email, password) VALUES (?, ?, ?)';
            params = [body.name, body.email, body.password]
            rows = await executeQuery(query, params);
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

            console.log("rows", rows)
            console.log("acti", body.activities)
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
    }
    catch (error) {
        console.log("ERROR:" + error, "type: " + type)
    }
    return NextResponse.json({ data: rows }, { status: 200 });
}