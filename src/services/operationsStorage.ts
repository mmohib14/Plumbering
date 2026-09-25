import { AdminMember, BookingRequest, AuthUser, Complaint, Customer, StaffMember } from '../types';

const KEYS = {
  users: 'usa_plumbing_staff',
  admins: 'usa_plumbing_admins',
  customers: 'usa_plumbing_customers',
  complaints: 'usa_plumbing_complaints',
  categories: 'usa_plumbing_categories',
  session: 'usa_plumbing_session'
} as const;

const now = () => new Date().toISOString();

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The UI remains usable if browser storage is unavailable.
  }
}

const defaultStaff: StaffMember[] = [
  {
    id: 'STAFF-001',
    fullName: 'Derek Morris',
    email: 'derek@usaproplumbing.com',
    phone: '(214) 555-0104',
    password: 'staff123',
    role: 'staff',
    field: 'Plumber',
    status: 'active',
    createdAt: now()
  }
];

const defaultAdmins: AdminMember[] = [
  {
    id: 'ADMIN-001',
    fullName: 'Operations Admin',
    email: 'admin@usaproplumbing.com',
    phone: '(214) 555-0100',
    password: 'admin123',
    role: 'admin',
    status: 'active',
    createdAt: now()
  }
];

export const operationsStorage = {
  getStaff: () => read<StaffMember[]>(KEYS.users, defaultStaff),
  saveStaff: (staff: StaffMember[]) => write(KEYS.users, staff),
  getAdmins: () => read<AdminMember[]>(KEYS.admins, defaultAdmins),
  saveAdmins: (admins: AdminMember[]) => write(KEYS.admins, admins),
  getCustomers: () => read<Customer[]>(KEYS.customers, []),
  saveCustomers: (customers: Customer[]) => write(KEYS.customers, customers),
  getComplaints: () => read<Complaint[]>(KEYS.complaints, []),
  saveComplaints: (complaints: Complaint[]) => write(KEYS.complaints, complaints),
  getCategories: () => read<string[]>(KEYS.categories, ['Plumber', 'Electrician', 'AC Technician', 'Carpenter', 'Painter', 'General Maintenance']),
  saveCategories: (categories: string[]) => write(KEYS.categories, categories),
  getSession: () => read<AuthUser | null>(KEYS.session, null),
  saveSession: (user: AuthUser | null) => user ? write(KEYS.session, user) : localStorage.removeItem(KEYS.session),
  ensureSeeded: (bookings: BookingRequest[], availableStaff: StaffMember[] = []) => {
    const staff = read<StaffMember[]>(KEYS.users, []);
    if (staff.length === 0) write(KEYS.users, defaultStaff);
    const admins = read<AdminMember[]>(KEYS.admins, []);
    if (admins.length === 0) write(KEYS.admins, defaultAdmins);

    const complaints = read<Complaint[]>(KEYS.complaints, []);
    const bookingsById = new Map(bookings.map(booking => [booking.id, booking]));
    const complaintsWithEmail = complaints.map(complaint => {
      const booking = bookingsById.get(complaint.id);
      return booking && !complaint.customerEmail ? { ...complaint, customerEmail: booking.email } : complaint;
    });
    const existingIds = new Set(complaintsWithEmail.map(complaint => complaint.id));
    const fromBookings = bookings.filter(booking => !existingIds.has(booking.id)).map<Complaint>(booking => ({
      id: booking.id,
      customerId: `CUS-${booking.id.replace(/\D/g, '').slice(-6) || '000001'}`,
      customerName: booking.customerName,
      customerEmail: booking.email,
      customerPhone: booking.phone,
      customerAddress: `${booking.address}, ${booking.city}, ${booking.state} ${booking.zip}`,
      serviceCategory: booking.serviceName,
      description: booking.description,
      priority: booking.urgency === 'emergency' ? 'urgent' : booking.urgency === 'same_day' ? 'high' : 'medium',
      status: booking.status === 'new' ? 'pending' : booking.status === 'dispatched' ? 'assigned' : booking.status,
      createdAt: booking.createdAt,
      assignedStaffId: availableStaff.find(member => member.fullName === booking.assignedTechnician)?.id,
      assignedStaffName: booking.assignedTechnician,
      adminNotes: booking.notes
    }));
    if (fromBookings.length > 0 || complaintsWithEmail.some((complaint, index) => complaint !== complaints[index])) {
      write(KEYS.complaints, [...complaintsWithEmail, ...fromBookings]);
    }
  }
};

export function authenticate(email: string, password: string): AuthUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === 'owner@usaproplumbing.com' && password === 'owner123') {
    return { id: 'OWNER-001', name: 'Business Owner', email, role: 'owner', status: 'active' };
  }
  const admin = operationsStorage.getAdmins().find(member =>
    member.email.toLowerCase() === normalizedEmail && member.password === password && member.status === 'active'
  );
  if (admin) {
    return { id: admin.id, name: admin.fullName, email: admin.email, role: 'admin', status: admin.status };
  }
  const staff = operationsStorage.getStaff().find(member =>
    member.email.toLowerCase() === email.trim().toLowerCase() && member.password === password && member.status === 'active'
  );
  return staff ? {
    id: staff.id,
    name: staff.fullName,
    email: staff.email,
    role: 'staff',
    field: staff.field,
    status: staff.status
  } : null;
}