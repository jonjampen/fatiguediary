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

    console.log(type)
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
        else if (type === "getEntriesByUserId") {
            query = 'SELECT * FROM `energy` WHERE `user_id` = ? ORDER BY datetime DESC';
            params = [userid]
            rows = await executeQuery(query, params);
        }
    }
    catch (error) {
        console.log("ERROR:" + error, "type: " + type)
    }

    return NextResponse.json({ data: rows }, { status: 200 });
}