# 💕 Sandra & Nicolas - Wedding Application

A modern, secure, and accessible Next.js wedding application built with TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Modern Stack**: Next.js 15, React 19, TypeScript 5
- **Secure Authentication**: Server-side admin authentication with rate limiting
- **Real-time Updates**: Live RSVP updates using Supabase subscriptions
- **Responsive Design**: Mobile-first design with sophisticated "Maison June" inspired theme
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance Optimized**: React.memo, code splitting, and optimized images
- **Security Hardened**: CSP headers, input sanitization, XSS protection

## 🏗️ Architecture

### Components
- **Atomic Design**: Organized component hierarchy with reusable UI components
- **Custom Hooks**: Business logic abstracted into reusable hooks
- **Error Boundaries**: Comprehensive error handling with graceful fallbacks
- **Performance**: Optimized with React.memo, useMemo, and useCallback

### Security
- ✅ Server-side authentication
- ✅ Input validation and sanitization
- ✅ Rate limiting
- ✅ CSP headers and security middleware
- ✅ Environment variable validation
- ✅ XSS protection

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mariage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure environment variables**
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Admin Authentication
   ADMIN_PASSWORD=your_secure_admin_password
   
   # Image Upload (optional)
   IMGUR_CLIENT_ID=your_imgur_client_id
   
   # Wedding Configuration
   WEDDING_DATE=2026-05-21
   WEDDING_LOCATION=Restaurant Le Surfing, Seignosse
   COUPLE_NAMES=Sandra & Nicolas
   ```

5. **Set up Supabase database**
   ```sql
   -- Create guests table
   CREATE TABLE guests (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     thursday BOOLEAN,
     friday BOOLEAN,
     message TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Enable Row Level Security
   ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
   
   -- Create policies (adjust as needed)
   CREATE POLICY "Allow public read access" ON guests FOR SELECT USING (true);
   CREATE POLICY "Allow public insert access" ON guests FOR INSERT WITH CHECK (true);
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Ensure Node.js 18+ runtime
- Set all required environment variables
- Build command: `npm run build`
- Start command: `npm start`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── rsvp/              # RSVP page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # Design system components
│   └── [features]/        # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── types/                 # TypeScript type definitions
└── constants/             # Application constants
```

## 🎨 Design System

The application uses a sophisticated design system inspired by "Maison June":

- **Colors**: Warm, pastel palette with sage, blush, and cream tones
- **Typography**: Poppins for headings, Dancing Script for decorative elements
- **Patterns**: Custom SVG patterns and organic shapes
- **Components**: Consistent variant system across all UI components

## 🔒 Security Features

### Implemented
- Server-side authentication with secure sessions
- Input validation and sanitization using Zod
- Rate limiting (5 requests/minute for submissions)
- CSP headers and security middleware
- Restricted image domains in Next.js config
- Environment variable validation

### Recommendations for Production
- Use proper JWT tokens or session management
- Implement proper password hashing
- Add 2FA for admin access
- Set up error monitoring (Sentry, LogRocket)
- Add backup and recovery procedures

## 🧪 Testing

Currently no tests are implemented. Recommended additions:

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## 📊 Monitoring

The application includes basic analytics tracking:

- Page views
- RSVP submissions (anonymized)
- Error tracking
- Admin actions

Configure error reporting service in `src/lib/analytics.ts` for production.

## 🔧 Development

### Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Adding New Features
1. Create components in appropriate directories
2. Add TypeScript types in `/src/types/`
3. Use custom hooks for business logic
4. Follow the established patterns and conventions

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify environment variables
   - Check Supabase project settings
   - Ensure RLS policies are configured

2. **Admin Login Not Working**
   - Check ADMIN_PASSWORD environment variable
   - Ensure API routes are deployed correctly

3. **Images Not Loading**
   - Verify image domains in next.config.ts
   - Check CSP headers configuration

## 📝 License

This project is created for Sandra & Nicolas' wedding. All rights reserved.

## 🤝 Contributing

This is a private wedding application. For any issues or questions, please contact the development team.

---

Made with 💕 for Sandra & Nicolas' special day
