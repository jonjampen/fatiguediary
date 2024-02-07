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
                <p>Fatigue Diary is a PWA which means you can install it on any device (Android and IOS). Depending on your operating system, the following steps may vary so select the system you are using.</p>
                <br />
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Download for IOS</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal" style={{ listStyleType: "decimal !important" }}>
                                <li>1. Open Safari and go to www.fatiguediary.ch</li>
                                <li class="inline-block">2. Click on the share (<Share class="inline-block h-4 w-4" />) icon.</li>
                                <li>3. Click &quot;Add to Home Screen&quot;.</li>
                                <li>4. Confirm the name of the app.</li>
                                <li>5. Click &quot;Add&quot;.</li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left">Download for Android</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal" style={{ "list-style-type": "decimal !important" }}>
                                <li>1. Open Google Chrome and go to www.fatiguediary.ch</li>
                                <li className="inline-block">2. Click on the three dots (<MoreVertical class="inline-block h-4 w-4" />).</li>
                                <li>3. Click &quot;Install app&quot;.</li>
                                <li>5. Click &quot;Install&quot;.</li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}
