import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
    title: "Instructions",
}

export default function Instructions() {
    let css = `
    iframe {
        margin-bottom: 16px;
        max-width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
    }
    h4 {
        font-size: 20px;
        font-weight: 400;
        margin-top: 4px;
        margin-bottom: 8px;
    }`

    return (
        <div className="flex justify-center">
            <section className="mx-10 max-w-[750px] text-justify mb-6">
                <h1>Instructions</h1>
                <p>Welcome to Fatigue Diary. On this page, you&apos;ll learn how to effectively manage and improve your energy levels using the Fatigue Diary app. Watch this video or read the instructions below to learn how to use Fatigue Diary.</p>
                <br />
                <iframe width="560" height="315" src="https://www.youtube.com/embed/V73Hobz1Sgw?si=sIyQJh9lKhpyQqQD" title="Fatigue Diary App Guide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are energy levels?</AccordionTrigger>
                        <AccordionContent>
                            <p>To maximize the use of Fatigue Diary, you should create an entry with an energy level after each activity throughout your day. Energy levels are a subjective value of how energized you feel. So if the fatigue is worse, choose a lower number than when the fatigue is better. There are also emojis that can help you decide your current energy level.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How to track your energy levels and activities?</AccordionTrigger>
                        <AccordionContent>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/V73Hobz1Sgw?si=sIyQJh9lKhpyQqQD&amp;start=16" title="Track energy levels and activities" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            <p>To maximize the use of Fatigue Diary, create an entry after each activity throughout your day. First click the plus icon.</p>
                            <br />
                            <p>Choose your current energy level to reflect how you&apos;re feeling. Use lower levels for fatigue and higher levels for energy. The emojis can help you decide.</p>
                            <br />
                            <p>List the activities you&apos;ve completed since your last entry. Initially, this list may be empty. Start by adding an activity with the plus icon, then select it. Edit or delete activities by tapping the edit icon and selecting the activity you want to modify.</p>
                            <br />
                            <p>Don&apos;t forget to add notes and, if necessary, adjust the date and time for past entries.</p>

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How to use Health Metrics to track symptoms, medications, etc?</AccordionTrigger>
                        <AccordionContent>
                            {/* TODO add video */}
                            You can track your symptoms, medication, therapies, and other health metrics in the metrics tab. Create your own metric, select a color and decide in which chart the metric should be displayed. Then each day, come back to this page and select the desired level for your metrics.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>How to analyze your data?</AccordionTrigger>
                        <AccordionContent>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/V73Hobz1Sgw?si=sIyQJh9lKhpyQqQD&amp;start=72" title="Analyze your data" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            <p>To analyze your data, go to the &apos;Dashboard.&apos; page. Select the date and the range you&apos;d like to explore.</p>
                            <br />
                            <p>Use the interactive charts to understand how your activities, the time of day, and other factors influence your energy levels. Below that, you&apos;ll find automated activity analysis with color-coded insights into how certain activities influence your energy.</p>
                            <br />
                            <p>By clicking on &quot;Edit Dashboard&quot; you can create custom charts that display your selected health metrics. Just create a new chart, give it a name, and select which metrics to display in it.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>How to edit or delete energy entries?</AccordionTrigger>
                        <AccordionContent>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/V73Hobz1Sgw?si=sIyQJh9lKhpyQqQD&amp;start=96" title="Edit and delete energy entries" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            <p>The &apos;Entries&apos; page organizes all your energy entries into daily blocks. Easily edit or delete entries by clicking on them.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>How to edit, delete, or hide activities?</AccordionTrigger>
                        <AccordionContent>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/V73Hobz1Sgw?si=sIyQJh9lKhpyQqQD&amp;start=42" title="edit, delete and hide activities" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            On the &apos;Add Energy Level&apos; screen you can click on the edit icon above the activities. Then, by clicking on the desired activity, you can edit, delete or hide it. Hidden activities are no longer displayed anywhere in the app but they will not be removed from past entries. Deleting an activity will delete it from all past entries. This action cannot be undone!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                        <AccordionTrigger>How to edit, delete, and reorder health metrics?</AccordionTrigger>
                        <AccordionContent>
                            {/* TODO add video */}
                            Health metrics can be edited, delete and reordered from the health tab. Click on the edit icon and then choose the action you want to perform. Hidden metrics will no longer be displayed in the app, this action <b>can</b> be undone and past entries will not be deleted. Deleting a metric will delete all references of the selected metric from past entries. This action <b>cannot</b> be undone!
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <br />
                <h4>About the project and developer</h4>
                <p>
                    Fatigue Diary is a project developed by <a href="https://jonjampen.ch/">Jon Jampen</a>. Feel free to reach out if you have any questions or need assistance.
                    Thank you for choosing Fatigue Diary, your ultimate companion for managing your energy levels. Begin your journey toward mastering pacing now!
                </p>
                <style>{css}</style>
            </section>
        </div>
    )
}
