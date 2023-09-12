import { NextResponse } from "next/server";
import mysql from "mysql2/promise"

export async function POST(request) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'fatigue-diary'
    });
    const body = await request.json()
    const { type } = body


    let query = '';
    let params = [1];

    let userid = 1;

    try {

        if (type === "selectUserByEmail") {
            query = 'SELECT * FROM `users` WHERE `email` = ?';
            params = [body.email]

        }
        else if (type === "createNewUser") {
            query = 'INSERT INTO `users` (name, email, password) VALUES (?, ?, ?)';
            params = [body.name, body.email, body.password]

        }
        else if (type === "addEnergylevel") {
            query = 'INSERT INTO `energy` (user_id, energylevel, notes) VALUES (?, ?, ?)';
            params = [userid, body.energylevel, body.notes]
            console.log("complete")

            let energyid = 1

            body.activities.map(async (activity) => {
                let queryT = 'INSERT INTO `energy_activities` (user_id, energy_id, activity_id) VALUES (?, ?, ?)';
                let paramsT = [userid, energyid, activity]
                await connection.execute(queryT, paramsT)
            })
        }
    } catch (error) {
        console.log("ERROR:" + error)
    }
    const [rows] = await connection.execute(query, params);

    return NextResponse.json({ data: rows }, { status: 200 });
}