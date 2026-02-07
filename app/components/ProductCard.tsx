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


'use client'

// import Image from 'next/image'
import { Product } from '@/app/types/product'
// import { useCartStore } from '@/app/store/cartStore'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  // const addItem = useCartStore(state => state.addItem)

  return (
   
      <div className="group flex flex-col rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
  {/* Image */}
  <div className="relative mb-4 flex h-48 items-center justify-center rounded-lg bg-gray-100 p-2">
    <img
      src={product.image}
      alt={product.name}
      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>
      {/* Content */}
      <div className="flex flex-col flex-1">
        <h2 className="text-base font-semibold text-gray-900 leading-snug">
          {product.name}
        </h2>

        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-gray-900">
            ₱{product.price.toLocaleString()}
          </span>

          {/* Optional CTA */}
          {/* <button
            onClick={() => addItem(product)}
            className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Add to cart
          </button> */}
        </div>
      </div>
    </div>
  )
}

