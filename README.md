# FraudGuard AI - Advanced Fraud Detection System

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Machine Learning Models](#machine-learning-models)
- [Firebase Integration](#firebase-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🎯 Project Overview

FraudGuard AI is a comprehensive fraud detection system that leverages advanced machine learning algorithms to identify potentially fraudulent transactions in real-time. The system combines cutting-edge AI technology with an intuitive user interface to provide businesses with robust fraud prevention capabilities.

### Key Objectives

- **Real-time Detection**: Instant fraud analysis with millisecond response times
- **High Accuracy**: Achieve >86% accuracy in fraud identification
- **User-Friendly Interface**: Intuitive React-based dashboard for easy management
- **Scalable Architecture**: Cloud-native design for enterprise-scale deployments
- **Comprehensive Analytics**: Detailed reporting and risk assessment capabilities

## ✨ Features

### Core Functionality

- **AI-Powered Detection**: Advanced machine learning models for accurate fraud prediction
- **Real-time Analysis**: Instant transaction evaluation and risk scoring
- **User Authentication**: Secure Firebase-based authentication system
- **Interactive Dashboard**: Comprehensive overview of fraud detection metrics
- **Transaction Analysis**: Detailed analysis interface for individual transactions
- **Risk Assessment**: Multi-factor risk evaluation and scoring
- **Historical Analytics**: Trend analysis and reporting capabilities

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Customizable UI themes
- **Animated Components**: Smooth, professional animations using Framer Motion
- **Accessible Interface**: WCAG-compliant design for inclusivity
- **Real-time Updates**: Live dashboard updates and notifications

## 🛠 Technology Stack

### Frontend

- **React 18.2.0**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development environment
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Beautiful and accessible UI components
- **Framer Motion**: Advanced animations and transitions
- **React Router**: Client-side routing and navigation

### Backend

- **Python 3.9+**: Core backend language
- **Flask**: Lightweight web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Pandas**: Data manipulation and analysis
- **Scikit-learn**: Machine learning library
- **XGBoost**: Gradient boosting framework
- **NumPy**: Numerical computing

### Database & Authentication

- **Firebase Authentication**: Secure user management
- **Firestore**: NoSQL document database
- **CSV Datasets**: Training data storage

## 🚀 Installation Guide

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.9+
- Git

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and Firestore
   - Copy your Firebase config to `.env` file

4. **Start development server**
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd src
   ```

2. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r ../requirements.txt
   ```

4. **Train the models**

   ```bash
   python train_model.py
   python train_xgb_model.py
   ```

5. **Start the Flask server**
   ```bash
   python app.py
   ```

## 📱 Usage

### Dashboard Overview

- View key metrics and fraud detection statistics
- Monitor recent transactions
- Access system performance metrics
- Check real-time fraud rates

### Fraud Detection Analysis

1. Navigate to "Transaction Analysis" page
2. Enter transaction details in the form
3. Click "Analyze Transaction"
4. Review the AI-powered results and risk factors
5. Take appropriate action based on recommendations

## 🔌 API Documentation

### Base URL

```
http://localhost:5000
```

### Endpoints

#### Health Check

```http
GET /api/health
```

#### Fraud Prediction

```http
POST /api/predict
Content-Type: application/json
```

#### Dashboard Statistics

```http
GET /api/stats
```

## 🤖 Machine Learning Models

### Model Architecture

The system employs dual model approach:

1. **Random Forest Classifier**

   - Handles complex feature interactions
   - Provides feature importance rankings
   - Robust against overfitting

2. **XGBoost**
   - Gradient boosting for high performance
   - Excellent handling of imbalanced data
   - Fast prediction times

### Model Performance

- **Accuracy**: >86% on test data
- **Features**: 15+ parameters including amount, payment method, location, timing
- **Indian Market Focus**: Specialized for Indian transaction patterns

## 🔥 Firebase Integration

### Authentication

- Email/Password authentication
- User profile management
- Secure session handling

### Firestore Database

- User data storage
- Transaction history
- Security rules implemented

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect repository to Vercel
2. Set environment variables
3. Deploy with automatic builds

### Backend Deployment (Railway/Heroku)

1. Create app on platform
2. Set environment variables
3. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:

- **GitHub Issues**: [Project Issues](https://github.com/Dhanush2002-28/mainproj/issues)
- **Email**: Contact repository owner

---

**Built with ❤️ for secure financial transactions**

_Protecting businesses from financial fraud, one transaction at a time._
