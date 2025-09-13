# Auto-Karte - Interactive Energy Facilities Map

An interactive map application that allows you to select and connect energy facilities using voice commands or text input. Built with Next.js, React, TypeScript, and Leaflet.

## Features

- 🗺️ **Interactive Map**: View energy facilities across multiple countries
- 🎤 **Voice Commands**: Control the map using natural language
- 🔗 **Connect Facilities**: Draw lines between selected facilities
- 🌍 **Global Support**: Works with facilities from 12+ countries
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Voice Commands

### Selection Commands
- "select nuclear" - Show all nuclear plants
- "select solar" - Show all solar facilities
- "select wind" - Show wind facilities
- "select hydro" - Show hydroelectric facilities
- "select gas" - Show gas facilities
- "select coal" - Show coal facilities
- "select biomass" - Show biomass facilities
- "select France" - Show facilities in France
- "select nuclear in Germany" - Show nuclear plants in Germany

### Connection Commands
- "connect solar" - Select and connect all solar facilities
- "connect nuclear" - Select and connect all nuclear facilities
- "connect wind" - Select and connect all wind facilities
- "connect all" - Connect currently selected facilities

### Utility Commands
- "clear" - Clear all selections and connections

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Prerequisites
- GitHub account
- Node.js 18+ installed locally

### Steps to Deploy

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/auto-karte.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The deployment will start automatically

3. **Access Your Site**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/auto-karte/`
   - The deployment process takes a few minutes

### Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The static files will be in the 'out' directory
# Upload the contents of 'out' to your web server
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── CommandInterface.tsx
│   ├── InteractiveMap.tsx
│   ├── MapComponent.tsx
│   └── ErrorBoundary.tsx
├── data/               # Static data
│   └── globalFacilities.ts
├── hooks/              # Custom React hooks
│   └── useVoiceRecognition.ts
└── types/              # TypeScript type definitions
    └── index.ts
```

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Leaflet** - Interactive maps
- **React-Leaflet** - React integration for Leaflet
- **Web Speech API** - Voice recognition

## Browser Support

- Chrome/Chromium (recommended for voice commands)
- Firefox
- Safari
- Edge

**Note**: Voice recognition works best in Chrome/Chromium browsers.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.