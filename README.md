# Invifest - Digital Wedding Invitation

A beautiful, interactive digital wedding invitation built with React, TypeScript, and Vite.

![Invifest Demo](https://i.ibb.co/Z6mZjgyj/INVIFEST-BY-AASTHA-1.jpg)

## ✨ Features

- **Interactive Entry Gate** - Envelope with wax seal, tap to reveal
- **Scratch Cards** - Scratch to reveal the wedding date
- **Live Countdown Timer** - Real-time countdown to the wedding day
- **Our Story Section** - Stacking polaroid photo cards with scroll animation
- **Venue Details** - Decorated card with Google Maps directions
- **Events Schedule** - All wedding celebrations with dress codes
- **RSVP Form** - Guest response form with phone number input
- **Falling Rose Petals** - Canvas-based petal animation overlay
- **Background Music** - Toggle-able background audio
- **WhatsApp CTA** - Floating buy/inquire button
- **Fully Responsive** - Optimized for mobile, tablet, and desktop

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Custom properties, animations, no framework
- **react-phone-number-input** - International phone number field

## 📦 Installation

```bash
# Clone the repository
git clone <repo-url>
cd invifest-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗 Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # UI Components
│   ├── EntryGate.tsx       # Envelope entry overlay
│   ├── HeroSection.tsx     # Main invitation card
│   ├── ScratchSection.tsx  # Interactive scratch cards
│   ├── CountdownSection.tsx # Live countdown timer
│   ├── StorySection.tsx    # Our story polaroid cards
│   ├── VenueSection.tsx    # Venue details card
│   ├── EventsSection.tsx   # Wedding events schedule
│   ├── RsvpSection.tsx     # RSVP form
│   ├── FooterSection.tsx   # Footer with credits
│   ├── PetalsCanvas.tsx    # Rose petals animation
│   ├── AudioButton.tsx     # Music toggle button
│   └── FloatingCTA.tsx     # WhatsApp CTA button
├── constants/
│   └── weddingData.ts      # All wedding content & config
├── hooks/
│   └── useCountdown.ts     # Countdown timer hook
├── styles/
│   └── index.css           # Complete stylesheet
├── App.tsx                 # Main application component
└── main.tsx                # Entry point
```

## ⚙️ Configuration

All wedding content is centralized in `src/constants/weddingData.ts`:

- Couple names and parents
- Wedding date
- Venue details
- Event schedule
- Story photos
- WhatsApp/Instagram links

## 🎨 Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | `#fdfbf7` | Primary background |
| `--sage` | `#e2b4b1` | Accent pink |
| `--sage-deep` | `#8a4f4c` | Primary deep |
| `--gold` | `#d4af37` | Gold accent |
| `--text-dark` | `#2c2a29` | Body text |

### Fonts
- **Distrela** - Display headings (custom)
- **Cormorant Garamond** - Body text
- **Tenor Sans** - Labels and UI
- **Italianno** - Script/decorative
- **Tangerine** - Ampersand character

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the `dist/` folder
```

### Environment Variables
Copy `.env.example` to `.env` and configure:
```
VITE_SITE_URL=https://your-domain.com
```

## 📋 Assets Required

Place these files in `public/`:
- `public/assets/ganesha.png` - Ganesha icon
- `public/assets/bg-music.mp3` - Background music
- `public/fonts/Distrela.ttf` - Custom display font

## 📝 License

This project is for personal use. Design by [Invifest by Aastha](https://www.instagram.com/invifestbyaastha).
