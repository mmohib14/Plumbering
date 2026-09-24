import React, { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardList, LogOut, Plus, Search, ShieldCheck, UserPlus, Users, X } from 'lucide-react';
import { AdminMember, BookingRequest, Complaint, ComplaintStatus, AuthUser, Customer, StaffMember } from '../types';
import { operationsStorage } from '../services/operationsStorage';
import { AdminPanel } from './AdminPanel';

interface OperationsDashboardProps {
  currentUser: AuthUser;
  bookings: BookingRequest[];
  onLogout: () => void;
}

type View = 'overview' | 'complaints' | 'staff' | 'admins' | 'customers' | 'categories';

const statusLabels: Record<ComplaintStatus, string> = {
  pending: 'Pending', assigned: 'Assigned', in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled'
};

export const OperationsDashboard: React.FC<OperationsDashboardProps> = ({ currentUser, bookings, onLogout }) => {
  operationsStorage.ensureSeeded(bookings);
  const [view, setView] = useState<View>('overview');
  const [staff, setStaff] = useState<StaffMember[]>(operationsStorage.getStaff());
    const [admins, setAdmins] = useState<AdminMember[]>(operationsStorage.getAdmins());
  const [customers, setCustomers] = useState<Customer[]>(operationsStorage.getCustomers());
  const [complaints, setComplaints] = useState<Complaint[]>(operationsStorage.getComplaints());
  const [categories, setCategories] = useState<string[]>(operationsStorage.getCategories());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [staffFormOpen, setStaffFormOpen] = useState(false);
    const [adminFormOpen, setAdminFormOpen] = useState(false);
  const [customerFormOpen, setCustomerFormOpen] = useState(false);
  const [complaintFormOpen, setComplaintFormOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const refresh = () => {
    setStaff(operationsStorage.getStaff());
    setCustomers(operationsStorage.getCustomers());
    setComplaints(operationsStorage.getComplaints());
  };

  const ownComplaints = currentUser.role === 'staff'
    ? complaints.filter(complaint => complaint.assignedStaffId === currentUser.id)
    : complaints;
  const visibleComplaints = useMemo(() => ownComplaints.filter(complaint => {
    const haystack = `${complaint.id} ${complaint.customerName} ${complaint.customerPhone} ${complaint.assignedStaffName || ''}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) &&
      (statusFilter === 'all' || complaint.status === statusFilter) &&
      (categoryFilter === 'all' || complaint.serviceCategory === categoryFilter) &&
      (priorityFilter === 'all' || complaint.priority === priorityFilter);
  }), [ownComplaints, query, statusFilter, categoryFilter, priorityFilter]);

  const stats = {
    customers: customers.length,
    complaints: ownComplaints.length,
    pending: ownComplaints.filter(item => item.status === 'pending').length,
    assigned: ownComplaints.filter(item => item.status === 'assigned').length,
    inProgress: ownComplaints.filter(item => item.status === 'in_progress').length,
    completed: ownComplaints.filter(item => item.status === 'completed').length,
    cancelled: ownComplaints.filter(item => item.status === 'cancelled').length,
    activeStaff: staff.filter(item => item.status === 'active').length,
    inactiveStaff: staff.filter(item => item.status === 'inactive').length
  };

  const updateComplaint = (id: string, changes: Partial<Complaint>) => {
    const target = complaints.find(item => item.id === id);
    if (!target || (currentUser.role === 'staff' && target.assignedStaffId !== currentUser.id)) {
      setNotice('You are not allowed to update this complaint.');
      return;
    }
    const updated = complaints.map(item => item.id === id ? { ...item, ...changes } : item);
    operationsStorage.saveComplaints(updated);
    setComplaints(updated);
    setNotice('Complaint updated successfully.');
  };

  const assignComplaint = (complaint: Complaint, staffId: string) => {
    const assignee = staff.find(item => item.id === staffId && item.status === 'active');
    if (!assignee) {
      setNotice('Only active staff can receive new assignments.');
      return;
    }
    updateComplaint(complaint.id, {
      assignedStaffId: assignee.id,
      assignedStaffName: assignee.fullName,
      assignedAt: new Date().toISOString(),
      status: 'assigned'
    });
  };

  const addStaff = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    if (staff.some(member => member.email.toLowerCase() === email.toLowerCase())) {
      setNotice('A staff member with that email already exists.');
      return;
    }
    const member: StaffMember = {
      id: `STAFF-${String(staff.length + 1).padStart(3, '0')}`,
      fullName: String(form.get('fullName') || '').trim(),
      email,
      phone: String(form.get('phone') || '').trim(),
      password: String(form.get('password') || '').trim(),
      role: 'staff',
      field: String(form.get('field') || 'General Maintenance'),
      status: 'active',
      createdAt: new Date().toISOString()
    };
    const next = [...staff, member];
    operationsStorage.saveStaff(next);
    setStaff(next);
    setStaffFormOpen(false);
    setNotice(`${member.fullName} was added as ${member.field}.`);
    event.currentTarget.reset();
  };

  const addAdmin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const member: AdminMember = {
      id: `ADMIN-${String(admins.length + 1).padStart(3, '0')}`,
      fullName: String(form.get('fullName') || '').trim(),
      email: String(form.get('email') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      password: String(form.get('password') || '').trim(),
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString()
    };
    const next = [...admins, member];
    operationsStorage.saveAdmins(next);
    setAdmins(next);
    setAdminFormOpen(false);
    setNotice(`${member.fullName} can now sign in as an admin.`);
    event.currentTarget.reset();
  };

  const updateAdmin = (id: string, changes: Partial<AdminMember>) => {
    if (currentUser.role !== 'owner') {
      setNotice('Only the Owner can modify Admin accounts.');
      return;
    }
    const next = admins.map(admin => admin.id === id ? { ...admin, ...changes } : admin);
    operationsStorage.saveAdmins(next);
    setAdmins(next);
    setNotice('Admin account updated.');
  };

  const addCustomer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const customer: Customer = {
      id: `CUS-${String(customers.length + 1).padStart(4, '0')}`,
      name: String(form.get('name') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      email: String(form.get('email') || '').trim(),
      address: String(form.get('address') || '').trim(),
      createdAt: new Date().toISOString()
    };
    const next = [...customers, customer];
    operationsStorage.saveCustomers(next);
    setCustomers(next);
    setCustomerFormOpen(false);
    setNotice(`${customer.name} was added.`);
    event.currentTarget.reset();
  };

  const addComplaint = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const complaint: Complaint = {
      id: `CMP-${Date.now().toString().slice(-7)}`,
      customerId: String(form.get('customerId') || `CUS-${Date.now().toString().slice(-6)}`),
      customerName: String(form.get('customerName') || '').trim(),
      customerPhone: String(form.get('customerPhone') || '').trim(),
      customerAddress: String(form.get('customerAddress') || '').trim(),
      serviceCategory: String(form.get('serviceCategory') || '').trim(),
      description: String(form.get('description') || '').trim(),
      priority: String(form.get('priority') || 'medium') as Complaint['priority'],
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const next = [complaint, ...complaints];
    operationsStorage.saveComplaints(next);
    setComplaints(next);
    setComplaintFormOpen(false);
    setSelectedId(complaint.id);
    setNotice(`${complaint.id} was created and is ready for assignment.`);
    event.currentTarget.reset();
  };

  const addCategory = (event: React.FormEvent) => {
    event.preventDefault();
    const value = newCategory.trim();
    if (!value || categories.some(category => category.toLowerCase() === value.toLowerCase())) return;
    const next = [...categories, value];
    operationsStorage.saveCategories(next);
    setCategories(next);
    setNewCategory('');
  };

  const selectedComplaint = complaints.find(item => item.id === selectedId);
  const navItems: { id: View; label: string }[] = currentUser.role !== 'staff'
    ? [{ id: 'overview', label: 'Overview' }, { id: 'complaints', label: 'Complaints' }, { id: 'staff', label: 'Staff' }, ...(currentUser.role === 'owner' ? [{ id: 'admins' as View, label: 'Admins' }] : []), { id: 'customers', label: 'Customers' }, { id: 'categories', label: 'Categories' }]
    : [{ id: 'overview', label: 'My Dashboard' }, { id: 'complaints', label: 'My Jobs' }];
  const metricCards: [string, number][] = [
    ...(currentUser.role === 'owner' ? [['Admins', admins.length], ['Active Admins', admins.filter(admin => admin.status === 'active').length], ['Inactive Admins', admins.filter(admin => admin.status === 'inactive').length] as [string, number]] : []),
    ['Customers', stats.customers], ['Jobs', stats.complaints], ['Pending', stats.pending], ['Assigned', stats.assigned],
    ['In Progress', stats.inProgress], ['Completed', stats.completed], ['Cancelled', stats.cancelled], ['Active Staff', stats.activeStaff], ['Inactive Staff', stats.inactiveStaff]
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-400">
              <ShieldCheck className="h-4 w-4" /> {currentUser.role !== 'staff' ? 'Admin Operations' : `${currentUser.field || 'Staff'} Workspace`}
            </div>
            <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">{currentUser.role !== 'staff' ? 'Service Command Center' : `Welcome, ${currentUser.name}`}</h1>
            <p className="mt-1 text-sm text-slate-400">Local development operations console with role-based access.</p>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </header>

        <nav className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {navItems.map(item => <button key={item.id} onClick={() => setView(item.id)} className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold ${view === item.id ? 'bg-(--color-orange) text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}>{item.label}</button>)}
        </nav>

        {notice && <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-800 bg-emerald-950/50 px-3 py-2 text-sm text-emerald-300"><span>{notice}</span><button onClick={() => setNotice('')}><X className="h-4 w-4" /></button></div>}

        <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
          {metricCards.map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 text-2xl font-black text-white">{value}</p></div>)}
        </section>

        {view === 'overview' && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-lg font-black text-white">{currentUser.role !== 'staff' ? 'Latest complaints' : 'My latest jobs'}</h2>
              <div className="mt-4 space-y-2">{ownComplaints.slice(0, 6).map(item => <button key={item.id} onClick={() => { setSelectedId(item.id); setView('complaints'); }} className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 text-left hover:border-sky-700"><span><span className="block text-xs font-bold text-sky-400">{item.id}</span><span className="block text-sm font-bold text-white">{item.customerName}</span></span><span className="text-xs text-slate-400">{statusLabels[item.status]}</span></button>)}{ownComplaints.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No complaints assigned yet.</p>}</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-lg font-black text-white">Quick actions</h2><div className="mt-4 grid gap-2">{currentUser.role === 'admin' && <><button onClick={() => { setView('staff'); setStaffFormOpen(true); }} className="rounded-xl bg-slate-800 px-3 py-3 text-left text-sm font-bold hover:bg-slate-700"><UserPlus className="mr-2 inline h-4 w-4 text-sky-400" /> Add staff member</button><button onClick={() => { setView('customers'); setCustomerFormOpen(true); }} className="rounded-xl bg-slate-800 px-3 py-3 text-left text-sm font-bold hover:bg-slate-700"><Users className="mr-2 inline h-4 w-4 text-emerald-400" /> Add customer</button></>}<button onClick={() => setView('complaints')} className="rounded-xl bg-slate-800 px-3 py-3 text-left text-sm font-bold hover:bg-slate-700"><ClipboardList className="mr-2 inline h-4 w-4 text-orange-400" /> Open complaints</button></div></div>
          </section>
        )}

        {view === 'complaints' && currentUser.role === 'owner' && <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4"><button onClick={() => setComplaintFormOpen(!complaintFormOpen)} className="rounded-xl bg-(--color-orange) px-3 py-2 text-xs font-black text-slate-950"><Plus className="mr-1 inline h-4 w-4" /> New complaint</button>{complaintFormOpen && <form onSubmit={addComplaint} className="mt-3 grid gap-2 sm:grid-cols-2"><input name="customerName" placeholder="Customer name" required className="field" /><input name="customerPhone" placeholder="Customer phone" required className="field" /><input name="customerAddress" placeholder="Service address" required className="field sm:col-span-2" /><input name="serviceCategory" placeholder="Service category" required className="field" /><select name="priority" className="field"><option value="low">Low priority</option><option value="medium">Medium priority</option><option value="high">High priority</option><option value="urgent">Urgent priority</option></select><textarea name="description" placeholder="Complaint description" required className="field min-h-20 sm:col-span-2" /><button className="rounded-xl bg-(--color-orange) px-3 py-2 text-sm font-black text-slate-950 sm:col-span-2">Create complaint</button></form>}</div>}

        {(view === 'complaints') && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              {currentUser.role === 'admin' && <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-black text-white">Complaint queue</h2><button onClick={() => setComplaintFormOpen(!complaintFormOpen)} className="rounded-xl bg-(--color-orange) px-3 py-2 text-xs font-black text-slate-950"><Plus className="mr-1 inline h-4 w-4" /> New complaint</button></div>}
              {complaintFormOpen && currentUser.role === 'admin' && <form onSubmit={addComplaint} className="mb-4 grid gap-2 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:grid-cols-2"><input name="customerName" placeholder="Customer name" required className="field" /><input name="customerPhone" placeholder="Customer phone" required className="field" /><input name="customerAddress" placeholder="Service address" required className="field sm:col-span-2" /><input name="serviceCategory" placeholder="Service category" required className="field" /><select name="priority" className="field"><option value="low">Low priority</option><option value="medium">Medium priority</option><option value="high">High priority</option><option value="urgent">Urgent priority</option></select><textarea name="description" placeholder="Complaint or job description" required className="field min-h-20 sm:col-span-2" /><button className="rounded-xl bg-(--color-orange) px-3 py-2 text-sm font-black text-slate-950 sm:col-span-2">Create complaint</button></form>}
              <div className="flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search ID, customer, phone, staff" className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-sky-600" /></label><select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white"><option value="all">All statuses</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><select value={priorityFilter} onChange={event => setPriorityFilter(event.target.value)} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white"><option value="all">All priorities</option>{['low', 'medium', 'high', 'urgent'].map(value => <option key={value} value={value}>{value}</option>)}</select></div>
              <select value={categoryFilter} onChange={event => setCategoryFilter(event.target.value)} className="mt-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white"><option value="all">All categories</option>{categories.map(category => <option key={category} value={category}>{category}</option>)}</select>
              <div className="mt-3 space-y-2">{visibleComplaints.map(item => <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full rounded-2xl border p-4 text-left ${selectedId === item.id ? 'border-sky-500 bg-slate-800' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}><div className="flex justify-between gap-3"><span><span className="block text-xs font-bold text-sky-400">{item.id}</span><span className="block text-sm font-bold text-white">{item.customerName}</span></span><span className="text-xs font-bold text-orange-300">{statusLabels[item.status]}</span></div><p className="mt-2 truncate text-xs text-slate-400">{item.description}</p><p className="mt-2 text-[11px] text-slate-500">{item.assignedStaffName || 'Unassigned'} · {item.serviceCategory}</p></button>)}{visibleComplaints.length === 0 && <div className="rounded-2xl border border-dashed border-slate-800 py-12 text-center text-sm text-slate-500">No matching complaints.</div>}</div>
            </div>
            <ComplaintPanel complaint={selectedComplaint} currentUser={currentUser} staff={staff} onAssign={assignComplaint} onUpdate={updateComplaint} />
          </section>
        )}

        {view === 'staff' && currentUser.role !== 'staff' && <StaffPanel staff={staff} categories={categories} open={staffFormOpen} onOpen={() => setStaffFormOpen(true)} onSubmit={addStaff} canRemove={currentUser.role === 'owner'} onEdit={(id) => { const member = staff.find(item => item.id === id); if (!member) return; const name = window.prompt('Staff full name', member.fullName); const phone = window.prompt('Staff phone', member.phone); if (!name || !phone) return; const next = staff.map(item => item.id === id ? { ...item, fullName: name, phone } : item); operationsStorage.saveStaff(next); setStaff(next); setNotice('Staff account updated.'); }} onToggle={(id) => { const next = staff.map(member => member.id === id ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' } : member); operationsStorage.saveStaff(next); setStaff(next); }} onRemove={(id) => { if (currentUser.role !== 'owner') return; const next = staff.filter(member => member.id !== id); operationsStorage.saveStaff(next); setStaff(next); setNotice('Staff account removed. Operational records were preserved.'); }} />}
        {view === 'admins' && currentUser.role === 'owner' && <AdminPanel admins={admins} open={adminFormOpen} onOpen={() => setAdminFormOpen(true)} onSubmit={addAdmin} onUpdate={updateAdmin} onRemove={(id) => { const next = admins.filter(member => member.id !== id); operationsStorage.saveAdmins(next); setAdmins(next); }} />}
        {view === 'customers' && currentUser.role === 'admin' && <CustomerPanel customers={customers} open={customerFormOpen} onOpen={() => setCustomerFormOpen(true)} onSubmit={addCustomer} />}
        {view === 'categories' && currentUser.role === 'admin' && <section className="mt-6 max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-lg font-black">Service categories</h2><form onSubmit={addCategory} className="mt-4 flex gap-2"><input value={newCategory} onChange={event => setNewCategory(event.target.value)} placeholder="Add category" className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm" /><button className="rounded-xl bg-(--color-orange) px-4 py-2 text-sm font-black text-slate-950"><Plus className="inline h-4 w-4" /> Add</button></form><div className="mt-4 flex flex-wrap gap-2">{categories.map(category => <span key={category} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">{category}</span>)}</div></section>}
        {view === 'customers' && currentUser.role === 'owner' && <CustomerPanel customers={customers} open={customerFormOpen} onOpen={() => setCustomerFormOpen(true)} onSubmit={addCustomer} />}
        {view === 'categories' && currentUser.role === 'owner' && <section className="mt-6 max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-lg font-black">Service categories</h2><form onSubmit={addCategory} className="mt-4 flex gap-2"><input value={newCategory} onChange={event => setNewCategory(event.target.value)} placeholder="Add category" className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm" /><button className="rounded-xl bg-(--color-orange) px-4 py-2 text-sm font-black text-slate-950"><Plus className="inline h-4 w-4" /> Add</button></form><div className="mt-4 flex flex-wrap gap-2">{categories.map(category => <span key={category} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">{category}</span>)}</div></section>}
      </div>
    </main>
  );
};

interface ComplaintPanelProps { complaint?: Complaint; currentUser: AuthUser; staff: StaffMember[]; onAssign: (complaint: Complaint, staffId: string) => void; onUpdate: (id: string, changes: Partial<Complaint>) => void; }
const ComplaintPanel: React.FC<ComplaintPanelProps> = ({ complaint, currentUser, staff, onAssign, onUpdate }) => {
  const [notes, setNotes] = useState(complaint?.staffNotes || '');
  if (!complaint) return <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center text-sm text-slate-500">Select a complaint to view details.</div>;
  const canEdit = currentUser.role === 'admin' || complaint.assignedStaffId === currentUser.id;
  return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex justify-between"><div><p className="text-xs font-bold text-sky-400">{complaint.id}</p><h2 className="text-xl font-black text-white">{complaint.customerName}</h2></div><span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-bold text-orange-300">{statusLabels[complaint.status]}</span></div><div className="mt-4 space-y-3 rounded-2xl bg-slate-950 p-4 text-sm"><p><b className="text-slate-400">Phone:</b> {complaint.customerPhone}</p><p><b className="text-slate-400">Address:</b> {complaint.customerAddress}</p><p><b className="text-slate-400">Category:</b> {complaint.serviceCategory}</p><p><b className="text-slate-400">Priority:</b> {complaint.priority}</p><p><b className="text-slate-400">Description:</b> {complaint.description}</p></div>{canEdit && <div className="mt-4 space-y-3">{currentUser.role === 'admin' && <select value={complaint.assignedStaffId || ''} onChange={event => onAssign(complaint, event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"><option value="">Assign active staff</option>{staff.filter(member => member.status === 'active').map(member => <option key={member.id} value={member.id}>{member.fullName} · {member.field}</option>)}</select>}<select value={complaint.status} onChange={event => onUpdate(complaint.id, { status: event.target.value as ComplaintStatus, completedAt: event.target.value === 'completed' ? new Date().toISOString() : complaint.completedAt })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"><option value="pending">Pending</option><option value="assigned">Assigned</option><option value="in_progress">In Progress</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select><textarea value={notes} onChange={event => setNotes(event.target.value)} placeholder="Work notes" className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm" /><button onClick={() => onUpdate(complaint.id, { staffNotes: notes })} className="w-full rounded-xl bg-(--color-orange) px-3 py-2 text-sm font-black text-slate-950">Save work notes</button></div>}</div>;
};

interface StaffPanelProps { staff: StaffMember[]; categories: string[]; open: boolean; onOpen: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; onEdit: (id: string) => void; onToggle: (id: string) => void; canRemove: boolean; onRemove: (id: string) => void; }
const StaffPanel: React.FC<StaffPanelProps> = ({ staff, categories, open, onOpen, onSubmit, onEdit, onToggle, canRemove, onRemove }) => <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-black">Staff management</h2><button onClick={onOpen} className="rounded-xl bg-(--color-orange) px-3 py-2 text-xs font-black text-slate-950"><UserPlus className="mr-1 inline h-4 w-4" /> Add staff</button></div>{open && <form onSubmit={onSubmit} className="mt-4 grid gap-2 rounded-2xl bg-slate-950 p-4 sm:grid-cols-2"><input name="fullName" placeholder="Full name" required className="field" /><input name="email" type="email" placeholder="Email" required className="field" /><input name="phone" placeholder="Phone" required className="field" /><input name="password" placeholder="Temporary password" required className="field" /><select name="field" className="field sm:col-span-2">{categories.map(category => <option key={category}>{category}</option>)}</select><button className="rounded-xl bg-(--color-orange) px-3 py-2 text-sm font-black text-slate-950 sm:col-span-2">Create staff account</button></form>}<div className="mt-4 overflow-x-auto"><table className="w-full min-w-155 text-left text-sm"><thead className="text-xs uppercase text-slate-500"><tr><th className="p-2">Staff</th><th className="p-2">Field</th><th className="p-2">Status</th><th className="p-2">Action</th></tr></thead><tbody>{staff.map(member => <tr key={member.id} className="border-t border-slate-800"><td className="p-2"><b>{member.fullName}</b><span className="block text-xs text-slate-500">{member.id} · {member.email}</span></td><td className="p-2">{member.field}</td><td className="p-2">{member.status}</td><td className="flex gap-2 p-2"><button onClick={() => onEdit(member.id)} className="text-xs font-bold text-sky-300">Edit</button><button onClick={() => onToggle(member.id)} className="text-xs font-bold text-orange-300">{member.status === 'active' ? 'Deactivate' : 'Activate'}</button>{canRemove && <button onClick={() => onRemove(member.id)} className="text-xs font-bold text-red-300">Remove</button>}</td></tr>)}</tbody></table></div></section>;

interface CustomerPanelProps { customers: Customer[]; open: boolean; onOpen: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; }
const CustomerPanel: React.FC<CustomerPanelProps> = ({ customers, open, onOpen, onSubmit }) => <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-black">Customers</h2><button onClick={onOpen} className="rounded-xl bg-(--color-orange) px-3 py-2 text-xs font-black text-slate-950"><Plus className="mr-1 inline h-4 w-4" /> Add customer</button></div>{open && <form onSubmit={onSubmit} className="mt-4 grid gap-2 rounded-2xl bg-slate-950 p-4 sm:grid-cols-2"><input name="name" placeholder="Name" required className="field" /><input name="phone" placeholder="Phone" required className="field" /><input name="email" type="email" placeholder="Email" className="field" /><input name="address" placeholder="Address" required className="field" /><button className="rounded-xl bg-(--color-orange) px-3 py-2 text-sm font-black text-slate-950 sm:col-span-2">Save customer</button></form>}<div className="mt-4 space-y-2">{customers.map(customer => <div key={customer.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm"><b>{customer.name}</b><span className="ml-2 text-xs text-slate-500">{customer.id}</span><p className="mt-1 text-xs text-slate-400">{customer.phone} · {customer.email} · {customer.address}</p></div>)}{customers.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No customers created yet.</p>}</div></section>;
