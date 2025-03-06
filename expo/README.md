# LVLUP - Gamified To-Do App

LVLUP is a **Solo Leveling-inspired to-do app** that gamifies productivity. Complete tasks, gain XP, and level up your character as you progress!

## Features
- 🎮 **Leveling System**: Earn XP and level up by completing tasks.
- ✅ **Task Management**: Organize tasks as "Main Quests" and "Side Quests."

## Tech Stack
LVLUP is built with the following technologies:

- **Expo Router** - For navigation and routing.
- **Firebase** - For authentication, real-time database, and cloud functions.

## Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/adnjoo/lvl-up.git
   cd lvl-up
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Set Up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Firestore Database.
   - Add your Firebase config to `firebaseConfig.js`.

4. **Run the App**
   ```sh
   expo start
   ```

### Environment Variables
Add the following keys to your `.env` file:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=..
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=..
EXPO_PUBLIC_FIREBASE_PROJECT_ID=..
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=..
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=..
EXPO_PUBLIC_FIREBASE_APP_ID=..
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=..

EXPO_PUBLIC_OPENAI_KEY=sk..
```
