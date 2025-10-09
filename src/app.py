from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import numpy as np
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load the trained models
try:
    with open('../models/fraud_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('../models/scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    logger.info("Models loaded successfully")
except Exception as e:
    logger.error(f"Error loading models: {e}")
    model = None
    scaler = None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'models_loaded': model is not None and scaler is not None
    })

@app.route('/predict', methods=['POST'])
def predict_fraud():
    """Predict fraud for a transaction"""
    try:
        # Get JSON data from request
        data = request.json
        logger.info(f"Received prediction request: {data}")
        
        # Validate required fields
        required_fields = [
            'amount', 'hour', 'dayOfWeek', 'category', 'age', 'gender',
            'country', 'device', 'paymentMethod', 'itemQuantity',
            'shippingAddress', 'browserInfo'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create feature vector
        features = create_feature_vector(data)
        
        if model is None or scaler is None:
            # Return mock prediction if models are not loaded
            return get_mock_prediction(data)
        
        # Scale features
        features_scaled = scaler.transform([features])
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        prediction_proba = model.predict_proba(features_scaled)[0]
        
        # Get confidence score
        confidence = max(prediction_proba)
        
        # Determine risk factors
        risk_factors = analyze_risk_factors(data)
        
        result = {
            'prediction': 'fraud' if prediction == 1 else 'legitimate',
            'confidence': float(confidence),
            'riskFactors': risk_factors,
            'timestamp': datetime.now().isoformat()
        }
        
        logger.info(f"Prediction result: {result}")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in prediction: {e}")
        return jsonify({'error': 'Internal server error'}), 500

def create_feature_vector(data):
    """Create feature vector from input data"""
    features = [
        float(data['amount']),
        int(data['hour']),
        int(data['dayOfWeek']),
        int(data['age']),
        int(data['itemQuantity'])
    ]
    
    # One-hot encode categorical variables
    categories = ['home', 'clothing', 'books', 'toys', 'groceries', 'electronics']
    for cat in categories:
        features.append(1 if data['category'] == cat else 0)
    
    # Gender encoding
    features.append(1 if data['gender'] == 'M' else 0)
    
    # Country encoding
    countries = ['France', 'USA', 'UK', 'Canada', 'Germany', 'China', 'India']
    for country in countries:
        features.append(1 if data['country'] == country else 0)
    
    # Device encoding
    devices = ['tablet', 'mobile', 'desktop']
    for device in devices:
        features.append(1 if data['device'] == device else 0)
    
    # Payment method encoding
    payment_methods = ['bank_transfer', 'credit_card', 'debit_card', 'paypal', 'crypto']
    for method in payment_methods:
        features.append(1 if data['paymentMethod'] == method else 0)
    
    # Shipping address encoding
    features.append(1 if data['shippingAddress'] == 'Same as billing' else 0)
    
    # Browser encoding
    browsers = ['Firefox', 'Chrome', 'Edge', 'Safari']
    for browser in browsers:
        features.append(1 if data['browserInfo'] == browser else 0)
    
    return features

def analyze_risk_factors(data):
    """Analyze transaction data for risk factors"""
    risk_factors = []
    
    # High amount
    if float(data['amount']) > 1000:
        risk_factors.append('High transaction amount (>${:.2f})'.format(float(data['amount'])))
    
    # Unusual hours
    hour = int(data['hour'])
    if hour < 6 or hour > 23:
        risk_factors.append('Transaction at unusual hours ({:02d}:00)'.format(hour))
    
    # Cryptocurrency payment
    if data['paymentMethod'] == 'crypto':
        risk_factors.append('Cryptocurrency payment method')
    
    # Different shipping address
    if data['shippingAddress'] == 'Different':
        risk_factors.append('Different shipping address')
    
    # High quantity
    if int(data['itemQuantity']) > 5:
        risk_factors.append('High item quantity ({})'.format(data['itemQuantity']))
    
    # Weekend transactions for high amounts
    if int(data['dayOfWeek']) in [0, 6] and float(data['amount']) > 500:
        risk_factors.append('High-value weekend transaction')
    
    return risk_factors

def get_mock_prediction(data):
    """Generate mock prediction when models are not available"""
    # Simple rule-based mock prediction
    amount = float(data['amount'])
    hour = int(data['hour'])
    payment_method = data['paymentMethod']
    
    is_fraud = False
    confidence = 0.75
    
    # High amount transactions
    if amount > 1000:
        is_fraud = True
        confidence = 0.85
    
    # Night time transactions
    if hour < 6 or hour > 23:
        if amount > 200:
            is_fraud = True
            confidence = 0.80
    
    # Crypto payments
    if payment_method == 'crypto' and amount > 100:
        is_fraud = True
        confidence = 0.90
    
    # Add some randomness for legitimate transactions
    if not is_fraud:
        confidence = np.random.uniform(0.70, 0.95)
    
    risk_factors = analyze_risk_factors(data)
    
    return jsonify({
        'prediction': 'fraud' if is_fraud else 'legitimate',
        'confidence': confidence,
        'riskFactors': risk_factors,
        'timestamp': datetime.now().isoformat(),
        'note': 'Mock prediction - models not loaded'
    })

@app.route('/stats', methods=['GET'])
def get_stats():
    """Get dashboard statistics"""
    # Mock statistics for demo
    stats = {
        'totalTransactions': 1234,
        'fraudDetected': 23,
        'legitimate': 1211,
        'totalSaved': 45230.50,
        'accuracyRate': 98.7,
        'responseTime': 45,
        'uptime': 99.9,
        'recentTransactions': [
            {
                'id': 'TXN001',
                'amount': 1250.00,
                'status': 'fraud',
                'confidence': 94.5,
                'time': '2 hours ago',
                'user': 'john.doe@email.com'
            },
            {
                'id': 'TXN002',
                'amount': 45.99,
                'status': 'legitimate',
                'confidence': 98.2,
                'time': '3 hours ago',
                'user': 'jane.smith@email.com'
            }
        ]
    }
    
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
