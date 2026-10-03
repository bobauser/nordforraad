// context/UserContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { UserString, ValidatedUserProfile, WordItem } from "@/app/types/user";

type UserContextValue = {
  user: UserString | null;
  setUser: (u: UserString | null) => void;
  weeklyWordList: WordItem[] | null;
  setWeeklyWordList: (u: WordItem[] | null) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({
  initialUser,
  children,
}: {
  initialUser: ValidatedUserProfile | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserString | null>(initialUser ? initialUser.userstring : null);
  const [weeklyWordList, setWeeklyWordList] = useState<WordItem[] | null>(initialUser ? initialUser.userprofile.weekly_wordlist : null);
  
    useEffect(() => {
      //REMINDER: TODO: Remove console log before final version #prerelease
        console.log("USER HAS BEEN FOUND")
        console.log(user)
        console.log("USERs wordLIST")
        console.log(weeklyWordList)
    }, [user])
  return (
    <UserContext.Provider value={{ user, setUser, weeklyWordList, setWeeklyWordList }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser må brukes inni <UserProvider>");
  return ctx;
}