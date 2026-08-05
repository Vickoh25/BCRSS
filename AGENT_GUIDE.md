# 🤖 BCRSS Agent Guide (Project Manifest)

> **ATTENTION AGENT:** Read this file first to understand the project architecture and save tokens. Do not read the entire codebase unless specifically requested.

## 🌟 Project Overview
**BCRSS** (Baraton Community Resource Sharing System) is a peer-to-peer platform designed to align with the community's core objectives:
- **Objective 1 Alignment**: Explicitly supports **neighborhood households, farmers, traders, and chama groups** in listing, discovering, and exchanging resources.
- **Objective 2 Alignment**: Robust **resource listing and borrowing module** with request tracking, automated availability management, and return reminders for overdue items.
- **Scope**: Covers farm tools, textbooks, household items, trade equipment, and community job opportunities.

## 🏗️ Architecture & Deployment
| Component | Technology Stack | Deployment URL |
| :--- | :--- | :--- |
| **Frontend** | Vanilla HTML/CSS/JS | [bcrss.vercel.app](https://bcrss.vercel.app) |
| **Backend** | Django 6 + DRF | [bcrss-backend.onrender.com](https://bcrss-backend.onrender.com/api) |
| **Mobile** | Flutter 3.27.0 | [Vickoh25.github.io/BCRSS](https://Vickoh25.github.io/BCRSS/) |

## 🛠️ Technology Stack
- **Backend**: Django 6.0.6, DRF 3.14.0, MySQL 5.7+, Cloudinary (Images).
- **Frontend**: Vanilla JS (ES6), CSS Variables, Lucide Icons, Glassmorphism UI.
- **Mobile**: Flutter 3.27.0, Google Fonts (Playfair Display, Inter).

## 📂 Key Entry Points
- **Frontend Core**: `frontend/js/app.js` (State management & Routing).
- **Mock Data & Objectives**: `frontend/js/data.js` (Contains alignment data for farmers, traders, and chamas).
- **API Client**: `frontend/js/api.js` (Handles all backend communication).
- **Backend Config**: `backend/bcrss_config/settings.py` & `urls.py`.
- **User Models**: `backend/users/models.py`.
- **Mobile Core**: `bcrss_mobile/lib/main.dart`.

## 🔐 Authentication & Security
- **Mechanism**: JWT (JSON Web Tokens).
- **Storage**: `auth_token` and `refresh_token` in `localStorage`.
- **Route Guards**: Implemented in `frontend/js/app.js` -> `changeTab(tab)`.
- **Protected Areas**: Dashboard, Admin, Borrowing, Job Posting.
- **CORS**: Configured in `backend/bcrss_config/settings.py` for Vercel domain.

## 📊 Core Data Models
1. **User**: Role-based (Member/Admin), location, contact.
2. **Resource**: Tools/items with status (Available/Borrowed) and lending type.
3. **JobOpportunity**: Local jobs with rate, duration, and requirements.
4. **BorrowRequest**: Workflow: Pending → Approved/Declined → Returned.
5. **Review**: 1-5 star ratings between community members.

## 🚀 Common Commands
- **Run Backend**: `python manage.py runserver`
- **Build Mobile Web**: `cd bcrss_mobile && flutter build web --base-href "/BCRSS/"`
- **Vercel Deploy**: `vercel deploy` (from `frontend` or `bcrss_mobile`)

---
*Last Updated: August 5, 2026*
