import { NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { revalidateTag } from 'next/cache'
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 0, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    dateStrings: true,
});

const defaultMetrics = [
    {
        name: "Brainfog",
        color: "#33d67c",
        type: "scale03",
    },
    {
        name: "Headache",
        color: "#d66133",
        type: "scale03",
    },
    {
        name: "Sleep",
        color: "#334ed6",
        type: "numberInput",
    },
]


async function executeQuery(query, params) {
    let [values] = await pool.execute(query, params, function (err, results, fields) {
        console.log("Error executing query: " + err)
    });
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
    // get information from request body
    const body = await request.json()
    const { type } = body

    // get user id
    const session = await getServerSession(options)
    let userid;
    if (session) {
        userid = session.user.id;
    }

    // prepare variables
    let rows;
    let query = '';
    let params = [1];
    let encryptedPassword;

    if (!pool) {
        console.log("ERROR with DB pool. Could not establish pool!")
    }
    else {
        console.log("DB pool successful!", type)
    }

    // perform db request
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
            params = [id, 1, '07:00:00', '23:00:00', 1, "en"]
            rows = await executeQuery(query, params);

            // default charts and metrics
            query = 'INSERT INTO `charts` (user_id, name, order_index) VALUES (?, ?, ?)';
            params = [id, "Health Metrics", 0]
            rows = await executeQuery(query, params);
            let chart_id = rows.insertId;

            let metric_id;
            defaultMetrics.map(async (metric, i) => {
                query = 'INSERT INTO `metrics` (user_id, name, color, type, order_index) VALUES (?, ?, ?, ?, ?)';
                params = [id, metric.name, metric.color, metric.type, i]
                rows = await executeQuery(query, params);
                metric_id = rows.insertId;

                query = 'INSERT INTO `charts_metrics` (chart_id, metric_id) VALUES (?, ?)';
                params = [chart_id, metric_id];
                rows = await executeQuery(query, params);
            })
        }
        if (type === "loginUser") {
            console.log("Logging in user (API)")
            query = 'SELECT * FROM `users` WHERE `email` = ?';
            params = [body.email]
            console.log("User Email:", body.email);
            let user = await executeQuery(query, params);
            console.log("DB Return:", user);

            if (user.length > 0) {
                console.log("user.length > 0; User[0]:", user[0]);
                const storedHashedPassword = user[0].password;
                console.log("Hashed PW:", storedHashedPassword);

                // New password encryption
                const isPasswordMatchBcrypt = await bcrypt.compare(body.password, storedHashedPassword);

                // Old password encryption
                const isPasswordMatchOld = (storedHashedPassword === oldEncryptPassword(body.password));
                console.log("Is password match (old, new):", isPasswordMatchOld, isPasswordMatchBcrypt);

                if (isPasswordMatchBcrypt || isPasswordMatchOld) {
                    delete user[0].password;
                    console.log("User without PW:", user[0])
                    rows = user;
                    console.log("Rows is now user; rows:", rows)
                    if (isPasswordMatchOld) {
                        // set new encryption
                        encryptedPassword = await encryptPassword(body.password);

                        query = 'UPDATE `users` SET password = ? WHERE `id` = ?';
                        params = [encryptedPassword, user[0].id]
                        user = await executeQuery(query, params);
                    }
                } else {
                    rows = null;
                    console.log("ERROR! user.length > 0; but is not a passwordMatch! rows:", rows)
                }
            } else {
                rows = null;
                console.log("ERROR! user.length is not bigger than 0! rows:", rows)
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
            query = 'SELECT * FROM `energy` WHERE `user_id` = ? AND (datetime BETWEEN ? AND ?) ORDER BY datetime ASC';
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
            query = 'SELECT e.id as energy_id, e.user_id as user_id, e.energylevel as energylevel, e.datetime as datetime, a.id as activity_id, a.name as activity_name, a.hidden as activity_hidden FROM energy as e LEFT JOIN energy_activities as ea ON e.id = ea.energy_id LEFT JOIN activities as a ON ea.activity_id = a.id WHERE e.user_id = ? ORDER BY e.datetime asc;';
            params = [userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "exportUserData") {
            query = "SELECT e.id as energyEntryId, e.datetime as datetime, e.energylevel as energylevel, e.notes as notes, GROUP_CONCAT(a.name) as activityNames, GROUP_CONCAT(a.id) as activityIds FROM `activities` AS a JOIN energy_activities AS ea ON ea.activity_id = a.id JOIN energy as e ON e.id = ea.energy_id WHERE e.user_id = ? GROUP BY e.id";
            params = [userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "createCheckupEntry") {
            // check if daily entry already exists
            query = 'SELECT * from `dailyentry` WHERE date=? and user_id=?';
            params = [body.date, userid]
            rows = await executeQuery(query, params);

            let checkupid;

            if (rows.length == 0) {
                query = "INSERT INTO dailyentry (user_id, date) VALUES (?,?)";
                params = [userid, body.date]
                rows = await executeQuery(query, params);
                checkupid = rows.insertId
            }
            else {
                checkupid = rows[0].id
            }

            body.metrics.map(async (metric) => {
                // check if metric already added for that day
                query = 'SELECT * from `dailyentry_metrics` WHERE metric_id=? AND dailyentry_id=?';
                params = [metric.id, checkupid]

                rows = await executeQuery(query, params);

                if (rows.length > 0) {
                    // if yes, update
                    query = 'UPDATE `dailyentry_metrics` SET rating = ? WHERE `id` = ?';
                    params = [metric.rating, rows[0].id]
                    rows = await executeQuery(query, params);
                }
                else {
                    // if no, add
                    query = 'INSERT INTO `dailyentry_metrics` (dailyentry_id, metric_id, rating) VALUES (?, ?, ?)';
                    params = [checkupid, metric.id, metric.rating]
                    rows = await executeQuery(query, params);
                }
            })
        }
        else if (type === "createMetric") {
            query = "SELECT MAX(order_index) AS highest_order_index FROM metrics WHERE user_id=?"
            params = [userid]
            rows = await executeQuery(query, params);
            let max_order_index = rows[0].highest_order_index != null ? rows[0].highest_order_index : -1;
            max_order_index = max_order_index + 1;

            query = "INSERT INTO metrics (user_id, name, color, order_index, type) VALUES (?,?,?,?,?)";
            params = [userid, body.name, body.color, max_order_index, body.metricType]
            rows = await executeQuery(query, params);

            let insertedMetricId = rows.insertId

            body.addToCharts.map(async (chart) => {
                if (chart.checked) {
                    query = "INSERT INTO charts_metrics (chart_id, metric_id) VALUES (?,?)";
                    params = [chart.id, insertedMetricId]
                    rows = await executeQuery(query, params);
                }
            })
        }
        else if (type === "editMetric") {
            query = "UPDATE metrics SET name=?, color=? WHERE user_id = ? AND id = ?";
            params = [body.name, body.color, userid, body.metricId]
            rows = await executeQuery(query, params);
        }
        else if (type === "editMetricsOrder") {
            body.metrics.forEach(async (metric) => {
                query = "UPDATE metrics SET order_index=? WHERE user_id = ? AND id = ?";
                params = [metric.order_index, userid, metric.id]
                rows = await executeQuery(query, params);
            })
        }
        else if (type === "changeMetricVisibility") {
            query = "UPDATE metrics SET hidden=? WHERE user_id = ? AND id = ?";
            params = [body.visibility, userid, body.metricId]
            rows = await executeQuery(query, params);
        }
        else if (type === "deleteMetric") {
            query = "DELETE FROM metrics WHERE id = ? AND user_id = ?";
            params = [body.metricId, userid]
            rows = await executeQuery(query, params);

            query = "DELETE dm FROM dailyentry_metrics AS dm JOIN metrics AS m ON dm.metric_id = m.id WHERE dm.metric_id = ? AND m.user_id = ?";
            params = [body.metricId, userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "getMetrics") {
            query = "SELECT * FROM metrics WHERE user_id = ? ORDER BY order_index ASC";
            params = [userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "getDailyEntriesInRange") {
            console.log(body.startDate, body.endDate)
            query = "SELECT dailyentry_metrics.id AS id, metrics.id AS metric_id, metrics.name, metrics.color, dailyentry_metrics.rating, dailyentry.date FROM dailyentry JOIN dailyentry_metrics ON dailyentry.id = dailyentry_metrics.dailyentry_id JOIN metrics ON dailyentry_metrics.metric_id = metrics.id WHERE dailyentry.user_id = ? AND (dailyentry.date BETWEEN ? AND ?) ORDER BY dailyentry.date, metrics.order_index;";
            params = [userid, body.startDate, body.endDate]
            rows = await executeQuery(query, params);
        }
        else if (type === "getDailyEntry") {
            query = "SELECT * FROM dailyentry WHERE user_id=? and date=?";
            params = [userid, body.date]
            let dailyEntries = await executeQuery(query, params);

            query = "SELECT * FROM metrics WHERE user_id=? ORDER BY order_index ASC";
            params = [userid]
            let metrics = await executeQuery(query, params);

            rows = await Promise.all(metrics.map(async (metric) => {
                // entry exists
                if (dailyEntries[0] && dailyEntries[0].id) {
                    query = "SELECT * FROM dailyentry_metrics WHERE dailyentry_id=? AND metric_id=?";
                    params = [dailyEntries[0].id, metric.id]
                    let metricEntry = await executeQuery(query, params);
                    let rating = metricEntry[0]?.rating ?? 0;
                    return { ...metric, rating: rating }
                }
                else {
                    return { ...metric, rating: 0 }
                }
            }))
        }
        else if (type === "getCharts") {
            query = "SELECT c.id AS chart_id, c.user_id, c.name AS chart_name, c.order_index AS chart_order_index, GROUP_CONCAT(cm.metric_id) AS metric_ids FROM charts AS c LEFT JOIN charts_metrics AS cm ON c.id = cm.chart_id WHERE c.user_id = ? GROUP BY c.id, c.user_id, c.name, c.order_index ORDER BY c.order_index ASC;";
            params = [userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "getChartsOnly") {
            query = "SELECT * FROM charts WHERE user_id=? ORDER BY order_index ASC";
            params = [userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "updateChartMetrics") {
            query = "DELETE cm FROM charts_metrics AS cm JOIN charts AS c on cm.chart_id = c.id WHERE cm.chart_id=? AND cm.metric_id=? AND c.user_id=?"
            params = [body.chart_id, body.metric_id, userid]
            rows = await executeQuery(query, params);

            if (body.metric_state) {
                query = "INSERT INTO charts_metrics (chart_id, metric_id) VALUES (?,?);"
                params = [body.chart_id, body.metric_id]
                rows = await executeQuery(query, params);
            }

            revalidateTag('charts');
        }
        else if (type === "updateChartName") {
            query = "UPDATE charts SET name=? WHERE user_id = ? AND id = ?";
            params = [body.name, userid, body.chart_id]
            rows = await executeQuery(query, params);

            revalidateTag('charts');
        }
        else if (type === "updateChartPos") {
            query = "SELECT `order_index` FROM charts WHERE id = ? AND user_id = ?";
            params = [body.chart_id, userid]
            rows = await executeQuery(query, params);
            let chart1 = { id: body.chart_id, pos: rows[0].order_index }

            query = "SELECT MAX(order_index) AS max_order_index FROM charts WHERE user_id = ?";
            params = [userid]
            rows = await executeQuery(query, params);
            let max_order = rows[0].max_order_index

            let valid = (body.direction === "up" && chart1.pos > 0) || (body.direction === "down" && chart1.pos < max_order);

            if (valid) {
                let chart2
                if (body.direction === "up") {
                    query = "SELECT * FROM charts WHERE user_id = ? AND order_index < ? ORDER BY order_index DESC";
                    params = [userid, chart1.pos]
                    rows = await executeQuery(query, params);
                    chart2 = { id: rows[0].id, pos: rows[0].order_index }
                }
                else {
                    query = "SELECT * FROM charts WHERE user_id = ? AND order_index > ? ORDER BY order_index ASC";
                    params = [userid, chart1.pos]
                    rows = await executeQuery(query, params);
                    chart2 = { id: rows[0].id, pos: rows[0].order_index }
                }

                // replace
                query = "UPDATE charts SET order_index = ? WHERE id = ? AND user_id = ?";
                params = [chart2.pos, chart1.id, userid]
                rows = await executeQuery(query, params);

                query = "UPDATE charts SET order_index = ? WHERE id = ? AND user_id = ?";
                params = [chart1.pos, chart2.id, userid]
                rows = await executeQuery(query, params);
            }

            revalidateTag('charts');
        }
        else if (type === "createNewChart") {
            query = "SELECT MAX(order_index) AS highest_order_index FROM charts WHERE user_id=?"
            params = [userid]
            rows = await executeQuery(query, params);
            let max = rows[0].highest_order_index != null ? rows[0].highest_order_index : -1;
            console.log(max);

            query = "INSERT INTO charts (user_id, order_index) VALUES (?,?);"
            params = [userid, max + 1]
            rows = await executeQuery(query, params);

            revalidateTag('charts');
        }
        else if (type === "deleteChart") {
            query = "DELETE FROM charts WHERE id=? AND user_id=?"
            params = [body.chart_id, userid]
            rows = await executeQuery(query, params);

            query = "DELETE FROM charts_metrics WHERE chart_id=?"
            params = [body.chart_id]
            rows = await executeQuery(query, params);

            revalidateTag('charts');
        }
    }
    catch (error) {
        console.log("ERROR when executing API request: " + error, "type: " + type)
    }

    return NextResponse.json({ data: rows }, { status: 200 });
}