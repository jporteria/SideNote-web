# [SideNote](https://sidenote.onrender.com/)

SideNote is a note-taking web application designed to provide a seamless experience for users who want to take notes while browsing the internet or watching videos. Originally built as a Chrome extension, it was transitioned to a web-based application due to Manifest V3 restrictions. The app is powered by React.js for the frontend and Firebase for authentication and real-time data synchronization.

## Features

- User authentication with email/password and Google sign-in.
- Real-time syncing of notes across devices.
- Intuitive and responsive user interface.
- Designed for users who prefer to keep their notes in a single app without switching tabs.

## Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **Firebase**: For authentication and real-time database.

---

## Getting Started

Follow the steps below to clone, install, and run the SideNote app locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- A Firebase project with authentication and Firestore enabled

### Clone the Repository

```bash
git clone https://github.com/jporteria/SideNote-web.git
cd sidenote
```

### Install Dependencies

Install the required npm packages:

```bash
npm install
```

### Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project (or use an existing one).
3. Set up authentication methods:
   - Enable email/password authentication.
   - Enable Google sign-in.
4. Set up Firestore:
   - Create a Firestore database in test mode or with appropriate security rules.
5. Copy your Firebase project configuration (API key, authDomain, etc.) from the Firebase Console.
6. Create a `.env` file in the root of your project and add the Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Run the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Deployment

To deploy the application:

1. Build the app for production:

   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your preferred hosting service (e.g., Firebase Hosting, Vercel, Netlify).

---

## Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- **React.js**: [React documentation](https://reactjs.org/docs/getting-started.html)
- **Firebase**: [Firebase documentation](https://firebase.google.com/docs)

