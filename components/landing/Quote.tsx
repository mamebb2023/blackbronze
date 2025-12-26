"use client";

import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tag } from "../ui/Tag";

const Quote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request submitted:", formData);
    // TODO: Add API call or form submission logic here
  };

  return (
    <section id="quote" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <Tag>Get Started</Tag>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-400 to-white">
              Request a Quote
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Tell us about your project and we&apos;ll get back to you with a
            customized quote tailored to your needs.
          </motion.p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-800/50 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              {/* Company and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Project Type and Budget Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="projectType"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all"
                  >
                    <option value="" className="bg-gray-800">
                      Select project type
                    </option>
                    <option value="website" className="bg-gray-800">
                      Website
                    </option>
                    <option value="web-app" className="bg-gray-800">
                      Web Application
                    </option>
                    <option value="mobile-app" className="bg-gray-800">
                      Mobile App
                    </option>
                    <option value="ecommerce" className="bg-gray-800">
                      E-commerce
                    </option>
                    <option value="consulting" className="bg-gray-800">
                      Consulting
                    </option>
                    <option value="other" className="bg-gray-800">
                      Other
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="budget"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all"
                  >
                    <option value="" className="bg-gray-800">
                      Select budget range
                    </option>
                    <option value="5k-10k" className="bg-gray-800">
                      $5,000 - $10,000
                    </option>
                    <option value="10k-25k" className="bg-gray-800">
                      $10,000 - $25,000
                    </option>
                    <option value="25k-50k" className="bg-gray-800">
                      $25,000 - $50,000
                    </option>
                    <option value="50k-100k" className="bg-gray-800">
                      $50,000 - $100,000
                    </option>
                    <option value="100k+" className="bg-gray-800">
                      $100,000+
                    </option>
                  </select>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <label
                  htmlFor="timeline"
                  className="text-gray-300 text-sm font-medium"
                >
                  Project Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all"
                >
                  <option value="" className="bg-gray-800">
                    Select timeline
                  </option>
                  <option value="asap" className="bg-gray-800">
                    ASAP
                  </option>
                  <option value="1-3months" className="bg-gray-800">
                    1 - 3 months
                  </option>
                  <option value="3-6months" className="bg-gray-800">
                    3 - 6 months
                  </option>
                  <option value="6-12months" className="bg-gray-800">
                    6 - 12 months
                  </option>
                  <option value="flexible" className="bg-gray-800">
                    Flexible
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-gray-300 text-sm font-medium"
                >
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all resize-none"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-4"
              >
                <Button type="submit" variant="liquid" className="w-full md:w-auto">
                  Submit Quote Request
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;

