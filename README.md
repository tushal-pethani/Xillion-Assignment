# Xillion Trading App

A modern React Native mobile application for trading and investment management.

## Project Overview

Xillion is a sophisticated trading application that allows users to:
- View portfolio performance
- Explore trade recommendations
- Track trade history
- Execute trades efficiently
- Monitor trade performance over time

## Features

- **Portfolio Overview**: View current portfolio value and available funds
- **Trade Recommendations**: Explore curated trade suggestions with buy/sell prices and potential returns
- **Trade History**: Track past trades performance with detailed analysis
- **Performance Analytics**: Visualize monthly returns and trade success metrics

## Branch Structure

This repository is organized with the following branches:

- **main**: Complete codebase with all features

## Getting Started

### Prerequisites

- Node.js (version 16 or above)
- Yarn or npm package manager
- React Native development environment setup
- Expo CLI (optional, but recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/xillion-app.git
   cd xillion-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npx expo start
   # or
   npm start
   # or
   yarn start
   ```

4. Run on a device or emulator:
   - Press 'a' to run on an Android emulator/device
   - Press 'i' to run on an iOS simulator/device
   - Scan the QR code with the Expo Go app on your physical device

## Project Structure

```
XillionApp/
├── src/
│   ├── components/       # Reusable UI components
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # App screens
│   ├── theme/            # Theme configuration (colors, typography)
│   └── types/            # TypeScript type definitions
├── assets/               # Static assets
├── ios/                  # iOS native code
└── android/              # Android native code
```

## Features

The HomeScreen includes:
- Portfolio overview with current value and unused funds
- Trade recommendations with expected returns
- Action buttons for portfolio management and AI assistance
- Trade execution functionality with confirmation modals

## Component Structure

```
HomeScreen
├── Portfolio Card
├── Action Buttons
├── Trade Recommendations
│   └── TradeCard (for each recommended trade)
└── Execution Button (SwipeableButton)
```

## Features

The TradeHistoryScreen includes:
- Tabs to switch between different trade types (Positional, Flash, My trades)
- Performance statistics (Average duration, Average return, Hit rate)
- List of completed trades with detailed information
- Filter and sorting options for trade history

## Component Structure

```
TradeHistoryScreen
├── Header with Navigation
├── Tab Selector
├── Stats Card
│   ├── Average Duration
│   ├── Average Return
│   └── Hit Rate 
└── Trade History List
    └── TradeHistoryCard (for each completed trade)
