import { NextResponse } from 'next/server'
import { connectDB } from '@/app//lib/db'
import { Product } from '@/app/models/Product'

export async function GET() {
  try {
    await connectDB()

    const products = await Product.find().lean()

    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.error('❌ Failed to fetch products:', error)

    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
