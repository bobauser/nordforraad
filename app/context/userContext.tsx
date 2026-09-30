// context/UserContext.tsx
"use client";
import { createContext, useContext, useState } from "react";
import type { UserString } from "@/app/types/user";

type UserContextValue = {
  user: UserString | null;
  setUser: (u: UserString | null) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({
  initialUser,
  children,
}: {
  initialUser: UserString | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserString | null>(initialUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser må brukes inni <UserProvider>");
  return ctx;
}