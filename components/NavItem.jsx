import React from 'react'

export default function NavItem({ link, id, name }) {
    return (
        <a href={link} key={id ?? ""}><li className="py-2 px-1 md:py-0 md:px-0 w-full">{name}</li></a>

    )
}
