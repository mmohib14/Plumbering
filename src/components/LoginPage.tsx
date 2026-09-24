import React, { useState } from 'react';
import { LockKeyhole, LogIn, ShieldCheck, Wrench } from 'lucide-react';
import { authenticate } from '../services/operationsStorage';
import { AuthUser, UserRole } from '../types';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
  requestedRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, requestedRole = 'admin' }) => {
  const [accessType, setAccessType] = useState<UserRole>(requestedRole);
  const [email, setEmail] = useState(requestedRole === 'staff' ? 'derek@usaproplumbing.com' : 'admin@usaproplumbing.com');
  const [password, setPassword] = useState(requestedRole === 'staff' ? 'staff123' : 'admin123');
  const [error, setError] = useState('');

  const selectAccessType = (role: UserRole) => {
    setAccessType(role);
    setError('');
    if (role === 'owner') {
      setEmail('owner@usaproplumbing.com');
      setPassword('owner123');
    } else if (role === 'admin') {
      setEmail('admin@usaproplumbing.com');
      setPassword('admin123');
    } else {
      setEmail('derek@usaproplumbing.com');
      setPassword('staff123');
    }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = authenticate(email, password);
    if (!user) {
      setError('Invalid credentials or inactive staff account.');
      return;
    }
    onLogin(user);
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-(--color-navy) px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-orange) text-(--color-charcoal)">
            <Wrench className="h-6 w-6 -rotate-45" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-(--color-orange)">USA Pro Operations</p>
            <h1 className="text-2xl font-black text-(--color-navy)">Secure sign in</h1>
          </div>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-slate-600">
          Development login for dispatch administrators and assigned field staff.
        </p>

        <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
          {(['owner', 'admin', 'staff'] as UserRole[]).map(role => (
            <button key={role} type="button" onClick={() => selectAccessType(role)} className={`rounded-lg px-2 py-2 text-xs font-black capitalize ${accessType === role ? 'bg-(--color-navy) text-white' : 'text-slate-500 hover:text-slate-900'}`}>
              {role}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-bold text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />
          </label>
          <label className="block text-sm font-bold text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />
          </label>
          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--color-orange) px-4 py-3 font-black text-(--color-charcoal) transition hover:bg-(--color-orange-dark)">
            <LogIn className="h-4 w-4" />
            Sign in
          </button>
        </form>

        <div className="mt-6 grid gap-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
          <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-orange-500" /> Owner: owner@usaproplumbing.com / owner123</p>
          <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-blue-600" /> Admin: admin@usaproplumbing.com / admin123</p>
          <p className="flex items-center gap-2 font-semibold"><LockKeyhole className="h-4 w-4 text-emerald-600" /> Staff: derek@usaproplumbing.com / staff123</p>
        </div>
      </div>
    </main>
  );
};
