import React, { useState } from 'react';
import { Mail, Lock, Zap, User, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { auth, googleProvider } from '../services/firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup,
    updateProfile,
    GoogleAuthProvider
} from 'firebase/auth';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    if (!auth) {
        setError("Firebase not configured.");
        return;
    }
    setLoading(true);
    setError(null);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        if (token) {
            localStorage.setItem('google_access_token', token);
        }
        onLogin();
    } catch (e: any) {
        console.error(e);
        setError(e.message || "Authentication failed");
    } finally {
        setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!auth) {
        setError("Firebase not configured.");
        return;
    }
    if (!email || !password) {
        setError("Please fill in all fields");
        return;
    }

    setLoading(true);
    setError(null);

    try {
        if (isSignUp) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (name) {
                await updateProfile(userCredential.user, { displayName: name });
            }
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
        onLogin();
    } catch (e: any) {
        console.error(e);
        let msg = "Authentication failed";
        if (e.code === 'auth/wrong-password') msg = "Invalid password";
        if (e.code === 'auth/user-not-found') msg = "User not found";
        if (e.code === 'auth/email-already-in-use') msg = "Email already registered";
        setError(msg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl relative overflow-hidden bg-white/80 dark:bg-slate-900/80">
        
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/10 dark:bg-sky-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 mb-4 shadow-lg shadow-sky-500/30">
                <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
            <p className="text-slate-500 dark:text-slate-400">
                {isSignUp ? 'Join Zayna to start your intelligent meetings.' : 'Sign in to access your intelligent meeting assistant.'}
            </p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4 flex items-center gap-3 text-red-600 dark:text-red-200 text-sm">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                {error}
            </div>
        )}

        <div className="space-y-4 relative z-10">
            <button 
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all transform hover:scale-[1.02] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-[#172033] text-slate-500">Or continue with email</span>
                </div>
            </div>

            <div className="space-y-3">
                {isSignUp && (
                    <div className="relative animate-fade-in">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-10 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all" 
                        />
                    </div>
                )}
                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-10 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all" 
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-10 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all" 
                    />
                </div>
            </div>

            <button 
                onClick={handleEmailAuth} 
                disabled={loading}
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-sky-500/20 mt-4 flex items-center justify-center disabled:opacity-70"
            >
                {loading ? 'Authenticating...' : (isSignUp ? 'Create Account' : 'Sign In')}
                {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </button>
        </div>
        
        <div className="mt-6 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button 
                    onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                    className="ml-2 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 font-semibold focus:outline-none transition-colors"
                >
                    {isSignUp ? 'Log in' : 'Sign up'}
                </button>
            </p>
            
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-center text-xs text-slate-400 gap-2">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>We only use this to verify it's you. Your meeting data never leaves your device.</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;