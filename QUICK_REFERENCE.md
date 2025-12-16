# Quick Reference Guide

## 🔧 Konfigurasi Cepat

### 1. Update API URL

Buka `vite.config.js` dan ganti:

```javascript
target: 'http://localhost:5000', // Ganti dengan URL API Anda
```

### 2. Restart Server (jika sudah running)

```bash
# Stop server (Ctrl+C)
# Then:
npm run dev
```

## 📱 URL Routes

| Route        | Deskripsi        | Auth Required |
| ------------ | ---------------- | ------------- |
| `/login`     | Halaman login    | ❌            |
| `/register`  | Halaman register | ❌            |
| `/dashboard` | Dashboard utama  | ✅            |
| `/predict`   | Form prediksi    | ✅            |
| `/history`   | Riwayat prediksi | ✅            |
| `/profile`   | Profile user     | ✅            |

## 🎨 Color Scheme

### Primary Colors

-   Blue: `bg-blue-600`, `text-blue-600`
-   Indigo: `bg-indigo-600`, `text-indigo-600`
-   Purple: `bg-purple-600`, `text-purple-600`

### Status Colors

-   Success: `bg-green-600`, `text-green-600`
-   Error: `bg-red-600`, `text-red-600`
-   Warning: `bg-orange-600`, `text-orange-600`

### Neutral Colors

-   Gray: `bg-gray-50`, `bg-gray-100`, etc.
-   White: `bg-white`

## 🔑 LocalStorage Keys

```javascript
localStorage.getItem("token"); // Auth token
localStorage.getItem("user"); // User data (JSON)
```

## 🛠️ Utility Functions

### Axios Instance

```javascript
import api from "./utils/axios";

// GET request
const response = await api.get("/endpoint");

// POST request
const response = await api.post("/endpoint", data);

// PUT request
const response = await api.put("/endpoint", data);
```

### API Service

```javascript
import apiService from "./utils/api";

// Login
await apiService.auth.login(username, password);

// Get dashboard
await apiService.dashboard.getDashboard();

// Create prediction
await apiService.prediction.createPrediction(data);

// Get history
await apiService.prediction.getHistory(page);

// Get profile
await apiService.profile.getProfile();

// Update profile
await apiService.profile.updateProfile(data);
```

### Auth Context

```javascript
import { useAuth } from "./context/AuthContext";

const { user, token, login, register, logout, loading } = useAuth();

// Login
const result = await login(username, password);

// Register
const result = await register(userData);

// Logout
logout();
```

## 📝 Form Data Format

### Register

```javascript
{
  username: "string",
  email: "string",
  password: "string",
  full_name: "string"
}
```

### Login

```javascript
{
  username: "string",
  password: "string"
}
```

### Predict

```javascript
{
  age: number,      // 18-100
  bmi: number,      // 10-60
  children: number, // 0-10
  sex: "male" | "female",
  smoker: "yes" | "no",
  region: "northwest" | "northeast" | "southwest" | "southeast"
}
```

### Update Profile

```javascript
{
  full_name: "string",
  email: "string"
}
```

## 🎯 Common Tailwind Classes

### Layout

-   `flex` - Flexbox
-   `grid` - Grid
-   `gap-4` - Gap 1rem
-   `space-y-4` - Vertical spacing

### Sizing

-   `w-full` - Width 100%
-   `h-screen` - Height 100vh
-   `max-w-4xl` - Max width

### Padding & Margin

-   `p-4` - Padding 1rem
-   `px-4` - Horizontal padding
-   `py-4` - Vertical padding
-   `m-4` - Margin 1rem

### Text

-   `text-lg` - Large text
-   `font-bold` - Bold
-   `text-center` - Center align

### Colors

-   `bg-blue-600` - Background
-   `text-white` - Text color
-   `border-gray-300` - Border color

### Effects

-   `rounded-lg` - Border radius
-   `shadow-md` - Box shadow
-   `hover:bg-blue-700` - Hover state
-   `transition` - CSS transition

## 🐛 Debugging

### Check Auth Status

```javascript
console.log("Token:", localStorage.getItem("token"));
console.log("User:", JSON.parse(localStorage.getItem("user")));
```

### Check API Calls

```javascript
// Di browser console (F12)
// Network tab untuk melihat API calls
```

### Common Issues

1. **API tidak connect**

    - Cek URL di vite.config.js
    - Pastikan backend running
    - Cek CORS settings

2. **Login tidak work**

    - Cek credentials
    - Cek console untuk error
    - Cek network tab

3. **Protected route redirect**
    - Normal jika belum login
    - Login dulu untuk akses

## 📦 NPM Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Package Management
npm install          # Install dependencies
npm install <pkg>    # Install package
npm update          # Update packages
```

## 🚀 Deployment

### Build

```bash
npm run build
```

### Output

```
dist/
├── index.html
├── assets/
│   ├── index-xxx.js
│   └── index-xxx.css
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

## 📚 Resources

-   [React Docs](https://react.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [React Router](https://reactrouter.com/)
-   [Axios](https://axios-http.com/)
-   [Vite](https://vitejs.dev/)

## 💡 Tips

1. **Performance**: Use React.memo untuk komponen yang sering re-render
2. **Security**: Jangan commit .env file
3. **Debugging**: Gunakan React DevTools
4. **Styling**: Gunakan Tailwind IntelliSense extension
5. **API**: Test API dengan Postman/Insomnia dulu

---

Semoga membantu! 🎉
