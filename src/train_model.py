# train_model.py

import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE

# ============================
# 1. Load the Dataset
# ============================
data_path = "../data/bal_dataset.csv"
df = pd.read_csv(data_path)
print("✅ Dataset Loaded Successfully")

# ============================
# 2. Preprocessing
# ============================

# Separate features and target
X = df.drop("is_fraud", axis=1)
y = df["is_fraud"]

# Store feature information before encoding
categorical_columns = X.select_dtypes(include=['object']).columns.tolist()
numeric_columns = X.select_dtypes(include=['number']).columns.tolist()

# Convert categorical columns to numeric
X_encoded = pd.get_dummies(X, drop_first=True)
feature_columns = X_encoded.columns.tolist()

# Create encoders dictionary for compatibility with app.py
encoders = {}
for col in categorical_columns:
    # Store the unique values and dummy column mapping
    unique_values = X[col].unique()
    encoders[col] = {
        'unique_values': unique_values,
        'dummy_columns': [c for c in X_encoded.columns if c.startswith(f"{col}_")]
    }

# Standardize numeric features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_encoded)

# Split with stratification to preserve class balance
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, stratify=y, random_state=42
)

# Handle class imbalance (just in case)
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# ============================
# 3. Model Building
# ============================

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
# 4. Train the Model
# ============================
model.fit(X_train_res, y_train_res)

# ============================
# 5. Evaluate the Model
# ============================
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model trained successfully!\nAccuracy: {accuracy:.4f}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# ============================
# 6. Save the Model and All Required Files
# ============================
with open("models/fraud_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("models/scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

with open("models/encoders.pkl", "wb") as f:
    pickle.dump(encoders, f)

with open("models/feature_columns.pkl", "wb") as f:
    pickle.dump(feature_columns, f)

print("\n💾 Model, Scaler, Encoders, and Feature Columns saved successfully in 'models/' folder!")
