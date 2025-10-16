import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Upload,
  FileText,
  Calculator,
  TrendingUp,
  Activity,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface PredictionResult {
  is_fraud: boolean;
  fraud_probability: number;
  xgb_probability: number;
  risk_level: string;
  risk_factors: string[];
  transaction_id: string;
  timestamp: string;
}

interface TransactionData {
  amount: number | string;
  hour: number | string;
  dayOfWeek: number | string;
  category: string;
  age: number | string;
  gender: string;
  country: string;
  device: string;
  paymentMethod: string;
  itemQuantity: number | string;
  shippingAddress: string;
  browserInfo: string;
}

const FraudDetectionPage: React.FC = () => {
  const [formData, setFormData] = useState<TransactionData>({
    amount: "",
    hour: "",
    dayOfWeek: "",
    category: "",
    age: "",
    gender: "",
    country: "",
    device: "",
    paymentMethod: "",
    itemQuantity: "",
    shippingAddress: "",
    browserInfo: "",
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "groceries",
    "electronics",
    "clothing",
    "books",
    "food_delivery",
    "mobile_recharge",
  ];
  const countries = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Pune",
    "Hyderabad",
  ];
  const devices = ["mobile", "desktop", "tablet"];
  const paymentMethods = [
    "upi",
    "credit_card",
    "debit_card",
    "net_banking",
    "wallet",
  ];
  const browsers = ["Chrome", "Firefox", "Safari", "Edge"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount" ||
        name === "hour" ||
        name === "dayOfWeek" ||
        name === "age" ||
        name === "itemQuantity"
          ? value === "" ? "" : (parseFloat(value) || "")
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Transform form data to match API expectations
      const apiData = {
        amount: parseFloat(formData.amount as string) || 0,
        payment_method: formData.paymentMethod,
        category: formData.category,
        gender: formData.gender,
        city: formData.country, // Using country field as city for Indian context
        device: formData.device,
        shipping_address: formData.shippingAddress,
        browser_info: formData.browserInfo,
        age: parseInt(formData.age as string) || 0,
        hour: parseInt(formData.hour as string) || 0,
        day_of_week: parseInt(formData.dayOfWeek as string) || 0,
        is_weekend: (parseInt(formData.dayOfWeek as string) || 0) === 0 || (parseInt(formData.dayOfWeek as string) || 0) === 6, // Sunday=0, Saturday=6
        is_new_device: false, // Default value
        is_different_city: false, // Default value
        failed_attempts: 0, // Default value
        shipping_billing_match: formData.shippingAddress === "Same as billing",
        account_age: 365, // Default 1 year old account
        transaction_frequency: 5, // Default frequency
      };

      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Failed to connect to the fraud detection service. Please check if the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const generatePDFReport = async () => {
    if (!prediction) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(0, 100, 200);
    pdf.text("Fraud Detection Analysis Report", pageWidth / 2, 20, {
      align: "center",
    });

    // Transaction Details
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Transaction Details", 20, 40);

    pdf.setFontSize(11);
    let yPos = 50;

    const transactionDetails = [
      `Transaction ID: ${prediction.transaction_id}`,
      `Date & Time: ${new Date(prediction.timestamp).toLocaleString()}`,
      `Amount: ₹${formData.amount.toLocaleString("en-IN")}`,
      `Payment Method: ${formData.paymentMethod}`,
      `Category: ${formData.category}`,
      `City: ${formData.country}`,
      `Device: ${formData.device}`,
      `Age: ${formData.age}`,
      `Hour: ${formData.hour}:00`,
      `Day of Week: ${
        [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][formData.dayOfWeek]
      }`,
      `Item Quantity: ${formData.itemQuantity}`,
      `Shipping Address: ${formData.shippingAddress}`,
      `Browser: ${formData.browserInfo}`,
    ];

    transactionDetails.forEach((detail) => {
      pdf.text(detail, 20, yPos);
      yPos += 8;
    });

    // Analysis Results
    yPos += 10;
    pdf.setFontSize(16);
    pdf.text("Analysis Results", 20, yPos);
    yPos += 15;

    pdf.setFontSize(12);
    if (prediction.is_fraud) {
      pdf.setTextColor(220, 20, 60); // Red for fraud
    } else {
      pdf.setTextColor(34, 139, 34); // Green for legitimate
    }
    pdf.text(
      `Result: ${
        prediction.is_fraud ? "FRAUD DETECTED" : "LEGITIMATE TRANSACTION"
      }`,
      20,
      yPos
    );
    yPos += 10;

    pdf.setTextColor(0, 0, 0);
    pdf.text(
      `Fraud Probability: ${prediction.fraud_probability.toFixed(2)}%`,
      20,
      yPos
    );
    yPos += 8;
    pdf.text(`Risk Level: ${prediction.risk_level}`, 20, yPos);
    yPos += 15;

    // Risk Factors
    if (prediction.risk_factors.length > 0) {
      pdf.setFontSize(14);
      pdf.text("Risk Factors Identified:", 20, yPos);
      yPos += 10;

      pdf.setFontSize(11);
      prediction.risk_factors.forEach((factor, index) => {
        const text = `${index + 1}. ${factor}`;
        const lines = pdf.splitTextToSize(text, pageWidth - 40);
        pdf.text(lines, 25, yPos);
        yPos += lines.length * 6;

        if (yPos > 270) {
          // Check if we need a new page
          pdf.addPage();
          yPos = 20;
        }
      });
    } else {
      pdf.text("No specific risk factors identified.", 20, yPos);
      yPos += 10;
    }

    // Recommendations
    yPos += 10;
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.setFontSize(14);
    pdf.text("Recommendations:", 20, yPos);
    yPos += 10;

    pdf.setFontSize(11);
    const recommendations = prediction.is_fraud
      ? [
          "• Flag transaction for manual review",
          "• Contact customer for verification",
          "• Monitor account for suspicious activity",
          "• Consider temporary account restrictions",
        ]
      : [
          "• Transaction appears legitimate",
          "• Continue normal processing",
          "• Maintain regular monitoring",
        ];

    recommendations.forEach((rec) => {
      pdf.text(rec, 20, yPos);
      yPos += 8;
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      `Generated on: ${new Date().toLocaleString()}`,
      20,
      pdf.internal.pageSize.height - 10
    );
    pdf.text(
      "AI Fraud Detection System - Confidential Report",
      pageWidth / 2,
      pdf.internal.pageSize.height - 10,
      { align: "center" }
    );

    // Save the PDF
    pdf.save(`fraud-analysis-${prediction.transaction_id}.pdf`);
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
            <h1 className="text-4xl font-bold text-gray-900">
              AI Fraud Detection - India
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter Indian transaction details below to analyze fraud risk using
            AI using our advanced AI model.
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
                      <Label htmlFor="amount">Transaction Amount (₹)</Label>
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
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
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
                      <Label htmlFor="country">City</Label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        required
                      >
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
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
                        {devices.map((device) => (
                          <option key={device} value={device}>
                            {device}
                          </option>
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
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>
                            {method.replace("_", " ")}
                          </option>
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
                        {browsers.map((browser) => (
                          <option key={browser} value={browser}>
                            {browser}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
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
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <p className="text-red-500 font-medium">Error</p>
                    </div>
                    <p className="text-red-400 mt-1">{error}</p>
                  </motion.div>
                )}
                {prediction ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Prediction Result */}
                    <div
                      className={`p-6 rounded-lg ${
                        prediction.is_fraud
                          ? "fraud-gradient text-white"
                          : "safe-gradient text-white"
                      }`}
                    >
                      <div className="flex items-center justify-center mb-4">
                        {prediction.is_fraud ? (
                          <AlertTriangle className="h-12 w-12" />
                        ) : (
                          <CheckCircle className="h-12 w-12" />
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">
                          {prediction.is_fraud
                            ? "FRAUD DETECTED"
                            : "LEGITIMATE TRANSACTION"}
                        </h3>
                        <p className="text-lg opacity-90">
                          Confidence: {prediction.fraud_probability.toFixed(1)}%
                        </p>
                        <p className="text-sm opacity-75">
                          Risk Level: {prediction.risk_level} | XGB:{" "}
                          {prediction.xgb_probability.toFixed(1)}%
                        </p>
                        <p className="text-xs opacity-60">
                          Transaction ID: {prediction.transaction_id}
                        </p>
                      </div>
                    </div>

                    {/* Risk Factors */}
                    {prediction.risk_factors.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                          Risk Factors Identified
                        </h4>
                        <ul className="space-y-2">
                          {prediction.risk_factors.map(
                            (factor: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-center text-sm"
                              >
                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                                {factor}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold mb-3">Recommendations</h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        {prediction.is_fraud ? (
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

                    {/* Download PDF Report Button */}
                    <div className="pt-4 border-t border-gray-200">
                      <Button
                        onClick={generatePDFReport}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Analysis Report (PDF)
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>
                      Enter transaction details and click "Analyze Transaction"
                      to see results
                    </p>
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
