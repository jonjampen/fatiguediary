import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function Home() {

  fetch(process.env.URL + "/api").then(response => response.json()).then(data => console.log(data))

  return (
    <main>
      <Button>Button</Button>
    </main>
  )
}
