import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import moment from "moment"

const writeFileAsync = promisify(fs.writeFile);

export async function POST(request) {
  const body = await request.json()
  console.log(body.data)
  try {
    const csvData = formatDataToCSV(body.data);
    const fileName = generateRandomString(25) + moment().unix() + ".csv";
    const filePath = path.join(process.cwd(), 'exports', fileName);

    await writeFileAsync(filePath, csvData, 'utf-8');

    return NextResponse.json({ fileName: fileName }, { status: 200 });
    
  } catch (error) {
    console.error('Error creating CSV file:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    // res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

function formatDataToCSV(data) {
  const headers = Object.keys(data[0]).join(',') + '\n';
  const rows = data.map((item) => Object.values(item).join(',') + '\n');

  return headers + rows.join('');
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}
