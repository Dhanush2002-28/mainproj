import pandas as pd

# Load dataset
df = pd.read_csv("data/fraud_dataset_10000_balanced.csv")

# Basic info
print("✅ Dataset Loaded Successfully\n")
print(df.head(), "\n")
print(df.info(), "\n")
print(df.describe(), "\n")

# Check for missing values
print("Missing values:\n", df.isnull().sum(), "\n")

# Check class balance
if 'is_fraud' in df.columns:
    print("Target column distribution:\n", df['is_fraud'].value_counts())
else:
    print("⚠️ 'is_fraud' column not found. Please check column names.")
