import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Download, 
  PlusCircle, 
  DollarSign, 
  UserCheck, 
  AlertCircle,
  Truck,
  Sparkles,
  Wrench
} from 'lucide-react';
import { BookingRequest, BookingStatus } from '../types';

interface AdminDashboardProps {
  bookings: BookingRequest[];
  onUpdateBookingStatus: (id: string, newStatus: BookingStatus, notes?: string, assignedTech?: string) => void;
  onAddNewLead: (lead: BookingRequest) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  onUpdateBookingStatus,
  onAddNewLead
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(
    bookings.length > 0 ? bookings[0] : null
  );

  // Status edit modal / notes
  const [editNotes, setEditNotes] = useState('');
  const [assignTech, setAssignTech] = useState('');

  // Metrics
  const totalLeads = bookings.length;
  const emergencyCount = bookings.filter(b => b.urgency === 'emergency').length;
  const newCount = bookings.filter(b => b.status === 'new').length;
  const dispatchedCount = bookings.filter(b => b.status === 'dispatched' || b.status === 'in_progress').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  // Filtered List
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : statusFilter === 'emergency' 
        ? b.urgency === 'emergency' 
        : b.status === statusFilter;

    const matchesSearch = searchQuery === '' ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleSelectBooking = (b: BookingRequest) => {
    setSelectedBooking(b);
    setEditNotes(b.notes || '');
    setAssignTech(b.assignedTechnician || 'Derek Morris (Tech #104)');
  };

  const handleStatusChange = (status: BookingStatus) => {
    if (!selectedBooking) return;
    onUpdateBookingStatus(selectedBooking.id, status, editNotes, assignTech);
    setSelectedBooking({
      ...selectedBooking,
      status,
      notes: editNotes,
      assignedTechnician: assignTech
    });
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Date', 'Customer', 'Phone', 'Address', 'Service', 'Urgency', 'Status', 'Cost'];
    const rows = bookings.map(b => [
      b.id,
      b.createdAt,
      `"${b.customerName}"`,
      b.phone,
      `"${b.address}, ${b.city} ${b.zip}"`,
      `"${b.serviceName}"`,
      b.urgency,
      b.status,
      `"${b.estimatedCost || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `usa_plumbing_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateMockLead = () => {
    const mockNames = ['David Miller', 'Jennifer Lopez', 'Brian O\'Connor', 'Samantha Ray', 'Austin Heights Cafe'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const mockLead: BookingRequest = {
      id: `USA-${Math.floor(2000 + Math.random() * 7000)}`,
      createdAt: 'Just now',
      customerName: randomName,
      phone: '(214) 555-0' + Math.floor(100 + Math.random() * 900),
      email: `${randomName.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`,
      address: `${Math.floor(100 + Math.random() * 9000)} Oak Ridge Dr`,
      city: 'Dallas',
      state: 'TX',
      zip: '75204',
      propertyType: 'residential',
      serviceId: 'drain-cleaning',
      serviceName: 'Hydro Jetting & Professional Drain Cleaning',
      urgency: Math.random() > 0.5 ? 'emergency' : 'same_day',
      preferredDate: 'Today',
      preferredTimeSlot: 'Immediate (Emergency)',
      description: 'Main sewer line bubbling and backing up into downstairs guest bath. Need urgent rooter clearing.',
      status: 'new',
      estimatedCost: '$250 - $480',
      notes: 'Logged via incoming dispatcher test'
    };
    onAddNewLead(mockLead);
    setSelectedBooking(mockLead);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded">
                Staff CRM
              </span>
              <span className="text-xs text-slate-400 font-mono">
                System Time: {new Date().toLocaleTimeString()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Dispatcher & Leads Command Portal
            </h1>
            <p className="text-xs text-slate-400">
              Live incoming customer appointments, emergency dispatch queue, and technician assignments.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCreateMockLead}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
              title="Simulate incoming customer web lead"
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Simulate Incoming Lead</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 my-8">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <div className="text-xs text-slate-400 font-semibold uppercase">Total Leads</div>
            <div className="text-2xl font-black text-white mt-1">{totalLeads}</div>
            <div className="text-[11px] text-slate-400">All channels</div>
          </div>

          <div className="bg-red-950/60 p-4 rounded-2xl border border-red-800/40">
            <div className="text-xs text-red-300 font-semibold uppercase flex items-center">
              <Flame className="w-3.5 h-3.5 mr-1 text-red-400" />
              Emergency 24/7
            </div>
            <div className="text-2xl font-black text-red-400 mt-1">{emergencyCount}</div>
            <div className="text-[11px] text-red-300">Requires rapid dispatch</div>
          </div>

          <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-800/40">
            <div className="text-xs text-amber-300 font-semibold uppercase">Unassigned (New)</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{newCount}</div>
            <div className="text-[11px] text-amber-300">Awaiting coordinator</div>
          </div>

          <div className="bg-blue-950/50 p-4 rounded-2xl border border-blue-800/40">
            <div className="text-xs text-blue-300 font-semibold uppercase">Active / En Route</div>
            <div className="text-2xl font-black text-blue-400 mt-1">{dispatchedCount}</div>
            <div className="text-[11px] text-blue-300">Vans rolling</div>
          </div>

          <div className="bg-emerald-950/50 p-4 rounded-2xl border border-emerald-800/40 col-span-2 sm:col-span-1">
            <div className="text-xs text-emerald-300 font-semibold uppercase">Completed</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{completedCount}</div>
            <div className="text-[11px] text-emerald-300">Billed & inspected</div>
          </div>
        </div>

        {/* Main 2-Column Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Leads Queue (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, phone, ZIP, or ticket ID..."
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-1.5 w-full sm:w-auto shrink-0 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'emergency', label: '🚨 Emergency' },
                  { id: 'new', label: 'New' },
                  { id: 'dispatched', label: 'Dispatched' },
                  { id: 'completed', label: 'Done' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      statusFilter === f.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table / Cards List */}
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  No service requests match the current filters.
                </div>
              ) : (
                filteredBookings.map((b) => {
                  const isSelected = selectedBooking?.id === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => handleSelectBooking(b)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                          : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-extrabold text-blue-400">
                              {b.id}
                            </span>
                            <span className="text-xs text-slate-400">• {b.createdAt}</span>
                            {b.urgency === 'emergency' && (
                              <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.2 rounded-full emergency-glow">
                                Emergency
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm font-bold text-white mt-1">
                            {b.customerName}
                          </h3>
                          <div className="text-xs text-slate-300 flex items-center space-x-2 mt-0.5">
                            <span>{b.phone}</span>
                            <span>•</span>
                            <span>{b.city}, {b.zip}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="text-right">
                          <span className={`inline-block text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            b.status === 'completed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                              : b.status === 'in_progress' || b.status === 'dispatched'
                                ? 'bg-blue-950 text-blue-400 border border-blue-800/60'
                                : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                          }`}>
                            {b.status.replace('_', ' ')}
                          </span>
                          <div className="text-xs font-extrabold text-emerald-400 mt-1">
                            {b.estimatedCost}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                        <span className="truncate max-w-xs">{b.serviceName}</span>
                        <span className="text-[11px] text-blue-400 font-medium">Click to manage →</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right: Selected Lead Details & Dispatch Action Panel (5 cols) */}
          <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700 rounded-3xl p-6 shadow-xl space-y-6">
            {selectedBooking ? (
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-700">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-400">
                      Ticket #{selectedBooking.id}
                    </span>
                    <h3 className="text-xl font-black text-white mt-0.5">
                      {selectedBooking.customerName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Logged: {selectedBooking.createdAt}
                    </p>
                  </div>

                  <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                    selectedBooking.urgency === 'emergency' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-blue-950 text-blue-300 border border-blue-700'
                  }`}>
                    {selectedBooking.urgency}
                  </span>
                </div>

                {/* Direct Contacts */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={`tel:${selectedBooking.phone.replace(/\D/g, '')}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Customer</span>
                  </a>

                  <a
                    href={`sms:${selectedBooking.phone.replace(/\D/g, '')}`}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send SMS ETA</span>
                  </a>
                </div>

                {/* Address & Service Details */}
                <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-700/80 space-y-2 text-xs">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Service Location:</strong>
                      <div className="text-slate-300">
                        {selectedBooking.address}, {selectedBooking.city}, {selectedBooking.state} {selectedBooking.zip}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2 border-t border-slate-800">
                    <Wrench className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Service Requested:</strong>
                      <div className="text-slate-300">{selectedBooking.serviceName}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Schedule: {selectedBooking.preferredDate} ({selectedBooking.preferredTimeSlot})
                      </div>
                    </div>
                  </div>

                  {selectedBooking.description && (
                    <div className="pt-2 border-t border-slate-800">
                      <strong className="text-white">Customer Notes:</strong>
                      <p className="text-slate-300 italic mt-0.5">"{selectedBooking.description}"</p>
                    </div>
                  )}

                  {selectedBooking.photoUrl && (
                    <div className="pt-2 border-t border-slate-800">
                      <strong className="text-white block mb-1">Attached Photo:</strong>
                      <img 
                        src={selectedBooking.photoUrl} 
                        alt="Customer upload" 
                        className="w-full h-32 object-cover rounded-xl border border-slate-700"
                      />
                    </div>
                  )}
                </div>

                {/* Dispatcher Actions */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Update Dispatch Status:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {(['new', 'dispatched', 'in_progress', 'completed'] as BookingStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors capitalize ${
                          selectedBooking.status === st
                            ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assign Technician */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Assigned Master Technician:
                  </label>
                  <select
                    value={assignTech}
                    onChange={(e) => setAssignTech(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs p-2.5 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Derek Morris (Tech #104)">Derek Morris (Tech #104) — Master Plumber</option>
                    <option value="Carlos Mendez (Tech #112)">Carlos Mendez (Tech #112) — Sewer & Hydro Jet Specialist</option>
                    <option value="Jack Callahan (Tech #101)">Jack Callahan (Tech #101) — Water Heater & Repipe Lead</option>
                    <option value="Samuel Washington (Tech #109)">Samuel Washington (Tech #109) — Commercial Tech</option>
                  </select>
                </div>

                {/* Private Internal Notes */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Internal Dispatch Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Enter technician diagnostic notes, gate codes, or invoice quote..."
                    className="w-full bg-slate-900 border border-slate-700 text-xs p-2.5 rounded-xl text-white focus:outline-none"
                  ></textarea>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.status)}
                    className="mt-2 w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Save Notes & Assignment
                  </button>
                </div>

              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 text-xs">
                Select a lead from the queue on the left to view customer contact info, photos, and dispatch options.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
