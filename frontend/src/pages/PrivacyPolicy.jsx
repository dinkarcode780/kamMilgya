// src/pages/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy describes how we collect, use, and protect your information at <strong>kammilgya.com</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal details (name, phone, email, resume)</li>
        <li>Payment information (processed by secure third-party like Razorpay)</li>
        <li>IP address, device info, and usage logs</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To create your profile or job listing</li>
        <li>To send alerts and updates</li>
        <li>To improve services</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell your data. We may share it only with service providers like payment processors or email services to serve you better.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        All sensitive data is encrypted. Payments are handled by PCI-DSS compliant gateways (e.g., Razorpay).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You may request access, deletion, or correction of your data by contacting us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
      <p>
        Email: <a href="mailto:ashu.enterprises2@gmail.com" className="text-blue-600 underline">ashu.enterprises2@gmail.com</a> | Phone: <a href="tel:9111461666" className="text-blue-600 underline">9111461666</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
