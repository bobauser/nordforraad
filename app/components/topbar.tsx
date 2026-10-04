"use client"
// import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
// import { UserString } from "../types/user";
import { GetProfileEmojiFromIndex } from "../utils/profilestringtools";
import { useUser } from "../context/userContext";
import { useState } from "react";

export default function TopBar() {
    const { user } = useUser();
    const [error, setError] = useState(false)

    // TODO: if a user hasn't been loaded, it might be because you have no session ID, or maybe session has expired. Then it isnt an error. This solution needs "reimagination" later on. Three scenarios: A: user isnt logged in. B: Session has expired/incorrect. C: Error fetching data.
    var inter = setInterval(() => {
        // action = action + " hide"
        if (!user) {
            setError(true)
        }
        clearInterval(inter)
    }, 10000)

    return (
        <div className="topbar" id="topbar">
            <div className="brand">
                <Link href="/">Nordforråd</Link>
                <small>Norsk ordforråd, ett ord om gangen</small>
            </div>
            <button id="profileBtn">
            <span className="avatar" id="profileAvatar">
                {user ? (GetProfileEmojiFromIndex(user.emojiIndex)) : error == false ? ('❔') : null}
            </span>
            <span id="profileName">
                {user ? (
                    <>{user.username}</>
                ) : error == false ? (
                    <LoadingSpinner color="white" />
                ) : (<>{"Greide ikke laste inn bruker"}</>)}
            </span>
            </button>
        </div>    
    )
}