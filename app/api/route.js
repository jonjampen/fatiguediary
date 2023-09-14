import { NextResponse } from "next/server";
import mysql from "mysql2/promise"

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

    let rows;
    let query = '';
    let params = [1];

    let userid = 1;

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
            query = 'INSERT INTO `energy` (user_id, energylevel, notes) VALUES (?, ?, ?)';
            params = [userid, body.energylevel, body.notes]
            console.log("complete")
            rows = await executeQuery(query, params);

            let energyid = 1

            body.activities.map(async (activity) => {
                let queryT = 'INSERT INTO `energy_activities` (user_id, energy_id, activity_id) VALUES (?, ?, ?)';
                let paramsT = [userid, energyid, activity]
                await executeQuery(queryT, paramsT)
            })
        }
        else if (type === "getActivities") {
            query = 'SELECT * FROM `activities` WHERE `user_id` = ?';
            params = [userid]
            rows = await executeQuery(query, params);
        }
        else if (type === "createActivity") {
            query = 'INSERT INTO `activities` (user_id, name) VALUES (?, ?)';
            params = [userid, body.name]
            rows = await executeQuery(query, params);
        }
    }
    catch (error) {
        console.log("ERROR:" + error)
    }

    return NextResponse.json({ data: rows }, { status: 200 });
}