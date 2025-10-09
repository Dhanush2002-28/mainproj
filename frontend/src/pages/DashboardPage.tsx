import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { userProfile } = useAuth();

  const stats = [
    {
      title: 'Total Transactions',
      value: '1,234',
      change: '+12.5%',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Fraud Detected',
      value: '23',
      change: '-5.2%',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Legitimate',
      value: '1,211',
      change: '+14.1%',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Total Saved',
      value: '$45,230',
      change: '+8.7%',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      amount: 1250.00,
      status: 'fraud',
      confidence: 94.5,
      time: '2 hours ago',
      user: 'john.doe@email.com'
    },
    {
      id: 'TXN002',
      amount: 45.99,
      status: 'legitimate',
      confidence: 98.2,
      time: '3 hours ago',
      user: 'jane.smith@email.com'
    },
    {
      id: 'TXN003',
      amount: 899.50,
      status: 'fraud',
      confidence: 87.3,
      time: '5 hours ago',
      user: 'mike.wilson@email.com'
    },
    {
      id: 'TXN004',
      amount: 25.00,
      status: 'legitimate',
      confidence: 95.8,
      time: '6 hours ago',
      user: 'sarah.jones@email.com'
    }
  ];

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
                Welcome back, {userProfile?.displayName || 'User'}!
              </h1>
              <p className="text-gray-600">
                Here's your fraud detection dashboard overview
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
                      <p className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          transaction.status === 'fraud' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {transaction.status === 'fraud' ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.id}</p>
                          <p className="text-sm text-gray-600">{transaction.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.confidence}% confidence
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.time}
                        </p>
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
                
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics Report
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage User Accounts
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Review Flagged Transactions
                </Button>
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
                    <span className="text-sm text-green-600 font-semibold">98.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm text-blue-600 font-semibold">45ms avg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">System Uptime</span>
                    <span className="text-sm text-purple-600 font-semibold">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
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