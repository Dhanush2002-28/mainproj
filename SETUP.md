# Project Setup Instructions

## Quick Start Guide

### 1. Backend Setup (Python/Flask)

```bash
# Navigate to project root
cd mainproj

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Generate dataset
cd data
python generate_data.py

# Train models
cd ../src
python train_model.py
python train_xgb_model.py

# Start Flask server
python app.py
```

### 2. Frontend Setup (React/TypeScript)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Copy configuration to `frontend/src/lib/firebase.ts`

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

## Project Structure

```
mainproj/
├── data/                    # Dataset and data generation
│   ├── bal_dataset.csv
│   └── generate_data.py
├── models/                  # Trained ML models
│   ├── fraud_model.pkl
│   ├── scaler.pkl
│   └── xgb_model.pkl
├── src/                     # Backend Python code
│   ├── app.py              # Flask API server
│   ├── train_model.py      # Model training script
│   └── train_xgb_model.py  # XGBoost training
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── lib/          # Utilities
│   ├── package.json
│   └── vite.config.ts
├── requirements.txt        # Python dependencies
└── README.md              # Documentation
```

## Features Implemented

### ✅ Core Features
- [x] User Authentication (Firebase)
- [x] Login Page with animated UI
- [x] Registration Page with form validation
- [x] Dashboard with analytics
- [x] Fraud Detection Analysis Page
- [x] About Us Page with team info
- [x] Responsive Navigation
- [x] AI-powered fraud detection
- [x] Real-time predictions
- [x] Risk factor analysis

### ✅ Technical Features
- [x] React 18 with TypeScript
- [x] Tailwind CSS styling
- [x] Shadcn/ui components
- [x] Framer Motion animations
- [x] Flask backend API
- [x] Machine Learning models (Random Forest, XGBoost)
- [x] Firebase integration
- [x] CORS enabled API
- [x] Responsive design
- [x] Error handling

### ✅ UI/UX Features
- [x] Glass morphism effects
- [x] Gradient backgrounds
- [x] Smooth animations
- [x] Loading states
- [x] Form validation
- [x] Toast notifications
- [x] Mobile-responsive
- [x] Professional design

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /health  | Health check |
| POST   | /predict | Fraud prediction |
| GET    | /stats   | Dashboard statistics |

## Environment Variables

Create `.env` file in frontend directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

## Troubleshooting

### Common Issues

1. **Module not found errors**: Install all dependencies
   ```bash
   npm install  # Frontend
   pip install -r requirements.txt  # Backend
   ```

2. **Firebase not configured**: Update firebase.ts with your config

3. **Models not found**: Run training scripts first
   ```bash
   python train_model.py
   ```

4. **CORS errors**: Ensure Flask-CORS is installed and configured

5. **Port conflicts**: Check if ports 3000 and 5000 are available

### Development Tips

- Use `npm run dev` for frontend hot reload
- Use `python app.py` with debug=True for backend hot reload
- Check browser console for frontend errors
- Check terminal for backend errors
- Use browser dev tools for network debugging

## Next Steps

1. **Deployment**: Deploy to Vercel (frontend) and Heroku (backend)
2. **Database**: Add persistent storage for transaction history
3. **Analytics**: Add more detailed analytics and reporting
4. **Notifications**: Implement real-time notifications
5. **Testing**: Add comprehensive test suites
6. **Security**: Implement rate limiting and additional security measures

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the logs for error messages
3. Ensure all dependencies are installed
4. Verify environment configuration