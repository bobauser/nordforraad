"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import * as Icons from "@/app/components/icons"

export default function HomeComponent() {
    const router = useRouter();
    return (
        // <!-- ===================== MENU ===================== -->
        <div id="screen-menu">
            <div className="menu-grid">
            <button onClick={() => router.push("/pages/word-list")} className="menu-card" data-action="open-wordlist">
                Ordliste
                <small>Bla, søk og velg ukens begreper</small>
            </button>
            <button className="menu-card" data-action="open-mine-ord">
                Mine ord
                <small>Dine markerte ord og fremgangen din</small>
            </button>
            <button className="menu-card" data-action="open-quiz-setup">
                Start quiz
                <small>Multiple choice og skriveoppgaver</small>
            </button>
            <button className="final-btn" data-action="start-final-exam">
                Final Exam ✏️
                <small>Alle ord i sirkulasjon denne uken. Krever 100%.</small>
            </button>
            <button className="menu-card" data-action="open-import">
                Importer ord
                <small>Lim inn din egen ordliste</small>
            </button>
            </div>
            <div className="sprakpoeng-banner">
            Språkpoeng: <b id="menuSprakpoeng">0</b>
            </div>
            <div style={{backgroundColor: "white", display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                
                <Icons.NorwayFlagIcon />
                <Icons.UKFlagIcon />
                <Icons.SaveIcon stroke={"red"} fill={"yellow"} />
                <Icons.SyncIcon spinning={true} speed={2} stroke={"red"} fill={"yellow"}/>
                <Icons.ArrowLeftIcon stroke={"red"} fill={"yellow"} />
                <Icons.ArrowRightIcon stroke={"red"} fill={"yellow"} />
            </div>
        </div>
    )
}