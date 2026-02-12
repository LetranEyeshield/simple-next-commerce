// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="">
//     <main className="flex min-h-screen items-center justify-center">
//       <h1 className="text-4xl font-bold text-blue-600">
//         Next.js 15 E-Commerce 🚀
//       </h1>
//       <Link href="/my-store" className="ml-4 text-xl underline">
//         View Products
//       </Link>
//     </main>
//     </div>
//   );
// }


//UI 2

// 'use client'

// import { useEffect, useState } from 'react'
// import { api } from '@/app/lib/axios'
// import ProductCard from '@/app/components/ProductCard'
// import { Product } from '@/app/types/product'
// import Link from 'next/link'


// export default function Home() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await api.get<Product[]>('/products')
//         setProducts(res.data)
//       } catch (err) {
//         console.error('❌ Failed to load products:', err)
//         setError('Failed to load products')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading products...</p>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         {error}
//       </div>
//     )
//   }

//   return (
//     <main className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         Products
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
//         {products.map(product => (
//           <Link href={`/products/${product._id}`} key={product._id}>
//           <ProductCard key={product._id} product={product} />
//            </Link>
//         ))}
       
//       </div>
//     </main>
//   )
// }


//NEW UI

'use client'

import { useEffect, useState } from 'react'
import { api } from '@/app/lib/axios'
import ProductCard from '@/app/components/ProductCard'
import { Product } from '@/app/types/product'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <div className="animate-pulse text-lg tracking-wide text-neutral-400">
          Loading premium products...
        </div>
      </div>
    )
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/30 px-8 py-6 rounded-2xl text-red-400">
          {error}
        </div>
      </div>
    )
  }

  // ================= MAIN =================
  return (
    <main className="bg-neutral-950 text-white min-h-screen">

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Discover Modern Essentials
        </motion.h1>

        <p className="text-neutral-400 mt-6 max-w-2xl mx-auto text-lg">
          Carefully curated products built with performance,
          minimalism, and seamless checkout experience in mind.
        </p>
      </section>

      {/* ===== PRODUCTS GRID ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/products/${product._id}`}>
                <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 hover:border-indigo-500/40 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                  <ProductCard product={product} />
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>
    </main>
  )
}
