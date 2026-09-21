import { Word } from "@/app/types/word";

type WordAndExtraData {
    worddata: Word;
    eligeble
}

export function WordRow() {
    const missingEnglishTag = (eligible && !(w.engelsk && w.engelsk.trim())) ? `<span class="word-tag">🚫🇬🇧</span>` : '';
    const clasnm = 'word-row' + (w.weekly && eligible ? ' selected' : '') + (eligible ? '' : ' ineligible');

    return (
        <div className="word-row">
            <label class="check-area">
                <input type="checkbox" ${w.weekly && eligible ? 'checked' : ''} ${eligible ? '' : 'disabled'} data-id="${w.id}">
                <span class="ord-text">${w.ord}</span>
                ${missingEnglishTag}
            </label>
            <span class="score-badge ${scoreColorClass(w)}">${w.attempts ? w.score : 0}</span>
            <div class="detail-area" data-detail="${w.id}">›</div>
        </div>
        )
}