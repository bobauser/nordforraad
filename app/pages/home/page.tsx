"use client";
import { useRouter } from "next/navigation";

export default function HomeComponent() {
    const router = useRouter();
    return (
        // <!-- ===================== MENU ===================== -->
        <div id="screen-menu">
            <div className="menu-grid">
            <button onClick={() => router.push("/word-list")} className="menu-card" data-action="open-wordlist">
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
        </div>
    )
}