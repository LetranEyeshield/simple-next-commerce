'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useCartStore } from '@/app/store/cartStore'
import Link from 'next/link'

export default function SuccessComponent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  //const clearCart = useCartStore(state => state.clearCart)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    const verify = async () => {
      try {
        const res = await axios.post('/api/verify-order', { sessionId })

        if (res.data.success) {
           //clearCart()
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }

    verify()
  }, [sessionId])

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">
          Verifying your payment…
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-red-600">
            Payment Failed
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            We couldn&apos;t verify your payment. Please try again.
          </p>

          <Link
            href="/cart"
            className="mt-4 inline-block rounded-lg bg-black px-5 py-2 text-sm text-white hover:bg-gray-800"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    )
  }

  return (
    // <main className="flex min-h-[60vh] items-center justify-center px-4">
    //   <div className="max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
    //     <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
    //       ✅
    //     </div>

    //     <h1 className="text-2xl font-bold text-gray-900">
    //       Payment Successful
    //     </h1>

    //     <p className="mt-2 text-sm text-gray-600">
    //       Thank you for your order! Your payment has been confirmed.
    //     </p>

    //     <div className="mt-6 flex justify-center gap-3">
    //       {/* <Link
    //         href="/"
    //         className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
    //       >
    //         Continue Shopping
    //       </Link> */}

    //       {/* <Link
    //         href="/"
    //         className="rounded-lg border px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
    //       >
    //         Go to Homepage
    //       </Link> */}

    //         <Link
    //         href="/"
    //         className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
    //       >
    //         Back To Shop
    //       </Link>
    //     </div>
    //   </div>
    // </main>
    //
    //
    //
    //NEW UI
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
  <div className="max-w-md w-full rounded-3xl border bg-white p-10 text-center shadow-lg">

    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
      ✓
    </div>

    <h1 className="text-2xl font-bold text-gray-900">
      Payment Successful
    </h1>

    <p className="mt-3 text-gray-600">
      Thank you for your order. Your payment has been confirmed and your items are being processed.
    </p>

    <Link
      href="/"
      className="mt-8 inline-flex w-full justify-center rounded-xl bg-black py-3 text-white transition hover:bg-gray-800"
    >
      Back to Shop
    </Link>
  </div>
</main>

  )
}
