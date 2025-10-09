import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE
import xgboost as xgb
import os

# ============================
# 1. Load the Dataset
# ============================
data_path = "../data/bal_dataset.csv"
try:
    df = pd.read_csv(data_path)
    print("✅ Dataset Loaded Successfully")
except FileNotFoundError:
    print(f"❌ Error: Dataset not found at {data_path}")
    exit()

# ============================
# 2. Preprocessing
# ============================

# Separate features and target
X = df.drop("is_fraud", axis=1)
y = df["is_fraud"]

# Convert categorical columns to numeric
X = pd.get_dummies(X, drop_first=True)

# Standardize numeric features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split with stratification to preserve class balance
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, stratify=y, random_state=42
)

# Handle class imbalance (just in case)
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# ============================
# 3. Model Building & Training (XGBoost)
# ============================

# Define the XGBoost classifier
xgb_model = xgb.XGBClassifier(
    objective='binary:logistic',
    n_estimators=100,
    random_state=42,
    use_label_encoder=False,
    eval_metric='logloss'
)

# Train the model on the resampled data
xgb_model.fit(X_train_res, y_train_res)
print("✅ XGBoost Model trained successfully!")

# ============================
# 4. Evaluate the Model
# ============================
y_pred = xgb_model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"XGBoost Accuracy: {accuracy:.4f}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# ============================
# 5. Save the Model and Scaler
# ============================
# Ensure the models directory exists
output_dir = "../models"
os.makedirs(output_dir, exist_ok=True)

# Save the XGBoost model
model_path = os.path.join(output_dir, "xgb_model.pkl")
with open(model_path, "wb") as f:
    pickle.dump(xgb_model, f)

# Save the scaler
scaler_path = os.path.join(output_dir, "scaler.pkl")
with open(scaler_path, "wb") as f:
    pickle.dump(scaler, f)

print(f"\n💾 XGBoost Model and Scaler saved successfully in '{output_dir}/' folder!")