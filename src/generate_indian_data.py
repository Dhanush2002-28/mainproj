import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Set seed for reproducibility
np.random.seed(42)
random.seed(42)

# Parameters
n_rows = 10000
start_date = datetime(2025, 10, 7)

print("🇮🇳 Generating Indian fraud detection dataset...")

# Indian-specific data
def generate_indian_data():
    data = {
        "transaction_id": list(range(1, n_rows + 1)),
        "user_id": np.random.randint(100, 10000, n_rows),
        "day_of_week": np.random.randint(0, 7, n_rows),
        "category": np.random.choice(["groceries", "electronics", "clothing", "books", "food_delivery", "mobile_recharge"], n_rows),
        "age": np.random.randint(18, 80, n_rows),
        "gender": np.random.choice(["M", "F"], n_rows),
        # Indian cities/states
        "country": np.random.choice(["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Hyderabad"], n_rows),
        "device": np.random.choice(["mobile", "desktop", "tablet"], n_rows),
        # Indian payment methods
        "payment_method": np.random.choice(["upi", "credit_card", "debit_card", "net_banking", "wallet"], n_rows),
        "ip_address": [f"{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}" for _ in range(n_rows)],
        # Indian locations
        "location": np.random.choice(["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Hyderabad", "Jaipur", "Ahmedabad", "Lucknow"], n_rows),
        "transaction_time": [(start_date + timedelta(minutes=i*15)).strftime("%Y-%m-%d %H:%M:%S") for i in range(n_rows)],
        "item_quantity": np.random.randint(1, 10, n_rows),
        "shipping_address": np.random.choice(["Same as billing", "Different"], n_rows),
        "browser_info": np.random.choice(["Chrome", "Firefox", "Safari", "Edge"], n_rows),
    }
    
    # Indian currency amounts (INR)
    amounts = []
    hours = []
    is_fraud = []
    
    for i in range(n_rows):
        # Generate fraud with 25% probability (realistic for India)
        fraud_probability = 0.25
        
        if random.random() < fraud_probability:
            # FRAUD transaction - Indian fraud patterns
            is_fraud.append(1.0)
            
            # Fraud amounts in INR
            if random.random() < 0.3:  # 30% very high amounts
                amount = np.random.uniform(50000, 500000)  # ₹50k - ₹5L
            elif random.random() < 0.6:  # 30% high amounts  
                amount = np.random.uniform(10000, 50000)   # ₹10k - ₹50k
            else:  # 40% moderate amounts (overlap with legitimate)
                amount = np.random.uniform(2000, 10000)    # ₹2k - ₹10k
            amounts.append(amount)
            
            # Fraud hours: bias toward unusual hours
            if random.random() < 0.7:  # 70% unusual hours
                hour = np.random.choice([0, 1, 2, 3, 4, 5, 23])
            else:  # 30% normal hours (overlap)
                hour = np.random.randint(6, 23)
            hours.append(hour)
            
        else:
            # LEGITIMATE transaction
            is_fraud.append(0.0)
            
            # Legitimate amounts in INR
            if random.random() < 0.05:  # 5% high legitimate amounts
                amount = np.random.uniform(25000, 100000)  # ₹25k - ₹1L
            elif random.random() < 0.20:  # 15% moderate amounts
                amount = np.random.uniform(5000, 25000)    # ₹5k - ₹25k
            else:  # 80% low amounts (typical Indian transactions)
                amount = np.random.uniform(100, 5000)      # ₹100 - ₹5k
            amounts.append(amount)
            
            # Legitimate hours: bias toward normal hours
            if random.random() < 0.1:  # 10% unusual hours (overlap)
                hour = np.random.choice([0, 1, 2, 3, 4, 5, 23])
            else:  # 90% normal hours (6 AM - 11 PM)
                hour = np.random.randint(6, 23)
            hours.append(hour)
    
    data["amount"] = amounts
    data["hour"] = hours  
    data["is_fraud"] = is_fraud
    
    return data

# Generate Indian data
data = generate_indian_data()

# Create DataFrame and save
df = pd.DataFrame(data)

# Shuffle the data so fraud/legitimate are mixed
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# Update transaction IDs after shuffle
df['transaction_id'] = range(1, len(df) + 1)

print(f"📊 Generated {len(df)} Indian transactions")
print(f"🔍 Fraud transactions: {df['is_fraud'].sum():.0f} ({df['is_fraud'].mean()*100:.1f}%)")
print(f"✅ Legitimate transactions: {(df['is_fraud'] == 0).sum():.0f} ({(1-df['is_fraud'].mean())*100:.1f}%)")

print("\n💰 Amount ranges (INR):")
fraud_df = df[df['is_fraud'] == 1]
legit_df = df[df['is_fraud'] == 0]
print(f"   Fraud: ₹{fraud_df['amount'].min():.2f} - ₹{fraud_df['amount'].max():.2f}")
print(f"   Legitimate: ₹{legit_df['amount'].min():.2f} - ₹{legit_df['amount'].max():.2f}")

print("\n🕐 Hour ranges:")
print(f"   Fraud: {fraud_df['hour'].min()} - {fraud_df['hour'].max()}")
print(f"   Legitimate: {legit_df['hour'].min()} - {legit_df['hour'].max()}")

print("\n💳 Payment method distribution:")
print(df['payment_method'].value_counts())

print("\n🏙️ City distribution:")
print(df['country'].value_counts())

# Save dataset
df.to_csv("../data/indian_dataset.csv", index=False)
print("\n💾 Dataset saved as 'indian_dataset.csv'")
print("🇮🇳 Indian fraud detection dataset ready!")