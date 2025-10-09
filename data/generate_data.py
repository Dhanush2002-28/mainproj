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

# Generate data for non-fraud (first 5000 rows) and fraud (last 5000 rows)
data = {
    "transaction_id": range(1, n_rows + 1),
    "user_id": np.random.randint(100, 10000, n_rows),
    "amount": np.concatenate([
        np.random.uniform(5, 50, 5000),  # Lower amounts for non-fraud
        np.random.uniform(50, 100, 5000)  # Higher amounts for fraud
    ]),
    "hour": np.concatenate([
        np.random.randint(6, 24, 5000),  # Daytime for non-fraud
        np.random.randint(0, 6, 5000)    # Nighttime for fraud
    ]),
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
    "is_fraud": np.concatenate([np.zeros(5000), np.ones(5000)])  # Exactly 5000 non-fraud, 5000 fraud
}

# Create DataFrame and save to CSV
df = pd.DataFrame(data)
df.to_csv("bal_dataset.csv", index=False)
print("Dataset saved as 'bal_dataset.csv'")