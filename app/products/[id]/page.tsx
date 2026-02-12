// 'use client'

// import { useEffect, useState } from 'react'
// import { api } from '@/app/lib/axios'
// import { Product } from '@/app/types/product'
// import { useCartStore } from '@/app/store/cartStore'
// // import Image from 'next/image'
// import { useParams } from 'next/navigation'

// export default function ProductDetailsPage() {
//   const { id } = useParams<{ id: string }>()
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//    //const addItem = useCartStore(state => state.addItem)
// const addItem = useCartStore(state => state.addToCart)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get<Product>(`/products/${id}`)
//         setProduct(res.data)
//       } catch (err) {
//         console.error('❌ Failed to load product:', err)
//         setError('Product not found')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [id])

//   if (loading) {
//     return <p className="p-6">Loading product...</p>
//   }

//   if (error || !product) {
//     return <p className="p-6 text-red-500">{error}</p>
//   }

//   return (
//     <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div className="relative h-96 w-full">
//         {/* <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover rounded"
//         /> */}
//         <img src={product.image} alt={product.name} />
//       </div>

//       <div>
//         <h1 className="text-3xl font-bold">{product.name}</h1>

//         <p className="text-xl font-semibold mt-2">
//           ₱{product.price.toLocaleString()}
//         </p>

//         <p className="mt-4 text-gray-700">
//           {product.description}
//         </p>

//         <p className="mt-2 text-sm text-gray-500">
//           Stock: {product.stock}
//         </p>

//         <button
//           onClick={() =>
//             addItem({
//               _id: product._id,
//               name: product.name,
//               price: product.price,
//               image: product.image
//               //selected: true
//             })
//           }
//           className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </main>
//   )
// }


// 'use client'

// import { useEffect, useState } from 'react'
// import { api } from '@/app/lib/axios'
// import { Product } from '@/app/types/product'
// import { useCartStore } from '@/app/store/cartStore'
// import { useParams } from 'next/navigation'

// export default function ProductDetailsPage() {
//   const { id } = useParams<{ id: string }>()
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const addItem = useCartStore(state => state.addToCart)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get<Product>(`/products/${id}`)
//         setProduct(res.data)
//       } catch (err) {
//         console.error('❌ Failed to load product:', err)
//         setError('Product not found')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [id])

//   if (loading) {
//     return <p className="p-6 text-gray-500">Loading product…</p>
//   }

//   if (error || !product) {
//     return <p className="p-6 text-red-500">{error}</p>
//   }

//   const handleAddToCart = () => {
//     try {
//       addItem({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//       })
//       alert('Product added to cart!') 
//     } catch (err) {
//       console.error('❌ Failed to add to cart:', err)
//     }
//   }

//   return (
//     <main className="mx-auto max-w-6xl p-6">
//       <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
//         {/* Image */}
//         <div className="flex items-center justify-center rounded-xl border bg-gray-50 p-6">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="max-h-[420px] w-full object-contain"
//           />
//         </div>

//         {/* Details */}
//         <div className="flex flex-col">
//           <h1 className="text-3xl font-bold text-gray-900">
//             {product.name}
//           </h1>

//           <p className="mt-3 text-2xl font-semibold text-gray-900">
//             ₱{product.price.toLocaleString()}
//           </p>

//           <p className="mt-6 leading-relaxed text-gray-700">
//             {product.description}
//           </p>

//           <p className="mt-3 text-sm text-gray-500">
//             Stock available: <span className="font-medium">{product.stock}</span>
//           </p>

//           {/* CTA */}
//           {/* <button
//             onClick={() =>
//               addItem({
//                 _id: product._id,
//                 name: product.name,
//                 price: product.price,
//                 image: product.image,
//               })
//             }
//             className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition hover:bg-gray-800 active:scale-95"
//           >
//             Add to Cart
//           </button> */}
//           {/*CTA */}
//           <button
//             onClick={handleAddToCart}
//             className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition hover:bg-gray-800 active:scale-95"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </main>
//   )
// }


//NEW UI

'use client'

import { useEffect, useState } from 'react'
import { api } from '@/app/lib/axios'
import { Product } from '@/app/types/product'
import { useCartStore } from '@/app/store/cartStore'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const addItem = useCartStore(state => state.addToCart)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get<Product>(`/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        console.error('❌ Failed to load product:', err)
        setError('Product not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // ===== LOADING STATE =====
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-500 animate-pulse">
          Loading product details...
        </p>
      </div>
    )
  }

  // ===== ERROR STATE =====
  if (error || !product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-8 py-6 text-red-500">
          {error}
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-20 px-6">
      <div className="mx-auto max-w-6xl">

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">

          {/* ===== IMAGE SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-gray-200 bg-white p-10 shadow-sm"
          >
            <div className="flex items-center justify-center h-[420px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* ===== DETAILS SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-4 text-3xl font-semibold text-gray-900">
              ₱{product.price.toLocaleString()}
            </p>

            {/* Stock Badge */}
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                In stock: {product.stock}
              </span>
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              className="mt-10 w-full md:w-fit rounded-xl bg-black px-10 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] active:scale-95"
            >
              Add to Cart
            </button>

          </motion.div>

        </div>
      </div>
    </main>
  )
}
