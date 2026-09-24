import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Phone, 
  MapPin, 
  Upload, 
  Camera, 
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { SERVICES_DATA, COMPANY_INFO } from '../data/plumbingData';
import { BookingRequest, PropertyType, UrgencyLevel } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  estimateDetails?: {
    serviceName: string;
    estimatedCost: string;
    notes: string;
  } | null;
  onSubmitBooking: (booking: BookingRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  estimateDetails,
  onSubmitBooking
}) => {
  if (!isOpen) return null;

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('TX');
  const [zip, setZip] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'emergency-plumbing');
  const [urgency, setUrgency] = useState<UrgencyLevel>('emergency');
  const [preferredDate, setPreferredDate] = useState('Today');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Next Available (Emergency)');
  const [description, setDescription] = useState(estimateDetails ? estimateDetails.notes : '');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || !zip) return;

    setIsSubmitting(true);

    const selectedServiceObj = SERVICES_DATA.find(s => s.id === serviceId);
    const serviceName = estimateDetails 
      ? estimateDetails.serviceName 
      : selectedServiceObj ? selectedServiceObj.title : 'General Plumbing Repair';

    const bookingId = `USA-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRequest = {
      id: bookingId,
      createdAt: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      customerName,
      phone,
      email: email || `${customerName.toLowerCase().replace(/\s+/g, '')}@client.com`,
      address,
      city: city || 'Local Metro',
      state,
      zip,
      propertyType,
      serviceId,
      serviceName,
      urgency,
      preferredDate,
      preferredTimeSlot,
      description,
      photoUrl: photoPreview || undefined,
      status: urgency === 'emergency' ? 'dispatched' : 'new',
      estimatedCost: estimateDetails ? estimateDetails.estimatedCost : (selectedServiceObj?.priceRange || '$150 - $350'),
      notes: urgency === 'emergency' ? 'Priority Emergency Lead flagged by customer' : undefined
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedBooking(newBooking);
      onSubmitBooking(newBooking);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 shrink-0 relative flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Request Service & Book Appointment
              </h2>
              <p className="text-xs text-slate-300">
                Guaranteed Upfront Pricing • Licensed & Insured Plumbers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {submittedBooking ? (
            /* Success Confirmation Screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Request Confirmed & Logged
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Thank You, {submittedBooking.customerName}!
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your plumbing request has been received by our national dispatch system. Our lead coordinator is reviewing the details now.
                </p>
              </div>

              {/* Booking Details Ticket */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-slate-200 font-semibold">
                  <span className="text-slate-500">Dispatch Reference:</span>
                  <span className="font-mono text-blue-700 font-extrabold">{submittedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-800 text-right">{submittedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Urgency:</span>
                  <span className="font-bold text-red-600 uppercase">{submittedBooking.urgency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Time:</span>
                  <span className="font-bold text-slate-800">{submittedBooking.preferredDate} ({submittedBooking.preferredTimeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="text-slate-800 text-right">{submittedBooking.address}, {submittedBooking.city} {submittedBooking.zip}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Price Estimate:</span>
                  <span className="font-bold text-emerald-600">{submittedBooking.estimatedCost}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 max-w-md mx-auto">
                📱 <strong>What happens next:</strong> A dispatcher is calling or texting {submittedBooking.phone} within 10-15 minutes with technician ETA and live tracking link.
              </div>

              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={onClose}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
                >
                  Done
                </button>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Dispatcher Direct</span>
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Emergency Banner Alert inside form */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Flame className="w-5 h-5 text-red-600 shrink-0 animate-bounce" />
                  <div>
                    <span className="text-xs font-black text-red-800 uppercase tracking-wider block">
                      Immediate Emergency Dispatch?
                    </span>
                    <span className="text-[11px] text-red-700">
                      Need a plumber on site within 45 minutes?
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={urgency === 'emergency'}
                    onChange={(e) => {
                      setUrgency(e.target.checked ? 'emergency' : 'same_day');
                      if (e.target.checked) {
                        setPreferredDate('Today (Immediate)');
                        setPreferredTimeSlot('Next Available (Emergency)');
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              {/* Service & Property Type Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Select Plumbing Service *
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-800"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title} ({srv.priceRange})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Property Type *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPropertyType('residential')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        propertyType === 'residential'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      Residential Home
                    </button>
                    <button
                      type="button"
                      onClick={() => setPropertyType('commercial')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        propertyType === 'commercial'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      Commercial / Business
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferred Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Preferred Service Date *
                  </label>
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Today (Immediate)">Today (Urgent Dispatch)</option>
                    <option value="Today (Afternoon)">Today (Afternoon)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="In 2 to 3 days">In 2 to 3 days</option>
                    <option value="Weekend Appointment">Upcoming Weekend</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Preferred Time Window *
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Next Available (Emergency)">Next Available (Under 45 Mins)</option>
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Contact & Dispatch Location
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone Number (for SMS Tracking) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (214) 555-0199"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={zip}
                      onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 75201"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Dallas"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address (Optional for Invoice)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@example.com"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Description & Photo Attachment */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Describe the Plumbing Problem:
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Kitchen sink drain is completely blocked; water backing up when running dishwasher..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                {/* Optional Photo Upload */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center">
                    <Camera className="w-3.5 h-3.5 mr-1 text-slate-500" />
                    Attach Photo of Leaking Pipe / Fixture (Optional):
                  </label>
                  <div className="flex items-center space-x-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border border-slate-300 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    {photoPreview && (
                      <div className="flex items-center space-x-2">
                        <img 
                          src={photoPreview} 
                          alt="Issue preview" 
                          className="w-10 h-10 object-cover rounded-lg border border-slate-300"
                        />
                        <span className="text-[11px] text-emerald-600 font-semibold">Image Attached</span>
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 px-4 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center space-x-2 text-white ${
                    urgency === 'emergency'
                      ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-red-600/30 emergency-glow'
                      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-600/25'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isSubmitting 
                      ? 'Contacting Nearest Dispatch Van...' 
                      : urgency === 'emergency' 
                        ? 'Dispatch Emergency Plumber Now (Under 45 Mins)' 
                        : 'Confirm & Schedule Appointment'
                    }
                  </span>
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero upfront payment required. You approve final price on-site.</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
