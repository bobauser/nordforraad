"use client";
import { useState, useEffect } from "react";
import { Word, WordAndExtraData } from "@/app/types/word";
import { WordRow } from "@/app/components/words/wordcomponents";

// TODO: View definition from WordRow. Update Cloud userstring once you chose words for a quiz, so that it updates in the cloud after 5 seconds (not every time you interact with a word, thats too frequent).
export default function WordList() {
    const [rawDataList, setRawDataList] = useState<Word[]>([]);
    const [wordsList, setWordsList] = useState<Word[]>([]);
    const [nonDefinedList, setNonDefinedList] = useState<Word[]>([]);
    let fetchOneTime = 0
    let filterOneTime = 0

    function addRandomVals(word: Word): WordAndExtraData {
        let newWordData: WordAndExtraData = {
            worddata: word,
            weekly: Math.random() > 0.5,
        }
        return newWordData
    }

    function filterNonDefininedWords() {
        const unfilteredwords: Word[] = rawDataList.filter(w => !w.standard && !w.akademisk) // ordet skal mangle standard og akademisk, slik at ordet gis status udefinert
        setWordsList(rawDataList.filter(w => w.standard && w.akademisk))
        setNonDefinedList(unfilteredwords)
    }

    useEffect(() => {
        async function fetchallwords() {
            try {
                filterOneTime = 0
                const res = await fetch(`/api/all-words`);
                const data = await res.json();
                setRawDataList(data.wordList) //Denne skal OVERSKRIVE all dataen i useStaten. 
                /**Liten TUT for detta:
                 * Dette ville vært syntaxfeil: setWordsList[data]
                 * Dette legger til ord i useState: setWordsList(prev => [...prev, nyttOrd])
                 * Dette kan brukes til filtrering: setWordsList(prev => prev.filter(w => w.id !== id)) */
            } catch (err) {
                console.error("Kunne ikke hente ord:", err);
            }
        }
        // FIXME: Move GetProfile to a higher Hierarchy. -->
        // async function getProfile() {
        //     try {
        //         // just for fun, get a random name every time!
        //         const id = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // eventuelt: Math.floor(Math.random() * 4) + 1
        //         const emojisid = Math.floor(Math.random() * (13 - 0 + 1)) + 0; // eventuelt: Math.floor(Math.random() * 14)
        //         const res = await fetch(`/api/users/1?id=1&emoji_id=1`)
        //         const data = await res.json();
        //         console.log("YUS, hentet profil")
        //         console.log(data)
        //     } catch(err) {
        //         console.error("Uku leleh")
        //     }
        // }
        // ^^^^
        if (fetchOneTime == 0) {
            fetchallwords()
            // getProfile() //<--- part of the function above
            fetchOneTime = 1
        }
    }, [])

    useEffect(() => {
        if (filterOneTime == 0) {
            filterNonDefininedWords()
            filterOneTime = 1
        }
    }, [rawDataList]); // checks everytime wordslist updates. From wordslist = empty, to when it gets all data, and when filtered data is added (at max 3 times, to avoid inifinite loop, add if statement that checks that wordslist is not empty, nonfiltered is)

    return (
        //   <!-- ===================== ORDLISTE ===================== -->
        <div id="screen-wordlist">
            <div className="back-link" data-action="back-to-menu">‹ Tilbake</div>
            <h1 className="screen-title">Ordliste</h1>
            <div className="wordlist-toolbar">
                {/* TODO: evaluate wether the download button should be included in the actual quiz */}
            {/* <button className="secondary-btn" id="downloadBackupBtn">⬇ Last ned ordliste</button>  */}
            {/* TODO: Let users add own words? Or should this be an admin function? Possibly better with an API call to update a file. Potential idea for this project. */}
            {/* <button className="secondary-btn" id="uploadBackupBtn">⬆ Last opp</button> */}
            <input type="file" id="uploadBackupInput" accept="application/json" className="hidden"></input>
            </div>
            <input type="text" id="wordSearch" placeholder="Søk her"></input>
            <div id="wordRows">
                {/* Vis innlastingstekst */}
                {(wordsList.length < 1 && nonDefinedList.length < 1) ? (<p className="text-gray-600 text-sm">{"(steg 1 / 3) Laster inn ord ..."}</p>) :
                (wordsList.length > 0 && nonDefinedList.length < 1) ? (<p className="text-gray-600 text-sm">{'(steg 2 / 3) Filtrerer ord...'}</p>) : (
                    <>
                    <span className="wordSeperator">{`(${wordsList.length}) Ord`}</span>
                    {/* words with definition here --> */}
                    {wordsList && wordsList.map((item, key) => (
                        <WordRow key={key} data={addRandomVals(item)}/>
                    ))}
                    
                    <span className="wordSeperator">{`(${nonDefinedList.length}) Ord uten definisjon`}</span>
                    
                    {/* words with no definition yet, here --> */}
                    {nonDefinedList && nonDefinedList.length > 0 && nonDefinedList.map((item, key) => (
                        <WordRow key={key} data={addRandomVals(item)}/>
                    ))}
                    </>
                ) 
                }
                                
            </div>
            <div className="empty-note hidden" id="wordEmptyNote">Ingen ord matcher søket.</div>
        </div>
    )
}