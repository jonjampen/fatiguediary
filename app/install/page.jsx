import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MoreVertical, Share } from 'lucide-react'

export const metadata = {
    title: "Install Guide",
}

export default function install() {
    return (
        <div className="flex justify-center">
            <div className="mx-10 max-w-[750px] text-justify mb-6">
                <h1>Install Fatigue Diary</h1>
                <p>Fatigue Diary is a PWA which means you can install it on any device (Android and IOS). Depending on your browser, the following steps may vary so select the browser and operating system you are using.</p>
                <br />
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Download for IOS</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal" style={{ listStyleType: "decimal !important" }}>
                                <li>1. Open Safari and go to www.fatiguediary.ch</li>
                                <li style={{ display: "inline" }}>2. Click on the share (<Share />) icon.</li>
                                <li>3. Click &quot;Add to Home Screen&quot;.</li>
                                <li>4. Confirm the name of the app.</li>
                                <li>5. Click &quot;Add&quot;.</li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left">Download for Android (Chrome, Opera, Brave)</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal" style={{ "list-style-type": "decimal !important" }}>
                                <li>1. Open your browser and go to www.fatiguediary.ch</li>
                                <li className="inline-block">2. Click on the three dots (<MoreVertical />).</li>
                                <li>3. Click &quot;Add to Home Screen&quot;.</li>
                                <li>4. Confirm the name of the app.</li>
                                <li>5. Click &quot;Add&quot;.</li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Download for Android (Firefox)</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal" style={{ "list-style-type": "decimal !important" }}>
                                <li>1. Open Firefox and go to www.fatiguediary.ch</li>
                                <li className="inline-block">2. Click on the three dots (<MoreVertical />).</li>
                                <li>3. Click &quot;Install&quot;.</li>
                                <li>4. Confirm the name of the app.</li>
                                <li>5. Click &quot;Add&quot;.</li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
        </div>
    )
}
