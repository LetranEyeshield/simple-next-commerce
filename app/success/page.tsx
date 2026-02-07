// 'use client'

// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import axios from 'axios'
// import { useCartStore } from '@/app/store/cartStore'
// import Link from 'next/link'

// export default function SuccessPage() {
//   const searchParams = useSearchParams()
//   const sessionId = searchParams.get('session_id')

//   const clearCart = useCartStore(state => state.clearCart)
//   const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

//   useEffect(() => {
//     if (!sessionId) {
//       setStatus('error')
//       return
//     }

//     const verify = async () => {
//       try {
//         const res = await axios.post('/api/verify-order', {
//           sessionId,
//         })

//         if (res.data.success) {
//           //clearCart()
//           setStatus('success')
//         } else {
//           setStatus('error')
//         }
//       } catch (error) {
//         console.error(error)
//         setStatus('error')
//       }
//     }

//     verify()
//   // }, [sessionId, clearCart])
//    }, [sessionId])

//   if (status === 'loading') {
//     return <p className="p-6">Verifying payment…</p>
//   }

//   if (status === 'error') {
//     return <p className="p-6 text-red-600">Payment verification failed.</p>
//   }

//   return (
//     <div className="p-6 text-center">
//       <h1 className="text-2xl font-bold mb-4">Payment Successful 🎉</h1>
//       <p>Thank you for your order!</p>
//       <Link href={"/"}></Link>
//     </div>
//   )
// }


import { Suspense } from 'react'
import SuccessComponent from '@/app/components/Success'

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading order...</p>}>
      <SuccessComponent />
    </Suspense>
  )
}
