#!/bin/bash

# FraudGuard AI Setup and Run Script

echo "🚀 FraudGuard AI - Setup and Run Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
}

# Check if Python is installed
check_python() {
    if command -v python3 &> /dev/null; then
        print_status "Python 3 is installed"
        python3 --version
    else
        print_error "Python 3 is not installed. Please install Python 3.9+ first."
        exit 1
    fi
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        print_status "Node.js is installed"
        node --version
    else
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
}

# Setup Python backend
setup_backend() {
    print_header "🐍 Setting up Python Backend..."
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install -r requirements.txt
    
    print_status "Backend setup complete!"
}

# Setup React frontend
setup_frontend() {
    print_header "⚛️ Setting up React Frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing Node.js dependencies..."
    npm install
    
    cd ..
    print_status "Frontend setup complete!"
}

# Generate dataset
generate_data() {
    print_header "📊 Generating Dataset..."
    
    cd data
    python3 generate_data.py
    cd ..
    
    print_status "Dataset generated successfully!"
}

# Train models
train_models() {
    print_header "🤖 Training Machine Learning Models..."
    
    source venv/bin/activate
    cd src
    
    print_status "Training Random Forest model..."
    python3 train_model.py
    
    print_status "Training XGBoost model..."
    python3 train_xgb_model.py
    
    cd ..
    print_status "Models trained successfully!"
}

# Start backend server
start_backend() {
    print_header "🖥️ Starting Backend Server..."
    
    source venv/bin/activate
    cd src
    
    print_status "Starting Flask server on http://localhost:5000"
    python3 app.py &
    BACKEND_PID=$!
    
    cd ..
    return $BACKEND_PID
}

# Start frontend server
start_frontend() {
    print_header "🌐 Starting Frontend Server..."
    
    cd frontend
    
    print_status "Starting React development server on http://localhost:5173"
    npm run dev &
    FRONTEND_PID=$!
    
    cd ..
    return $FRONTEND_PID
}

# Main setup function
setup_all() {
    print_header "🔧 Full Setup Process..."
    
    check_python
    check_node
    setup_backend
    setup_frontend
    generate_data
    train_models
    
    print_status "Setup complete! 🎉"
}

# Main run function
run_all() {
    print_header "🚀 Starting All Services..."
    
    start_backend
    BACKEND_PID=$!
    
    # Wait a moment for backend to start
    sleep 3
    
    start_frontend
    FRONTEND_PID=$!
    
    print_status "All services started!"
    print_status "Frontend: http://localhost:5173"
    print_status "Backend API: http://localhost:5000"
    print_status "API Health: http://localhost:5000/health"
    print_warning "Press Ctrl+C to stop all services"
    
    # Wait for user interrupt
    trap 'print_warning "Stopping services..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT
    wait
}

# Show usage
show_usage() {
    echo "Usage: $0 [option]"
    echo ""
    echo "Options:"
    echo "  setup     - Run full setup (install dependencies, generate data, train models)"
    echo "  run       - Start both frontend and backend servers"
    echo "  backend   - Start only backend server"
    echo "  frontend  - Start only frontend server"
    echo "  data      - Generate dataset only"
    echo "  train     - Train models only"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup    # First time setup"
    echo "  $0 run      # Start all services"
    echo "  $0 backend  # Start only Flask API"
    echo ""
}

# Main script logic
case "${1:-help}" in
    "setup")
        setup_all
        ;;
    "run")
        run_all
        ;;
    "backend")
        start_backend
        wait
        ;;
    "frontend")
        start_frontend
        wait
        ;;
    "data")
        generate_data
        ;;
    "train")
        train_models
        ;;
    "help"|*)
        show_usage
        ;;
esac