
# BewegungsLiga+ 🏃‍♂️

A modern, mobile-first web app for tracking physical activity, connecting with friends and family, and automatically qualifying for German health insurance bonus programs.

## 🎯 Features

- **Activity Tracking**: Connect fitness trackers and monitor daily steps
- **Bonus Programs**: Automatic qualification for health insurance rewards
- **Social Leagues**: Create and join step challenge groups
- **Progress Tracking**: Streaks, achievements, and goal monitoring
- **Privacy First**: Transparent data sharing with insurance providers

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **State**: React Context API
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📱 Mobile-First Design

The app is designed with mobile users as the primary focus:
- Responsive touch targets (min 44px)
- Bottom navigation for easy thumb access
- Safe area support for notched devices
- Optimized for 375px viewport and up

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── layout/          # Header, Navigation components
│   ├── onboarding/      # Welcome, signup, consent flows
│   ├── dashboard/       # Dashboard-specific components
│   └── leagues/         # League management components
├── contexts/            # React Context providers
├── data/               # Mock data and constants
├── pages/              # Main page components
├── types/              # TypeScript type definitions
└── utils/              # Helper functions and calculations
```

## 🎮 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd bewegungs-liga-connect

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 📊 Mock Data

The app currently uses mock data for demonstration:
- **Users**: Sample user profiles with different insurers
- **Activity Data**: 30 days of realistic step count data
- **Leagues**: Pre-configured groups with member data
- **Insurers**: TK, AOK, and Demo Insurance with bonus programs

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific settings:
```env
# Future API endpoints
VITE_API_BASE_URL=https://api.bewegungsliga.de
VITE_GOOGLE_HEALTH_CONNECT_KEY=your-key-here
```

### Bonus Program Rules
Currently hardcoded in `src/data/mockData.ts`:
- **TK**: 8,000 steps/day for 20 days = €50 bonus
- **AOK**: 7,500 steps/day for 18 days = €40 bonus
- **Demo**: 6,000 steps/day for 15 days = €30 bonus

## 🔮 Future Integrations

### Activity Data Sources
- [ ] Google Health Connect (Android)
- [ ] Apple HealthKit (iOS)
- [ ] Fitbit API
- [ ] Samsung Health
- [ ] Garmin Connect

### Insurance Provider APIs
- [ ] Techniker Krankenkasse (TK)
- [ ] AOK
- [ ] Barmer
- [ ] DAK-Gesundheit
- [ ] Custom provider integration framework

### Backend Services
- [ ] User authentication & profiles
- [ ] Real-time activity sync
- [ ] League management system
- [ ] Notification service
- [ ] Analytics dashboard

## 📝 Development Notes

### Adding New Insurance Providers
1. Add insurer to `mockInsurers` in `src/data/mockData.ts`
2. Define bonus program requirements
3. Update insurer selection UI if needed

### Extending Activity Sources
1. Create new integration in `src/utils/activityIntegrations.ts`
2. Add connection flow in onboarding
3. Update activity sync logic

### Adding New Features
- Keep components small and focused
- Use TypeScript for all new code
- Follow existing naming conventions
- Add proper error handling
- Consider mobile UX implications

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Check TypeScript
npm run type-check
```

## 🚢 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The app can be deployed to:
- Vercel (recommended)
- Netlify
- Firebase Hosting
- Any static hosting service

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions about this hackathon project:
- Check the GitHub issues
- Review the code comments for implementation notes
- Follow the TODO comments for extension points
