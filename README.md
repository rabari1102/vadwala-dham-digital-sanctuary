# 🕉️ Shri Vadwala Mandir Dudhrej Dham — Digital Sanctuary

A complete, production-ready dynamic website for **Shri Vadwala Mandir, Dudhrej Dham** (Surendranagar, Gujarat).

---

## 🏛️ Project Overview

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Mongoose (MongoDB)
- **Database**: MongoDB Atlas

---

## 📁 Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, About, Parampara, Services, Festivals, Gallery, Donate, Contact |
| `/about` | Temple history & Acharya Parampara |
| `/events` | All festivals & events |
| `/gallery` | Photo gallery with filter tabs |
| `/donations` | Donation info & QR code |
| `/contact` | Contact info, map & contact form |
| `/admin` | Admin panel (password protected) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9

### 1. Clone & Install Frontend

```bash
git clone <repo-url>
cd vadwala-dham-digital-sanctuary

# Install frontend dependencies
npm install

# Copy env file
cp .env.example .env
```

### 2. Setup Backend

```bash
cd backend

# Install backend dependencies
npm install

# Copy env file
cp .env.example .env
# Edit .env with your MongoDB URI, JWT_SECRET, and ADMIN_PASSWORD
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This will populate MongoDB with:
- Hero slides & announcements
- About / history content
- Acharya Parampara
- Temple services
- Festivals & events
- Gallery images
- Contact info
- Donation info
- Default admin user (username: `admin`, password: `admin123`)
- Site content text blocks

### 4. Run Development Servers

**Backend:**
```bash
# From project root
npm run dev:backend

# Or directly
cd backend && npm run dev
```

**Frontend:**
```bash
# From project root
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:5000/api

---

## 🔧 Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
NODE_ENV=development
JWT_SECRET=vadwala_dham_secret_key
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

---

## 🛡️ Admin Panel

Access the admin panel at `/admin`.

**Default credentials:**
- Username: `admin`
- Password: `admin123`

**Features:**
- 🪔 Events Manager — add/edit/delete festivals
- 🖼️ Gallery Manager — add/remove gallery images
- 💰 Donations Editor — update QR code, bank details
- 📝 Site Content Editor — edit all website text
- 📬 Contact Messages — view submitted contact forms

> **Security Note:** Change the default admin password in production by updating `ADMIN_PASSWORD` in `backend/.env` and re-running `npm run seed`.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/hero` | Hero slides |
| GET | `/api/announcements` | Ticker announcements |
| GET | `/api/about` | About/history content |
| GET | `/api/acharyas` | Acharya Parampara list |
| GET | `/api/services` | Temple services |
| GET | `/api/festivals` | Festivals & events |
| GET | `/api/gallery` | Gallery images |
| GET | `/api/donation` | Donation info |
| GET | `/api/contact` | Contact info |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/content` | All site content |
| POST | `/api/admin/login` | Admin login (returns JWT) |
| POST | `/api/admin/events` | Add event (protected) |
| PUT | `/api/admin/events/:id` | Update event (protected) |
| DELETE | `/api/admin/events/:id` | Delete event (protected) |
| POST | `/api/admin/gallery` | Add gallery image (protected) |
| DELETE | `/api/admin/gallery/:id` | Remove gallery image (protected) |
| PUT | `/api/admin/donations` | Update donation info (protected) |
| GET | `/api/admin/contact-messages` | List contact form messages (protected) |
| PUT | `/api/admin/content/:key` | Update site content (protected) |

---

## 🏗️ Build for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

---

## 🙏 Jai Vadwala Dev Ki Jai

*Shri Vadwala Mandir Dudhrej Dham — Surendranagar, Gujarat — 363040*
