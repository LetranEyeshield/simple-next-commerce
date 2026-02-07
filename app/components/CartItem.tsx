'use client'

import Image from 'next/image'
import { CartItem as ItemType, useCartStore } from '@/app/store/cartStore'

type Props = {
  item: ItemType
}

export default function CartItem({ item }: Props) {
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)

  return (
    <div className="flex gap-4 border-b py-4">
      <div className="relative w-24 h-24">
        {/* <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
        /> */}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          ₱{item.price.toLocaleString()}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="px-2 border rounded"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="px-2 border rounded"
          >
            +
          </button>

          <button
            onClick={() => removeItem(item._id)}
            className="ml-4 text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="font-semibold">
        ₱{(item.price * item.quantity).toLocaleString()}
      </div>
    </div>
  )
}
