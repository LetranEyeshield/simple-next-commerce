// 'use client'

// import { useState } from 'react'
// import axios from 'axios'
// import { useCartStore } from '@/app/store/cartStore'

// export default function CheckoutPage() {
//   const { selectedItems } = useCartStore()
//   //const selectedItems = useCartStore(state => state.selectedItems())
//   const getTotal = useCartStore(state => state.getTotal)

//   const [form, setForm] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     address: '',
//     email: '',
//     contactNumber: '',
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleCheckout = async () => {
//     try {
//       const items = selectedItems()

//       if (items.length === 0) {
//         alert('No items selected')
//         return
//       }

//       if (!form.firstName || !form.lastName || !form.address || !form.contactNumber) {
//         alert('Please fill required fields')
//         return
//       }

//       const res = await axios.post('/api/checkout', {
//         items,
//         customer: form,
//       })

//       window.location.href = res.data.url
//     } catch (error) {
//       console.error('❌ Checkout failed:', error)
//       alert('Checkout failed')
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-xl font-bold mb-4">Checkout</h1>
      

//       <input name="firstName" placeholder="First name *" onChange={handleChange} />
//       <input name="middleName" placeholder="Middle name (optional)" onChange={handleChange} />
//       <input name="lastName" placeholder="Last name *" onChange={handleChange} />
//       <textarea name="address" placeholder="Address *" onChange={handleChange} />
//       <input name="email" placeholder="Email (optional)" onChange={handleChange} />
//       <input name="contactNumber" placeholder="Contact number *" onChange={handleChange} />

//       <button
//         onClick={handleCheckout}
//         className="mt-6 w-full bg-black text-white py-3 rounded"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   )
// }

'use client'

import { redirect } from 'next/navigation'

export default function CheckoutPage() {
  redirect('/checkout/summary')
}
