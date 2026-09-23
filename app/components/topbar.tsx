"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";

export default function TopBar() {
    const [userString, setUserString] = useState("")
    let fetchProfileOnce = 0

    // FIXME: Move GetProfile to a higher Hierarchy. -->
    async function getProfile() {
        try {
            // just for fun, get a random name every time!
            const id = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // eventuelt: Math.floor(Math.random() * 4) + 1
            const emojisid = Math.floor(Math.random() * (13 - 0 + 1)) + 0; // eventuelt: Math.floor(Math.random() * 14)
            const res = await fetch(`/api/users/1?id=1&emoji_id=1`)
            const data = await res.json();
            console.log("YUS, hentet profil")
            console.log(data)
        } catch(err) {
            console.error("Uku leleh")
        }
    }
    // ^^^^

    useEffect(() => {
        if (fetchProfileOnce == 0) {
        getProfile()
        fetchProfileOnce += 1
        }
    }, [])

    return (
        <div className="topbar" id="topbar">
            <div className="brand">
                <Link href="/">Nordforråd</Link>
                <small>Norsk ordforråd, ett ord om gangen</small>
            </div>
            <button id="profileBtn">
            <span className="avatar" id="profileAvatar">❔</span>
            <span id="profileName">
                <LoadingSpinner color="white" />
            </span>
            </button>
        </div>    
    )
}