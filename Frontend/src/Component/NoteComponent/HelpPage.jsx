import React from 'react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">OpenNote Help & Support</h1>

        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search help topics..."
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQ question="How do I create a new note?" answer="Click on the '+' icon in the sidebar to start a new note." />
            <FAQ question="How to share my notes?" answer="Use the 'Share' button under note options (three-dot menu)." />
            <FAQ question="How do I recover deleted notes?" answer="Go to the 'Trash' section and restore from there within 7 days." />
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-md" required />
            <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-md" required />
            <textarea placeholder="Describe your issue..." className="w-full p-3 border rounded-md" rows={4} required></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Contact Support
            </button>
          </form>
        </div>

        {/* Customer Care */}
        <div className="text-center">
          <p>Need instant help?</p>
          <button className="mt-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
            Chat with Customer Care
          </button>
        </div>
      </div>
    </div>
  );
}

function FAQ({ question, answer }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="font-semibold">{question}</p>
      <p className="text-sm text-gray-600 mt-1">{answer}</p>
    </div>
  );
}
