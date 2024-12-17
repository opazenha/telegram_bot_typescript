# CCR Telegram Bot

A Telegram bot for managing church room availability using Google Gemini AI.

## Features

- Room availability management (CRUD operations)
- Integration with Telegram Bot API
- Natural language processing using Google Gemini
- Secure API endpoints
- PostgreSQL database for data persistence

## Prerequisites

- Node.js 20.x or later
- Docker and Docker Compose
- PostgreSQL 16
- Telegram Bot Token
- Google Gemini API Key

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your configuration values
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

Run in development mode:
```bash
npm run dev
```

## Production

Build and run with Docker:
```bash
docker-compose up --build
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── db/            # Database setup and migrations
├── middleware/    # Express middleware
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Security

- Rate limiting enabled
- Helmet security headers
- Environment variables for sensitive data
- Input validation and sanitization
- Non-root user in Docker

## License

[Your License]
