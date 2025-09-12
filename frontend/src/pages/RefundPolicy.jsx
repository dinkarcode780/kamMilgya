import React from 'react';
import { FaRegCheckCircle, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">
        Refund & Cancellation Policy
      </h1>

      <p className="text-gray-700 text-lg mb-6">
        At <strong> <a href="/">kammilgya.com</a></strong>, we are committed to providing a transparent and fair experience. Please carefully read the terms of our refund and cancellation policy below.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Non-Refundable Services</h2>
          <p className="text-gray-600">
            Payments made for job postings, resume access, subscriptions, or other digital services are <strong>non-refundable</strong> once the service is activated or delivered.
          </p>
        </div>

        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. Duplicate or Failed Transactions</h2>
          <p className="text-gray-600">
            If your account is charged more than once or a transaction fails but the amount is debited, contact us within <strong>3 business days</strong>. 
            After verification, eligible refunds will be processed within <strong>7–10 working days</strong> to the original payment method.
          </p>
          <div className="mt-2 text-blue-600">
            <FaEnvelope className="inline mr-2" />
            <a href="mailto:ashu.enterprises2@gmail.com" className="underline">ashu.enterprises2@gmail.com</a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Cancellation Policy</h2>
          <p className="text-gray-600">
            You may cancel services <strong>before activation only</strong>. Once activated, cancellation and refund requests will not be entertained.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Refund Timeline</h2>
          <p className="text-gray-600">
            Upon approval, refunds will be initiated within <strong>7–10 business days</strong> to the original source of payment.
          </p>
        </div>

    
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Contact for Refunds</h2>
          <p className="text-gray-600">
            For refund-related queries or escalations, reach out to us during working hours.
          </p>
          <ul className="mt-2 space-y-1 text-blue-600">
            <li>
              <FaEnvelope className="inline mr-2" />
              <a href="mailto:ashu.enterprises2@gmail.com" className="underline">ashu.enterprises2@gmail.com</a>
            </li>
            <li>
              <FaPhoneAlt className="inline mr-2" />
              <a href="tel:9111461666" className="underline">9111461666</a>
            </li>
            <li className="text-gray-500 ml-6">Mon–Sat, 10:00 AM – 6:00 PM IST</li>
          </ul>
        </div>
      </div>

   
    </div>
  );
};

export default RefundPolicy;
