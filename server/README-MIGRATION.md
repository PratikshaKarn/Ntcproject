# Migrating AL-NOOR backend: Node/Express/MongoDB → Laravel MVC/MySQL

I couldn't run `composer` inside my sandbox (it only has access to npm/pip
package registries, not Packagist), so this folder contains the
**application files only** — Models, Controllers, migrations, routes, mail
template, CORS config. You'll drop these into a fresh Laravel install on
your own machine. It's about 10 minutes of work.

## 1. Create a fresh Laravel project

```bash
composer create-project laravel/laravel alnoor-backend
cd alnoor-backend
composer require laravel/sanctum
php artisan install:api
```

`php artisan install:api` publishes Sanctum's migration (for API tokens)
and adds `routes/api.php` wiring automatically.

## 2. Copy these files into your new project

Copy everything from this folder into the matching path in `alnoor-backend/`,
overwriting where prompted:

```
app/Models/User.php            -> app/Models/User.php   (overwrite default)
app/Models/Contact.php
app/Models/Project.php
app/Models/Service.php
app/Models/Team.php
app/Http/Controllers/Api/*.php
app/Mail/ContactMail.php
resources/views/emails/contact.blade.php
database/migrations/2024_01_01_0000*.php
routes/api.php                 -> overwrite default
config/cors.php                -> overwrite default
```

## 3. Set up MySQL (replacing your MongoDB connection)

Create an empty database:

```sql
CREATE DATABASE alnoor_buildworks;
```

Copy `.env.example` from this folder into your Laravel project's `.env`
(or merge the DB_* and MAIL_* lines into your existing `.env`), then:

```bash
php artisan key:generate
```

This is the actual "connect my database" step — where your old `.env` had:

```
MONGO_URI=mongodb+srv://alnoor_user:...
```

your new `.env` instead has:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=alnoor_buildworks
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

Laravel's Eloquent ORM (the "M" in MVC) reads these values automatically —
there's no equivalent of `mongoose.connect()` to write yourself.

## 4. Run the migrations

This creates all your tables (`users`, `contacts`, `projects`, `services`,
`teams`, plus Sanctum's `personal_access_tokens` table) in one shot:

```bash
php artisan migrate
```

## 5. Run it

```bash
php artisan serve
```

Your API is now live at `http://localhost:8000/api/...` with the exact
same routes as before:

| Old (Express)              | New (Laravel)               |
|-----------------------------|-----------------------------|
| POST /api/contact           | POST /api/contact            |
| GET  /api/projects          | GET  /api/projects           |
| GET  /api/services          | GET  /api/services           |
| GET  /api/team              | GET  /api/team               |
| POST /api/auth/register     | POST /api/auth/register      |
| POST /api/auth/login        | POST /api/auth/login         |
| GET  /api/auth/users        | GET  /api/auth/users         |
| PUT  /api/auth/users/:id/portfolio | PUT /api/auth/users/{id}/portfolio |
| GET  /api/auth/users/:id/portfolio | GET /api/auth/users/{id}/portfolio |

## 6. Frontend changes needed

In your React app's `.env` (Vite), just point the API base URL at the new
backend, e.g.:

```
VITE_API_URL=http://localhost:8000/api
```

(or your deployed Laravel URL, once hosted). No other frontend code should
need to change — the JSON response shapes from every controller were kept
identical to the originals.

## What changed under the hood (so nothing surprises you)

- **JWT → Sanctum tokens.** Your old backend signed a JWT with claims
  baked in (role, name, clientCode). Laravel Sanctum issues a plain
  opaque API token instead. This is fine because your frontend was
  already reading `role`/`name`/`clientCode` from the JSON response body,
  not by decoding the token — so nothing on the frontend needs to change.
  Send the token back as `Authorization: Bearer <token>` on protected
  routes, same as before.
- **Mongoose sub-documents → JSON column.** The nested `portfolio` object
  on `User` (assignmentStatus, complianceStatus, financials) is stored as
  a single JSON column and auto-cast to a PHP array by Eloquent — you
  read/write it exactly like before (`$user->portfolio['financials']`).
- **The hardcoded admin login** (email/password check in `login()`) was
  ported as-is. Once this is live, I'd strongly recommend moving that
  admin account into the `users` table with a real hashed password instead
  of a hardcoded string in the codebase.
- **Nodemailer → Laravel Mail.** Same Gmail SMTP account, just configured
  via Laravel's `MAIL_*` env vars and a proper Mailable/Blade view instead
  of an inline HTML string.

## Note on your current .env secrets

Your uploaded `.env` contains your live MongoDB Atlas password, Gmail app
password, and JWT secret in plain text. Since this zip was shared with me,
I'd rotate the MongoDB password and regenerate the Gmail app password once
you're done migrating, just to be safe.
