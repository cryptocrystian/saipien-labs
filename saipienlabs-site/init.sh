#!/bin/bash

# Saipien Labs Site - Initialization Script
# Run this after cloning the repository

set -e  # Exit on error

echo "🚀 Initializing Saipien Labs Site..."
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please upgrade to Node.js 18 or higher."
    echo "   Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Success message
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run 'npm run dev' to start the development server"
echo "  2. Open http://localhost:3000 in your browser"
echo "  3. See QUICKSTART.md for more information"
echo "  4. See DEPLOYMENT.md when ready to deploy"
echo ""
echo "Happy building! 🛠️"
