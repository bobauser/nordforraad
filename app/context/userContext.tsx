// context/UserContext.tsx
"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { UserString, ValidatedUserProfile, WordItem } from "@/app/types/user";

type UserContextValue = {
  user: UserString | null;
  setUser: (u: UserString | null) => void;
  weeklyWordList: WordItem[];
  setWeeklyWordList: (u: WordItem[]) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

const CHECK_INTERVAL = 20_000;
const RECENT_CHANGE_THRESHOLD = 5_000;
const POSTPONE_DELAY = 10_000;

export function UserProvider({
  initialUser,
  children,
}: {
  initialUser: ValidatedUserProfile | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserString | null>(initialUser ? initialUser.userstring : null);
  const [weeklyWordList, setWeeklyWordListState] = useState<WordItem[]>(
    initialUser?.userprofile.weekly_wordlist ?? []
  );

  // --- DB-sync-infrastruktur ---
  const lastChangeRef = useRef(Date.now());
  const lastSavedRef = useRef(weeklyWordList);
  const listRef = useRef(weeklyWordList);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    listRef.current = weeklyWordList;
  }, [weeklyWordList]);

  const setWeeklyWordList = useCallback((list: WordItem[]) => {
    lastChangeRef.current = Date.now();
    setWeeklyWordListState(list);
  }, []);

  async function saveToDatabase(list: WordItem[]) {
    // TODO: ekte API/DB-kall når det finnes
    console.log("Lagrer weeklyWordList til DB:", list);
    lastSavedRef.current = list;
  }

  const tick = useCallback(() => {
    const sinceChange = Date.now() - lastChangeRef.current;

    if (sinceChange < RECENT_CHANGE_THRESHOLD) {
      timerRef.current = setTimeout(tick, POSTPONE_DELAY);
      return;
    }

    const changed = JSON.stringify(listRef.current) !== JSON.stringify(lastSavedRef.current);
    if (changed) saveToDatabase(listRef.current);

    timerRef.current = setTimeout(tick, CHECK_INTERVAL);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(tick, CHECK_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tick]);
  
  // const [weeklyFromDB, setWeeklyFromDB] = useState<WordItem[]>(initialUser ? initialUser.userprofile.weekly_wordlist : [])
  
    //REMINDER: TODO: Remove console log before final version #prerelease
    useEffect(() => {
        console.log("USER HAS BEEN FOUND")
        console.log(user)
        console.log("USERs wordLIST")
        console.log(weeklyWordList)
    }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, weeklyWordList, setWeeklyWordList: setWeeklyWordListState }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser må brukes inni <UserProvider>");
  return ctx;
}