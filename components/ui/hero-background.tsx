"use client"

import { motion } from 'framer-motion'

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <div className="absolute h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-50"></div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#d1e9ff,transparent)]"></div>
      
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/40 rounded-full filter blur-3xl opacity-50 animate-blob"
      />
      <motion.div
        className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/40 rounded-full filter blur-3xl opacity-50 animate-blob"
        style={{ animationDelay: '2s' }}
      />
       <motion.div
        className="absolute bottom-0 left-1/4 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-pink-200/40 rounded-full filter blur-3xl opacity-50 animate-blob"
        style={{ animationDelay: '4s' }}
      />
    </div>
  )
} 