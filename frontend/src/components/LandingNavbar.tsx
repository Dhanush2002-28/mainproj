import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: 0,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg -z-10"
              />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-gray-800"
              >
                FraudShield
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-600"
              >
                AI-Powered Protection
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              About
            </button>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Learn More
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/fraud-detection">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg">
                Try Detection
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 text-left"
              >
                About
              </button>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn More
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 text-left"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-700 hover:bg-gray-100"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link
                  to="/fraud-detection"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Try Detection
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default LandingNavbar;
