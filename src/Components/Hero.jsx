import { motion } from "framer-motion"
import carImg from "../assets/car.png"

export default function Hero({ openCheckout }) {
  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        backgroundImage: `
          repeating-linear-gradient(
            135deg,
            rgba(255, 122, 0, 0.05) 1px,
            rgba(255, 122, 0, 0.05) 2px,
            transparent 1px,
            transparent 20px
          ),
          repeating-linear-gradient(
            225deg,
            rgba(255, 122, 0, 0.05) 1px,
            rgba(255, 122, 0, 0.05) 2px,
            transparent 1px,
            transparent 20px
          )
        `
      }}
      className="flex flex-col md:grid md:grid-cols-2 items-center gap-2 px-6 md:px-30 min-h-[25vh] overflow-hidden bg-gray-100 py-6 md:py-0"
    >
      {/* Product Image - upar mobile mein */}
      <div className="relative flex flex-col items-center w-full order-1 md:order-1">
        <motion.div
          className="absolute -top-6 w-56 h-56 bg-black/20 rounded-full blur-2xl z-0"
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.25, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.img
          src={carImg}
          className="w-full max-w-xs md:max-w-xl mx-auto z-10 relative"
          initial={{ x: -150 }}
          animate={{ x: 0, rotate: [-3, 3, -3], y: [0, -10, 0] }}
          transition={{
            x: { duration: 0.5 },
            rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
          alt="Drift 4WD Stunt Car"
        />
      </div>

      {/* Product Text - neeche mobile mein */}
      <div className="z-10 order-2 md:order-2  text-center md:text-left w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a8a]">
          DriftX 360° Stunt RC Car
        </h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base text-center">
          360° Rotating Stunt RC Car with 2.4GHz Remote Control – Dual-Sided 4WD Drift Car with LED Lights, High-Speed Off-Road Climbing Toy for Kids & Adults (Rechargeable, Age 5+)
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">
          ₹599
        </h2>
        <motion.button
          className="mt-5 bg-[#ff7a00] text-white px-8 py-3 rounded-lg hover:scale-105 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openCheckout}
        >
          Buy Now
        </motion.button>
      </div>
    </section>
  )
}