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

        console.log(startDate, endDate)

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
        console.log(res)
        // format
        let chartData = {}

        const dateRange = getDatesBetween(startDate, endDate);

        res.map((item) => {
            const { name, metric_id } = item;
            console.log(metric_id);
            chartData[name] = { name, metric_id, data: [] };
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
        console.log(Object.values(chartData))
        return Object.values(chartData)
    }

    async function getMetricEntryByDate(date) {
        "use server"
        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getDailyEntry",
                "date": date,
            }),
            cache: 'no-store',
        })
        res = await res.json()
        res = res.data
        return res
    }

    async function getCharts() {
        "use server"

        let res = await fetch(process.env.URL + "/api", {
            method: "POST",
            headers: { Cookie: cookies().toString() },
            body: JSON.stringify({
                "type": "getCharts",
            }),
            cache: 'no-store',
        })
        res = await res.json()
        res = res.data
        return res.map(chart => ({ ...chart, metric_ids: chart.metric_ids ? chart.metric_ids.split(",") : [] }))
    }
    let charts = await getCharts();

    return (
        <section className="mx-4">
            <div className="w-full flex flex-col justify-start text-left mb-4">
                <h5 className="text-gray-600">Hi, {session ? session.user.name : ""}</h5>
                <h1 className="text-left text-2xl">Your Dashboard</h1>
            </div>
            <Dashboard charts={charts} fetchEntries={fetchEntries} getActivities={getActivities} getAllDailyEntriesInRange={getAllDailyEntriesInRange} getMetricEntryByDate={getMetricEntryByDate} />
        </section>
    )
}
