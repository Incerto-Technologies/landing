# Google OAuth Phone Number Setup

This guide explains how to configure Google OAuth to access user phone numbers in your NextAuth application.

## Prerequisites

1. A Google Cloud Project
2. Google OAuth 2.0 credentials configured
3. NextAuth.js v4 installed

## Setup Steps

### 1. Google Cloud Console Configuration

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Enable the **Google People API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google People API"
   - Click on it and press "Enable"

### 2. OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. The following scopes are automatically included:
   ```
   openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email
   ```
3. These scopes provide basic user information and access to the Google People API

### 3. Environment Variables

Make sure you have these environment variables set in your `.env.local`:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Usage

The phone number will now be available in your session object:

```typescript
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session } = useSession();

  console.log("Phone number:", session?.user?.phoneNumber);

  return (
    <div>
      <p>Phone: {session?.user?.phoneNumber || "Not available"}</p>
    </div>
  );
}
```

## Important Notes

1. **User Consent**: Users will need to explicitly grant permission to access their phone numbers during the OAuth flow.

2. **Phone Number Availability**: Not all Google accounts have phone numbers associated with them, so always handle the case where `phoneNumber` might be undefined.

3. **Testing**: Use the `PhoneNumberDisplay` component in your app to test if the phone number is being retrieved correctly.

4. **Production**: Make sure to update your OAuth consent screen for production and add any necessary privacy policy and terms of service URLs.

## Troubleshooting

- If you're not getting phone numbers, check that:
  - The Google People API is enabled in your Google Cloud Console
  - The user has a phone number associated with their Google account
  - The user has granted permission during the OAuth flow
  - Check the console logs for detailed error messages
  - Note: Not all Google accounts have phone numbers available through the API

## Security Considerations

- Phone numbers are sensitive personal information
- Always handle this data securely
- Consider if you actually need to store phone numbers in your database
- Implement proper data retention and deletion policies
