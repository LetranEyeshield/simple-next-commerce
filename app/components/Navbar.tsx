'use client'

import Link from 'next/link'
import { useCartStore } from '@/app/store/cartStore'


export default function Navbar() {
  const count = useCartStore(state =>
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  )

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-black"
        >
          Snow and Shadow Gift Varieties
        </Link>

        <Link
          href="/cart"
          className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-gray-100"
        >
          🛒 Cart
          <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
            {count}
          </span>
        </Link>
      </nav>
    </header>
  )
}
