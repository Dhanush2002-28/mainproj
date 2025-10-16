import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Shield,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  ArrowLeft,
  Filter,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface FlaggedTransaction {
  id: string;
  transactionId: string;
  amount: number;
  paymentMethod: string;
  category: string;
  userEmail: string;
  fraudProbability: number;
  riskLevel: string;
  status: "pending" | "approved" | "rejected";
  flaggedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  riskFactors: string[];
}

const FlaggedTransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  // Mock data - in real app, this would come from an API
  const [transactions] = useState<FlaggedTransaction[]>([
    {
      id: "1",
      transactionId: "TXN7504",
      amount: 125000,
      paymentMethod: "wallet",
      category: "electronics",
      userEmail: "user_493@email.com",
      fraudProbability: 97.59,
      riskLevel: "High",
      status: "pending",
      flaggedAt: "2025-10-12 14:30",
      riskFactors: [
        "Above average transaction amount (>₹50K)",
        "Higher risk payment method: wallet",
        "High-risk category: electronics",
        "Weekend transaction",
      ],
    },
    {
      id: "2",
      transactionId: "TXN8934",
      amount: 89000,
      paymentMethod: "net_banking",
      category: "jewelry",
      userEmail: "priya.sharma@email.com",
      fraudProbability: 85.23,
      riskLevel: "High",
      status: "rejected",
      flaggedAt: "2025-10-12 12:15",
      reviewedBy: "Admin User",
      reviewedAt: "2025-10-12 12:45",
      riskFactors: [
        "High transaction amount (>₹1L)",
        "High-risk category: jewelry",
        "New account (less than 1 month)",
        "Off-hours transaction",
      ],
    },
    {
      id: "3",
      transactionId: "TXN4521",
      amount: 45000,
      paymentMethod: "credit_card",
      category: "travel",
      userEmail: "rahul.kumar@email.com",
      fraudProbability: 72.15,
      riskLevel: "Medium",
      status: "approved",
      flaggedAt: "2025-10-12 10:30",
      reviewedBy: "Security Team",
      reviewedAt: "2025-10-12 11:15",
      riskFactors: [
        "Above average transaction amount (>₹50K)",
        "Transaction from different city than usual",
        "Weekend transaction",
      ],
    },
    {
      id: "4",
      transactionId: "TXN2847",
      amount: 156000,
      paymentMethod: "wallet",
      category: "electronics",
      userEmail: "anita.singh@email.com",
      fraudProbability: 91.47,
      riskLevel: "High",
      status: "pending",
      flaggedAt: "2025-10-12 09:45",
      riskFactors: [
        "Very high transaction amount (>₹2L)",
        "Higher risk payment method: wallet",
        "High-risk category: electronics",
        "Transaction from new/unrecognized device",
        "Multiple failed authentication attempts",
      ],
    },
    {
      id: "5",
      transactionId: "TXN6789",
      amount: 34000,
      paymentMethod: "upi",
      category: "clothing",
      userEmail: "vikram.gupta@email.com",
      fraudProbability: 68.92,
      riskLevel: "Medium",
      status: "pending",
      flaggedAt: "2025-10-12 08:20",
      riskFactors: [
        "Above average transaction amount (>₹50K)",
        "Late night/early morning transaction",
        "New account (less than 3 months)",
      ],
    },
  ]);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.transactionId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesRisk =
      riskFilter === "all" ||
      transaction.riskLevel.toLowerCase() === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-orange-100";
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-orange-600 bg-orange-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="mr-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Flagged Transactions
              </h1>
              <p className="text-gray-600">
                Review and manage transactions flagged for potential fraud
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Total Flagged
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {transactions.length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Pending Review
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {
                        transactions.filter((t) => t.status === "pending")
                          .length
                      }
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      High Risk
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {
                        transactions.filter((t) => t.riskLevel === "High")
                          .length
                      }
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹
                      {transactions
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toLocaleString("en-IN")}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Flagged Transactions ({filteredTransactions.length})
              </CardTitle>
              <CardDescription>
                Review transactions requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="border rounded-lg p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {transaction.transactionId}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1 capitalize">
                              {transaction.status}
                            </span>
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(
                              transaction.riskLevel
                            )}`}
                          >
                            {transaction.riskLevel} Risk
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <DollarSign className="h-4 w-4 inline mr-1" />₹
                            {transaction.amount.toLocaleString("en-IN")}
                          </div>
                          <div>
                            <User className="h-4 w-4 inline mr-1" />
                            {transaction.userEmail}
                          </div>
                          <div className="capitalize">
                            {transaction.paymentMethod.replace("_", " ")} •{" "}
                            {transaction.category}
                          </div>
                          <div>
                            Fraud: {transaction.fraudProbability.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        {transaction.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Risk Factors */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Risk Factors:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {transaction.riskFactors.map((factor, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-700"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="text-xs text-gray-500 border-t pt-3">
                      <div>Flagged: {transaction.flaggedAt}</div>
                      {transaction.reviewedBy && (
                        <div>
                          Reviewed by {transaction.reviewedBy} at{" "}
                          {transaction.reviewedAt}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FlaggedTransactionsPage;
