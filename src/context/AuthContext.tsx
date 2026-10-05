import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserRole } from '../types/database';

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  role: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role, full_name')
              .eq('id', session.user.id)
              .maybeSingle();

            setUser({
              id: session.user.id,
              email: session.user.email || '',
              role: (profile?.role as UserRole) || 'admin',
              fullName: profile?.full_name || 'Admin'
            });
          }
        } catch (err) {
          console.warn('[Supabase Auth] Session check error:', err);
        }
      }
      setLoading(false);
    }

    checkSession();

    // Supabase auth state listener
    if (isSupabaseConfigured && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: 'admin',
            fullName: 'Admin User'
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured || !supabase) {
        setLoading(false);
        return {
          success: false,
          error: 'Supabase is not configured. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
        };
      }

      // Real Supabase Auth authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', data.user.id)
          .maybeSingle();

        const u: AuthUser = {
          id: data.user.id,
          email: data.user.email || email,
          role: (profile?.role as UserRole) || 'admin',
          fullName: profile?.full_name || 'Admin'
        };
        setUser(u);
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, error: 'Authentication failed.' };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Authentication error' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: Boolean(user),
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
