import Link from "next/link";

export default function TopBar() {
    return (
        <div className="topbar" id="topbar">
            <div className="brand">
                <Link href="/">Nordforråd</Link>
                <small>Norsk ordforråd, litt om gangen</small>
            </div>
            <button id="profileBtn">
            <span className="avatar" id="profileAvatar">🦉</span>
            <span id="profileName">Spiller</span>
            </button>
        </div>    
    )
}