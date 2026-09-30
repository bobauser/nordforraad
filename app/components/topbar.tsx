"use client"
// import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
// import { UserString } from "../types/user";
import { GetProfileEmojiFromIndex } from "../utils/profilestringtools";
import { useUser } from "../context/userContext";

export default function TopBar() {
    const { user /*, setUser */ } = useUser();
    // TODO: Clean up removed API call implementation -->
    // const [userProfile, setUserProfile] = useState<UserString | null>(null)
    // const [noUserCookie, setNoUserCookie] = useState(false)
    // const [userString, setUserString] = useState("")
    // let fetchProfileOnce = 0

    // FIXME: Move GetProfile to a higher Hierarchy. -->
    // async function getProfile() {
    //     try {
    //         // just for fun, get a random name every time!
    //         const id = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // eventuelt: Math.floor(Math.random() * 4) + 1
    //         // const emojisid = Math.floor(Math.random() * (13 - 0 + 1)) + 0; // eventuelt: Math.floor(Math.random() * 14)
    //         const res = await fetch(`/api/users/${id}`)
    //         const data = await res.json();
    //         const userData: UserString = data

    //         setUserProfile(userData)
    //         setNoUserCookie(false) //TODO: if the user could not be found, set UserCookie not found to True
    //         console.log("YUS, hentet profil")
    //         console.log(data)
    //     } catch(err) {
    //         console.error("Uku leleh\n" + err)
    //     }
    // }
    // // ^^^^

    // useEffect(() => {
    //     if (fetchProfileOnce == 0) {
    //         getProfile()
    //         fetchProfileOnce += 1
    //     }
    // }, [])

    return (
        <div className="topbar" id="topbar">
            <div className="brand">
                <Link href="/">Nordforråd</Link>
                <small>Norsk ordforråd, ett ord om gangen</small>
            </div>
            <button id="profileBtn">
            <span className="avatar" id="profileAvatar">
                {user ? (GetProfileEmojiFromIndex(user.emojiIndex)) : ('❔')}
            </span>
            <span id="profileName">
                {user ? (
                    <>{user.username}</>
                ) : (
                    <LoadingSpinner color="white" />
                )}
            </span>
            </button>
        </div>    
    )
}