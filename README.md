# EduConnect - Online Learning Platform

EduConnect is a modern online learning platform that connects students with expert teachers across various subjects. Built with Next.js, MongoDB, and TypeScript.

![EduConnect Screenshot](screenshots/homepage.png)

## Features

- 👥 User Authentication (Teachers & Students)
- 👨‍🏫 Teacher Profiles & Availability Management
- 📚 Course Booking System pnpm tsx src/scripts/seedLocations.ts
- 👥 Group Classes
- 📊 Learning Progress Tracking
- 💰 Flexible Payment Options

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (version 18 or higher)
- MongoDB (version 4.4 or higher)
- pnpm (version 8 or higher)

### Installing Prerequisites

1. **Node.js**:

   - Download from [Node.js website](https://nodejs.org/)
   - Choose LTS version
   - Run the installer

2. **MongoDB**:

   - Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS
   - Ensure MongoDB service is running

3. **pnpm**:
   ```bash
   npm install -g pnpm
   ```

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/educonnect.git
   cd educonnect
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Create environment file**:
   Create a `.env` file in the root directory with:

   ```env
   MONGODB_URI=mongodb://localhost:27017/educonnect
   JWT_SECRET=your-super-secret-key-change-this-in-production
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Verify MongoDB is running**:
   - Windows: Check Services app for "MongoDB"
   - Mac: Run `brew services list`
   - Linux: Run `sudo systemctl status mongod`

## Running the Application

1. **Start the development server**:

   ```bash
   pnpm dev
   ```

2. **Access the application**:
   - Open [http://localhost:3000](http://localhost:3000)
   - Create an account or use test credentials:
     - Teacher: teacher@example.com / password123
     - Student: student@example.com / password123

## Testing the Features

1. **Register a new account**:

   - Visit /signup
   - Choose role (Teacher/Student)
   - Fill in details
   - Submit form

2. **Login**:

   - Visit /signin
   - Enter credentials
   - Choose role
   - Submit form

3. **Teacher Features**:

   - Update profile
   - Set availability
   - Create group classes
   - View bookings

4. **Student Features**:
   - Browse teachers
   - Book classes
   - Join group classes
   - Track progress

## Project Structure

```
educonnect/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── api/         # API routes
│   │   ├── teacher/     # Teacher pages
│   │   └── student/     # Student pages
│   ├── components/      # Reusable components
│   ├── lib/            # Utilities
│   └── models/         # Database models
├── public/             # Static files
└── package.json        # Dependencies
```

## Common Issues & Solutions

1. **MongoDB Connection Error**:

   - Ensure MongoDB is running
   - Check MONGODB_URI in .env
   - Verify network connectivity

2. **Authentication Issues**:

   - Clear browser localStorage
   - Check JWT_SECRET in .env
   - Verify user role matches

3. **Page Loading Issues**:
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `pnpm install`
   - Restart development server

## Development Workflow

1. **Making Changes**:

   - Create feature branch
   - Make changes
   - Test locally
   - Submit PR

2. **API Testing**:

   ```bash
   # Register a teacher
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"teacher"}'

   # Login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"password123","role":"teacher"}'
   ```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@educonnect.com or join our Slack channel.
