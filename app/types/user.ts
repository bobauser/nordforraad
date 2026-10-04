import { WordScore } from "./word";

// Simply put: DATABASEPROFILE
export type UserDB = {
  username: string;
  userString: string;
  sessionID: string;
  weekly_wordlist: WordItem[];
}

// The parsed unicode string
export type UserString = {
    emojiIndex: number;
    username: string;
    words: WordScore[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  parsed?: UserString;
}

export interface ValidatedUserProfile {
  userprofile: UserDB;
  userstring: UserString;
}



// small data -->

// weekly-list type
export type Weekly = {
  weekly_wordlist: WordItem[];
};

export type WordItem = {
  id: string;
};