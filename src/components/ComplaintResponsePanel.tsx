import React, { useEffect, useState } from 'react';
import { AuthUser, Complaint, ComplaintStatus, StaffMember } from '../types';

const CUSTOMER_REPLY_WEBHOOK = 'http://localhost:5678/webhook-test/usa-pro-plumbing-customer-reply';

const statusLabels: Record<ComplaintStatus, string> = {
  pending: 'Pending',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

interface ComplaintResponsePanelProps {
  complaint?: Complaint;
  currentUser: AuthUser;
  staff: StaffMember[];
  staffPhone: string;
  onAssign: (complaint: Complaint, staffId: string) => void;
  onUpdate: (id: string, changes: Partial<Complaint>) => void;
}

export const ComplaintResponsePanel: React.FC<ComplaintResponsePanelProps> = ({
  complaint,
  currentUser,
  staff,
  staffPhone,
  onAssign,
  onUpdate
}) => {
  const [reply, setReply] = useState(complaint?.customerReply || '');
  const [notes, setNotes] = useState(complaint?.staffNotes || '');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replyError, setReplyError] = useState('');

  useEffect(() => {
    setReply(complaint?.customerReply || '');
    setNotes(complaint?.staffNotes || '');
  }, [complaint?.id, complaint?.customerReply, complaint?.staffNotes]);

  if (!complaint) {
    return <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center text-sm text-slate-500">Select a complaint to view details.</div>;
  }

  const canEdit = currentUser.role !== 'staff' || complaint.assignedStaffId === currentUser.id;
  const submitReply = async () => {
    const message = reply.trim();
    if (!message || complaint.customerReply || !canEdit) return;
    setIsSendingReply(true);
    setReplyError('');
    try {
      const response = await fetch(CUSTOMER_REPLY_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: complaint.customerName,
          customer_email: complaint.customerEmail || '',
          customer_phone: complaint.customerPhone,
          customer_message: complaint.description,
          staff_name: currentUser.name,
          staff_phone: staffPhone,
          staff_reply: message
        })
      });
      if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
      onUpdate(complaint.id, {
        customerReply: message,
        repliedBy: `${currentUser.name} (${currentUser.role})`,
        repliedAt: new Date().toISOString()
      });
      setReply('');
    } catch {
      setReplyError('Reply was not sent. Check that the n8n test workflow is running, then try again.');
    } finally {
      setIsSendingReply(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-sky-400">{complaint.id}</p>
          <h2 className="text-xl font-black text-white">{complaint.customerName}</h2>
        </div>
        <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-bold text-orange-300">{statusLabels[complaint.status]}</span>
      </div>

      <div className="mt-4 space-y-3 rounded-2xl bg-slate-950 p-4 text-sm">
        <p><b className="text-slate-400">Phone:</b> {complaint.customerPhone}</p>
        <p><b className="text-slate-400">Address:</b> {complaint.customerAddress}</p>
        <p><b className="text-slate-400">Category:</b> {complaint.serviceCategory}</p>
        <p><b className="text-slate-400">Priority:</b> {complaint.priority}</p>
        <p><b className="text-slate-400">Description:</b> {complaint.description}</p>
      </div>

      {complaint.customerReply ? (
        <div className="mt-4 rounded-2xl border border-emerald-800 bg-emerald-950/40 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Customer reply sent</p>
          <p className="mt-2 text-sm text-emerald-50">{complaint.customerReply}</p>
          <p className="mt-2 text-xs text-emerald-400">{complaint.repliedBy}{complaint.repliedAt ? ` · ${new Date(complaint.repliedAt).toLocaleString()}` : ''}</p>
        </div>
      ) : canEdit ? (
        <div className="mt-4 rounded-2xl border border-sky-800 bg-sky-950/30 p-4">
          <p className="text-sm font-black text-white">Reply to customer</p>
          <p className="mt-1 text-xs text-slate-400">The first reply is shared with the owner, admin, and assigned staff.</p>
          <textarea value={reply} onChange={event => setReply(event.target.value)} placeholder="Write a reply to the customer" className="mt-3 min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
          {replyError && <p className="mt-2 text-xs font-bold text-red-300">{replyError}</p>}
          <button onClick={submitReply} disabled={!reply.trim() || isSendingReply} className="mt-2 w-full rounded-xl bg-(--color-orange) px-3 py-2 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">{isSendingReply ? 'Sending reply...' : 'Send reply'}</button>
        </div>
      ) : null}

      {canEdit && (
        <div className="mt-4 space-y-3">
          {currentUser.role !== 'staff' && <select value={complaint.assignedStaffId || ''} onChange={event => onAssign(complaint, event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option value="">Assign active staff</option>{staff.filter(member => member.status === 'active').map(member => <option key={member.id} value={member.id}>{member.fullName} · {member.field}</option>)}</select>}
          <select value={complaint.status} onChange={event => onUpdate(complaint.id, { status: event.target.value as ComplaintStatus, completedAt: event.target.value === 'completed' ? new Date().toISOString() : complaint.completedAt })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option value="pending">Pending</option><option value="assigned">Assigned</option><option value="in_progress">In Progress</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
          <textarea value={notes} onChange={event => setNotes(event.target.value)} placeholder="Internal work notes" className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
          <button onClick={() => onUpdate(complaint.id, { staffNotes: notes })} className="w-full rounded-xl bg-slate-700 px-3 py-2 text-sm font-black text-white">Save work notes</button>
        </div>
      )}
    </div>
  );
};
