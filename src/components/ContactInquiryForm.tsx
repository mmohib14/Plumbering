import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

interface ContactInquiryFormProps {
  variant?: 'standard' | 'home';
  onSubmitInquiry: (inquiry: { name: string; phone: string; email: string; message: string }) => void;
}

export const ContactInquiryForm: React.FC<ContactInquiryFormProps> = ({ variant = 'standard', onSubmitInquiry }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const isHome = variant === 'home';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setPhoneError('Enter a valid phone number with 10 to 15 digits.');
      return;
    }
    setPhoneError('');
    onSubmitInquiry({ name: name.trim(), phone: phone.trim(), email: email.trim(), message: message.trim() });
    setSubmitted(true);
  };

  return (
    <div className={isHome
      ? 'rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-9'
      : 'rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8 lg:p-10'}>
      {isHome && <div className="mb-5 h-1 w-12 rounded-full bg-(--color-orange)" />}
      <h3 className={`text-xl font-bold text-slate-900 ${isHome ? 'sm:text-2xl' : ''}`}>Send an Electronic Inquiry</h3>
      <p className={isHome ? 'mb-5 mt-1 text-xs leading-5 text-slate-600' : 'mb-6 mt-1 text-xs leading-5 text-slate-600'}>
        For non-emergency estimates, commercial bid requests, or general plumbing questions.
      </p>

      {submitted ? (
        <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-bold text-emerald-900">Message Received!</h4>
          <p className="mx-auto max-w-sm text-xs leading-5 text-emerald-800">
            This demo saved your inquiry in this browser only; it was not sent to dispatch. For help, call the number below.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-xs font-bold text-slate-700">Full Name *</label>
              <input
                type="text"
                id="contact-name"
                required
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="e.g. John Adams"
                className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="mb-1 block text-xs font-bold text-slate-700">Phone Number *</label>
              <input
                type="tel"
                id="contact-phone"
                required
                autoComplete="tel"
                aria-invalid={Boolean(phoneError)}
                aria-describedby={phoneError ? 'contact-phone-error' : undefined}
                value={phone}
                onChange={event => { setPhone(event.target.value); setPhoneError(''); }}
                placeholder="e.g. (800) 555-7473"
                className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm"
              />
              {phoneError && <p id="contact-phone-error" role="alert" className="mt-1 text-xs font-medium text-red-700">{phoneError}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1 block text-xs font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              id="contact-email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1 block text-xs font-bold text-slate-700">How Can We Help? *</label>
            <textarea
              rows={4}
              id="contact-message"
              required
              value={message}
              onChange={event => setMessage(event.target.value)}
              placeholder="Tell us about your plumbing project, symptoms, or requested estimate..."
              className="w-full resize-y rounded-xl border border-slate-300 p-3 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm"
            />
          </div>
          <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--color-orange) px-4 py-3.5 text-sm font-bold text-slate-950 shadow-md shadow-orange-600/20 transition-colors hover:bg-(--color-orange-dark)">
            <Send className="h-4 w-4" />
            <span>Send Message to Dispatch</span>
          </button>
        </form>
      )}
    </div>
  );
};