// 'use client'

// import Image from 'next/image'
// import { Product } from '@/app/types/product'
// import { useCartStore } from '@/app/store/cartStore'

// type Props = {
//   product: Product
// }

// export default function ProductCard({ product }: Props) {
//   const addItem = useCartStore(state => state.addItem)

//   return (
//     <div className="border rounded-lg p-4 flex flex-col">
//       <div className="relative h-48 w-full">
//         {/* <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover rounded"
//         /> */}
//       </div>

//       <h2 className="mt-3 font-semibold text-lg">{product.name}</h2>

//       <p className="text-sm text-gray-600 line-clamp-2">
//         {product.description}
//       </p>

//       <div className="mt-auto flex items-center justify-between">
//         <span className="font-bold">
//           ₱{product.price.toLocaleString()}
//         </span>
// {/* 
//         <button
//           onClick={() =>
//             addItem({
//               _id: product._id,
//               name: product.name,
//               price: product.price
//               image: product.image
//             })
//           }
//           className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
//         >
//           Add to Cart
//         </button> */}
//       </div>
//     </div>
//   )
// }

//UI 2
// 'use client'

// // import Image from 'next/image'
// import { Product } from '@/app/types/product'
// // import { useCartStore } from '@/app/store/cartStore'

// type Props = {
//   product: Product
// }

// export default function ProductCard({ product }: Props) {
//   // const addItem = useCartStore(state => state.addItem)

//   return (
   
//       <div className="group flex flex-col rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
//   {/* Image */}
//   <div className="relative mb-4 flex h-48 items-center justify-center rounded-lg bg-gray-100 p-2">
//     <img
//       src={product.image}
//       alt={product.name}
//       className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
//     />
//   </div>
//       {/* Content */}
//       <div className="flex flex-col flex-1">
//         <h2 className="text-base font-semibold text-gray-900 leading-snug">
//           {product.name}
//         </h2>

//         <p className="mt-1 text-sm text-gray-600 line-clamp-2">
//           {product.description}
//         </p>

//         {/* Footer */}
//         <div className="mt-auto flex items-center justify-between pt-4">
//           <span className="text-lg font-bold text-gray-900">
//             ₱{product.price.toLocaleString()}
//           </span>

//           {/* Optional CTA */}
//           {/* <button
//             onClick={() => addItem(product)}
//             className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition hover:bg-gray-800"
//           >
//             Add to cart
//           </button> */}
//         </div>
//       </div>
//     </div>
//   )
// }

//NEW UI

'use client'

import { Product } from '@/app/types/product'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

      {/* Image Container */}
      <div className="relative flex h-60 items-center justify-center bg-gray-50 p-6">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">

        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
          {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-6 flex items-center justify-between">

          {/* Price */}
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            ₱{product.price.toLocaleString()}
          </span>

          {/* View Button */}
          <span className="text-sm font-medium text-gray-600 transition group-hover:text-black">
            View →
          </span>

        </div>
      </div>
    </div>
  )
}
