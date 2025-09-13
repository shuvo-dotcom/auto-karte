#!/bin/bash

# Auto-Karte GitHub Pages Deployment Script

echo "🚀 Starting deployment to GitHub Pages..."

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create .nojekyll file in out directory
    echo "📝 Creating .nojekyll file..."
    touch out/.nojekyll
    
    echo "🎉 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push your changes to GitHub:"
    echo "   git add ."
    echo "   git commit -m 'Deploy to GitHub Pages'"
    echo "   git push origin main"
    echo ""
    echo "2. The GitHub Action will automatically deploy to:"
    echo "   https://YOUR_USERNAME.github.io/auto-karte/"
    echo ""
    echo "3. Or manually upload the 'out' directory contents to your web server"
else
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi
