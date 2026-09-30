"use client"
import { useUser } from "@/app/context/userContext";
import { getAllEmojiChoices } from "@/app/utils/profilestringtools";

// FIXME: fix this broken mess
export default function openProfileModal(){
    const { user /*, setUser */ } = useUser();

    const listOfEmojies = getAllEmojiChoices()
    
//   box.querySelector('#saveProfileCodeBtn').addEventListener('click', () => {
//     const code = encodeProfileCode();
//     showProfileCodeModal(code);
//   });
//   box.querySelector('#restoreProfileCodeBtn').addEventListener('click', () => {
//     showRestoreCodeModal();
//   });

// const box = document.createElement('div');
//   box.className = 'modal-overlay';
//   box.innerHTML = `
//     ;
//   document.getElementById('modalRoot').appendChild(box);

//   let chosenEmoji = profile.emoji;
//   box.querySelectorAll('#emojiChoices button').forEach(btn => {
//     btn.addEventListener('click', () => {
//       box.querySelectorAll('#emojiChoices button').forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');
//       chosenEmoji = btn.dataset.emoji;
//     });
//   });
//   box.addEventListener('click', (e) => { if(e.target === box) box.remove(); });
//   box.querySelector('#saveProfileBtn').addEventListener('click', async () => {
//     profile.username = box.querySelector('#usernameInput').value.trim() || "Spiller";
//     profile.emoji = chosenEmoji;
//     renderProfile();
//     await persist();
//     box.remove();
//   });

  return (
    <div className="modal-overlay">
        <div className="modal-box">
            <h2>Din profil</h2>
            <label style="font-size:0.85rem;color:#8a8496;">Brukernavn</label>
            <input type="text" id="usernameInput" value="${profile.username}">
            <div style="margin-top:16px;font-size:0.85rem;color:#8a8496;">Velg emoji-avatar</div>
            <div class="emoji-choices" id="emojiChoices">
            ${listOfEmojies.map(e => `<button data-emoji="${e}" class="${e===user.emojiIndex?'active':''}">${e}</button>`).join('')}
            </div>
            <button class="modal-close" id="saveProfileBtn">Lagre</button>
            <hr class="rule" style="margin:20px 0 14px;border-top:1px solid #eee;">
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                <button class="secondary-btn" id="saveProfileCodeBtn" style="color:#221f33;border-color:#ccc;">Lagre min profilkode</button>
                <button class="secondary-btn" id="restoreProfileCodeBtn" style="color:#221f33;border-color:#ccc;">Gjenopprett fra kode</button>
            </div>
        </div>
    </div>
  )
}