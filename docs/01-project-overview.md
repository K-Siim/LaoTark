# LaoTark

## Overview

LaoTark is a mobile-first warehouse management system built for small and medium-sized businesses.

The goal is to make stock movements as fast and simple as possible while maintaining accurate inventory data.

The application is designed to be used primarily on mobile devices by warehouse employees and on desktop by company owners.

---

## MVP Goals

The first version focuses only on the essential warehouse workflow.

Features:

- User authentication
- Company-based multi-tenancy
- Product management
- Stock movement registration
- Current stock tracking
- Movement history
- Simple dashboard

---

## Core Principles

- Mobile first
- Fast data entry
- Accurate inventory
- Simple UI
- No unnecessary features
- Reliable data consistency

---

## Users

### Owner

Can:

- Manage products
- View dashboard
- Register movements
- Manage employees

### Employee

Can:

- View products
- Register stock movements
- View movement history

Cannot:

- Manage company settings

---

## Architecture

Frontend

- React
- TypeScript
- Inertia.js
- TailwindCSS

Backend

- Laravel
- Eloquent ORM

Database

- PostgreSQL (preferred)
- MySQL (supported)

Deployment

- Laravel Forge
- DigitalOcean

---

## Future Features

Not included in MVP:

- Barcode scanning
- QR codes
- Multiple warehouses
- Purchase orders
- Suppliers
- Excel export
- PDF reports
- Notifications
- Accounting integrations

These will be added only after validating the MVP with paying customers.