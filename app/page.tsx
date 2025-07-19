'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Sparkles, Wand2, Download, Heart, Zap, Palette, Gem } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeroBackground } from '@/components/ui/hero-background'
import { cn } from '@/lib/utils'

const styles = [
  { id: 1, name: 'Cyberpunk', gradient: 'from-pink-500 to-purple-600' },
  { id: 2, name: 'Minimalist', gradient: 'from-gray-100 to-gray-300' },
  { id: 3, name: 'Watercolor', gradient: 'from-blue-300 to-green-300' },
  { id: 4, name: 'Digital Art', gradient: 'from-teal-400 to-cyan-500' },
  { id: 5, name: 'Abstract', gradient: 'from-yellow-400 to-orange-500' },
  { id: 6, name: 'Photorealistic', gradient: 'from-slate-400 to-gray-500' },
  { id: 7, name: 'Cartoon', gradient: 'from-red-400 to-yellow-400' },
  { id: 8, name: 'Vintage', gradient: 'from-amber-400 to-orange-600' },
  { id: 9, name: 'Neon', gradient: 'from-lime-400 to-green-500' },
  { id: 10, name: 'Pastel', gradient: 'from-fuchsia-300 to-pink-400' },
  { id: 11, name: '3D Render', gradient: 'from-sky-400 to-blue-500' },
  { id: 12, name: 'Oil Painting', gradient: 'from-indigo-400 to-purple-500' },
  { id: 13, name: 'Pixel Art', gradient: 'from-green-500 to-emerald-600' },
  { id: 14, name: 'Line Art', gradient: 'from-stone-200 to-neutral-300' },
  { id: 15, name: 'Low Poly', gradient: 'from-violet-500 to-fuchsia-600' },
  { id: 16, name: 'Isometric', gradient: 'from-rose-400 to-red-500' },
]

const features = [
  {
    icon: <Palette className="w-8 h-8 text-purple-500" />,
    title: 'Precise Stylization',
    description: 'Choose from a dozen handcrafted art styles to give your creations a unique and consistent look, from cyberpunk to watercolor.',
  },
  {
    icon: <Gem className="w-8 h-8 text-blue-500" />,
    title: 'Superior Quality',
    description: 'Our advanced models generate high-resolution images without the usual AI artifacts, ensuring a professional, polished finish.',
  },
  {
    icon: <Zap className="w-8 h-8 text-green-500" />,
    title: 'User-Owned Assets',
    description: 'You have full ownership of every image you create. Use them for personal or commercial projects without any restrictions.',
  }
]

const testimonials = [
  "StyleGen has redefined our design workflow. It feels like having a 24/7 design team on standby.",
  "The visual quality is mind-blowing. Our landing pages look handcrafted by top designers.",
  "I created a full icon set for my app in under ten minutes. Simply magical.",
  "Finally, an AI tool that actually understands design consistency and style!",
]

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedStyle) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          styleId: selectedStyle 
        }),
      })
      
      const data = await response.json()
      if (data.success) {
        setGeneratedImage(data.imageUrl)
      }
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Gem className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold">StyleGen</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          </div>
          <Button>Get Started</Button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              ✨ No-code AI asset generation
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Create Stunning Visuals with a Single Prompt
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Transform your ideas into unique, high-quality illustrations and UI elements. Choose a style, describe your vision, and let our AI bring it to life.
            </p>
            <div className="max-w-2xl mx-auto bg-white p-4 rounded-xl shadow-lg border">
              <textarea
                placeholder="e.g., 'A modern dashboard UI for a finance app'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-24 p-4 bg-gray-50 rounded-lg border-none outline-none resize-none text-lg focus:ring-2 focus:ring-primary"
              />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || !selectedStyle || isGenerating}
                  size="lg"
                  className="min-w-[150px]"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Style Gallery */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Style</h2>
            <p className="text-xl text-muted-foreground">Select the perfect aesthetic for your creation.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {styles.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card 
                  className={`group cursor-pointer transition-all duration-300 overflow-hidden border-2 rounded-xl hover:shadow-xl ${
                    selectedStyle === style.id 
                      ? 'border-primary ring-4 ring-primary/20' 
                      : 'border-gray-200 hover:border-primary'
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-300 group-hover:scale-105 animated-gradient", style.gradient)} />
                      <div className="absolute inset-0 bg-black/20" />
                      <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-md">{style.name}</h3>
                      {selectedStyle === style.id && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1.5 shadow-lg">
                          <Heart className="w-4 h-4 fill-current" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Generated Result */}
      {generatedImage && (
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Your Masterpiece</h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto border-4 border-gray-200 rounded-2xl p-4 shadow-2xl bg-white"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={generatedImage}
                  alt="Generated artwork"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex justify-center mt-6 space-x-4">
                <Button size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="lg" onClick={() => setGeneratedImage(null)}>
                  Create Another
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why StyleGen?</h2>
            <p className="text-xl text-muted-foreground">The ultimate tool for developers and designers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="p-8 text-center h-full border-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="inline-block bg-gray-100 p-4 rounded-full mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Creatives</h2>
            <p className="text-xl text-muted-foreground">Hear what our users are saying.</p>
          </div>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full flex items-center justify-center p-8 rounded-2xl shadow-md border">
                      <p className="text-lg italic leading-relaxed">"{testimonial}"</p>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Endless Possibilities</h2>
            <p className="text-xl text-muted-foreground">From mockups to marketing — StyleGen has you covered.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {['Landing Pages','Mobile Apps','Presentations','Marketing Campaigns'].map((item,index)=>(
              <motion.div key={item} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:index*0.1}}>
                <Card className="p-8 text-center border-2 rounded-2xl shadow-md hover:shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">{item}</h3>
                  <p className="text-muted-foreground">Generate tailor-made visuals that perfectly fit your {item.toLowerCase()}.</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              ['Do I own the images I create?','Absolutely. Every asset you generate is 100% yours.'],
              ['Is there a limit to how many images I can create?','During beta, you can create as many as you like.'],
              ['What styles are available?','We currently offer 16 styles and are adding more weekly.'],
              ['Can I cancel anytime?','Yes. There are no contracts or hidden fees.'],
            ].map(([q,a],i)=>(
              <details key={i} className="group border border-gray-200 rounded-lg p-4 bg-white open:shadow-md transition-all">
                <summary className="cursor-pointer list-none flex justify-between items-center font-medium">
                  <span>{q}</span>
                  <span className="transition-transform group-open:rotate-180">⌄</span>
                </summary>
                <p className="mt-2 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 bg-gradient-to-b from-purple-100 via-white to-white relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300/30 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300/30 rounded-full filter blur-3xl animate-pulse" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-6">Be the First to Try StyleGen</h2>
          <p className="text-xl text-muted-foreground mb-8">Join our waitlist and get early access, exclusive perks, and more.</p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
            <input type="email" required placeholder="Your email address" className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
            <Button size="lg" className="px-8">Join Waitlist</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Gem className="w-6 h-6 text-purple-600" />
            <span className="text-2xl font-bold">StyleGen</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Unleash your creativity with the power of AI.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StyleGen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 