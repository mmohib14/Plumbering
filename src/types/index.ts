export type ServiceCategory = 'emergency' | 'residential' | 'commercial' | 'drain-sewer' | 'water-heater';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: ServiceCategory;
  isEmergency: boolean;
  iconName: string;
  imageUrl: string;
  priceRange: string;
  unit: string;
  commonSymptoms: string[];
  features: string[];
  faqs: { question: string; answer: string }[];
}

export type UrgencyLevel = 'emergency' | 'same_day' | 'next_day' | 'flexible';
export type PropertyType = 'residential' | 'commercial' | 'industrial';
export type BookingStatus = 'new' | 'dispatched' | 'in_progress' | 'completed' | 'cancelled';

export interface BookingRequest {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: PropertyType;
  serviceId: string;
  serviceName: string;
  urgency: UrgencyLevel;
  preferredDate: string;
  preferredTimeSlot: string;
  description: string;
  photoUrl?: string;
  status: BookingStatus;
  notes?: string;
  assignedTechnician?: string;
  estimatedCost?: string;
}

export type UserRole = 'owner' | 'admin' | 'staff';
export type AccountStatus = 'active' | 'inactive';
export type ComplaintStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  field?: string;
  status: AccountStatus;
}

export interface StaffMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: 'staff';
  field: string;
  status: AccountStatus;
  createdAt: string;
}

export interface AdminMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin';
  status: AccountStatus;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  serviceCategory: string;
  description: string;
  priority: ComplaintPriority;
  assignedStaffId?: string;
  assignedStaffName?: string;
  status: ComplaintStatus;
  createdAt: string;
  assignedAt?: string;
  completedAt?: string;
  staffNotes?: string;
  adminNotes?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  serviceType: string;
  review: string;
  verified: boolean;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  content: string[];
  coverImage: string;
  tags: string[];
}

export interface ServiceArea {
  id: string;
  city: string;
  state: string;
  metroArea: string;
  zipCodes: string[];
  activeHub: boolean;
  techniciansAvailable: number;
  averageResponseMinutes: number;
  phone: string;
  hubAddress: string;
}
