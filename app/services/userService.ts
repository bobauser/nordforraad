import "server-only";
// import { cookies } from "next/headers";
import { ProfileCodeWordEntry, UserString, ValidationResult } from "../types/user";
import { mockUserStringDatabase } from "../utils/databaseMocker";
import * as userController from '@/app/controllers/userController'


// validating the userString coming from DB. Process: Get Userstring from UserDB, then validate the string
export function checkUserAgainstDatabase(id: number): ValidationResult {
    const userStringRaw = mockUserStringDatabase(id)
    const validate_user: ValidationResult = validateProfileCode(userStringRaw)
    return validate_user;
    // UserString
}

const EMOJI_COUNT = 12;          // length of EMOJI_CHOICES in the app
const SCORE_FLOOR = -5;          // matches the app's per-word score floor
const SCORE_CEILING = 999;       // generous sanity ceiling (not a real game limit)
const MAX_USERNAME_LENGTH = 40;
const ID_PATTERN = /^[a-z0-9-]+$/; // matches the app's slug() output
// -----------------------------------------------------------------------------

//TODO: Resolve: Argument for putting this at userservice. This validation should only happen when getting, or saving a userstring. Faulty userstrings will not be interacted with. Therefore, its not a "util", not a tool type function that many files will use, and is limited to user based actions
//TODO: Go through this long function and validate wheter its heavy and needs re-vamp
export function validateProfileCode(rawCode: unknown): ValidationResult {
  const errors: string[] = [];
 
  if (typeof rawCode !== 'string' || rawCode.trim().length === 0) {
    return { valid: false, errors: ['Koden er tom eller ikke en tekststreng.'] };
  }
  const code = rawCode.trim();
 
  // 1. Base64 decode (unicode-safe, mirrors the app's decodeProfileCode)
  let raw: string;
  try {
    const binary = atob(code);
    raw = decodeURIComponent(escape(binary));
  } catch {
    return {
      valid: false,
      errors: ['Klarte ikke å base64-dekode koden — den er sannsynligvis korrupt eller ikke en gyldig profilkode.'],
    };
  }
 
  // 2. Must split into exactly 3 top-level "|"-separated segments
  const segments = raw.split('|');
  if (segments.length !== 3) {
    return { valid: false, errors: [`Forventet 3 deler adskilt av "|", fant ${segments.length}.`] };
  }
  const [emojiIdxStr, usernameEncoded, wordPart] = segments;
 
  // 3. Emoji index
  const emojiIndex = Number(emojiIdxStr);
  if (!Number.isInteger(emojiIndex) || emojiIndex < 0 || emojiIndex >= EMOJI_COUNT) {
    errors.push(`Emoji-indeks "${emojiIdxStr}" er ugyldig (må være et heltall 0–${EMOJI_COUNT - 1}).`);
  }
 
  // 4. Username
  let username = '';
  try {
    username = decodeURIComponent(usernameEncoded);
  } catch {
    errors.push('Brukernavnet er feil URI-kodet og kan ikke leses.');
  }
  if (username.trim().length === 0) {
    errors.push('Brukernavnet er tomt.');
  } else if (username.length > MAX_USERNAME_LENGTH) {
    errors.push(`Brukernavnet er for langt (${username.length} tegn, maks ${MAX_USERNAME_LENGTH}).`);
  }
 
  // 5. Word entries ("id:score:attempts", comma-separated; empty = no words attempted yet)
  const words: ProfileCodeWordEntry[] = [];
  const seenIds = new Set<string>();
 
  if (wordPart.length > 0) {
    wordPart.split(',').forEach((entry, i) => {
      const fields = entry.split(':');
      if (fields.length !== 3) {
        errors.push(`Ord-oppføring #${i + 1} ("${entry}") har ${fields.length} felt, forventet 3 (id:score:attempts).`);
        return;
      }
      const [id, scoreStr, attemptsStr] = fields;
 
      const idOk = ID_PATTERN.test(id);
      if (!idOk) {
        errors.push(`Ord-oppføring #${i + 1}: ugyldig id "${id}" (kun a-z, 0-9 og bindestrek er tillatt).`);
      }
      if (idOk && seenIds.has(id)) {
        errors.push(`Ord-oppføring #${i + 1}: duplikat id "${id}".`);
      }
      seenIds.add(id);
 
      const score = Number(scoreStr);
      const scoreOk = Number.isInteger(score) && score >= SCORE_FLOOR && score <= SCORE_CEILING;
      if (!scoreOk) {
        errors.push(
          `Ord-oppføring #${i + 1} ("${id}"): score "${scoreStr}" er ugyldig (må være et heltall mellom ${SCORE_FLOOR} og ${SCORE_CEILING}).`
        );
      }
 
      const attempts = Number(attemptsStr);
      const attemptsOk = Number.isInteger(attempts) && attempts >= 1;
      if (!attemptsOk) {
        errors.push(`Ord-oppføring #${i + 1} ("${id}"): attempts "${attemptsStr}" er ugyldig (må være et heltall ≥ 1).`);
      }
 
      if (idOk && scoreOk && attemptsOk) {
        words.push({ id, score, attempts });
      }
    });
  }
 
    if (errors.length > 0) {
        const failedResult: ValidationResult = {
            valid: false,
            errors: errors,
        }
        return failedResult;
    }
 
    const result: ValidationResult = {
        valid: true,
        errors: [],
        parsed: { emojiIndex, username, words }
    }
    return result;
}

// TODO: implement this function and try to find user by cookie, return a descriptive message if the browser a: contains no cookie, b: cookie is incorrect (most likely session expire), c: something else happens like an error internally
export async function getCurrentUser(): Promise<UserString | null> {
  // const sessionToken = (await cookies()).get("session")?.value;
  // if (!sessionToken) return null;
  // return userRepository.findBySessionToken(sessionToken);

  const randomId = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // eventuelt: Math.floor(Math.random() * 4) + 1
  // const randomId = Math.floor(Math.random() * mockUsers.length) + 1;
  const profile: UserString | null = userController.ValidateUser(randomId);
  
  return profile;// either user or null
}