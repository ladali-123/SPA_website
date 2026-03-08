import { useState, useEffect, useMemo } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import QRCodeImage from '../assets/pic4.jpg';

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

const steps = ["Cart", "Delivery", "Payment", "Confirmation"];

const StepBar = ({ current }) => (
  <div className="flex items-center justify-center gap-0 mb-10">
    {steps.map((s, i) => (
      <div key={s} className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500
              ${i < current ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" :
                i === current ? "bg-white border-indigo-600 text-indigo-600 shadow-xl ring-4 ring-indigo-100" :
                  "bg-white border-gray-200 text-gray-400"}`}
          >
            {i < current ? "✓" : i + 1}
          </div>
          <span
            className={`text-xs mt-1 font-semibold tracking-wide
              ${i === current ? "text-indigo-600" : i < current ? "text-indigo-400" : "text-gray-300"}`}
          >
            {s}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={`w-16 h-0.5 mb-5 mx-1 transition-all duration-700
            ${i < current ? "bg-indigo-500" : "bg-gray-200"}`} />
        )}
      </div>
    ))}
  </div>
);

const InputField = ({ label, name, type = "text", placeholder, value, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-200 rounded-xl py-3 pl-4 pr-4 text-sm text-gray-800 bg-white/80
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
        placeholder-gray-300 transition-all duration-200 hover:border-indigo-200 shadow-sm"
    />
  </div>
);

// ─── STEP 1: DELIVERY ────────────────────────────────────────────────────────
const DeliveryForm = ({ data, onChange, onNext }) => {
  const handleSubmit = (e) => { e.preventDefault(); onNext(); };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl">📦</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Delivery Details</h2>
          <p className="text-xs text-gray-400">We'll ship right to your door</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4">
        <InputField label="First Name" name="firstName" placeholder="Rahul" value={data.firstName} onChange={onChange} required />
        <InputField label="Last Name" name="lastName" placeholder="Sharma" value={data.lastName} onChange={onChange} required />
      </div>
      <InputField label="Email Address" name="email" type="email" placeholder="rahul@example.com" value={data.email} onChange={onChange} required />
      <InputField label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" value={data.phone} onChange={onChange} required />
      <InputField label="Address Line 1" name="address1" placeholder="House No., Street Name" value={data.address1} onChange={onChange} required />
      <InputField label="Address Line 2" name="address2" placeholder="Apartment, Colony (optional)" value={data.address2} onChange={onChange} />
      <InputField label="City" name="city" placeholder="Mumbai" value={data.city} onChange={onChange} required />
      <InputField label="State" name="state" placeholder="Maharashtra" value={data.state} onChange={onChange} required />
      <InputField label="PIN Code" name="pin" placeholder="400001" value={data.pin} onChange={onChange} required />
      <InputField label="Delivery Type" name="deliveryType" placeholder="Standard / Express" value={data.deliveryType} onChange={onChange} required />
      <InputField label="Delivery Instructions" name="instructions" placeholder="Leave at door, call on arrival, etc." value={data.instructions} onChange={onChange} />

      <button type="submit"
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl
        transition-all duration-200 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-sm tracking-wide">
        Proceed to Payment →
      </button>
    </form>
  );
};

// ─── STEP 2: PAYMENT ─────────────────────────────────────────────────────────
const PaymentForm = ({ data, onNext, onBack, amount }) => {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      alert("Payment gateway is loading, please try again...");
      return;
    }

    setLoading(true);
    
    const options = {
      key: "rzp_test_YOUR_KEY_ID", // Replace with your actual Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Drift 4WD Stunt Car",
      description: "Purchase Payment",
      handler: function () {
        setLoading(false);
        onNext(); // Proceed to confirmation on successful payment
      },
      prefill: {
        name: data.cardName || "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#ff7a00"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function () {
      setLoading(false);
      alert("Payment failed! Please try again.");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (method === "card") {
      // Open Razorpay for card payment
      handleRazorpayPayment();
    } else {
      // For COD and QR, proceed normally
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl">💳</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Payment Info</h2>
          <p className="text-xs text-gray-400">Secure & encrypted checkout</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {[
          { id: "card", label: "Card" },
          { id: "qr", label: "QR Code" },
          { id: "cod", label: "COD" },
        ].map(m => (
          <button key={m.id} type="button" onClick={() => setMethod(m.id)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-200
            ${method === m.id
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"}`}>
            {m.label}
          </button>
        ))}
      </div>

      {method === "card" && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
          <p className="text-sm text-blue-700 font-medium mb-2">💳 Card Payment via Razorpay</p>
          <p className="text-xs text-blue-600">Click "Pay ₹{amount}" to open secure Razorpay payment gateway</p>
          <div className="mt-3 flex items-center gap-2">
            <img src="https://cdn.razorpay.com/logos/BOuhCzq7I3uzRe.png" alt="Razorpay" className="h-6" onError={(e) => e.target.style.display = 'none'} />
          </div>
        </div>
      )}

      {method === "qr" && (
        <div className="text-center p-4 mb-4">
          <p className="text-sm text-gray-600 mb-3">Scan QR Code to Pay</p>
          <div className="flex justify-center mb-3">
            <img 
              src={QRCodeImage} 
              alt="QR Code Payment" 
              className="w-48 h-48 object-contain border-2 border-gray-200 rounded-xl"
            />
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm text-amber-700">
            <p className="font-bold">Amount: ₹{amount}</p>
            <p className="text-xs mt-1">Open your payment app and scan the QR code</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">After scanning and paying, click below to confirm</p>
        </div>
      )}

      {method === "cod" && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4 text-sm text-amber-700 font-medium">
          Cash on Delivery — Pay ₹{amount} on delivery
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button type="button" onClick={onBack}
          className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold text-sm hover:border-indigo-300 hover:text-indigo-500 transition-all">
          ← Back
        </button>
        <button type="submit"
          disabled={loading}
          className={`flex-[2] py-3.5 rounded-2xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 text-sm tracking-wide
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-100'}`}>
          {loading ? 'Processing...' : method === "card" ? `Pay ₹${amount} →` : 'Proceed to Confirm →'}
        </button>
      </div>
    </form>
  );
};

// ─── STEP 3: CONFIRMATION ────────────────────────────────────────────────────
const ConfirmationStep = ({ delivery, payment, amount, orderId }) => {
  return (
    <div className="text-center py-4">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl
        animate-bounce shadow-lg shadow-emerald-100">
        ✅
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">Order Confirmed!</h2>
      <p className="text-gray-400 text-sm mb-6">Payment verified · Your order is being processed</p>

      <div className="flex gap-3 justify-center">
        <div className="flex-1 bg-indigo-600 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-200">
          📧 Email Receipt
        </div>
        <div className="flex-1 bg-white border-2 border-gray-100 text-gray-600 font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer">
          📦 Track Order
        </div>
      </div>
    </div>
  );
};

// ─── NEED HELP SIDEBAR ───────────────────────────────────────────────────────
const NeedHelp = () => (
  <div className="bg-white/80 rounded-2xl border border-gray-100 p-4 backdrop-blur-sm">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Need Help?</p>
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Phone size={18} />
        <div>
          <p className="text-xs font-bold text-gray-700">1800-123-4567</p>
          <p className="text-xs text-gray-400">24/7 Support</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Mail size={18} />
        <div>
          <p className="text-xs font-bold text-gray-700">help@store.com</p>
          <p className="text-xs text-gray-400">Email Us</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MessageCircle size={18} />
        <div>
          <p className="text-xs font-bold text-gray-700">Live Chat</p>
          <p className="text-xs text-gray-400">Avg. 2 min reply</p>
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
  const [payment, setPayment] = useState({
    cardName:"", cardNumber:"", expiry:"", cvv:"",
    upiId:"", bank:""
  });

  const amount = 1998;
  const orderId = useMemo(() => `ORD-${Math.floor(100000 + Math.random()*900000)}`, []);

  const handleDeliveryChange = (e) => setDelivery(p => ({ ...p, [e.target.name]: e.target.value }));
  const handlePaymentChange = (e) => setPayment(p => ({ ...p, [e.target.name]: e.target.value }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 shadow-lg z-10"
      >
        ✕
      </button>

      {/* Modal Content */}
      <div className="relative z-20 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-lg shadow-indigo-200">
              🛒 Secure Checkout
            </div>
            <h1 className="text-3xl font-black text-gray-900">Complete Your Order</h1>
          </div>

          <StepBar current={step} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white/90 rounded-3xl border border-gray-100/80 p-6 lg:p-8">
                {step === 1 && <DeliveryForm data={delivery} onChange={handleDeliveryChange} onNext={() => setStep(2)} />}
                {step === 2 && <PaymentForm data={payment} onChange={handlePaymentChange} onNext={() => setStep(3)} onBack={() => setStep(1)} amount={amount} />}
                {step === 3 && <ConfirmationStep delivery={delivery} payment={payment} amount={amount} orderId={orderId} />}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <NeedHelp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
