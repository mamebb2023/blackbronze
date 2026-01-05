'use client'

import React from 'react'

const Contact = () => {
  return (
    <div id="contact" className="min-h-screen bg-white text-black flex items-center justify-center px-8">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">Get In Touch</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          Ready to bring your ideas to life? Let's create something amazing together.
        </p>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <textarea
                placeholder="Tell us about your project"
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 text-gray-600">
          <p>Or reach out directly:</p>
          <p className="mt-2">hello@blackbronze.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact

