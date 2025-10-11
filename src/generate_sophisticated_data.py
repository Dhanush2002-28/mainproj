import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Set seed for reproducibility
np.random.seed(42)
random.seed(42)

# Parameters
n_rows = 12000  # Increased for better diversity
start_date = datetime(2025, 10, 7)

print("🇮🇳 Generating sophisticated Indian fraud detection dataset...")

def generate_sophisticated_indian_data():
    data = {
        "transaction_id": list(range(1, n_rows + 1)),
        "user_id": np.random.randint(100, 10000, n_rows),
        "day_of_week": np.random.randint(0, 7, n_rows),
        "category": np.random.choice(["groceries", "electronics", "clothing", "books", "food_delivery", "mobile_recharge"], n_rows),
        "age": np.random.randint(18, 80, n_rows),
        "gender": np.random.choice(["M", "F"], n_rows),
        "country": np.random.choice(["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Hyderabad"], n_rows),
        "device": np.random.choice(["mobile", "desktop", "tablet"], n_rows),
        "payment_method": np.random.choice(["upi", "credit_card", "debit_card", "net_banking", "wallet"], n_rows),
        "ip_address": [f"{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}" for _ in range(n_rows)],
        "location": np.random.choice(["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Hyderabad", "Jaipur", "Ahmedabad", "Lucknow"], n_rows),
        "transaction_time": [(start_date + timedelta(minutes=i*15)).strftime("%Y-%m-%d %H:%M:%S") for i in range(n_rows)],
        "item_quantity": np.random.randint(1, 10, n_rows),
        "shipping_address": np.random.choice(["Same as billing", "Different"], n_rows),
        "browser_info": np.random.choice(["Chrome", "Firefox", "Safari", "Edge"], n_rows),
    }
    
    amounts = []
    hours = []
    is_fraud = []
    
    for i in range(n_rows):
        category = data["category"][i]
        payment_method = data["payment_method"][i]
        device = data["device"][i]
        shipping_address = data["shipping_address"][i]
        day_of_week = data["day_of_week"][i]
        age = data["age"][i]
        
        # Calculate fraud probability based on MULTIPLE factors, not just amount
        fraud_base_prob = 0.20  # Base 20% fraud rate
        
        # Risk factors that increase fraud probability
        risk_score = 0
        
        # Device risk (mobile is safer in India)
        if device == "desktop":
            risk_score += 0.1
        elif device == "tablet":
            risk_score += 0.05
        
        # Payment method risk
        if payment_method == "wallet":
            risk_score += 0.15
        elif payment_method == "net_banking":
            risk_score += 0.05
        elif payment_method == "upi":
            risk_score -= 0.1  # UPI is safer
        
        # Shipping address risk
        if shipping_address == "Different":
            risk_score += 0.2
        
        # Age risk (very young or very old more susceptible)
        if age < 25 or age > 65:
            risk_score += 0.1
        
        # Weekend risk
        if day_of_week in [0, 6]:
            risk_score += 0.05
        
        # Category-specific risk
        if category == "electronics":
            risk_score += 0.1
        elif category == "mobile_recharge":
            risk_score += 0.05
        elif category == "groceries":
            risk_score -= 0.05  # Groceries are safer
        
        # Calculate final fraud probability
        fraud_prob = min(0.8, max(0.05, fraud_base_prob + risk_score))
        
        is_fraud_transaction = random.random() < fraud_prob
        is_fraud.append(1.0 if is_fraud_transaction else 0.0)
        
        # Generate amounts with OVERLAPPING ranges
        if is_fraud_transaction:
            # FRAUD: More diverse amount ranges
            if category == "mobile_recharge":
                amount = np.random.uniform(500, 10000)  # Suspicious recharge amounts
            elif category == "food_delivery":
                amount = np.random.uniform(2000, 15000)  # Suspicious food orders
            elif category == "electronics":
                amount = np.random.uniform(10000, 200000)  # Electronics fraud
            else:
                # Other categories - wide range including LEGITIMATE amounts
                if random.random() < 0.3:  # 30% high amounts
                    amount = np.random.uniform(50000, 300000)
                elif random.random() < 0.5:  # 20% moderate amounts  
                    amount = np.random.uniform(10000, 50000)
                else:  # 50% low-moderate amounts (OVERLAP with legitimate)
                    amount = np.random.uniform(2000, 20000)
        else:
            # LEGITIMATE: Include HIGH amounts too!
            if category == "electronics":
                # Legitimate electronics can be expensive
                if random.random() < 0.2:  # 20% high legitimate electronics
                    amount = np.random.uniform(30000, 150000)
                else:
                    amount = np.random.uniform(5000, 30000)
            elif category == "clothing":
                # Some legitimate clothing can be expensive
                if random.random() < 0.1:  # 10% designer/luxury clothing
                    amount = np.random.uniform(15000, 50000)
                else:
                    amount = np.random.uniform(500, 15000)
            elif category == "mobile_recharge":
                amount = np.random.uniform(50, 1000)  # Normal recharge amounts
            elif category == "food_delivery":
                amount = np.random.uniform(200, 3000)  # Normal food delivery
            else:
                # Other legitimate transactions - WIDE range
                if random.random() < 0.15:  # 15% high legitimate amounts
                    amount = np.random.uniform(25000, 100000)  # Big legitimate purchases
                elif random.random() < 0.35:  # 20% moderate amounts
                    amount = np.random.uniform(5000, 25000)
                else:  # 65% regular amounts
                    amount = np.random.uniform(100, 5000)
        
        amounts.append(amount)
        
        # Generate hours with OVERLAPPING patterns
        if is_fraud_transaction:
            # Fraud: 60% unusual hours, 40% normal hours (overlap)
            if random.random() < 0.6:
                hour = np.random.choice([0, 1, 2, 3, 4, 5, 23])
            else:
                hour = np.random.randint(6, 23)  # Some fraud happens in normal hours too!
        else:
            # Legitimate: 15% unusual hours, 85% normal hours (overlap)
            if random.random() < 0.15:
                hour = np.random.choice([0, 1, 2, 3, 4, 5, 23])  # Some legitimate late transactions
            else:
                hour = np.random.randint(6, 23)
        
        hours.append(hour)
    
    data["amount"] = amounts
    data["hour"] = hours  
    data["is_fraud"] = is_fraud
    
    return data

# Generate sophisticated data
print("🔄 Generating transactions with multi-factor fraud patterns...")
data = generate_sophisticated_indian_data()

# Create DataFrame
df = pd.DataFrame(data)

# Shuffle the data
df = df.sample(frac=1, random_state=42).reset_index(drop=True)
df['transaction_id'] = range(1, len(df) + 1)

print(f"📊 Generated {len(df)} sophisticated Indian transactions")
print(f"🔍 Fraud transactions: {df['is_fraud'].sum():.0f} ({df['is_fraud'].mean()*100:.1f}%)")
print(f"✅ Legitimate transactions: {(df['is_fraud'] == 0).sum():.0f} ({(1-df['is_fraud'].mean())*100:.1f}%)")

# Analyze amount distributions
fraud_df = df[df['is_fraud'] == 1]
legit_df = df[df['is_fraud'] == 0]

print("\n💰 Amount ranges (INR):")
print(f"   Fraud: ₹{fraud_df['amount'].min():.0f} - ₹{fraud_df['amount'].max():.0f}")
print(f"   Legitimate: ₹{legit_df['amount'].min():.0f} - ₹{legit_df['amount'].max():.0f}")
print(f"   Fraud Mean: ₹{fraud_df['amount'].mean():.0f}")
print(f"   Legitimate Mean: ₹{legit_df['amount'].mean():.0f}")

print("\n🕐 Hour distributions:")
print(f"   Fraud unusual hours (0-5,23): {((fraud_df['hour'] < 6) | (fraud_df['hour'] == 23)).mean()*100:.1f}%")
print(f"   Legitimate unusual hours (0-5,23): {((legit_df['hour'] < 6) | (legit_df['hour'] == 23)).mean()*100:.1f}%")

print("\n💳 Payment method fraud rates:")
for method in df['payment_method'].unique():
    method_df = df[df['payment_method'] == method]
    fraud_rate = method_df['is_fraud'].mean() * 100
    print(f"   {method}: {fraud_rate:.1f}% fraud rate")

print("\n📱 Device fraud rates:")
for device in df['device'].unique():
    device_df = df[df['device'] == device]
    fraud_rate = device_df['is_fraud'].mean() * 100
    print(f"   {device}: {fraud_rate:.1f}% fraud rate")

print("\n📦 Shipping address fraud rates:")
for addr in df['shipping_address'].unique():
    addr_df = df[df['shipping_address'] == addr]
    fraud_rate = addr_df['is_fraud'].mean() * 100
    print(f"   {addr}: {fraud_rate:.1f}% fraud rate")

# Save dataset
df.to_csv("../data/sophisticated_indian_dataset.csv", index=False)
print("\n💾 Dataset saved as 'sophisticated_indian_dataset.csv'")
print("🎯 This dataset considers MULTIPLE factors for fraud detection, not just amount!")
print("🔍 High amounts can be legitimate if other factors are safe!")
print("🚨 Low amounts can be fraud if multiple risk factors are present!")