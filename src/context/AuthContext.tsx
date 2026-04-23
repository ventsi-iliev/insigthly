"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export type UserProfile = {
  name: string;
  email: string;
};

type AuthContextValue = {
  isAuthReady: boolean;
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/** Current session flag */
const SESSION_KEY = "insightly_session";
/** Legacy demo auth (still honored until user logs in again) */
const LEGACY_AUTH_KEY = "zenflow_auth";
const USER_KEY = "insightly_user";

function readStoredUser(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const o = parsed as Record<string, unknown>;
    const name = typeof o.name === "string" ? o.name : "";
    const email = typeof o.email === "string" ? o.email : "";
    if (!name && !email) {
      return null;
    }
    return { name, email };
  } catch {
    return null;
  }
}

function isSessionStored(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return (
    window.localStorage.getItem(SESSION_KEY) === "1" ||
    window.localStorage.getItem(LEGACY_AUTH_KEY) === "1"
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- localStorage is unavailable on server */
  useLayoutEffect(() => {
    const authed = isSessionStored();
    setIsAuthenticated(authed);
    setUser(readStoredUser());
    setIsAuthReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const login = useCallback((profile: UserProfile) => {
    window.localStorage.setItem(SESSION_KEY, "1");
    window.localStorage.removeItem(LEGACY_AUTH_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(profile));
    setUser(profile);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(LEGACY_AUTH_KEY);
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthReady,
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthReady, isAuthenticated, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
