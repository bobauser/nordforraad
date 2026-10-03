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
    words: ProfileCodeWordEntry[];
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
export interface ProfileCodeWordEntry {
  id: string;
  score: number;
  attempts: number;
}

// weekly-list type
export type Weekly = {
  weekly_wordlist: WordItem[];
};

export type WordItem = {
  id: string;
};