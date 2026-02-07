'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCartStore } from '@/app/store/cartStore'

export default function CheckoutSummaryPage() {
  const store = useCartStore.getState()
  const [selectedItems, setSelectedItems] = useState(store.selectedItems())

  useEffect(() => {
    const unsub = useCartStore.subscribe(() => {
      setSelectedItems(store.selectedItems())
    })
    return unsub
  }, [])

  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    email: '',
    contactNumber: '',
  })

  const [loading, setLoading] = useState(false)

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckout = async () => {
    try {
      if (!form.firstName || !form.lastName || !form.address || !form.contactNumber) {
        alert('Please fill required fields')
        return
      }

      setLoading(true)

      const res = await axios.post('/api/checkout', {
        items: selectedItems.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        customer: form,
      })

      window.location.href = res.data.url
    } catch (error) {
      console.error(error)
      alert('Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Order Summary */}
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Order Summary
          </h2>

          <div className="space-y-4">
            {selectedItems.map(item => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded bg-gray-100 p-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-medium">
                  ₱{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t pt-4 text-base font-semibold">
            <span>Total</span>
            <span>₱{total.toLocaleString()}</span>
          </div>
        </section>

        {/* Customer Info */}
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Customer Information
          </h2>

          <div className="space-y-3">
            <input
              name="firstName"
              placeholder="First name *"
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              name="middleName"
              placeholder="Middle name (optional)"
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              name="lastName"
              placeholder="Last name *"
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <textarea
              name="address"
              placeholder="Address *"
              rows={3}
              onChange={handleChange}
              className="w-full resize-none rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              name="email"
              placeholder="Email (optional)"
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              name="contactNumber"
              placeholder="Contact number *"
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Redirecting…' : 'Proceed to Payment'}
          </button>
        </section>
      </div>
    </main>
  )
}
