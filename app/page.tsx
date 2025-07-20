'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Sparkles, Wand2, Download, Heart, Zap, Palette, Gem } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { AuroraText } from '@/components/ui/aurora-text'

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
  { id: 10, name: '+ More coming soon', gradient: 'from-fuchsia-300 to-pink-400' },,
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

  useEffect(() => {
    // Initialize sparkle button particles
    const RANDOM = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
    const PARTICLES = document.querySelectorAll('.particle')
    PARTICLES.forEach(P => {
      P.setAttribute('style', `
        --x: ${RANDOM(20, 80)};
        --y: ${RANDOM(20, 80)};
        --duration: ${RANDOM(6, 20)};
        --delay: ${RANDOM(1, 10)};
        --alpha: ${RANDOM(40, 90) / 100};
        --origin-x: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
        --origin-y: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
        --size: ${RANDOM(40, 90) / 100};
      `)
    })

    // Initialize craft section interaction
    const list = document.querySelector('.craft-ul')
    const items = list?.querySelectorAll('li')
    
    if (list && items) {
      const setIndex = (event: Event) => {
        const closest = (event.target as Element).closest('li')
        if (closest) {
          const itemsArray = Array.from(items)
          const index = itemsArray.indexOf(closest)
          const cols = new Array(list.children.length)
            .fill(null)
            .map((_, i) => {
              items[i].setAttribute('data-active', (index === i).toString())
              return index === i ? '10fr' : '1fr'
            })
            .join(' ')
          ;(list as HTMLElement).style.setProperty('grid-template-columns', cols)
        }
      }
      
      list.addEventListener('focus', setIndex, true)
      list.addEventListener('click', setIndex)
      list.addEventListener('pointermove', setIndex)
      
      const resync = () => {
        const w = Math.max(
          ...Array.from(items).map((i) => {
            return (i as HTMLElement).offsetWidth
          })
        )
        ;(list as HTMLElement).style.setProperty('--article-width', w.toString())
      }
      
      window.addEventListener('resize', resync)
      resync()
    }
  }, [])

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
    <div
      className="bg-background text-foreground"
      style={{ position: "relative", zIndex: 0 }}
    >
      <style jsx>{`
        .bg-background.text-foreground::before {
          --size: 45px;
          --line: color-mix(in hsl, currentColor, transparent 70%);
          content: "";
          height: 100%;
          width: 100%;
          position: absolute;
          background: -webkit-linear-gradient(left, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size), -webkit-linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size);
          background: -moz-linear-gradient(left, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size), -moz-linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size);
          background: -o-linear-gradient(left, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size), -o-linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size);
          background: linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size), linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size);
          -webkit-mask: -webkit-linear-gradient(110deg, transparent 50%, white);
          mask: -webkit-linear-gradient(110deg, transparent 50%, white);
          mask: -moz-linear-gradient(110deg,transparent 50%,white);
          mask: -o-linear-gradient(110deg,transparent 50%,white);
          mask: linear-gradient(-20deg, transparent 50%, white);
          top: 0;
          -webkit-transform-style: flat;
          -moz-transform-style: flat;
          transform-style: flat;
          pointer-events: none;
          z-index: 0;
          opacity: 0.15;
          filter: blur(1px);
          animation: grid-fade 2s ease-in-out infinite alternate;
        }
      `}</style>
      <style jsx global>{`
        /* Sparkle Button Styles */
        *,
        *:after,
        *:before {
          box-sizing: border-box;
        }
        
        .sparkle-button {
          --transition: 0.25s;
          --spark: 1.8s;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          width: fit-content;
        }

        .sparkle-button button {
          --cut: 0.1em;
          --active: 0;
          --bg: radial-gradient(
              40% 50% at center 100%,
              hsl(270 calc(var(--active) * 97%) 72% / var(--active)),
              transparent
            ),
            radial-gradient(
              80% 100% at center 120%,
              hsl(260 calc(var(--active) * 97%) 70% / var(--active)),
              transparent
            ),
            hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));
          background: var(--bg);
          font-size: 1.25rem;
          font-weight: 500;
          border: 0;
          cursor: pointer;
          padding: 0.9em 1.3em;
          display: flex;
          align-items: center;
          gap: 0.25em;
          white-space: nowrap;
          border-radius: 100px;
          position: relative;
          box-shadow: 0 0 calc(var(--active) * 6em) calc(var(--active) * 3em) hsl(260 97% 61% / 0.75),
            0 0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
            0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset;
          transition: box-shadow var(--transition), scale var(--transition), background var(--transition);
          scale: calc(1 + (var(--active) * 0.1));
        }

        .sparkle-button button:active {
          scale: 1;
        }

        .sparkle-button svg {
          overflow: visible !important;
        }

        .sparkle path {
          color: hsl(0 0% calc((var(--active, 0) * 70%) + var(--base)));
          transform-box: fill-box;
          transform-origin: center;
          fill: currentColor;
          stroke: currentColor;
          animation-delay: calc((var(--transition) * 1.5) + (var(--delay) * 1s));
          animation-duration: 0.6s;
          transition: color var(--transition);
        }

        .sparkle-button button:is(:hover, :focus-visible) path {
          animation-name: bounce;
        }

        @keyframes bounce {
          35%, 65% {
            scale: var(--scale);
          }
        }

        .sparkle path:nth-of-type(1) {
          --scale: 0.5;
          --delay: 0.1;
          --base: 40%;
        }

        .sparkle path:nth-of-type(2) {
          --scale: 1.5;
          --delay: 0.2;
          --base: 20%;
        }

        .sparkle path:nth-of-type(3) {
          --scale: 2.5;
          --delay: 0.35;
          --base: 30%;
        }

        .sparkle-button button:before {
          content: "";
          position: absolute;
          inset: -0.25em;
          z-index: -1;
          border: 0.25em solid hsl(260 97% 50% / 0.5);
          border-radius: 100px;
          opacity: var(--active, 0);
          transition: opacity var(--transition);
        }

        .spark {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          rotate: 0deg;
          overflow: hidden;
          mask: linear-gradient(white, transparent 50%);
          animation: flip calc(var(--spark) * 2) infinite steps(2, end);
        }

        @keyframes flip {
          to {
            rotate: 360deg;
          }
        }

        .spark:before {
          content: "";
          position: absolute;
          width: 200%;
          aspect-ratio: 1;
          top: 0%;
          left: 50%;
          z-index: -1;
          translate: -50% -15%;
          rotate: 0;
          transform: rotate(-90deg);
          opacity: calc((var(--active)) + 0.4);
          background: conic-gradient(from 0deg, transparent 0 340deg, white 360deg);
          transition: opacity var(--transition);
          animation: rotate var(--spark) linear infinite both;
        }

        .spark:after {
          content: "";
          position: absolute;
          inset: var(--cut);
          border-radius: 100px;
        }

        .backdrop {
          position: absolute;
          inset: var(--cut);
          background: var(--bg);
          border-radius: 100px;
          transition: background var(--transition);
        }

        @keyframes rotate {
          to {
            transform: rotate(90deg);
          }
        }

        .sparkle-button button:is(:hover, :focus-visible) {
          --active: 1;
          --play-state: running;
        }

        .particle-pen {
          position: absolute;
          width: 200%;
          aspect-ratio: 1;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          -webkit-mask: radial-gradient(white, transparent 65%);
          z-index: -1;
          opacity: var(--active, 0);
          transition: opacity var(--transition);
        }

        .particle {
          fill: white;
          width: calc(var(--size, 0.25) * 1rem);
          aspect-ratio: 1;
          position: absolute;
          top: calc(var(--y) * 1%);
          left: calc(var(--x) * 1%);
          opacity: var(--alpha, 1);
          animation: float-out calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear;
          transform-origin: var(--origin-x, 1000%) var(--origin-y, 1000%);
          z-index: -1;
          animation-play-state: var(--play-state, paused);
        }

        .particle path {
          fill: hsl(0 0% 90%);
          stroke: none;
        }

        .particle:nth-of-type(even) {
          animation-direction: reverse;
        }

        @keyframes float-out {
          to {
            rotate: 360deg;
          }
        }

        .text {
          translate: 2% -6%;
          letter-spacing: 0.01ch;
          background: linear-gradient(90deg, hsl(0 0% calc((var(--active) * 100%) + 65%)), hsl(0 0% calc((var(--active) * 100%) + 26%)));
          -webkit-background-clip: text;
          color: transparent;
          transition: background var(--transition);
        }

        .sparkle-button button svg {
          inline-size: 1.25em;
          translate: -25% -5%;
        }

        /* Craft Section Styles */
        .craft-section {
          --gap: 8px;
          --base: clamp(2rem, 8cqi, 80px);
          --easing: linear(
            0 0%,
            0.1538 4.09%,
            0.2926 8.29%,
            0.4173 12.63%,
            0.5282 17.12%,
            0.6255 21.77%,
            0.7099 26.61%,
            0.782 31.67%,
            0.8425 37%,
            0.8887 42.23%,
            0.9257 47.79%,
            0.9543 53.78%,
            0.9752 60.32%,
            0.9883 67.11%,
            0.9961 75%,
            1 100%
          );
          --speed: 0.6s;
          position: relative;
        }

        .craft-section::before {
          --size: 45px;
          --line: color-mix(in hsl, currentColor, transparent 70%);
          content: '';
          height: 100%;
          width: 100%;
          position: absolute;
          background: linear-gradient(
                90deg,
                var(--line) 1px,
                transparent 1px var(--size)
              )
              50% 50% / var(--size) var(--size),
            linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
              var(--size) var(--size);
          mask: linear-gradient(-20deg, transparent 50%, white);
          top: 0;
          transform-style: flat;
          pointer-events: none;
          z-index: 0;
        }

        .craft-section h1 {
          --font-size-min: 22;
          --font-level: 4.25;
          --font-size-max: 20;
          --font-ratio-min: 1.2;
          --font-ratio-max: 1.33;
          --font-width-min: 375;
          --font-width-max: 1500;
          --fluid-min: calc(
            var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0))
          );
          --fluid-max: calc(
            var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0))
          );
          --fluid-preferred: calc(
            (var(--fluid-max) - var(--fluid-min)) /
              (var(--font-width-max) - var(--font-width-min))
          );
          --fluid-type: clamp(
            (var(--fluid-min) / 16) * 1rem,
            ((var(--fluid-min) / 16) * 1rem) -
              (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) +
              (var(--fluid-preferred) * 100vi),
            (var(--fluid-max) / 16) * 1rem
          );
          font-size: var(--fluid-type);
          margin: 0;
        }

        .craft-section > p {
          width: 74ch;
          max-width: calc(100% - 4rem);
          text-wrap: balance;
          font-family: monospace;
          margin-bottom: 4rem;
          line-height: 1.5;
          opacity: 0.8;
          font-weight: 400;
          margin: 0 auto 4rem auto;
        }

        .craft-ul {
          display: grid;
          container-type: inline-size;
          grid-template-columns: 10fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: var(--gap);
          list-style-type: none;
          justify-content: center;
          padding: 0;
          height: clamp(300px, 40dvh, 474px);
          margin: 0 auto;
          width: min(820px, calc(100% - 4rem));
          transition: grid-template-columns var(--speed) var(--easing);
        }

        .craft-ul li {
          background: white;
          position: relative;
          overflow: hidden;
          min-width: var(--base);
          border-radius: 8px;
          border: 1px solid color-mix(in hsl, canvas, currentColor 50%);
        }

        .craft-ul li :is(svg, h3) {
          opacity: 0.6;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }

        .craft-ul li :is(a, p) {
          opacity: 0;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
          width: fit-content;
        }

        .craft-ul li img {
          filter: grayscale(1) brightness(1.5);
          scale: 1.1;
          transition-property: filter, scale;
          transition-duration: calc(var(--speed) * 1.2);
          transition-timing-function: var(--easing);
        }

        .craft-ul [data-active='true'] :is(a, p, h3, svg) {
          opacity: 1;
        }

        .craft-ul [data-active='true'] :is(a, p) {
          transition-delay: calc(var(--speed) * 0.25);
        }

        .craft-ul [data-active='true'] img {
          filter: grayscale(0) brightness(1);
          scale: 1;
          transition-delay: calc(var(--speed) * 0.25);
        }

        .craft-ul article {
          width: calc(var(--article-width) * 1px);
          height: 100%;
          position: absolute;
          font-family: monospace;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 1rem;
          padding-inline: calc(var(--base) * 0.5 - 9px);
          padding-bottom: 1rem;
          overflow: hidden;
        }

        .craft-ul article h3 {
          position: absolute;
          top: 1rem;
          left: calc(var(--base) * 0.5);
          transform-origin: 0 50%;
          rotate: 90deg;
          font-size: 1rem;
          font-weight: 300;
          text-transform: uppercase;
          font-family: monospace;
          white-space: nowrap;
          margin: 0;
        }

        .craft-ul article svg {
          width: 18px;
          fill: none;
        }

        .craft-ul article p {
          font-size: 13px;
          text-wrap: balance;
          line-height: 1.25;
          opacity: 0.8;
          margin: 0;
        }

        .craft-ul article a {
          position: absolute;
          bottom: 1rem;
          height: 18px;
          line-height: 1;
          color: inherit;
          text-decoration: none;
        }

        .craft-ul article a:is(:focus-visible, :hover) {
          outline: none;
        }

        .craft-ul article a:is(:focus-visible, :hover) span {
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .craft-ul article a span {
          display: inline-block;
          line-height: 18px;
          translate: calc(var(--base) * 0.5);
          font-weight: 500;
        }

        .craft-ul article img {
          position: absolute;
          pointer-events: none;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          mask: radial-gradient(100% 100% at 100% 0, #fff, #0000);
        }
      `}</style>

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
      <section className="pt-32 text-center relative overflow-hidden">
        
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
            <h1 className="font-[Inter] font-semibold mb-[3.5rem] leading-tight" style={{ fontSize: '3.3rem'}}>
              Create <AuroraText>Stunning</AuroraText> Visuals with a Single Prompt
            </h1>

            
            </motion.div>
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-36 mb-[4.5rem]">
              {styles.map((style, index) => (
                <motion.div>
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
            <div className="max-w-2xl mx-auto">
                <textarea
                  placeholder="e.g., 'A modern dashboard UI for a finance app'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-24 p-4 bg-gray-50 rounded-lg border-none outline-none resize-none text-lg focus:ring-2 focus:ring-primary"
                />
                
                <div className="flex flex-col items-center mt-4">
                  <RainbowButton 
                      size="lg"
                      disabled={!prompt.trim() || !selectedStyle || isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Generate'}
                    </RainbowButton>
                  </div>
              </div>
        </div>
          </div>
        </section>

      {/* Style Gallery */}
      <section id="gallery" className="pb-20">
        
      </section>

      {/* Craft of UI Section */}
      <section className="py-20 bg-white craft-section">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="fluid mb-6">the craft of ui</h1>
          <p className="mb-16">
            Unlock the art and science of interface development. This isn't just about
            pushing pixels or following documentation — it's about mastering the
            tools, understanding the nuances, and shaping experiences with intention.
          </p>
          <ul className="craft-ul">
            <li data-active="true">
              <article>
                <h3>The Craft</h3>
                <p>
                  Gain the confidence to build anything you envision, transforming
                  motion, interaction, and design principles into second nature.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3h12l4 6-10 13L2 9Z" />
                  <path d="M11 3 8 9l4 13 4-13-3-6" />
                  <path d="M2 9h20" />
                </svg>
                <a href="#">
                  <span>Watch now</span>
                </a>
                <img src="https://picsum.photos/720/720?random=12" alt="" />
              </article>
            </li>
            <li>
              <article>
                <h3>CSS Animation</h3>
                <p>
                  Master CSS animations from your very first set of @keyframes right
                  through to things no one else ever teaches you.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 3v18" />
                  <path d="M3 7.5h4" />
                  <path d="M3 12h18" />
                  <path d="M3 16.5h4" />
                  <path d="M17 3v18" />
                  <path d="M17 7.5h4" />
                  <path d="M17 16.5h4" />
                </svg>
                <a href="#"><span>Watch now</span></a>
                <img src="https://picsum.photos/720/720?random=17" alt="" />
              </article>
            </li>
            <li>
              <article>
                <h3>SVG Filters</h3>
                <p>
                  Shaders on a budget. Learn how to use noise to your advantage whilst
                  making flames and stickers.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <a href="#"><span>Watch now</span></a>
                <img src="https://picsum.photos/720/720?random=19" alt="" />
              </article>
            </li>
            <li>
              <article>
                <h3>Scroll Animation</h3>
                <p>
                  Take your users on a journey with the joy of tasteful scroll
                  animation. You might not even need JavaScript.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                  <path
                    d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"
                  />
                </svg>
                <a href="#"><span>Watch now</span></a>
                <img src="https://picsum.photos/720/720?random=42" alt="" />
              </article>
            </li>
            <li>
              <article>
                <h3>Taming Canvas</h3>
                <p>
                  Grasp how to tame the pixel playground and when to do so. Whilst
                  building with "Performance Driven Development".
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
                  />
                </svg>
                <a href="#"><span>Watch now</span></a>
                <img src="https://picsum.photos/720/720?random=128" alt="" />
              </article>
            </li>
            <li>
              <article>
                <h3>Layout Tricks</h3>
                <p>
                  Do you really need a library for that? Sometimes stepping back and
                  rethinking the problem yields a nifty solution.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"
                  />
                  <path d="m14 7 3 3" />
                  <path d="M5 6v4" />
                  <path d="M19 14v4" />
                  <path d="M10 2v2" />
                  <path d="M7 8H3" />
                  <path d="M21 16h-4" />
                  <path d="M11 3H9" />
                </svg>
                <a href="#"><span>Watch now</span></a>
                <img src="https://picsum.photos/720/720?random=56" alt="" />
              </article>
            </li>
            <li>
              <article>
                <h3>Mastering Time</h3>
                <p>
                  It's not all just easings and compositions. Time plays a crucial
                  part in various UI patterns that might not seem obvious at first.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 22h14" />
                  <path d="M5 2h14" />
                  <path
                    d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"
                  />
                  <path
                    d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
                  />
                </svg>
                <a href="#"><span>Watch now</span></a>
                <img src="https://picsum.photos/720/720?random=39" alt="" />
              </article>
            </li>
          </ul>
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
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6 backdrop-blur-md">
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