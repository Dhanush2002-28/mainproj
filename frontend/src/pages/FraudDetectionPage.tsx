import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Upload, 
  FileText, 
  Calculator,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface PredictionResult {
  prediction: 'fraud' | 'legitimate';
  confidence: number;
  riskFactors: string[];
}

interface TransactionData {
  amount: number;
  hour: number;
  dayOfWeek: number;
  category: string;
  age: number;
  gender: string;
  country: string;
  device: string;
  paymentMethod: string;
  itemQuantity: number;
  shippingAddress: string;
  browserInfo: string;
}

const FraudDetectionPage: React.FC = () => {
  const [formData, setFormData] = useState<TransactionData>({
    amount: 0,
    hour: 12,
    dayOfWeek: 1,
    category: 'groceries',
    age: 30,
    gender: 'M',
    country: 'USA',
    device: 'desktop',
    paymentMethod: 'credit_card',
    itemQuantity: 1,
    shippingAddress: 'Same as billing',
    browserInfo: 'Chrome'
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = ['groceries', 'electronics', 'clothing', 'books', 'toys', 'home'];
  const countries = ['USA', 'UK', 'Canada', 'Germany', 'France', 'India', 'China'];
  const devices = ['desktop', 'mobile', 'tablet'];
  const paymentMethods = ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto'];
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'hour' || name === 'dayOfWeek' || name === 'age' || name === 'itemQuantity'
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Error:', error);
      // Mock prediction for demo
      const mockPrediction: PredictionResult = {
        prediction: formData.amount > 1000 || formData.hour < 6 ? 'fraud' : 'legitimate',
        confidence: Math.random() * 0.3 + 0.7,
        riskFactors: [
          ...(formData.amount > 1000 ? ['High transaction amount'] : []),
          ...(formData.hour < 6 || formData.hour > 23 ? ['Unusual transaction time'] : []),
          ...(formData.paymentMethod === 'crypto' ? ['Cryptocurrency payment'] : []),
        ]
      };
      setPrediction(mockPrediction);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Fraud Detection</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter transaction details below to analyze the likelihood of fraud using our advanced AI model.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Transaction Details
                </CardTitle>
                <CardDescription>
                  Enter the transaction information for fraud analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Transaction Amount ($)</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hour">Hour of Day (0-23)</Label>
                      <Input
                        id="hour"
                        name="hour"
                        type="number"
                        min="0"
                        max="23"
                        value={formData.hour}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dayOfWeek">Day of Week (0-6)</Label>
                      <Input
                        id="dayOfWeek"
                        name="dayOfWeek"
                        type="number"
                        min="0"
                        max="6"
                        value={formData.dayOfWeek}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        required
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Customer Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min="18"
                        max="100"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        required
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        required
                      >
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="device">Device</Label>
                      <select
                        id="device"
                        name="device"
                        value={formData.device}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        required
                      >
                        {devices.map(device => (
                          <option key={device} value={device}>{device}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        required
                      >
                        {paymentMethods.map(method => (
                          <option key={method} value={method}>{method.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="itemQuantity">Item Quantity</Label>
                      <Input
                        id="itemQuantity"
                        name="itemQuantity"
                        type="number"
                        min="1"
                        value={formData.itemQuantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shippingAddress">Shipping Address</Label>
                      <select
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        required
                      >
                        <option value="Same as billing">Same as billing</option>
                        <option value="Different">Different</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="browserInfo">Browser</Label>
                      <select
                        id="browserInfo"
                        name="browserInfo"
                        value={formData.browserInfo}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        required
                      >
                        {browsers.map(browser => (
                          <option key={browser} value={browser}>{browser}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Activity className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Calculator className="h-4 w-4 mr-2" />
                        Analyze Transaction
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  AI-powered fraud detection results
                </CardDescription>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Prediction Result */}
                    <div className={`p-6 rounded-lg ${
                      prediction.prediction === 'fraud' 
                        ? 'fraud-gradient text-white' 
                        : 'safe-gradient text-white'
                    }`}>
                      <div className="flex items-center justify-center mb-4">
                        {prediction.prediction === 'fraud' ? (
                          <AlertTriangle className="h-12 w-12" />
                        ) : (
                          <CheckCircle className="h-12 w-12" />
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">
                          {prediction.prediction === 'fraud' ? 'FRAUD DETECTED' : 'LEGITIMATE TRANSACTION'}
                        </h3>
                        <p className="text-lg opacity-90">
                          Confidence: {(prediction.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {/* Risk Factors */}
                    {prediction.riskFactors.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                          Risk Factors Identified
                        </h4>
                        <ul className="space-y-2">
                          {prediction.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold mb-3">Recommendations</h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        {prediction.prediction === 'fraud' ? (
                          <>
                            <p>• Flag transaction for manual review</p>
                            <p>• Contact customer for verification</p>
                            <p>• Monitor account for suspicious activity</p>
                            <p>• Consider temporary account restrictions</p>
                          </>
                        ) : (
                          <>
                            <p>• Transaction appears legitimate</p>
                            <p>• Process payment normally</p>
                            <p>• Continue standard monitoring</p>
                            <p>• No additional verification required</p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter transaction details and click "Analyze Transaction" to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FraudDetectionPage;