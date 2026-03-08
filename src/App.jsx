import Hero from './Components/Hero'
import Header from './Components/Header'
import OrderModal from './Components/OrderModal'
import Specs from './Components/Specs'
import Features from './Components/Features'
import CTA from './Components/CTA'
import './App.css'
import { Feature } from 'framer-motion'
import { useState } from 'react'


function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <Hero openCheckout={openCheckout}/>
      <OrderModal/>
      <Specs/>
      <Features openCheckout={openCheckout}/>
      <CTA isOpen={isCheckoutOpen} onClose={closeCheckout}/>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 Drift 4WD Stunt Car. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

