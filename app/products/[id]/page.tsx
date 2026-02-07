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


'use client'

import { useEffect, useState } from 'react'
import { api } from '@/app/lib/axios'
import { Product } from '@/app/types/product'
import { useCartStore } from '@/app/store/cartStore'
import { useParams } from 'next/navigation'

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

  if (loading) {
    return <p className="p-6 text-gray-500">Loading product…</p>
  }

  if (error || !product) {
    return <p className="p-6 text-red-500">{error}</p>
  }

  const handleAddToCart = () => {
    try {
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      alert('Product added to cart!') 
    } catch (err) {
      console.error('❌ Failed to add to cart:', err)
    }
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center rounded-xl border bg-gray-50 p-6">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] w-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-3 text-2xl font-semibold text-gray-900">
            ₱{product.price.toLocaleString()}
          </p>

          <p className="mt-6 leading-relaxed text-gray-700">
            {product.description}
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Stock available: <span className="font-medium">{product.stock}</span>
          </p>

          {/* CTA */}
          {/* <button
            onClick={() =>
              addItem({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition hover:bg-gray-800 active:scale-95"
          >
            Add to Cart
          </button> */}
          {/*CTA */}
          <button
            onClick={handleAddToCart}
            className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-black px-8 py-3 text-base font-medium text-white transition hover:bg-gray-800 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}
