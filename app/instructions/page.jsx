import React from 'react'

export default function Instructions() {
    return (
        <div className="flex justify-center">

            <section className="mx-4 max-w-5xl w-full">
                <h1>Instructions</h1>
                <p>Watch this video or read the text below to learn how to use Fatigue Diary.</p>
                <div class="aspect-w-16 aspect-h-9 my-2">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <h2>Some Heading</h2>
                <p>Some text about how to use Fatigue Diary.</p>
            </section>
        </div>
    )
}
