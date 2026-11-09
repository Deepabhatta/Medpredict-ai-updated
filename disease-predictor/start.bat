@echo off
title MedPredict AI — Startup
color 0A

echo.
echo  ================================
echo   MedPredict AI — Starting Up
echo  ================================
echo.

py -3.11 --version >nul 2>&1
if errorlevel 1 (
    echo Python 3.11 is required. Install it, then run this script again.
    pause
    exit /b 1
)

echo [1/3] Installing Python dependencies...
cd backend
py -3.11 -m pip install -r requirements.txt -q
if errorlevel 1 (
    echo Python dependencies could not be installed.
    pause
    exit /b 1
)
if not exist models\diabetes_model.pkl (
    echo [2/3] Training ML models (first time only)...
    py -3.11 train_models.py
    if errorlevel 1 (
        echo Model training failed.
        pause
        exit /b 1
    )
) else (
    echo [2/3] Models already trained. Skipping...
)

echo [3/3] Starting Flask backend on port 5000...
start "MedPredict Backend" cmd /k py -3.11 app.py
cd ..

echo [4/4] Installing and starting React frontend...
cd frontend
if not exist node_modules (
    echo Installing npm packages (first time only)...
    npm install
)
start "MedPredict Frontend" cmd /k npm run dev
cd ..

echo.
echo  ================================
echo   App is running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo  ================================
echo.
pause
