import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, StarIcon } from '@heroicons/react/24/outline';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Engineeria Early Bird Lifetime Pass',
      price: '₹99',
      period: 'lifetime',
      description: 'One-time payment for unlimited access. Only for the first 100 users! Hurry!',
      features: [
        'Lifetime access to all hackathons & internships',
        'All premium features unlocked',
        'Priority support',
        'Exclusive early bird badge',
        'No recurring fees, ever'
      ],
      buttonText: 'Subscribe Now',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold font-['Montserrat'] mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Engineeria Early Bird Lifetime Pass
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Unlock all Engineeria premium features forever with a one-time payment of just ₹99. Only the first 100 users get this exclusive deal—subscribe now and never pay again!
          </p>
        </motion.div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gray-900 rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] border-red-500 shadow-2xl shadow-red-600/20 ring-2 ring-red-500/20`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <StarIcon className="h-4 w-4" />
                  <span>Early Bird</span>
                </div>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-['Montserrat'] text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-lg">/lifetime</span>
                </div>
                <button
                  className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/30"
                  onClick={() => {
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (isMobile) {
                      window.open('upi://pay?pa=8106035907@ptyes&pn=Engineeria Payments&am=99&cu=INR&tn=Engineeria Early Bird Access Payment', '_blank');
                    } else {
                      alert('UPI payment is only available on mobile devices. Please use your phone to make the payment.');
                    }
                  }}
                >
                  {plan.buttonText}
                </button>
                <p className="text-xs text-red-400 mt-2">* UPI payment is restricted to mobile devices only. Desktop users cannot pay. Please use your mobile phone.</p>
              </div>
              {/* Features */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white mb-4">What's included:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <CheckIcon className="h-5 w-5 text-red-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-red-600/10 to-red-700/10 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="text-red-400 text-lg font-semibold">
            Only for the first 100 people. Hurry!
          </p>
          <p className="text-gray-400">
            Secure payment processing • Instant lifetime access • No recurring fees
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;