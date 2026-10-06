# Safiri Gems

A full-stack e-commerce platform for a jewellery business. Customers can browse products by category, and admins can manage the catalogue through role-protected routes.

**Live demo:** [safiri-gems.vercel.app](https://safiri-gems.vercel.app)

> The backend runs on a free Render tier, so the first request after a period of inactivity can take up to a minute while the server wakes up.

## Features

- Product and category browsing for customers
- JWT authentication for login and protected routes
- Role-based access control, so admin functions are available only to admin users
- Admin management of products, categories and inventory
- Order data stored with the products and inventory it relates to
- Product images displayed in the storefront, with image URLs stored in the database

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Flask (REST API) |
| Database | PostgreSQL (hosted on Supabase) |
| Authentication | JWT |
| Deployment | Vercel (frontend), Render (backend) |

## Project Structure

```
Safiri_Gems/
├── safiri-backend/    # Flask REST API, database models and authentication
└── safiri-frontend/   # React storefront and admin interface
```

## Database Models

The PostgreSQL schema covers four main entities: **products**, **categories**, **inventory** and **orders**.

## Running Locally

### Prerequisites

- Python 3
- Node.js and npm
- A PostgreSQL database (local or hosted)

### Backend

```bash
cd safiri-backend
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `safiri-backend` with your own values:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET_KEY=your_secret_key
```

Then start the server:

```bash
flask run
```

### Frontend

```bash
cd safiri-frontend
npm install
npm run dev
```

The frontend needs to know where the backend is running. Set the API URL in the frontend's environment configuration if required.

## Author

**Cynthia Mugo**
[GitHub](https://github.com/CynthiaMugo) | [LinkedIn](https://linkedin.com/in/cynthiamuthonimugo)
