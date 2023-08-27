import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default async function Home() {

  // fetch(process.env.URL + "/api").then(response => response.json()).then(data => console.log(data))
  let res = await fetch(process.env.URL + "/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "type": "selectUserActivities",
    }),
  });

  return (
    <main>
      <Button>Button</Button>
    </main>
  )
}
