// function showProfileCodeModal(code){
//   const box = document.createElement('div');
//   box.className = 'modal-overlay';
//   box.innerHTML = `
//     <div class="modal-box">
//       <h2>Din profilkode</h2>
//       <div class="def-text" style="margin-bottom:12px;">
//         Kopier og lagre denne koden et trygt sted (f.eks. i Notater). Bruk "Gjenopprett fra kode" for å hente profilen tilbake senere eller på en annen enhet.
//       </div>
//       <textarea id="profileCodeText" readonly style="width:100%;min-height:90px;border-radius:10px;border:1px solid #ccc;padding:10px;font-family:monospace;font-size:0.85rem;word-break:break-all;">${code}</textarea>
//       <button class="modal-close" id="copyProfileCodeBtn" style="margin-top:12px;">Kopier</button>
//     </div>`;
//   document.getElementById('modalRoot').appendChild(box);
//   const textarea = box.querySelector('#profileCodeText');
//   textarea.addEventListener('click', () => textarea.select());
//   box.addEventListener('click', (e) => { if(e.target === box) box.remove(); });
//   box.querySelector('#copyProfileCodeBtn').addEventListener('click', async () => {
//     try{
//       await navigator.clipboard.writeText(code);
//       box.querySelector('#copyProfileCodeBtn').textContent = 'Kopiert!';
//     }catch(e){
//       textarea.select();
//       document.execCommand('copy');
//       box.querySelector('#copyProfileCodeBtn').textContent = 'Kopiert!';
//     }
//   });
// }