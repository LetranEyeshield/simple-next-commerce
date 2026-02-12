// 'use client'

// import Link from 'next/link'
// import { useCartStore } from '@/app/store/cartStore'
// import CartItem from '@/app/components/CartItem'

// export default function CartPage() {
//   const items = useCartStore(state => state.items)
//   const getTotal = useCartStore(state => state.getTotal)
//   const clearCart = useCartStore(state => state.clearCart)

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <p className="mb-4">Your cart is empty 🛒</p>
//         <Link
//           href="/"
//           className="text-blue-600 underline"
//         >
//           Continue shopping
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <main className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       <div className="space-y-4">
//         {items.map(item => (
//           <CartItem key={item._id} item={item} />
//         ))}
//       </div>

//       <div className="mt-6 border-t pt-4 flex justify-between items-center">
//         <button
//           onClick={clearCart}
//           className="text-sm text-red-500"
//         >
//           Clear Cart
//         </button>

//         <div className="text-right">
//           <p className="text-lg font-semibold">
//             Total: ₱{getTotal().toLocaleString()}
//           </p>

//           <Link
//             href="/checkout"
//             className="inline-block mt-2 bg-black text-white px-6 py-2 rounded"
//           >
//             Proceed to Checkout
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }


'use client'

import { useCartStore } from '@/app/store/cartStore'
import axios from 'axios'
import Link from 'next/link'

export default function CartPage() {
  const {
    items,
    toggleSelect,
    updateQuantity,
    removeItem,
    removeSelectedItems,
    getTotal,
     selectAll,
    unselectAll,
    clearCart,
    selectedItems,
  } = useCartStore()

  const total = getTotal()
  const hasSelected = items.some((item) => item.selected)

  //   const handleCheckout = async () => {
  //   try {
  //     const items = selectedItems().map((item) => ({
  //       _id: item._id,
  //       name: item.name,
  //       price: item.price,
  //       quantity: item.quantity,
  //     }))

  //     if (items.length === 0) {
  //       alert('Please select items to checkout')
  //       return
  //     }

  //     const res = await axios.post('/api/checkout', { items })

  //     window.location.href = res.data.url
  //   } catch (error) {
  //     console.error('❌ Checkout failed:', error)
  //     alert('Checkout failed. Please try again.')
  //   }
  // }

//OLD UI
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//             {/* Select controls */}
//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={selectAll}
//           className="text-sm text-blue-600 cursor-pointer"
//         >
//           Select all
//         </button>
//         <button
//           onClick={unselectAll}
//           className="text-sm text-red-600 cursor-pointer"
//         >
//           Unselect all
//         </button>
              

//                 <button
//            onClick={clearCart}
//           className="text-sm text-red-500 cursor-pointer"
//          >
//           Clear Cart
//         </button>
//         {items.length > 0 && (
 
//     <button
//       onClick={removeSelectedItems}
//       className="hover:cursor-pointer text-sm text-red-600 disabled:opacity-50"
//       disabled={!hasSelected}
//     >
//       Remove selected
//     </button>
  
// )}

//       </div>

//       {items.length === 0 && (
//         <p className="text-gray-500">Your cart is empty</p>
//       )}

//       {items.map((item) => (
//         <div
//           key={item._id}
//           className="flex items-center gap-4 border-b py-4"
//         >
//           {/* Checkbox */}
//           <input
//             type="checkbox"
//             checked={item.selected}
//             onChange={() => toggleSelect(item._id)}
//             className="w-5 h-5"
//           />

//           {/* Image */}
//           {/* <img
//             src={item.image}
//             alt={item.name}
//             className="w-20 h-20 object-cover rounded"
//           /> */}
//          <div className="relative h-24 w-24 flex-shrink-0 rounded bg-gray-100">
//   <img
//     src={item.image}
//     alt={item.name}
//     className="h-full w-full object-contain rounded"
//   />
// </div>
//           {/* Product info */}
//           <div className="flex-1">
//             <h2 className="font-semibold">{item.name}</h2>
//             <p className="text-sm text-gray-500">
//               ₱{item.price}
//             </p>

//             {/* Quantity controls */}
//             <div className="flex items-center gap-2 mt-2">
//               <button
//                 onClick={() =>
//                   updateQuantity(item._id, item.quantity - 1)
//                 }
//                 disabled={item.quantity <= 1}
//                 className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
//               >
//                 −
//               </button>

//               <span className="w-8 text-center">
//                 {item.quantity}
//               </span>

//               <button
//                 onClick={() =>
//                   updateQuantity(item._id, item.quantity + 1)
//                 }
//                 className="px-3 py-1 border rounded cursor-pointer"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Item total + remove */}
//           <div className="text-right">
//             <p className="font-semibold">
//               ₱{item.price * item.quantity}
//             </p>

//             <button
//               onClick={() => removeItem(item._id)}
//               className="text-sm text-red-600 mt-2 cursor-pointer"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Checkout summary */}
//       {items.length > 0 && (
//         <div className="mt-6 flex justify-between items-center">
//           <p className="text-lg font-bold">
//             Total: ₱{total}
//           </p>

//           {/* <button
//             className="bg-black text-white px-6 py-2 rounded disabled:opacity-50 cursor-pointer"
//             disabled={total === 0}
//             onClick={handleCheckout}
//           >
//             Checkout
//           </button> */}
//          <Link
//             href="/checkout/summary"
//             className={`bg-black text-white px-6 py-2 rounded ${
//               !hasSelected && 'opacity-50 pointer-events-none'
//             }`}
//           >
//             Checkout
//           </Link>

//         </div>
//       )}
//     </div>
//   )


//NEW UI

return(
  <div className="min-h-screen bg-neutral-50 py-16 px-6">
  <div className="mx-auto max-w-6xl">

    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-10">
      Your Cart
    </h1>

    {items.length === 0 ? (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-flex rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE – ITEMS */}
        <div className="lg:col-span-2 space-y-6">

          {/* Top controls */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <button onClick={selectAll} className="hover:underline">
              Select all
            </button>
            <button onClick={unselectAll} className="hover:underline text-red-500">
              Unselect all
            </button>
            <button onClick={clearCart} className="hover:underline text-red-600">
              Clear cart
            </button>
            <button
              onClick={removeSelectedItems}
              disabled={!hasSelected}
              className="hover:underline text-red-600 disabled:opacity-40"
            >
              Remove selected
            </button>
          </div>

          {/* Items */}
          {items.map((item) => (
            <div
              key={item._id}
              className="flex gap-6 rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelect(item._id)}
                className="mt-2 h-5 w-5"
              />

              <div className="h-28 w-28 rounded-xl bg-gray-100 p-2 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  ₱{item.price.toLocaleString()}
                </p>

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 rounded-md border hover:bg-gray-100 disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="h-8 w-8 rounded-md border hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right flex flex-col justify-between">
                <p className="font-semibold text-gray-900">
                  ₱{(item.price * item.quantity).toLocaleString()}
                </p>

                <button
                  onClick={() => removeItem(item._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE – SUMMARY */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm h-fit sticky top-24">

          <h2 className="text-lg font-semibold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Subtotal</span>
            <span>₱{total.toLocaleString()}</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₱{total.toLocaleString()}</span>
          </div>

          <Link
            href="/checkout/summary"
            className={`mt-8 w-full inline-flex justify-center rounded-xl bg-black py-3 text-white transition hover:bg-gray-800 ${
              !hasSelected && 'opacity-40 pointer-events-none'
            }`}
          >
            Checkout
          </Link>
        </div>

      </div>
    )}
  </div>
</div>

)

}


