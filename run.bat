@echo off
REM FraudGuard AI Setup and Run Script for Windows

echo 🚀 FraudGuard AI - Setup and Run Script
echo ========================================

REM Function to check if Python is installed
:check_python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed. Please install Python 3.9+ first.
    pause
    exit /b 1
)
echo [INFO] Python is installed
python --version

REM Function to check if Node.js is installed
:check_node
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)
echo [INFO] Node.js is installed
node --version

REM Function to setup Python backend
:setup_backend
echo.
echo 🐍 Setting up Python Backend...

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo [INFO] Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo [INFO] Installing Python dependencies...
pip install -r requirements.txt

echo [INFO] Backend setup complete!
goto :eof

REM Function to setup React frontend
:setup_frontend
echo.
echo ⚛️ Setting up React Frontend...

cd frontend

REM Install dependencies
echo [INFO] Installing Node.js dependencies...
npm install

cd ..
echo [INFO] Frontend setup complete!
goto :eof

REM Function to generate dataset
:generate_data
echo.
echo 📊 Generating Dataset...

cd data
python generate_data.py
cd ..

echo [INFO] Dataset generated successfully!
goto :eof

REM Function to train models
:train_models
echo.
echo 🤖 Training Machine Learning Models...

call venv\Scripts\activate.bat
cd src

echo [INFO] Training Random Forest model...
python train_model.py

echo [INFO] Training XGBoost model...
python train_xgb_model.py

cd ..
echo [INFO] Models trained successfully!
goto :eof

REM Function to start backend server
:start_backend
echo.
echo 🖥️ Starting Backend Server...

call venv\Scripts\activate.bat
cd src

echo [INFO] Starting Flask server on http://localhost:5000
start /B python app.py

cd ..
goto :eof

REM Function to start frontend server
:start_frontend
echo.
echo 🌐 Starting Frontend Server...

cd frontend

echo [INFO] Starting React development server on http://localhost:5173
start /B npm run dev

cd ..
goto :eof

REM Main setup function
:setup_all
echo.
echo 🔧 Full Setup Process...

call :check_python
call :check_node
call :setup_backend
call :setup_frontend
call :generate_data
call :train_models

echo [INFO] Setup complete! 🎉
goto :eof

REM Main run function
:run_all
echo.
echo 🚀 Starting All Services...

call :start_backend

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

call :start_frontend

echo [INFO] All services started!
echo [INFO] Frontend: http://localhost:5173
echo [INFO] Backend API: http://localhost:5000
echo [INFO] API Health: http://localhost:5000/health
echo [WARNING] Press Ctrl+C to stop services
pause
goto :eof

REM Show usage
:show_usage
echo Usage: %0 [option]
echo.
echo Options:
echo   setup     - Run full setup (install dependencies, generate data, train models)
echo   run       - Start both frontend and backend servers
echo   backend   - Start only backend server
echo   frontend  - Start only frontend server
echo   data      - Generate dataset only
echo   train     - Train models only
echo   help      - Show this help message
echo.
echo Examples:
echo   %0 setup    # First time setup
echo   %0 run      # Start all services
echo   %0 backend  # Start only Flask API
echo.
goto :eof

REM Main script logic
if "%1"=="setup" (
    call :setup_all
) else if "%1"=="run" (
    call :run_all
) else if "%1"=="backend" (
    call :start_backend
    pause
) else if "%1"=="frontend" (
    call :start_frontend
    pause
) else if "%1"=="data" (
    call :generate_data
    pause
) else if "%1"=="train" (
    call :train_models
    pause
) else (
    call :show_usage
)