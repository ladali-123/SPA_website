import React, { useState, useEffect } from "react";
import {
    FaBatteryFull,
    FaBluetooth,
    FaBolt,
    FaCarSide,
    FaChargingStation,
    FaLightbulb,
    FaHeadset,
    FaTrophy,
    FaStar,
    FaShoppingCart,
    FaCheckCircle
} from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

import pic3 from "../assets/pic3.png";
import pic5 from "../assets/pic5.jpg";
import pic6 from "../assets/pic6.jpg";
import pic7 from "../assets/pic7.jpg";
import pic8 from "../assets/pic8.jpg";

const features = [
    { icon: <FaBatteryFull size={24} />, title: "Long Lasting Battery", desc: "High capacity battery engineered for extended driving range." },
    { icon: <FaBolt size={24} />, title: "High Speed Motor", desc: "Powerful motor delivers smooth, instant acceleration." },
    { icon: <FaBluetooth size={24} />, title: "Bluetooth Control", desc: "Seamless wireless control from your smartphone." },
    { icon: <FaChargingStation size={24} />, title: "Fast Charging", desc: "Back on the road in minutes, not hours." },
    { icon: <FaCarSide size={24} />, title: "Smooth Driving", desc: "Advanced suspension for a flawless ride on any surface." },
    { icon: <FaLightbulb size={24} />, title: "LED Lights", desc: "Bold, stylish lighting for every night drive." }
];

const highlights = [

    { icon: <FaHeadset size={22} />, title: "Service & Support", desc: "Expert service teams available for anything you need.", color: "#f97316" },
    { icon: <FaBolt size={22} />, title: "Instant Torque", desc: "0–60 in seconds with electric precision power.", color: "#3b82f6" },
    { icon: <FaTrophy size={22} />, title: "Award Winning", desc: "Recognized as the best EV in its class, 2026.", color: "#f97316" }
];

const testimonials = [
    {
        quote: "My kids absolutely love this drift car! The 360° spins and lights make it super exciting to play with.",
        name: "Rahul Sharma",
        role: "Parent & Toy Enthusiast",
        stars: 5,
        image: pic5
    },
    {
        quote: "The mecanum wheels are amazing. It can drift sideways and do crazy stunts on any surface.",
        name: "Emily Carter",
        role: "RC Hobbyist",
        stars: 5,
        image: pic6
    },
    {
        quote: "Bought this for my nephew and ended up playing with it myself. The double-sided driving is so cool!",
        name: "Aman Verma",
        role: "Gadget Lover",
        stars: 5,
        image: pic7
    },
    {
        quote: "Super fun stunt car! The drifting, spinning and LED lights make it perfect for indoor racing.",
        name: "Jason Miller",
        role: "Toy Collector",
        stars: 5,
        image: pic8
    }
];

export default function CarFullSection({ openCheckout }) {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const t = testimonials[activeTestimonial];

    const handlers = useSwipeable({
        onSwipedLeft: () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length),
        onSwipedRight: () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length),
        trackMouse: true
    });

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        .feat-glow { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
        .feat-glow-blue { width: 500px; height: 500px; background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%); top: -80px; left: -100px; }
        .feat-glow-cyan { width: 350px; height: 350px; background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%); bottom: 0; left: 30%; }

        @keyframes carEntrance {
          0%   { transform: translateX(-320px) rotate(-8deg) scale(0.85); opacity: 0; }
          55%  { transform: translateX(18px) rotate(1.5deg) scale(1.03); opacity: 1; }
          70%  { transform: translateX(-8px) rotate(-0.8deg) scale(0.99); }
          85%  { transform: translateX(5px) rotate(0.4deg) scale(1.01); }
          100% { transform: translateX(0) rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes carFloat {
          0%   { transform: translateY(0px) rotate(0deg); }
          25%  { transform: translateY(-10px) rotate(0.6deg); }
          50%  { transform: translateY(-16px) rotate(-0.4deg); }
          75%  { transform: translateY(-7px) rotate(0.3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes carShadowPulse {
          0%, 100% { transform: scaleX(1); opacity: 0.5; }
          50%       { transform: scaleX(0.78); opacity: 0.25; }
        }
        .car-wrapper { animation: carEntrance 1.1s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        .car-img {
          animation: carFloat 5s ease-in-out infinite;
          animation-delay: 1.2s;
          filter: drop-shadow(0 0 28px rgba(59,130,246,0.45)) drop-shadow(0 18px 40px rgba(0,0,0,0.6));
          transition: filter 0.4s ease;
        }
        .car-img:hover {
          filter: drop-shadow(0 0 48px rgba(99,179,255,0.7)) drop-shadow(0 20px 50px rgba(0,0,0,0.7));
          animation-play-state: paused;
        }
        .car-shadow {
          width: 70%; height: 16px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.35) 0%, transparent 75%);
          margin: -4px auto 0; border-radius: 50%;
          animation: carShadowPulse 5s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .feat-card {
          opacity: 0; animation: fadeSlideUp 0.6s ease forwards;
          border: 1px solid rgba(59,130,246,0.12);
          background: linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(59,130,246,0.04) 100%);
          backdrop-filter: blur(4px); border-radius: 14px; padding: 18px 20px;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
          position: relative; overflow: hidden;
        }
        .feat-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(59,130,246,0.08), transparent);
          opacity: 0; transition: opacity 0.3s ease; border-radius: 14px;
        }
        .feat-card:hover { border-color: rgba(59,130,246,0.45); background: linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(59,130,246,0.08) 100%); transform: translateY(-3px); }
        .feat-card:hover::before { opacity: 1; }
        .feat-icon-wrap {
          width: 46px; height: 46px; border-radius: 12px;
          background: linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.15));
          border: 1px solid rgba(59,130,246,0.3);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .feat-card:hover .feat-icon-wrap { background: linear-gradient(135deg, rgba(59,130,246,0.45), rgba(6,182,212,0.3)); box-shadow: 0 0 20px rgba(59,130,246,0.3); }
        .feat-card:nth-child(1) { animation-delay: 1.3s; }
        .feat-card:nth-child(2) { animation-delay: 1.45s; }
        .feat-card:nth-child(3) { animation-delay: 1.6s; }
        .feat-card:nth-child(4) { animation-delay: 1.75s; }
        .feat-card:nth-child(5) { animation-delay: 1.9s; }
        .feat-card:nth-child(6) { animation-delay: 2.05s; }
        .section-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25);
          border-radius: 999px; padding: 4px 14px; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase; color: #60a5fa; margin-bottom: 10px;
        }
        .section-badge span.dot { width: 6px; height: 6px; border-radius: 50%; background: #3b82f6; box-shadow: 0 0 6px #3b82f6; }

        .testi-section { background: #ffffff; padding: 56px 24px 48px; position: relative; overflow: hidden; }
        .testi-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #3b82f6, #f97316, #3b82f6); }
        .testi-card { display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .testi-card-wide { display: flex; flex-direction: row; align-items: center; gap: 40px; max-width: 900px; margin: 0 auto; }
        .testi-img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #f97316; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .testi-img-wide { width: 280px; height: 280px; border-radius: 16px; object-fit: cover; border: 4px solid #f97316; box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
        .testi-content { text-align: center; }
        .testi-content-wide { text-align: left; flex: 1; }
        .testi-text { font-family: 'Rajdhani', sans-serif; font-size: clamp(20px, 3.5vw, 28px); font-weight: 600; color: #1e3a5f; line-height: 1.45; max-width: 720px; margin: 0 auto; }
        .testi-text span.highlight { color: #f97316; }
        .testi-author { font-size: 14px; color: #64748b; font-weight: 500; margin-top: 16px; letter-spacing: 0.04em; }
        .testi-author strong { color: #1e3a5f; }
        .testi-stars { color: #f97316; font-size: 13px; justify-content: center; }
        .testi-stars-center { display: flex; justify-content: center; }
        .testi-dots button { width: 8px; height: 8px; border-radius: 50%; border: none; background: #cbd5e1; cursor: pointer; transition: all 0.3s; padding: 0; }
        .testi-dots button.active { background: #f97316; width: 22px; border-radius: 4px; }
        .testi-fade { animation: tfade 0.4s ease; }
        @keyframes tfade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .testi-card-wide { flex-direction: column; text-align: center; }
          .testi-content-wide { text-align: center; }
          .testi-img-wide { width: 200px; height: 200px; }
        }

        .divider-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(249,115,22,0.15), transparent); }
      `}</style>

            {/* ── 1. FEATURES ── */}
            <section className="bg-[#0a0a0a] text-white py-4 px-2 relative overflow-hidden">
                <div className="feat-glow feat-glow-blue" />
                <div className="feat-glow feat-glow-cyan" />
                <div className="max-w-7xl mx-auto relative z-6">
                    <div className="text-center">
                        <div className="section-badge"><span className="dot" />Why Choose Us</div>
                        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.03em' }} className="text-4xl md:text-5xl font-bold">
                            Built for <span className="text-blue-400">Performance</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">Every detail engineered for the ultimate electric car experience.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="car-wrapper w-full max-w-[520px]">
                                <img src={pic3} alt="Electric Car" className="car-img w-full object-contain" />
                                <div className="car-shadow" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 -mt-30">
                            {features.map((feature, index) => (
                                <div key={index} className="feat-card flex items-start gap-3">
                                    <div className="feat-icon-wrap text-blue-400">{feature.icon}</div>
                                    <div>
                                        <h3 className="text-[15px] font-semibold text-white leading-tight mb-1">{feature.title}</h3>
                                        <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. TESTIMONIAL ── */}
           {/* ── 2. TESTIMONIAL ── */}
<div className="bg-white py-8 px-4" {...handlers}>

  <div className="max-w-7xl mx-auto">

    <div key={activeTestimonial} className="transition-all duration-300">

      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 w-full bg-white rounded-xl p-6 md:p-8 shadow-md border border-slate-200">

        {/* IMAGE */}
        <img
          src={t.image}
          alt={t.name}
          className="w-28 h-28 md:w-44 md:h-44 mx-auto md:mx-0 object-cover rounded-lg border border-orange-400 flex-shrink-0"
        />

        {/* CONTENT */}
        <div className="flex-1 text-center md:text-left">

          <p className="font-semibold text-slate-800 text-lg md:text-2xl leading-relaxed">
            {t.quote}
          </p>

          <div className="flex justify-center md:justify-start text-orange-500 gap-1 mt-3">
            {Array(t.stars).fill(0).map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <p className="text-sm text-slate-500 mt-2">
            <span className="font-semibold text-slate-800">{t.name}</span> | {t.role}
          </p>

        </div>

      </div>

    </div>

    {/* DOTS */}
    <div className="flex justify-center gap-2 mt-6">
      {testimonials.map((_, i) => (
        <button
          key={i}
          className={`h-2 rounded-full transition-all ${
            i === activeTestimonial
              ? "w-6 bg-orange-500"
              : "w-2 bg-slate-300"
          }`}
          onClick={() => setActiveTestimonial(i)}
        />
      ))}
    </div>

  </div>

</div>
            {/* ── 3. PRODUCT + HIGHLIGHTS (white bg, clean text) ── */}
            <div style={{ background: '#ffffff', padding: '40px 24px', borderTop: '1px solid #f1f5f9' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-start">

                        {/* Left */}
                        <div className="flex-1 min-w-0">

  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>

    {/* Discount */}
    <span style={{ fontSize: '32px', fontWeight: 600, color: '#dc2626',  }}>
      -60%
    </span>

    {/* Price */}
    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: '#1e293b' }}>
      <span style={{ fontSize: '0.55em', color: '#94a3b8', verticalAlign: 'super', marginRight: '2px' }}>₹</span>
      599
    </span>

    {/* MRP */}
    <span style={{ fontSize: '18px', color: '#cbd5e1', textDecoration: 'line-through' }}>
      ₹1,499
    </span>

  </div>

  <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0' }}>
    {[
      "Free home delivery across India",
      "0% EMI available for 24 months",
      "Government EV subsidy applicable"
    ].map((p, i) => (
      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#64748b', padding: '5px 0' }}>
        <FaCheckCircle size={13} style={{ color: '#22c55e', flexShrink: 0 }} /> {p}
      </li>
    ))}
  </ul>

  <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
    <button
      onClick={openCheckout}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: 'linear-gradient(135deg,#f97316,#ea580c)',
        color: 'white',
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '16px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '13px 30px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      <FaShoppingCart size={16} />
      Buy Now
    </button>
  </div>

</div>

                        {/* Right — clean text highlights */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {highlights.map((h, i) => (
                                <div key={i} style={{ padding: '20px 0', borderBottom: i < highlights.length - 1 ? '1px solid #f1f5f9' : 'none', textAlign: 'center' }}>
                                    <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1e3a5f', marginBottom: '6px', letterSpacing: '0.02em' }}>
                                        {h.title}
                                    </p>
                                    <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                                        {h.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}