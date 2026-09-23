// TODO: update the Word class, since a word might not need to include scores and attempts (these are user datas). Also, if its activated in a player's account, this data is missing anyway.

export type Word = { 
    id: string;
    ord: string
    engelsk: string;
    akademisk: string;
    standard: string
    score: number
    weekly: boolean
    attempts: number
};

// TODO: this is the extra dataclass I use to map values onto the prev class, needs future re-cal?
export type WordAndExtraData = {
  worddata: Word;
  weekly: boolean; //This datavalue means that a word has been chosen for the weeks current lesson. Although, that might still be a bad name
  // FIXME: rename "weekly" to another name? Like selected (too generic?), chosenForQuiz (too concrete but bad name). Weekly itself it too open for interpretation in my opinion
};
