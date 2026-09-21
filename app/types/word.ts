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

// TODO: update the Word class, since a word might not need to include scores and attempts (these are user datas). Also, if its activated in a player's account, this data is missing anyway.