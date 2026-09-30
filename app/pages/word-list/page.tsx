"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Word, WordAndExtraData } from "@/app/types/word";
import { WordRow } from "@/app/components/words/wordcomponents";

//TODO: Delete this later?
type doOnceVariables = {
    fetchOneTime: number,
    filterOneTime: number
}

// TODO: View definition from WordRow. Update Cloud userstring once you chose words for a quiz, so that it updates in the cloud after 5 seconds (not every time you interact with a word, thats too frequent).
export default function WordList() {
    const [rawDataList, setRawDataList] = useState<Word[]>([]);
    const [wordsList, setWordsList] = useState<Word[]>([]);
    const [nonDefinedList, setNonDefinedList] = useState<Word[]>([]);
    const [doOnce, setDoOnce] = useState<doOnceVariables>({fetchOneTime: 0, filterOneTime: 0})
    // let fetchOneTime = 0
    // let filterOneTime = 0

    // Add random vals is just a test function to add a checkmark to words. For later, it can be removed when this data has been replaced with actual userdata
    //TODO: remove this function after data replacing the weekly stat
    function addRandomVals(word: Word): WordAndExtraData {
        const newWordData: WordAndExtraData = {
            worddata: word,
            /* eslint-disable */
            weekly: Math.random() > 0.5,
            /* eslint-enable */
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
        if (doOnce.fetchOneTime == 0) {
            fetchallwords()
            // fetchOneTime = 1
            // setDoOnce(doOnce.fetchOneTime = 1)
        }
    }, [])

    useEffect(() => {
        if (doOnce.filterOneTime == 0) {
            filterNonDefininedWords()
            // filterOneTime = 1
            // setDoOnce(doOnce.filterOneTime = 1)
        }
    }, [rawDataList]); // checks everytime wordslist updates. From wordslist = empty, to when it gets all data, and when filtered data is added (at max 3 times, to avoid inifinite loop, add if statement that checks that wordslist is not empty, nonfiltered is)

    return (
        //   <!-- ===================== ORDLISTE ===================== -->
        <div id="screen-wordlist">
            <Link href="/" className="back-link" data-action="back-to-menu">{"< Tilbake"}</Link>
            <h1 className="screen-title">Ordliste</h1>
            <div className="wordlist-toolbar">
                {/* TODO: evaluate wether the download button should be included in the actual quiz */}
            {/* <button className="secondary-btn" id="downloadBackupBtn">⬇ Last ned ordliste</button>  */}
            {/* TODO: Let users add own words? Or should this be an admin function? Possibly better with an API call to update a file. Potential idea for this project. */}
            {/* <button className="secondary-btn" id="uploadBackupBtn">⬆ Last opp</button> */}
            <input type="file" id="uploadBackupInput" accept="application/json" className="hidden"></input>
            </div>
            {/* TODO: bring back filtering here --> */}
            <input type="text" id="wordSearch" placeholder="Søk her"></input>
            <div id="wordRows">
                {/* Vis innlastingstekst */}
                {(wordsList.length < 1 && nonDefinedList.length < 1) ? (<p className="text-gray-600 text-sm">{"(steg 1 / 3) Laster inn ord ..."}</p>) :
                (wordsList.length > 0 && nonDefinedList.length < 1) ? (<p className="text-gray-600 text-sm">{'(steg 2 / 3) Filtrerer ord...'}</p>) : (
                    <>
                    {/* TODO: Add the picked word based on the words from the user's list, and update scores too */}
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