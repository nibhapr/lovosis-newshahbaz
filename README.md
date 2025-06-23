# Lovosis.in

<div align="center">
  <img src="public/navbarlogo/lovosis-logo.png" alt="Lovosis Logo" width="200"/>


</div>

## 🌟 About Lovosis



## ✨ Features

- **Smart Match Algorithm**: Advanced matching system based on compatibility factors
- **Detailed Profiles**: Create comprehensive profiles with personal details, preferences, and photos
- **Privacy Controls**: Robust privacy settings to control who sees your information
- **Verified Profiles**: Identity verification system to ensure authenticity
- **Chat & Communication**: Secure messaging system for connecting with potential matches
- **Success Stories**: Platform to share and celebrate matrimonial success stories
- **Mobile Responsive**: Fully optimized for all devices

## 🚀 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, OAuth
- **Hosting**: Vercel
- **State Management**: Redux Toolkit
- **Media Storage**: AWS S3
- **Styling**: Styled Components, SCSS

## 📋 Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn
- MongoDB

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amananilofficial/lovosis.in.git
   cd lovosis.in
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
lovosis.in/
├── public/            # Static files
├── src/               # Source files
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/           # Utility functions
│   ├── models/        # Database models
│   ├── styles/        # Global styles
│   └── utils/         # Helper functions
├── .env.local         # Environment variables
├── .gitignore         # Git ignore file
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## 🔄 API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/:id` - Get specific profile
- `PUT /api/profiles/:id` - Update profile
- `POST /api/matches` - Create a match request
- `GET /api/matches` - Get all matches for a user

## 🌐 Deployment

The application is deployed on Vercel. You can deploy your own instance by connecting your GitHub repository to Vercel and following the deployment steps.

## 🧪 Testing

Run tests using:

```bash
npm test
```

## 📊 Analytics

The platform includes analytics to track user engagement, successful matches, and platform performance.

## 🔒 Security

- All data is encrypted in transit and at rest
- Regular security audits are conducted
- Compliance with data protection regulations

### 📞 Contact Information

- 📧 **Gmail:** [amananiloffical@gmail.com](mailto:amananiloffical@gmail.com)  
- 📱 **Phone:** [`+91 7892939127`](tel:+917892939127) *(clickable on mobile)*
- <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" width="20"/> **WhatsApp:** [+91 7892939127](https://wa.me/917892939127)  
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20"/> **LinkedIn:** [amananilofficial](https://www.linkedin.com/in/amananilofficial)  
- <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" width="20"/> **Instagram:** [@amananilofficial](https://instagram.com/amananilofficial)
---

<div align="center">
  <p>Made with ❤️ by Aman Anil </p>
</div>
