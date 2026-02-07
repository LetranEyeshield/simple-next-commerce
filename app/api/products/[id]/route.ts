import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import { Product } from '@/app/models/Product'
import { Types } from 'mongoose'

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params // ✅ IMPORTANT FIX

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid product ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const product = await Product.findById(id).lean()

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error('❌ Fetch product failed:', error)

    return NextResponse.json(
      { message: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
