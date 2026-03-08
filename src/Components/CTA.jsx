import { useState } from "react";
import { 
  CheckCircle, 
  Phone, 
  Mail, 
  Truck,
  MapPin,
  User,
  MailIcon,
  PhoneIcon,
  Home,
  Building2,
  Hash,
  FileText,
  ChevronLeft,
  ShoppingCart,
  ArrowRight,
  X
} from "lucide-react";

const ZigzagBg = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="zz1" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
        <polyline points="0,15 15,0 30,15 45,0 60,15" fill="none" stroke="#e8f0fe" strokeWidth="1.2" />
        <polyline points="0,30 15,15 30,30 45,15 60,30" fill="none" stroke="#e8f0fe" strokeWidth="1.2" />
      </pattern>
      <pattern id="zz2" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
        <polyline points="0,10 10,0 20,10 30,0 40,10" fill="none" stroke="#f0e6ff" strokeWidth="0.8" />
      </pattern>
      <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="1" fill="#dde8ff" opacity="0.7" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#zz1)" />
    <rect width="100%" height="100%" fill="url(#zz2)" opacity="0.5" />
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const steps = ["Cart", "Delivery", "Confirmation"];

const StepBar = ({ current }) => (
  <div className="flex items-center justify-center gap-0 mb-8 md:mb-10 px-2">
    {steps.map((s, i) => (
      <div key={s} className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border-2 transition-all duration-500
              ${i < current ? "bg-emerald-600 border-emerald-600 text-white shadow-lg" :
                i === current ? "bg-white border-emerald-600 text-emerald-600 shadow-xl ring-4 ring-emerald-100" :
                  "bg-white border-gray-200 text-gray-400"}`}
          >
            {i < current ? <CheckCircle size={16} /> : i + 1}
          </div>
          <span
            className={`text-[10px] md:text-xs mt-1 font-semibold tracking-wide
              ${i === current ? "text-emerald-600" : i < current ? "text-emerald-500" : "text-gray-300"}`}
          >
            {s}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={`w-10 md:w-16 h-0.5 mb-5 mx-1 transition-all duration-700
            ${i < current ? "bg-emerald-500" : "bg-gray-200"}`} />
        )}
      </div>
    ))}
  </div>
);

const InputField = ({ label, name, type = "text", placeholder, value, onChange, required, icon: Icon }) => (
  <div className="mb-3 md:mb-4">
    <label className="block text-[11px] md:text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={16} />
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border border-gray-200 rounded-xl py-2.5 md:py-3 pl-10 md:pl-12 pr-4 text-sm text-gray-800 bg-white/80
          focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent
          placeholder-gray-300 transition-all duration-200 hover:border-emerald-200 shadow-sm`}
      />
    </div>
  </div>
);

// ─── STEP 1: DELIVERY ────────────────────────────────────────────────────────
const DeliveryForm = ({ data, onChange, onNext }) => {
  const handleSubmit = (e) => { e.preventDefault(); onNext(); };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-5 md:mb-6">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <Truck className="text-emerald-600" size={20} />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Delivery Details</h2>
          <p className="text-xs text-gray-400">We'll ship right to your door</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <InputField label="First Name" name="firstName" placeholder="Enter first name" value={data.firstName} onChange={onChange} required icon={User} />
        <InputField label="Last Name" name="lastName" placeholder="Enter last name" value={data.lastName} onChange={onChange} required icon={User} />
      </div>
      <InputField label="Email Address" name="email" type="email" placeholder="Enter email address" value={data.email} onChange={onChange} required icon={MailIcon} />
      <InputField label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" value={data.phone} onChange={onChange} required icon={PhoneIcon} />
      <InputField label="Address Line 1" name="address1" placeholder="House No., Street Name" value={data.address1} onChange={onChange} required icon={Home} />
      <InputField label="Address Line 2" name="address2" placeholder="Apartment, Colony (optional)" value={data.address2} onChange={onChange} icon={Building2} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <InputField label="City" name="city" placeholder="Mumbai" value={data.city} onChange={onChange} required icon={MapPin} />
        <InputField label="State" name="state" placeholder="Maharashtra" value={data.state} onChange={onChange} required icon={MapPin} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <InputField label="PIN Code" name="pin" placeholder="400001" value={data.pin} onChange={onChange} required icon={Hash} />
        <InputField label="Delivery Type" name="deliveryType" placeholder="Standard / Express" value={data.deliveryType} onChange={onChange} required icon={Truck} />
      </div>
      <InputField label="Delivery Instructions" name="instructions" placeholder="Leave at door, call on arrival, etc." value={data.instructions} onChange={onChange} icon={FileText} />

      <button type="submit"
        className="w-full mt-4 md:mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 md:py-3.5 rounded-2xl
        transition-all duration-200 shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 text-sm tracking-wide">
        Proceed to Confirm
        <ArrowRight size={18} />
      </button>
    </form>
  );
};

// ─── STEP 2: CONFIRMATION ────────────────────────────────────────────────────
const ConfirmationStep = ({ delivery, amount, orderId, onBack }) => {
  return (
    <div className="text-center py-4">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl
        animate-bounce shadow-lg shadow-emerald-100">
        <CheckCircle className="text-emerald-600 w-12 h-12" size={48} />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">Order Confirmed!</h2>
      <p className="text-gray-400 text-sm mb-4">Your order is being processed</p>

      <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Order Summary</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-bold text-gray-800">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Name:</span>
            <span className="font-medium text-gray-800">{delivery.firstName} {delivery.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">City:</span>
            <span className="font-medium text-gray-800">{delivery.city}, {delivery.state}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-700 font-bold">Total Amount:</span>
            <span className="font-bold text-emerald-600 text-lg">₹{amount}</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
        <p className="text-sm text-amber-700 font-medium">
          Cash on Delivery - Pay ₹{amount} on delivery
        </p>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onBack}
          className="flex-1 py-3 md:py-3.5 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold text-sm hover:border-emerald-300 hover:text-emerald-500 transition-all flex items-center justify-center gap-2">
          <ChevronLeft size={18} />
          Back
        </button>
        <div className="flex-[2] bg-emerald-600 text-white font-bold py-3 md:py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
          <CheckCircle size={18} />
          Order Placed!
        </div>
      </div>
    </div>
  );
};

// ─── NEED HELP SIDEBAR ───────────────────────────────────────────────────────
const NeedHelp = () => (
  <div className="bg-white/80 rounded-2xl border border-gray-100 p-4 backdrop-blur-sm">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Need Help?</p>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Phone className="text-emerald-600" size={16} />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-700">1800-1200-1553</p>
          <p className="text-xs text-gray-400">24/7 Support</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
          <Mail className="text-blue-600" size={16} />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-700">support@happytoy.in</p>
          <p className="text-xs text-gray-400">Email Us</p>
        </div>
      </div>
    </div>
  </div>
);

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function CheckoutFlow({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState({
    firstName:"", lastName:"", email:"", phone:"",
    address1:"", address2:"", city:"", pin:"",
    state:"", deliveryType:"", instructions:""
  });

  const amount = 599;
  // Static order ID - in production, this would come from backend
  const orderId = "ORD-123456";

  const handleDeliveryChange = (e) => setDelivery(p => ({ ...p, [e.target.name]: e.target.value }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-3 md:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-3 md:top-4 right-3 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 shadow-lg z-10 transition-colors hover:bg-gray-50"
      >
        <X size={18} />
      </button>

      {/* Modal Content */}
      <div className="relative z-20 w-full max-w-2xl md:max-w-4xl bg-white rounded-2xl md:rounded-3xl shadow-2xl my-4 md:my-8">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 md:px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-lg shadow-emerald-200">
              <ShoppingCart size={14} />
              Secure Checkout
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">Complete Your Order</h1>
          </div>

          <StepBar current={step} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white/90 rounded-2xl md:rounded-3xl border border-gray-100/80 p-4 md:p-6 lg:p-8">
                {step === 1 && <DeliveryForm data={delivery} onChange={handleDeliveryChange} onNext={() => setStep(2)} />}
                {step === 2 && <ConfirmationStep delivery={delivery} amount={amount} orderId={orderId} onBack={() => setStep(1)} />}
              </div>
            </div>

            {/* Sidebar - hidden on small screens, shown on lg+ */}
            <div className="hidden lg:block lg:col-span-1 space-y-4">
              <NeedHelp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

