import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Zap,
  Brain,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Lock,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LandingNavbar from "@/components/LandingNavbar";

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Detection",
      description:
        "97.59% accuracy with ensemble machine learning models analyzing 12+ risk factors",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Lightning-fast fraud detection with results in under 50ms",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Comprehensive Risk Assessment",
      description:
        "Multi-factor analysis beyond transaction amounts including behavior patterns",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description:
        "Bank-grade security with encrypted data processing and secure API endpoints",
      color: "from-purple-500 to-violet-500",
    },
  ];

  const stats = [
    {
      icon: Shield,
      value: "97.59%",
      label: "Detection Accuracy",
      color: "text-blue-600",
    },
    {
      icon: Zap,
      value: "<50ms",
      label: "Response Time",
      color: "text-yellow-600",
    },
    {
      icon: Users,
      value: "12+",
      label: "Risk Factors",
      color: "text-green-600",
    },
    {
      icon: BarChart3,
      value: "100%",
      label: "API Uptime",
      color: "text-purple-600",
    },
  ];

  const testimonials = [
    {
      name: "Raj Patel",
      role: "CTO, FinTech Solutions",
      content:
        "FraudGuard AI reduced our false positives by 85% while catching more actual fraud attempts.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Risk Manager, Digital Bank",
      content:
        "The comprehensive risk analysis gives us confidence in our fraud detection decisions.",
      rating: 5,
    },
    {
      name: "Arjun Kumar",
      role: "Security Lead, E-commerce",
      content:
        "Implementation was seamless and the accuracy improvements were immediate.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-200/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            {/* Enhanced Animated Logo - Same as Navbar but Larger */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center justify-center mb-8"
            >
              <div className="flex items-center space-x-6">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: 0,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-2xl">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 0.3, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg -z-10"
                  />
                </motion.div>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold text-gray-800"
                  >
                    FraudShield
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg text-gray-600"
                  >
                    AI-Powered Protection
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                FraudShield AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Revolutionary fraud detection powered by advanced machine
              learning. Analyze 12+ risk factors with 97.59% accuracy to protect
              your business from financial fraud in real-time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link to="/fraud-detection">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  Try Detection Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>

            {/* Demo Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500 font-mono">
                    FraudGuard AI Dashboard
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                    >
                      <stat.icon
                        className={`h-8 w-8 mx-auto mb-2 ${stat.color}`}
                      />
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 text-center"
                >
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-green-800">
                    System Status: All Systems Operational
                  </div>
                  <div className="text-sm text-green-600">
                    Ready for fraud detection analysis
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FraudGuard AI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced fraud detection that goes beyond traditional methods with
              comprehensive risk analysis and machine learning intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-r from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what security professionals and business leaders say about
              FraudGuard AI's impact on their fraud prevention efforts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Protect Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already protected by FraudGuard AI's
              advanced fraud detection system. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/fraud-detection">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Try Detection Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold">FraudShield AI</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Advanced fraud detection powered by machine learning. Protecting
                businesses with 97.59% accuracy and comprehensive risk analysis.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/fraud-detection" className="hover:text-white">
                    Try Detection
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FraudShield AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
