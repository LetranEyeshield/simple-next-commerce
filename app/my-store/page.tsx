'use client'

import { useEffect, useState } from 'react'
import { api } from '@/app/lib/axios'
import ProductCard from '@/app/components/ProductCard'
import { Product } from '@/app/types/product'
import Link from 'next/link'


export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get<Product[]>('/products')
        setProducts(res.data)
      } catch (err) {
        console.error('❌ Failed to load products:', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {products.map(product => (
          <Link href={`/products/${product._id}`} key={product._id}>
          <ProductCard key={product._id} product={product} />
           </Link>
        ))}
       
      </div>
    </main>
  )
}
