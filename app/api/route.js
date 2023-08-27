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

    let query = 'SELECT * FROM `energy` WHERE `user_id` = ?';
    let params = [1]

    if (type === "selectUserByEmail") {
        query = 'SELECT * FROM `users` WHERE `email` = ?';
        params = [body.email]
    }

    const [rows] = await connection.execute(query, params);

    return NextResponse.json({ data: rows }, { status: 200 });
}