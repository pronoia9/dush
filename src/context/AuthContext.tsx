import React, { createContext, useContext, useEffect, useState } from 'react';

import { IUser } from '@/types';

export const INITIAL_USER = { id: '', name: '', username: '', email: '', imageUrl: '', bio: '' };

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {};

  const value = {
    user, setUser,
    isLoading, setIsLoading,
    isAuthenticated, setIsAuthenticated,
    checkAuthUser,
  };

  // @ts-ignore
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
