"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { WordFromDBList, WordAndExtraData } from "@/app/types/word";
import { WordRow } from "@/app/components/words/wordcomponents";
import { useUser } from "@/app/context/userContext";
import InformationModal from "@/app/components/modals/infomodal";
import { WordItem } from "@/app/types/user";

//TODO: Delete this later?
type doOnceVariables = {
    fetchOneTime: number,
    filterOneTime: number
}

type InfoModalContents = {
    modalstatus: boolean
    data?: ModalData
}

type ModalData = {
    text: string
    action: string
}

// TODO: View definition from WordRow. Update Cloud userstring once you chose words for a quiz, so that it updates in the cloud after 5 seconds (not every time you interact with a word, thats too frequent).
export default function WordList() {
    const { user /*, setUser */, weeklyWordList, setWeeklyWordList } = useUser();
    
    const [rawDataList, setRawDataList] = useState<WordFromDBList[]>([]);
    const [wordsList, setWordsList] = useState<WordFromDBList[]>([]);
    const [nonDefinedList, setNonDefinedList] = useState<WordFromDBList[]>([]);
    const [doOnce, setDoOnce] = useState<doOnceVariables>({fetchOneTime: 0, filterOneTime: 0})
    const [warning, setWarning] = useState<InfoModalContents>({modalstatus: false})

    // let fetchOneTime = 0
    // let filterOneTime = 0

    // Add random vals is just a test function to add a checkmark to words. For later, it can be removed when this data has been replaced with actual userdata
    //TODO: remove this function after data replacing the weekly stat
    function addRandomVals(word: WordFromDBList): WordAndExtraData {
        const wordlist = user?.words
        const existingScore = wordlist?.find(item => item.id === word.id);

        const newWordData: WordAndExtraData = {
            worddata: word,
            wordscore: existingScore ?? { id: word.id, score: 0, attempts: 0 },
            /* eslint-disable */
            // weekly: Math.random() > 0.5,
            weekly: weeklyWordList ? weeklyWordList.some(item => item.id === word.id) : false,
            /* eslint-enable */
        }
        return newWordData
    }

    function selectWordForWeekly(id: string, status: boolean) {
        setWeeklyWordList(
            status
            ? (weeklyWordList.some(w => w.id === id) ? weeklyWordList : [...weeklyWordList, { id }])
            : weeklyWordList.filter(w => w.id !== id)
        );
    }

    // TODO: About isWeekly: make a for-loop where you store the words that are selceted as a weekly task, then add it to the list. OR, do it below in the TSX code
    function filterNonDefininedWords() {
        const unfilteredwords: WordFromDBList[] = rawDataList.filter(w => !w.standard && !w.akademisk) // ordet skal mangle standard og akademisk, slik at ordet gis status udefinert
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

    useEffect(() => {
        // FIXME: errormessage is now not possible to show, since "weekly" will never be "null", at most an empty array. Another issue has to arrise for us to not get any results. This probably makes sense to place in a parent component, instead of locally here. Possibly inside context
        if (!weeklyWordList) {
            // OPEN MODAL TO SHOW THAT SOMETHING WENT WRONG
            setWarning({modalstatus: true, data: {text: "Feilet i å laste inn din ukentlige liste", action: "error"}})
        }
        
    }, [weeklyWordList])

    return (
        //   <!-- ===================== ORDLISTE ===================== -->
        <>
        {/* FIXME: For now this implementation is okay, the modal will show, theres no problem in just keeping it above. however, Context should have a list of errors, and a timestamp of when they are registered. So after 5 or so seconds, Homepage or Context can start to remove them, but to show the notifications on any page you are without them dissapearing, produce the Modals in homepage instead */}
            {warning.modalstatus && warning.data ? (<InformationModal text={warning.data?.text} action={warning.data?.action} />) : null}
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
                            <WordRow key={key} data={addRandomVals(item)} onToggle={selectWordForWeekly}/>
                        ))}
                        
                        <span className="wordSeperator">{`(${nonDefinedList.length}) Ord uten definisjon`}</span>
                        
                        {/* words with no definition yet, here --> */}
                        {nonDefinedList && nonDefinedList.length > 0 && nonDefinedList.map((item, key) => (
                            <WordRow key={key} data={addRandomVals(item)} onToggle={null}/>
                        ))}
                        </>
                    ) 
                    }
                                    
                </div>
                <div className="empty-note hidden" id="wordEmptyNote">Ingen ord matcher søket.</div>
            </div>
        </>
    )
}