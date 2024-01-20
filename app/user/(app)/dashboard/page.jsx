import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { cookies } from 'next/headers'
import Dashboard from "./dashboard";
import moment from 'moment';

export default async function page() {
    const session = await getServerSession(options)

    async function fetchEntries(startDate, endDate) {
        "use server"
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getEntriesByUserId",
                "startDate": startDate,
                "endDate": endDate,
            }),
        })
        res = await res.json()
        return res.data
    }

    async function getActivities(startDate, endDate) {
        "use server"
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getActivitiesById",
                "startDate": startDate,
                "endDate": endDate,
            }),
        })
        res = await res.json()
        return res.data
    }


    async function getAllDailyEntriesInRange(startDate, endDate) {
        "use server"
        function getDatesBetween(start, end) {
            const startDate = moment(start);
            const endDate = moment(end);
            const dateArray = [];

            for (let currentDate = startDate; currentDate.isSameOrBefore(endDate); currentDate.add(1, 'days')) {
                dateArray.push(currentDate.format('YYYY-MM-DD'));
            }

            return dateArray;
        }

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getDailyEntriesInRange",
                "startDate": startDate,
                "endDate": endDate,
            }),
            cache: 'no-store',
        })
        res = await res.json()
        res = res.data

        // format
        let chartData = {}

        const dateRange = getDatesBetween(startDate, endDate);

        res.map((item) => {
            const { name } = item;
            chartData[name] = { name, data: [] };
        });

        dateRange.map((date) => {
            Object.values(chartData).forEach((metric) => {
                const matchingEntry = res.find((entry) => entry.name === metric.name && entry.date === date);
                const rating = matchingEntry ? matchingEntry.rating : 0;

                // Convert the date to Unix timestamp in milliseconds using moment.js
                const dateUnixMs = moment(date).valueOf();

                // Push the data into the metric's data array
                metric.data.push([dateUnixMs, rating]);
            });
        });
        // setSeries(Object.values(chartData))
        return Object.values(chartData)
    }

    return (
        <section className="mx-4">
            <div className="w-full flex flex-col justify-start text-left mb-4">
                <h5 className="text-gray-600">Hi, {session ? session.user.name : ""}</h5>
                <h1 className="text-left text-2xl">Your Dashboard</h1>
            </div>
            <Dashboard fetchEntries={fetchEntries} getActivities={getActivities} getAllDailyEntriesInRange={getAllDailyEntriesInRange} />
        </section>
    )
}
