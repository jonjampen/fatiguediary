import React from 'react'

export const metadata = {
    title: "Instructions",
}

export default function Instructions() {
    let css = `
    h3 {
        font-size: 22px;
        font-weight: 500;
        margin-top: 20px
    }
    h4 {
        font-size: 20px;
        font-weight: 400;
        margin-top: 4px
    }`

    return (
        <div className="flex justify-center">
            <section className="mx-10 max-w-[750px] text-justify mb-6">
                <h1>Instructions</h1>

                <p>Watch this video or read the text below to learn how to use Fatigue Diary.</p>
                <div class="aspect-w-16 aspect-h-9 my-2">
                    <iframe src="https://www.youtube.com/embed/V73Hobz1Sgw?si=iGxJFEZBx7nH8T-T" frameborder="0" allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <h2>Written Instructions</h2>
                <p>Welcome to Fatigue Diary. In this guide, you&apos;ll learn how to effectively manage and improve your energy levels using the app Fatigue Diary.</p>


                <h3>Energy Entries</h3>
                <h4>Creating Energy Entries</h4>

                <p>To maximize the use of Fatigue Diary, create an entry after each activity throughout your day. Click the plus icon.</p>

                <p>Choose your current energy level to reflect how you&apos;re feeling. Use lower levels for fatigue and higher levels for energy. The emojis can help you decide.</p>

                <p>List the activities you&apos;ve completed since your last entry. Initially, this list may be empty. Start by adding an activity with the plus icon, then select it. Edit or delete activities by tapping the edit icon and selecting the activity you want to modify.</p>

                <p>Don&apos;t forget to add notes and, if necessary, adjust the date and time for past entries.</p>

                <h4>Managing Energy Entries</h4>

                <p>The &apos;Entries&apos; page organizes all your energy entries into daily blocks. Easily edit or delete entries by clicking on them.</p>

                <h3>Health Metrics</h3>

                <p>You can track your symptoms, medication, therapies, and other health metrics in the metrics tab. Create your own metric, select a color and decide in which chart the metric should be displayed. Then each day, come back to this page and select the desired level for your metrics.</p>

                <h3>Dashboard and Analysis</h3>

                <p>Now, let&apos;s analyze your data on the &apos;Dashboard.&apos; Select the date and the range you&apos;d like to explore.</p>

                <p>Use the interactive charts to understand how your activities, the time of day, and other factors influence your energy levels. Below that, you&apos;ll find automated analysis with color-coded insights into how certain activities influence your energy.</p>
                <p>By clicking on &quot;Edit Dashboard&quot; you can create custom charts that display your selected health metrics. Just create a new chart, give it a name, and select which metrics to display in it.</p>

                <h3>Developer</h3>

                <p>Fatigue Diary is a project developed by <a href="https://jonjampen.ch/">Jon Jampen</a>. Feel free to reach out if you have any questions or need assistance.
                    Thank you for choosing Fatigue Diary, your ultimate companion for managing your energy levels. Begin your journey toward mastering pacing now!</p>

                <style>{css}</style>
            </section>
        </div>
    )
}
