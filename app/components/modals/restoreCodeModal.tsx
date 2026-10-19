// function showRestoreCodeModal(){
//   const box = document.createElement('div');
//   box.className = 'modal-overlay';
//   box.innerHTML = `
//     <div class="modal-box">
//       <h2>Gjenopprett fra kode</h2>
//       <div class="def-text" style="margin-bottom:12px;">Lim inn profilkoden din under.</div>
//       <textarea id="restoreCodeInput" style="width:100%;min-height:90px;border-radius:10px;border:1px solid #ccc;padding:10px;font-family:monospace;font-size:0.85rem;word-break:break-all;"></textarea>
//       <button class="modal-close" id="applyRestoreCodeBtn" style="margin-top:12px;">Bruk kode</button>
//     </div>`;
//   document.getElementById('modalRoot').appendChild(box);
//   box.addEventListener('click', (e) => { if(e.target === box) box.remove(); });
//   box.querySelector('#applyRestoreCodeBtn').addEventListener('click', async () => {
//     const code = box.querySelector('#restoreCodeInput').value;
//     try{
//       const { matched, skipped, total } = applyProfileCode(code);
//       await persist();
//       renderProfile();
//       renderWordRows();
//       updateWeeklyCount();
//       renderMenu();
//       box.remove();
//       alert(`Profil gjenopprettet. ${matched} av ${total} ord matchet mot din nåværende ordliste${skipped ? ` (${skipped} fantes ikke lenger og ble hoppet over)` : ''}.`);
//     }catch(e){
//       alert('Klarte ikke å lese koden. Sjekk at den er kopiert i sin helhet.');
//     }
//   });
// }