export default function WordList() {
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
            <div id="wordRows"></div>
            <div className="empty-note hidden" id="wordEmptyNote">Ingen ord matcher søket.</div>
        </div>
    )
}