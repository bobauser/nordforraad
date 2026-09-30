export type UserDB = {
    email_assosiated: string;
    userdatastring: string;
}

export type UserString = {
    emojiIndex: number;
    username: string;
    words: ProfileCodeWordEntry[];
}

export interface ProfileCodeWordEntry {
  id: string;
  score: number;
  attempts: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  parsed?: UserString;
}