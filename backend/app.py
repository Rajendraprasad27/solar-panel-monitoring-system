from flask import Flask, jsonify
from flask_cors import CORS
import random
from datetime import datetime, timedelta

app = Flask(__name__)

CORS(app)

@app.route("/api/solar")
def solar_data():
    light_intensity = random.randint(700, 1000)
    expected_output = round(0.0125 * light_intensity, 2)
    actual_output = round(random.uniform(expected_output * 0.6, expected_output), 2)
    
    efficiency = round((actual_output / expected_output) * 100, 1) if expected_output > 0 else 0

    is_cleaning = efficiency < 75

    return jsonify({
        "voltage": round(random.uniform(16, 22), 2),
        "lightIntensity": light_intensity,
        "expectedOutput": expected_output,
        "actualOutput": actual_output,
        "efficiency": efficiency,

        "status":
            "Efficiency Drop Detected"
            if efficiency < 75
            else "Normal Operation",

        "faultType":
            "Dust Accumulation"
            if efficiency < 75
            else None,

        "isCleaning":
            is_cleaning
    })

@app.route("/api/forecast")
def forecast_data():
    forecast = []
    base_date = datetime.now()
    conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"]
    
    for i in range(1, 6):
        date_str = (base_date + timedelta(days=i)).strftime("%a, %b %d")
        # Ensure we have at least one rainy day for demonstration, or just random
        condition = "Rainy" if i == 2 else random.choice(conditions)
        
        if condition == "Sunny":
            cloud_cover = random.randint(0, 20)
            yield_multiplier = random.uniform(0.9, 1.0)
        elif condition == "Partly Cloudy":
            cloud_cover = random.randint(20, 60)
            yield_multiplier = random.uniform(0.6, 0.9)
        elif condition == "Cloudy":
            cloud_cover = random.randint(60, 90)
            yield_multiplier = random.uniform(0.3, 0.6)
        else: # Rainy
            cloud_cover = random.randint(80, 100)
            yield_multiplier = random.uniform(0.1, 0.3)
            
        predicted_yield = round(20 * yield_multiplier * 8, 2) # approx 20W peak * 8 hours
        
        forecast.append({
            "id": i,
            "date": date_str,
            "condition": condition,
            "cloudCover": cloud_cover,
            "predictedYield": predicted_yield
        })
        
    return jsonify({
        "forecast": forecast,
        "recommendation": "Rain expected tomorrow. Autonomous cleaning cycle has been delayed by 48 hours to conserve water."
    })

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )