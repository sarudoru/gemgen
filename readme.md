# GemGen - AI Asset Generator

A sleek, modern web application for generating AI-powered assets and illustrations. Built with Next.js, TypeScript, and OpenAI's DALL-E 3.

## Features

- 🎨 **Modern UI**: Sleek glassmorphism design with gradient backgrounds
- 🤖 **AI-Powered**: Integration with OpenAI's DALL-E 3 for high-quality image generation
- 🎭 **Multiple Styles**: 12+ different artistic styles to choose from
- 📱 **Responsive**: Beautiful interface that works on all devices
- ⚡ **Fast**: Built with Next.js for optimal performance

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **UI Components**: Radix UI primitives with custom styling
- **AI Integration**: OpenAI API (DALL-E 3)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gemgen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Enter your prompt**: Describe what you want to create in the large text field
2. **Choose a style**: Select from 12 different artistic styles in the gallery
3. **Generate**: Click the "Generate ✨" button to create your AI artwork
4. **Download**: Save your creation or generate another variation

## Available Styles

- Cyberpunk
- Minimalist  
- Watercolor
- Digital Art
- Abstract
- Photorealistic
- Cartoon
- Vintage
- Neon
- Pastel
- 3D Render
- Oil Painting

## API Endpoints

### POST `/api/generate`

Generate an AI image based on prompt and style.

**Request Body:**
```json
{
  "prompt": "A futuristic cityscape with flying cars",
  "styleId": 1
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://...",
  "prompt": "A futuristic cityscape with flying cars in cyberpunk style..."
}
```

## Customization

### Adding New Styles

1. Add a new style object to the `styles` array in `app/page.tsx`
2. Add the corresponding style prompt in `app/api/generate/route.ts`

### Modifying the UI

The design system is built with Tailwind CSS and custom CSS variables. Key files:
- `app/globals.css` - Global styles and design tokens
- `components/ui/` - Reusable UI components
- `tailwind.config.js` - Tailwind configuration

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel settings
4. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the developer community**
