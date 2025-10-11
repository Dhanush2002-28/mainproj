#!/usr/bin/env python3
"""
Retrain fraud detection model using only API-available features
"""

import pandas as pd
import pickle
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE

print("🔄 Retraining fraud detection model with API-compatible features...")

# ============================
# 1. Load the Dataset
# ============================
data_path = "../data/sophisticated_indian_dataset.csv"
df = pd.read_csv(data_path)
print("� Sophisticated Indian Dataset Loaded Successfully")

# ============================
# 2. Feature Selection (API-compatible only)
# ============================

# Select only the features that the API can provide
api_features = [
    'amount', 'hour', 'day_of_week', 'category', 'age', 'gender',
    'country', 'device', 'payment_method', 'item_quantity',
    'shipping_address', 'browser_info'
]

# Keep only API-compatible features
X = df[api_features].copy()
y = df['is_fraud']

print(f"📊 Using {len(api_features)} API-compatible features")
print(f"📈 Dataset shape: {X.shape}")

# ============================
# 3. Preprocessing
# ============================

# One-hot encode categorical variables (same as training)
categorical_columns = ['category', 'gender', 'country', 'device', 'payment_method', 'shipping_address', 'browser_info']

print("🔧 One-hot encoding categorical features...")
X_encoded = pd.get_dummies(X, columns=categorical_columns, drop_first=True)

print(f"📈 After encoding shape: {X_encoded.shape}")
print(f"📝 Features: {list(X_encoded.columns)}")

# Standardize all features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_encoded)

# Split with stratification to preserve class balance
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, stratify=y, random_state=42
)

# Handle class imbalance (just in case)
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

print(f"📊 Training set shape: {X_train_res.shape}")
print(f"📊 Test set shape: {X_test.shape}")

# ============================
# 4. Model Building
# ============================

print("🤖 Building stacking classifier...")

# Base models with balanced class weights
base_models = [
    ("rf", RandomForestClassifier(n_estimators=100, random_state=42, class_weight="balanced")),
    ("lr", LogisticRegression(max_iter=1000, class_weight="balanced")),
]

# Meta model
meta_model = LogisticRegression(max_iter=1000, class_weight="balanced")

# Stacking classifier
model = StackingClassifier(
    estimators=base_models,
    final_estimator=meta_model,
    passthrough=True
)

# ============================
# 5. Train the Model
# ============================
print("🔥 Training model...")
model.fit(X_train_res, y_train_res)

# ============================
# 6. Evaluate the Model
# ============================
print("📊 Evaluating model...")
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model trained successfully!\nAccuracy: {accuracy:.4f}")

print("\n📈 Classification Report:")
print(classification_report(y_test, y_pred))

print("📊 Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# ============================
# 7. Save the Model and Feature Info
# ============================
print("💾 Saving model and preprocessing info...")

# Save the model
with open("../models/fraud_model.pkl", "wb") as f:
    pickle.dump(model, f)

# Save the scaler
with open("../models/scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

# Save feature columns for API consistency
feature_info = {
    'feature_columns': list(X_encoded.columns),
    'n_features': X_encoded.shape[1],
    'categorical_columns': categorical_columns,
    'api_features': api_features
}

with open("../models/feature_info.pkl", "wb") as f:
    pickle.dump(feature_info, f)

print(f"\n✅ Model saved successfully!")
print(f"📁 Saved files:")
print(f"   - fraud_model.pkl")
print(f"   - scaler.pkl") 
print(f"   - feature_info.pkl")
print(f"\n🎯 Model is now compatible with API features!")
print(f"📊 Expected features: {X_encoded.shape[1]}")