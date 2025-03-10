# LVLUP - Expo App  

This directory contains the **Expo-based mobile app**.  

## Tech Stack  
- **Expo Router** – Navigation and routing.  
- **Firebase** – Authentication, real-time database, and cloud functions.  

## Installation & Setup  

1. **Install Dependencies**  
   ```sh
   npm install
   ```  
2. **Set Up Firebase**  
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).  
   - Enable Authentication and Firestore Database.  
   - Add your Firebase config to `firebaseConfig.js`.  

3. **Run the App**  
   ```sh
   expo start
   ```  

### Environment Variables  
Create a `.env` file and add:  
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

# Exporting to Web

To export the app for web:

Run the following command:

```bash
npx expo export -p web
```

Deploy the App
Run the following command to deploy the app to your EAS project:

```bash
eas deploy --prod
```
