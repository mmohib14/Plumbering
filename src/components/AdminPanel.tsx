import React, { useState } from 'react';
import { AdminMember } from '../types';

interface AdminPanelProps {
  admins: AdminMember[];
  open: boolean;
  onOpen: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onUpdate: (id: string, changes: Partial<AdminMember>) => void;
  onRemove: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ admins, open, onOpen, onSubmit, onUpdate, onRemove }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  return <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-black text-white">Admin accounts</h2>
        <p className="mt-1 text-xs text-slate-500">Owner-only access. Admins can operate the console but cannot manage other admins.</p>
      </div>
      <button onClick={onOpen} className="rounded-xl bg-(--color-orange) px-3 py-2 text-xs font-black text-slate-950">Add admin</button>
    </div>
    {open && (
      <form onSubmit={onSubmit} className="mt-4 grid gap-2 rounded-2xl bg-slate-950 p-4 sm:grid-cols-3">
        <input name="fullName" placeholder="Full name" required className="field" />
        <input name="email" type="email" placeholder="Email" required className="field" />
        <input name="phone" placeholder="Phone" required className="field" />
        <input name="password" placeholder="Temporary password" required className="field" />
        <button className="rounded-xl bg-(--color-orange) px-3 py-2 text-sm font-black text-slate-950 sm:col-span-3">Create admin account</button>
      </form>
    )}
    <div className="mt-4 space-y-2">
      {admins.map(admin => (
        <div key={admin.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3">
          {editingId === admin.id ? <div className="grid gap-2 sm:grid-cols-3"><input value={editName} onChange={event => setEditName(event.target.value)} className="field" /><input value={editEmail} onChange={event => setEditEmail(event.target.value)} className="field" /><input value={editPhone} onChange={event => setEditPhone(event.target.value)} className="field" /><div className="flex gap-2 sm:col-span-3"><button onClick={() => { onUpdate(admin.id, { fullName: editName, email: editEmail, phone: editPhone }); setEditingId(null); }} className="rounded-lg bg-(--color-orange) px-3 py-1.5 text-xs font-black text-slate-950">Save</button><button onClick={() => setEditingId(null)} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold">Cancel</button></div></div> : <div className="flex flex-wrap items-center justify-between gap-3"><div><b className="text-sm text-white">{admin.fullName}</b><span className="ml-2 text-xs text-slate-500">{admin.id} · {admin.email} · {admin.phone || 'No phone'}</span><span className={`ml-2 text-xs font-bold ${admin.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>{admin.status}</span><span className="block text-[11px] text-slate-600">Created {new Date(admin.createdAt).toLocaleDateString()}</span></div><div className="flex gap-2"><button onClick={() => { setEditingId(admin.id); setEditName(admin.fullName); setEditEmail(admin.email); setEditPhone(admin.phone || ''); }} className="text-xs font-bold text-sky-300">Edit</button><button onClick={() => onUpdate(admin.id, { status: admin.status === 'active' ? 'inactive' : 'active' })} className="text-xs font-bold text-amber-300">{admin.status === 'active' ? 'Deactivate' : 'Activate'}</button><button onClick={() => onRemove(admin.id)} disabled={admins.length === 1} className="text-xs font-bold text-orange-300 disabled:cursor-not-allowed disabled:opacity-40">Remove</button></div></div>}
        </div>
      ))}
    </div>
  </section>;
};
