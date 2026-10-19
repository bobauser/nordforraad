"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useUser } from "@/app/context/userContext";
import { getAllEmojiChoices } from "@/app/utils/profilestringtools";

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Component names MUST start with a capital letter, otherwise React
// doesn't treat it as a component and hooks like useUser() will error.
export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user /*, setUser */ } = useUser();
  const listOfEmojis = getAllEmojiChoices();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // ---------- Dummy handlers (modal is "dumb" for now) ----------

  function handleEmojiClick(index: number) {
    // TODO: store chosen index in local state (useState) and highlight it,
    //       then on save: setUser({ ...user, emojiIndex: index })
    console.log("Clicked emoji index:", index, listOfEmojis[index]);
  }

  function handleSaveProfile() {
    // TODO: read username from input (controlled input + useState),
    //       fallback to "Spiller" if empty, call setUser(...) and persist(),
    //       then onClose()
    console.log("Save profile clicked (not implemented)");
  }

  function handleSaveProfileCode() {
    // TODO: const code = encodeProfileCode(user); open ProfileCodeModal with code
    console.log("Save profile code clicked (not implemented)");
  }

  function handleRestoreProfileCode() {
    // TODO: open RestoreCodeModal
    console.log("Restore from code clicked (not implemented)");
  }

  // --------------------------------------------------------------

  // Hooks must run before any early return, so these checks go here.
  if (!isOpen || !user) return null;

  const modal = (
    // Clicking the dark/blurred overlay closes the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation so clicks INSIDE the box don't bubble up and close it */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Din profil</h2>

        <label style={{ fontSize: "0.85rem", color: "#8a8496" }}>Brukernavn</label>
        {/* readOnly because there's no onChange yet – otherwise React warns */}
        <input type="text" id="usernameInput" value={user.username} readOnly />

        <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "#8a8496" }}>
          Velg emoji-avatar
        </div>

        <div className="emoji-choices" id="emojiChoices">
          {listOfEmojis.map((emoji, index) => (
            <button
              key={emoji}
              type="button"
              className={index === user.emojiIndex ? "active" : ""}
              onClick={() => handleEmojiClick(index)}
            >
              {emoji}
            </button>
          ))}
        </div>

        <button className="modal-close" type="button" onClick={handleSaveProfile}>
          Lagre
        </button>

        <hr className="rule" style={{ margin: "20px 0 14px", borderTop: "1px solid #eee" }} />

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="secondary-btn"
            type="button"
            style={{ color: "#221f33", borderColor: "#ccc" }}
            onClick={handleSaveProfileCode}
          >
            Lagre min profilkode
          </button>
          <button
            className="secondary-btn"
            type="button"
            style={{ color: "#221f33", borderColor: "#ccc" }}
            onClick={handleRestoreProfileCode}
          >
            Gjenopprett fra kode
          </button>
        </div>

        <button className="secondary-btn" type="button" onClick={onClose} style={{ marginTop: "12px" }}>
          Lukk
        </button>
      </div>
    </div>
  );

  // Portal renders the modal directly in <body>, so no parent CSS
  // (overflow, transform, z-index) can clip or trap it.
  return createPortal(modal, document.body);
}