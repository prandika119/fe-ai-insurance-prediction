# AI Insurance Prediction System - Frontend

Website untuk deployment model AI prediksi biaya asuransi kesehatan.

## 🚀 Fitur

### 1. Dashboard

-   Total prediksi user
-   5 aktivitas prediksi terakhir
-   Rata-rata hasil prediksi user
-   Akurasi model
-   Rata-rata hasil prediksi global
-   Distribusi perokok (chart)
-   Distribusi gender (chart)
-   Top region

### 2. Halaman Prediksi

-   Form input menarik dengan visual yang bagus
-   Input: age, bmi, children, sex, smoker, region
-   Hasil prediksi langsung ditampilkan
-   Ringkasan input yang dimasukkan

### 3. Halaman History

-   List semua prediksi yang pernah dibuat
-   Detail setiap prediksi
-   Pagination

### 4. Halaman Profile

-   Tampilan profile user
-   Edit profile (full_name, email)
-   Informasi akun

### 5. Authentication

-   Halaman Login
-   Halaman Register
-   Protected routes

## 🛠️ Tech Stack

-   **React 19.2.0** - UI Framework
-   **React Router DOM 6.21.3** - Routing
-   **Tailwind CSS 3.4.1** - Styling
-   **Axios 1.6.5** - HTTP Client
-   **Vite 7.2.4** - Build Tool

## 📦 Instalasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Konfigurasi

### API Configuration

Edit file `vite.config.js` untuk mengubah URL API backend:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000', // Ganti dengan URL API Anda
      changeOrigin: true,
    }
  }
}
```

Atau edit langsung di `src/utils/axios.js`:

```javascript
const api = axios.create({
    baseURL: "http://your-api-url.com/api", // Ganti dengan URL API Anda
    headers: {
        "Content-Type": "application/json",
    },
});
```

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Layout.jsx           # Layout dengan sidebar
│   └── ProtectedRoute.jsx   # Route protection
├── context/
│   └── AuthContext.jsx      # Authentication context
├── pages/
│   ├── Dashboard.jsx        # Halaman dashboard
│   ├── Predict.jsx          # Halaman prediksi
│   ├── History.jsx          # Halaman history
│   ├── Profile.jsx          # Halaman profile
│   ├── Login.jsx            # Halaman login
│   └── Register.jsx         # Halaman register
├── utils/
│   └── axios.js             # Axios configuration
├── App.jsx                  # Main app component
└── main.jsx                 # Entry point
```

## 🔌 API Endpoints

Aplikasi ini mengkonsumsi API berikut:

-   `POST /api/register` - Register user baru
-   `POST /api/login` - Login user
-   `POST /api/predict` - Buat prediksi baru
-   `GET /api/profile` - Get profile user
-   `PUT /api/profile` - Update profile user
-   `GET /api/history` - Get history prediksi
-   `GET /api/dashboard` - Get data dashboard

## 🎨 Fitur UI

-   **Responsive Design** - Mobile-friendly
-   **Modern UI** - Clean dan intuitive
-   **Color-coded Stats** - Visual yang jelas
-   **Loading States** - Feedback untuk user
-   **Error Handling** - Error messages yang informatif
-   **Success Messages** - Konfirmasi aksi berhasil
-   **Emoji Icons** - Visual yang menarik
-   **Gradient Backgrounds** - Design modern
-   **Hover Effects** - Interactive elements
-   **Shadow Effects** - Depth dan dimensi

## 📝 Catatan Pengembangan

1. **Token Management**: Token disimpan di localStorage dan otomatis dikirim di setiap request
2. **Protected Routes**: Halaman yang memerlukan auth akan redirect ke login
3. **Auto Redirect**: Setelah login berhasil, otomatis redirect ke dashboard
4. **Error Handling**: 401 error akan otomatis logout user
5. **Responsive**: Semua halaman responsive untuk mobile dan desktop

## 🔒 Security

-   Token-based authentication
-   Auto logout on 401 response
-   Protected routes untuk halaman private
-   Secure form submissions

## 🚀 Cara Menjalankan

1. **Clone repository**

```bash
git clone <repository-url>
cd fe-ppd-uas
```

2. **Install dependencies**

```bash
npm install
```

3. **Konfigurasi API**

    - Edit `vite.config.js` untuk mengubah URL API backend
    - Atau edit `src/utils/axios.js`

4. **Jalankan development server**

```bash
npm run dev
```

5. **Buka browser**
    - Aplikasi akan berjalan di `http://localhost:5173`
    - Login dengan credentials yang sudah didaftarkan

## 📱 Pages

### Login (`/login`)

-   Form login dengan username dan password
-   Redirect ke dashboard setelah berhasil login

### Register (`/register`)

-   Form registrasi dengan username, email, password, dan full_name
-   Redirect ke login setelah berhasil register

### Dashboard (`/dashboard`)

-   Overview statistik prediksi
-   Aktivitas terakhir
-   Statistik global
-   Distribusi data

### Predict (`/predict`)

-   Form prediksi dengan input lengkap
-   Real-time hasil prediksi
-   Visual yang menarik

### History (`/history`)

-   List semua prediksi
-   Detail lengkap setiap prediksi
-   Pagination support

### Profile (`/profile`)

-   Informasi profile user
-   Edit profile (full_name, email)

## 👥 Team

Tugas Kuliah PPD - Deployment Model AI

## 📄 License

Untuk keperluan pendidikan

---

Made with ❤️ for PPD UAS Project
