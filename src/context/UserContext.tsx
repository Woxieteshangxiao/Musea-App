import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  user: {
    name: string;
    email: string;
    avatar: string;
    backdrop: string;
    id: string;
  };
  updateUser: (updates: Partial<UserContextType["user"]>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    name: "Bryce",
    email: "32****@qq.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    backdrop: "default-backdrop",
    id: "1",
  });

  const updateUser = (updates: Partial<UserContextType["user"]>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
