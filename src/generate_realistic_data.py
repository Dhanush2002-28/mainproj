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

print("🔄 Generating realistic fraud detection dataset...")

# More realistic fraud patterns with overlapping ranges
def generate_realistic_data():
    data = {
        "transaction_id": list(range(1, n_rows + 1)),
        "user_id": np.random.randint(100, 10000, n_rows),
        "day_of_week": np.random.randint(0, 7, n_rows),
        "category": np.random.choice(["home", "clothing", "books", "toys", "groceries", "electronics"], n_rows),
        "age": np.random.randint(18, 80, n_rows),
        "gender": np.random.choice(["M", "F"], n_rows),
        "country": np.random.choice(["France", "USA", "UK", "Canada", "Germany", "China", "India"], n_rows),
        "device": np.random.choice(["tablet", "mobile", "desktop"], n_rows),
        "payment_method": np.random.choice(["bank_transfer", "credit_card", "debit_card", "paypal", "crypto"], n_rows),
        "ip_address": [f"{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}" for _ in range(n_rows)],
        "location": np.random.choice(["Lyon", "New York", "Birmingham", "Toronto", "Berlin", "Guangzhou", "Bangalore", "Chicago", "London", "Montreal"], n_rows),
        "transaction_time": [(start_date + timedelta(minutes=i*15)).strftime("%Y-%m-%d %H:%M:%S") for i in range(n_rows)],
        "item_quantity": np.random.randint(1, 10, n_rows),
        "shipping_address": np.random.choice(["Same as billing", "Different"], n_rows),
        "browser_info": np.random.choice(["Firefox", "Chrome", "Edge", "Safari"], n_rows),
    }
    
    # More realistic amount distribution
    amounts = []
    hours = []
    is_fraud = []
    
    for i in range(n_rows):
        # Generate fraud with 30% probability
        fraud_probability = 0.3
        
        if random.random() < fraud_probability:
            # FRAUD transaction - higher risk patterns but with overlap
            is_fraud.append(1.0)
            
            # Fraud amounts: higher amounts but with overlap
            if random.random() < 0.4:  # 40% very high amounts
                amount = np.random.uniform(1000, 5000)
            elif random.random() < 0.7:  # 30% high amounts  
                amount = np.random.uniform(200, 1000)
            else:  # 30% moderate amounts (overlap with legitimate)
                amount = np.random.uniform(50, 200)
            amounts.append(amount)
            
            # Fraud hours: bias toward unusual hours but some normal hours too
            if random.random() < 0.6:  # 60% unusual hours
                hour = np.random.choice([0, 1, 2, 3, 4, 5, 23])
            else:  # 40% normal hours (overlap)
                hour = np.random.randint(6, 23)
            hours.append(hour)
            
        else:
            # LEGITIMATE transaction
            is_fraud.append(0.0)
            
            # Legitimate amounts: mostly lower but some high amounts too
            if random.random() < 0.1:  # 10% high legitimate amounts
                amount = np.random.uniform(500, 2000)
            elif random.random() < 0.3:  # 20% moderate amounts
                amount = np.random.uniform(100, 500)
            else:  # 70% low amounts
                amount = np.random.uniform(5, 100)
            amounts.append(amount)
            
            # Legitimate hours: bias toward normal hours but some unusual too
            if random.random() < 0.1:  # 10% unusual hours (overlap)
                hour = np.random.choice([0, 1, 2, 3, 4, 5, 23])
            else:  # 90% normal hours
                hour = np.random.randint(6, 23)
            hours.append(hour)
    
    data["amount"] = amounts
    data["hour"] = hours  
    data["is_fraud"] = is_fraud
    
    return data

# Generate realistic data
data = generate_realistic_data()

# Create DataFrame and save
df = pd.DataFrame(data)

# Shuffle the data so fraud/legitimate are mixed
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# Update transaction IDs after shuffle
df['transaction_id'] = range(1, len(df) + 1)

print(f"📊 Generated {len(df)} transactions")
print(f"🔍 Fraud transactions: {df['is_fraud'].sum():.0f} ({df['is_fraud'].mean()*100:.1f}%)")
print(f"✅ Legitimate transactions: {(df['is_fraud'] == 0).sum():.0f} ({(1-df['is_fraud'].mean())*100:.1f}%)")

print("\n📈 Amount ranges:")
fraud_df = df[df['is_fraud'] == 1]
legit_df = df[df['is_fraud'] == 0]
print(f"   Fraud: ${fraud_df['amount'].min():.2f} - ${fraud_df['amount'].max():.2f}")
print(f"   Legitimate: ${legit_df['amount'].min():.2f} - ${legit_df['amount'].max():.2f}")

print("\n🕐 Hour ranges:")
print(f"   Fraud: {fraud_df['hour'].min()} - {fraud_df['hour'].max()}")
print(f"   Legitimate: {legit_df['hour'].min()} - {legit_df['hour'].max()}")

# Save dataset
df.to_csv("../data/realistic_dataset.csv", index=False)
print("\n💾 Dataset saved as 'realistic_dataset.csv'")
print("🎯 This dataset has realistic overlapping patterns for better model training!")