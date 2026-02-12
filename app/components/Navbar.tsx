// 'use client'

// import Link from 'next/link'
// import { useCartStore } from '@/app/store/cartStore'


// export default function Navbar() {
//   const count = useCartStore(state =>
//     state.items.reduce((sum, i) => sum + i.quantity, 0)
//   )

//   return (
//     <header className="border-b bg-white">
//       <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
//         <Link
//           href="/"
//           className="text-xl font-bold text-black"
//         >
//           Snow and Shadow Gift Varieties
//         </Link>

//         <Link
//           href="/cart"
//           className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-gray-100"
//         >
//           🛒 Cart
//           <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
//             {count}
//           </span>
//         </Link>
//       </nav>
//     </header>
//   )
// }


//new ui

'use client'

import Link from 'next/link'
import { useCartStore } from '@/app/store/cartStore'
import { ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const count = useCartStore(state =>
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  )

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-gray-900"
        >
          Snow & Shadow
          <span className="block text-xs font-normal text-gray-500">
            Gift Varieties
          </span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <ShoppingBag size={18} />
          Cart

          {count > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs text-white animate-pulse">
              {count}
            </span>
          )}
        </Link>

      </nav>
    </header>
  )
}
