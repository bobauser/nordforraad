import { Word } from "@/app/types/word";
import { scoreColorClass } from "@/app/utils/eligeable";
import { WordAndExtraData } from "@/app/types/word";
import { useState } from "react";
import { UndefinedWordDefinition } from "@/app/utils/logic";

type WordRowProps = {
    data: WordAndExtraData;
}

export function WordRow({data}: WordRowProps) {
    let _word = data.worddata
    const [wordChecked, setWordChecked] = useState(data.weekly); //FIXME: OBS, this is just randomized, when real userdata is handled, weekly should actually be the result of a useraction. If user clicked work "spise", this word should be active as weekly when you open the wordlist
    const hasDefinition = UndefinedWordDefinition(_word.standard, _word.akademisk)
    const missingEnglishTag = 
    (hasDefinition && !(_word.engelsk && _word.engelsk.trim())) ? (<span className="word-tag">🚫🇬🇧</span>) : null;

    const className =
    // FIXME: Get a better name for a word missing definition, making it unavailable for tests. Ineligeble is okay, but too open for interpetation.
    "word-row" +
    (wordChecked && hasDefinition ? " selected" : "") +
    (hasDefinition ? "" : " ineligible"); // FIXME-part2: this <<--

    // TODO: Fix User Datastring once word has been selected. Click on as many words as you want, within 5 seconds of non-interaction, save to cloud. Probably parent component's job, not the wordrow itself
    // function updateWordValue() {} //<-- from todo above, should update data somehow

    return (
    <div className={className}>
      <label className="check-area">
        <input
          type="checkbox"
          disabled={!hasDefinition}
          onChange={() => {setWordChecked(!wordChecked)}} //uses isWeekly
          checked={wordChecked}
          // TODO: when clicked, change isWeekly for the word in the users data!
        />
        <span className="ord-text">{_word.ord}</span>
        {missingEnglishTag}
      </label>
      <span className={`score-badge ${scoreColorClass(_word)}`}>
        {_word.attempts ? _word.score : 0}
      </span>
      <div className="detail-area" data-detail={_word.id}>
        ›
      </div>
    </div>
  );
}