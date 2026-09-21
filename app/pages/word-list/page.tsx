"use client";
import { useState, useEffect } from "react";
import { Word } from "@/app/types/word";

export default function WordList() {
    const [wordsList, setWordsList] = useState<Word[]>([]);
    let doOneTime = 0

    useEffect(() => {
        async function fetchallwords() {
            try {
                const res = await fetch(`/api/all-words`);
                const data = await res.json();
                // setWordsList(data)
                console.log("YUS, hentet data")
                console.log(data)
            } catch (err) {
                console.error("Kunne ikke hente ord:", err);
            }
        }
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
        if (doOneTime == 0) {
            fetchallwords()
            getProfile()
            doOneTime = 1
        }
    }, [])

    return (
        //   <!-- ===================== ORDLISTE ===================== -->
        //style="margin-right:8px;"
        <div id="screen-wordlist">
            <div className="back-link" data-action="back-to-menu">‹ Tilbake</div>
            <h1 className="screen-title">Ordliste</h1>
            <div className="wordlist-toolbar">
            <button className="secondary-btn" id="downloadBackupBtn"    >⬇ Last ned ordliste</button> 
            <button className="secondary-btn" id="uploadBackupBtn">⬆ Last opp</button>
            <input type="file" id="uploadBackupInput" accept="application/json" className="hidden"></input>
            </div>
            <input type="text" id="wordSearch" placeholder="Søk her"></input>
            <div id="wordRows">
                {/* {wordsList.forEach(element in wordsList) {

                }} */}
            </div>
            <div className="empty-note hidden" id="wordEmptyNote">Ingen ord matcher søket.</div>
        </div>
    )
}