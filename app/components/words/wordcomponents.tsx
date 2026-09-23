import { Word } from "@/app/types/word";
import { scoreColorClass } from "@/app/utils/eligeable";
import { WordAndExtraData } from "@/app/types/word";
import { useState } from "react";

type WordRowProps = {
    data: WordAndExtraData;
}

export function WordRow({data}: WordRowProps) {
    let _word = data.worddata
    const [wordChecked, setWordChecked] = useState(false)
    const hasDefinition = _word.standard && _word.akademisk ? true : false //hvis ord har standard og akademisk beskrivelse, OK.
    const missingEnglishTag = 
    (hasDefinition && !(_word.engelsk && _word.engelsk.trim())) ? (<span className="word-tag">🚫🇬🇧</span>) : null;
    if (_word.weekly) {
        setWordChecked(true)
    }

    // TODO: Fix User Datastring once word has been selected
    const className =
    "word-row" +
    (wordChecked && hasDefinition ? " selected" : "") +
    (hasDefinition ? "" : " ineligible");
    // ineligeble is the classname for a word not having a definition

    return (
    <div className={className}>
      <label className="check-area">
        <input
          type="checkbox"
        //   defaultChecked={data.weekly && hasDefinition}
          disabled={!hasDefinition}
          onChange={() => {setWordChecked(!wordChecked)}} //uses isWeekly
          checked={wordChecked}
          // TODO: when clicked, change isWeekly for the word in the users data!
        //   data-id={data.id}
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