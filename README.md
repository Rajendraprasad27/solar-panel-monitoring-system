# ☀️ Solar Panel Monitoring & Automated Cleaning System

An intelligent, full-stack IoT solution designed to monitor solar panel efficiency in real-time, detect environmental fault conditions (such as dust accumulation or low-light states), and trigger automated cleaning cycles. The system features a **hardware-in-the-loop simulation** via Arduino, a **Python Flask backend API**, and a **modern React, Vite, and Tailwind CSS web dashboard** featuring a dynamic Digital Twin representation.

---

## ⚙️ System Architecture

The project consists of three main components:
1. **Arduino Control System (`/arduino`)**: Manages physical sensor readings (LDR and Voltage), calculates efficiency parameters, and operates the servo-based dust cleaner.
2. **Flask Backend API (`/backend`)**: Exposes API endpoints for current solar panel status, historical data telemetry, weather forecasting integration, and hardware-independent mock simulations.
3. **React Dashboard (`/frontend`)**: A real-time web interface providing an operations console, a 5-day yield forecast view, and a 3-depth Digital Twin workspace.

```mermaid
graph TD
    subgraph Hardware Layer
        LDR[A0: LDR Sensor] --> Arduino[Arduino Microcontroller]
        VOL[A1: Voltage Divider] --> Arduino
        Servo[Pin 9: Cleaner Servo] <-- Arduino
    end

    subgraph Service Layer
        Arduino -- "Serial COM (9600 Baud)" --> SerialR[Serial Reader Script]
        SerialR --> FlaskApp[Flask API :5000]
        FlaskApp --> FaultDet[Fault Detection Logic]
    end

    subgraph Presentation Layer
        FlaskApp -- "/api/solar & /api/forecast" --> ReactApp[Vite + React Dashboard :5173]
        ReactApp --> LiveDash[Live Telemetry & Recharts]
        ReactApp --> ForeCast[Weather Yield Forecast]
        ReactApp --> DigTwin[Interactive Digital Twin]
    end
```

---

## ✨ Key Features

* **Real-time Telemetry & Calculation**: Monitors light intensity, voltage output, expected power output, actual power output, and overall operational efficiency.
* **Intelligent Fault Detection**:
  * **Dust Accumulation / Shading**: Detected when efficiency falls below 60% despite high light levels (> 600 units).
  * **Low Light Condition**: Identified when light levels drop below 200 units (e.g., night/heavy storm).
* **Automated Cleaning Cycle**: Automatically activates a servo-motor mechanism (rotates 180° and returns to 0°) when dust accumulation is detected.
* **Forecast-Aware Resource Management**: Integrates weather forecasting (Sunny, Cloudy, Partly Cloudy, Rainy) and dynamically advises delaying cleaning cycles when rain is forecast, conserving water.
* **Digital Twin Visualization**: A dedicated visual console modeling the physical state of the solar panel, current cleaner angle, active sensors, and current alerts.

---

## 🛠️ Tools & Technologies Used

### Hardware & Embedded
* **Arduino IDE & C++**: Microcontroller logic and sensor data parsing.
* **Servo Library (`Servo.h`)**: Controlling the cleaner sweep mechanism.
* **LDR (Light Dependent Resistor)**: Ambient solar irradiance measurement.
* **Voltage Divider**: Analog voltage measurement (scales down higher DC voltages to safe Arduino pin thresholds).

### Backend
* **Python 3**: Application environment.
* **Flask & Flask-CORS**: Web server architecture and cross-origin resource sharing.
* **PySerial**: For communication with the physical Arduino over USB Serial.

### Frontend
* **React 18 & TypeScript**: Component-driven UI development.
* **Vite**: Ultra-fast frontend development server and bundler.
* **Tailwind CSS**: Modern, utility-first CSS styling framework.
* **Recharts**: Responsive charting library for rendering real-time performance history.
* **Lucide React**: Clean, modern vector icon set.

---

## 🚀 Getting Started

### 1. Arduino Setup (Hardware Configuration)
1. Open the Arduino IDE.
2. Open the sketch located at `arduino/solar_monitor/solar_monitor.ino`.
3. Connect your Arduino board:
   * **LDR Sensor**: Connect to Analog Input `A0`.
   * **Voltage Divider/Sensor**: Connect to Analog Input `A1`.
   * **Cleaner Servo Motor**: Connect the signal line to Digital Pin `9`.
4. Select your board and COM Port, then click **Upload**.
5. Once uploaded, the board will stream sensor telemetry to the serial port in CSV format at a baud rate of `9600`.

---

### 2. Backend Setup
The Flask backend can be run in two modes: **Simulation Mode** (uses mock sensor data generators, default) or **Hardware Link Mode** (reads live Arduino data over Serial).

#### Step-by-Step Installation:
1. Navigate to the `backend` folder.
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python app.py
   ```
   * The API will now be active at `http://127.0.0.1:5000`.
   * Telemetry Endpoint: `/api/solar`
   * Forecast Endpoint: `/api/forecast`

*Note: To connect to physical hardware, adapt `app.py` to import and call `get_sensor_data()` from `serial_reader.py` instead of utilizing the simulated random telemetry values.*

---

### 3. Frontend Setup
Make sure you have Node.js (v18+) installed.

#### Step-by-Step Installation:
1. Navigate to the `frontend` folder.
2. Install the package dependencies:
   ```bash
   npm install
   ```
3. Start the local Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the address shown in the terminal (usually `http://localhost:5173`).

---

## 📁 Project Structure

```text
solar-panel-monitoring-system/
│
├── arduino/
│   └── solar_monitor/
│       └── solar_monitor.ino     # Arduino sketch for sensor reading & servo control
│
├── backend/
│   ├── .env                      # Environment configuration
│   ├── app.py                    # Flask server endpoints (simulated telemetry & forecast)
│   ├── fault_detection.py        # Logic checking for dust or low-light conditions
│   ├── serial_reader.py          # Script reading CSV telemetry from Serial COM3
│   └── requirements.txt          # Python dependencies (Flask, Flask-CORS, PySerial)
│
├── frontend/
│   ├── public/                   # Static public assets
│   ├── src/
│   │   ├── api/
│   │   │   └── solarApi.ts       # Frontend HTTP client wrappers
│   │   ├── components/
│   │   │   └── Sidebar.tsx       # Main dashboard layout navigation
│   │   ├── hooks/
│   │   │   └── useSolarData.ts   # React hook managing telemetry streaming & state history
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx     # Operations center dashboard
│   │   │   ├── DigitalTwin.tsx   # Visual status console for cleaner & panel metrics
│   │   │   └── Forecast.tsx      # Yield prediction & weather recommendations
│   │   ├── types/
│   │   ├── App.tsx               # Main entry routing template
│   │   ├── index.css             # Tailwind setup and custom styling declarations
│   │   └── main.tsx              # React mounting file
│   ├── package.json              # Node packages & build script configurations
│   ├── tailwind.config.js        # Custom Tailwind design utility overrides
│   └── vite.config.ts            # Vite bundler configurations
│
└── README.md                     # Project documentation
```

---

## 📦 Setting Up the GitHub Repository

If you want to push this project to your own remote GitHub repository:

1. **Initialize Git locally**:
   ```bash
   git init
   ```
2. **Add all project files**:
   ```bash
   git add .
   ```
3. **Commit the changes**:
   ```bash
   git commit -m "Initial commit: Add solar panel monitoring application code and setup guides"
   ```
4. **Create a repository on GitHub**.
5. **Link the local repository and push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   ```
