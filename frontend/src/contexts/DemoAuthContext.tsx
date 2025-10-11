import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Demo authentication provider for testing
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem("demoUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData.user);
      setUserProfile(userData.profile);
    }
    setLoading(false);
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setLoading(true);
    try {
      // Demo signup - just create a mock user
      const mockUser: User = {
        uid: "demo-user-" + Date.now(),
        email,
        displayName,
      };

      const mockProfile: UserProfile = {
        uid: mockUser.uid,
        email,
        displayName,
        createdAt: new Date(),
      };

      // Save to localStorage for demo
      localStorage.setItem(
        "demoUser",
        JSON.stringify({
          user: mockUser,
          profile: mockProfile,
        })
      );

      setUser(mockUser);
      setUserProfile(mockProfile);
    } catch (error) {
      throw new Error("Demo signup failed");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Demo signin - accept any email/password
      const mockUser: User = {
        uid: "demo-user-" + Date.now(),
        email,
        displayName: email.split("@")[0],
      };

      const mockProfile: UserProfile = {
        uid: mockUser.uid,
        email,
        displayName: email.split("@")[0],
        createdAt: new Date(),
      };

      // Save to localStorage for demo
      localStorage.setItem(
        "demoUser",
        JSON.stringify({
          user: mockUser,
          profile: mockProfile,
        })
      );

      setUser(mockUser);
      setUserProfile(mockProfile);
    } catch (error) {
      throw new Error("Demo signin failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("demoUser");
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      throw new Error("Demo logout failed");
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
