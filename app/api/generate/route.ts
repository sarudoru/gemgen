import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const stylePrompts = {
  1: 'in cyberpunk style with neon colors and futuristic elements',
  2: 'in minimalist style with clean lines and simple composition',
  3: 'in watercolor painting style with soft, flowing colors',
  4: 'in digital art style with vibrant colors and sharp details',
  5: 'in abstract style with geometric shapes and bold colors',
  6: 'in photorealistic style with high detail and natural lighting',
  7: 'in cartoon style with bold colors and simplified forms',
  8: 'in vintage style with muted colors and retro aesthetic',
  9: 'in neon style with bright, glowing colors and electric atmosphere',
  10: 'in pastel style with soft, muted colors and dreamy atmosphere',
  11: 'in 3D render style with realistic lighting and materials',
  12: 'in oil painting style with rich textures and classical composition',
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, styleId } = await request.json()
    
    if (!prompt || !styleId) {
      return NextResponse.json(
        { success: false, error: 'Prompt and style are required' },
        { status: 400 }
      )
    }

    const stylePrompt = stylePrompts[styleId as keyof typeof stylePrompts]
    const fullPrompt = `${prompt} ${stylePrompt}`

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: fullPrompt,
    })

    const imageUrl = response.data[0].url

    return NextResponse.json({
      success: true,
      imageUrl,
      prompt: fullPrompt,
    })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate image: ' + error },
      { status: 500 }
    )
  }
} 