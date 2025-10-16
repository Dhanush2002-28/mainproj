import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/DemoAuthContext";
import { Link } from "react-router-dom";

interface DashboardStats {
  totalTransactions: number;
  fraudDetected: number;
  legitimateTransactions: number;
  totalSaved: string;
  fraudRate: number;
  avgTransactionAmount: string;
  recentTransactions: Array<{
    id: string;
    amount: number;
    status: string;
    confidence: number;
    time: string;
    user: string;
    category?: string;
    paymentMethod?: string;
  }>;
  paymentMethodStats?: Array<{
    method: string;
    total: number;
    fraud: number;
    fraud_rate: number;
  }>;
}

const DashboardPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
    checkUserStatus();
  }, [userProfile]);

  const checkUserStatus = () => {
    if (userProfile) {
      const now = new Date();
      const createdAt = new Date(userProfile.createdAt);
      const timeDiff = now.getTime() - createdAt.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);

      // Check if user is new (created within last 24 hours) or first login in this session
      const isFirstLogin = !localStorage.getItem("hasLoggedInBefore");
      const isRecentUser = daysDiff < 1;

      setIsNewUser(isFirstLogin || isRecentUser);

      // Mark that user has logged in before
      if (isFirstLogin) {
        localStorage.setItem("hasLoggedInBefore", "true");
      }
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }
      const data = await response.json();
      setDashboardStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Create stats array from API data
  const stats = dashboardStats
    ? [
        {
          title: "Total Transactions",
          value: dashboardStats.totalTransactions.toLocaleString("en-IN"),
          change: `${dashboardStats.fraudRate.toFixed(1)}% fraud rate`,
          icon: BarChart3,
          color: "text-blue-600",
        },
        {
          title: "Fraud Detected",
          value: dashboardStats.fraudDetected.toLocaleString("en-IN"),
          change: `${(
            (dashboardStats.fraudDetected / dashboardStats.totalTransactions) *
            100
          ).toFixed(1)}%`,
          icon: AlertTriangle,
          color: "text-red-600",
        },
        {
          title: "Legitimate",
          value: dashboardStats.legitimateTransactions.toLocaleString("en-IN"),
          change: `${(
            (dashboardStats.legitimateTransactions /
              dashboardStats.totalTransactions) *
            100
          ).toFixed(1)}%`,
          icon: CheckCircle,
          color: "text-green-600",
        },
        {
          title: "Total Saved",
          value: dashboardStats.totalSaved,
          change: `${dashboardStats.avgTransactionAmount} avg`,
          icon: DollarSign,
          color: "text-purple-600",
        },
      ]
    : [];

  const recentTransactions = dashboardStats?.recentTransactions || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isNewUser
                  ? `Welcome to FraudGuard AI, ${
                      userProfile?.displayName || "User"
                    }!`
                  : `Welcome back, ${userProfile?.displayName || "User"}!`}
              </h1>
              <p className="text-gray-600">
                {isNewUser
                  ? "Get started with our comprehensive fraud detection system and explore the powerful analytics dashboard below."
                  : "Here's your latest fraud detection dashboard overview and system insights."}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/fraud-detection">
                <Button className="bg-primary hover:bg-primary/90">
                  <Shield className="h-4 w-4 mr-2" />
                  New Analysis
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change} from last month
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full bg-gray-100 ${stat.color}`}
                    >
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* New User Welcome Card */}
        {isNewUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      🎉 Welcome to FraudGuard AI!
                    </h3>
                    <p className="text-blue-100 mb-4">
                      You're now protected by our advanced fraud detection
                      system. Start by analyzing your first transaction or
                      explore our analytics dashboard.
                    </p>
                    <div className="flex gap-3">
                      <Link to="/fraud-detection">
                        <Button variant="secondary" size="sm">
                          Start First Analysis
                        </Button>
                      </Link>
                      <Link to="/about">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white hover:bg-white/10"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Shield className="h-16 w-16 text-blue-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>
                  Latest fraud detection results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.status === "fraud"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {transaction.status === "fraud" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.id}
                          </p>
                          <p className="text-sm text-gray-600">
                            {transaction.user}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₹
                          {transaction.amount.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.confidence.toFixed(1)}% confidence
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{transaction.time}</span>
                          {transaction.category && (
                            <span className="px-2 py-1 bg-gray-100 rounded">
                              {transaction.category}
                            </span>
                          )}
                          {transaction.paymentMethod && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {transaction.paymentMethod}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks and analysis tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/fraud-detection">
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Analyze New Transaction
                  </Button>
                </Link>

                <Link to="/analytics">
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics Report
                  </Button>
                </Link>

                <Link to="/users">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manage User Accounts
                  </Button>
                </Link>

                <Link to="/flagged-transactions">
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Review Flagged Transactions
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>AI model performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Model Accuracy</span>
                    <span className="text-sm text-green-600 font-semibold">
                      98.7%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "98.7%" }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm text-blue-600 font-semibold">
                      45ms avg
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">System Uptime</span>
                    <span className="text-sm text-purple-600 font-semibold">
                      99.9%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: "99.9%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
