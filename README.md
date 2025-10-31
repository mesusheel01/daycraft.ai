# DayCraft AI

DayCraft AI is an AI-powered scheduling assistant built with Next.js, Prisma, NextAuth, and Tailwind CSS. Users can sign up, sign in (with credentials or OAuth), and send prompts to generate personalized schedules.

# Design files

```
https://www.figma.com/design/1ZzqCj1WnRWGoeQDJLRTIC/day-craft?node-id=0-1&p=f&t=5omP9p1mxI5fspQB-0
```

## Features(In terms of me)

<!--  -->

- ✨ AI-powered daily scheduling
- 🔒 Secure authentication (Credentials, GitHub, Google)
- 🗂️ User registration and login
- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🧑‍💻 Built with Next.js App Router and Prisma ORM

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/day-craft.git
cd day-craft
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```
DATABASE_URL=your_postgres_or_mysql_url
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Set up the database

```bash
npx prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
  api/
    auth/
      [...nextauth]/route.ts   # NextAuth configuration
      register/route.ts        # User registration API
    task/                      # Task APIs
  dashboard/                   # Dashboard page
  signin/                      # Sign-in page
  signup/                      # Sign-up page
  page.tsx                     # Home page
  layout.tsx                   # App layout
components/
  SessionWrapper.tsx           # NextAuth session provider
prisma/
  schema.prisma                # Prisma schema
public/
  favicon.ico                  # App icon
```

## Authentication

- **Credentials:** Username & password (stored securely with bcrypt)
- **OAuth:** GitHub & Google

## Scheduling

After signing in, users can send prompts to DayCraft AI, which generates a personalized schedule using AI.

## License

MIT
Abhi tk to nhi liya h 
---

Made with ❤️ by the DayCraft AI
