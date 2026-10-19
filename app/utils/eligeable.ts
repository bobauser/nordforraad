import { WordFromDBList } from "../types/word";

// TODO: Make sure to fix this part too when the type 'Word' is fixed with updated data, the one below 2
export function scoreColorClass(word: WordFromDBList) {
  if(!word.attempts) return 'neutral';
  if(word.score < 0) return 'red';
  if(word.score < 6) return 'orange';
  return 'green';
}
// TODO: Fix below function aswell

export function isQuizEligible(word: WordFromDBList){
  return !!(word.akademisk && word.akademisk.trim()) && !!(word.standard && word.standard.trim());
}