import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const USERNAME_KEY = 'codeleap_username';

interface AuthContextType {
  username: string | null;
  setUsername: (username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem(USERNAME_KEY);
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem(USERNAME_KEY, username);
    } else {
      localStorage.removeItem(USERNAME_KEY);
    }
  }, [username]);

  const handleSetUsername = (newUsername: string): void => {
    setUsername(newUsername.trim());
  };

  const logout = (): void => {
    setUsername(null);
  };

  const value: AuthContextType = {
    username,
    setUsername: handleSetUsername,
    logout,
    isAuthenticated: !!username,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
