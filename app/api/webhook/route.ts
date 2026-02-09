// import { NextResponse } from 'next/server'
// import Stripe from 'stripe'
// import { headers } from 'next/headers'
// import Order from '@/app/models/Order'
// import { connectDB } from '@/app/lib/db'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   typescript: true,
// })

// export async function POST(req: Request) {
//   const body = await req.text()
//   const sig = (await headers()).get('stripe-signature')!

//   let event: Stripe.Event

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     )
//   } catch (err) {
//     console.error('❌ Webhook signature verification failed')
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object as Stripe.Checkout.Session

//     try {
//       await connectDB()

//       const items = JSON.parse(session.metadata?.items || '[]')

//       await Order.create({
//         stripeSessionId: session.id,
//         paymentIntentId: session.payment_intent,
//         amount: session.amount_total! / 100,
//         currency: session.currency,

//         customer: {
//           firstName: session.metadata?.firstName,
//           middleName: session.metadata?.middleName,
//           lastName: session.metadata?.lastName,
//           address: session.metadata?.address,
//           email: session.metadata?.email,
//           contactNumber: session.metadata?.contactNumber,
//         },

//         items,
//         status: 'paid',
//       })

//       console.log('✅ Order saved')
//     } catch (error) {
//       console.error('❌ Order save failed:', error)
//     }
//   }

//   return NextResponse.json({ received: true })
// }


//////////

// import { NextResponse } from 'next/server'
// import Stripe from 'stripe'
// import { stripe } from '@/app/lib/stripe'
//  import Orders from '@/app/models/Order'
//  import { connectDB } from '@/app/lib/db'

// export async function POST(req: Request) {
//   const body = await req.text()
//   const sig = req.headers.get('stripe-signature')!

//   let event: Stripe.Event

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     )
//   } catch (err) {
//     console.error('❌ Webhook signature verification failed:', err)
//     return new NextResponse('Webhook Error', { status: 400 })
//   }

//   // ✅ Handle successful payment
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object as Stripe.Checkout.Session

//     try {
//       await connectDB()

//       await Orders.create({
//         stripeSessionId: session.id,
//         paymentIntentId: session.payment_intent,

//         customer: {
//           firstName: session.metadata?.firstName,
//           middleName: session.metadata?.middleName,
//           lastName: session.metadata?.lastName,
//           address: session.metadata?.address,
//           contactNumber: session.metadata?.contactNumber,
//           email: session.customer_email,
//         },

//         items: session.line_items?.data.map(item => ({
//           name: item.description,
//           price: item.price?.unit_amount! / 100,
//           quantity: item.quantity,
//         })),

//         amountTotal: session.amount_total! / 100,
//         currency: session.currency,
//         paymentStatus: session.payment_status,
//       })

//       console.log('✅ Order saved to MongoDB')
//     } catch (error) {
//       console.error('❌ Failed to save order:', error)
//       return new NextResponse('Webhook DB Error', { status: 500 })
//     }
//   }

//   return NextResponse.json({ received: true })
// }


///////////////

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { stripe } from '@/app/lib/stripe'
import { connectDB } from '@/app/lib/db'
import { Order } from '@/app/models/Order'

export const runtime = 'nodejs' // 🔥 REQUIRED

export async function POST(req: Request) {
  console.log('🔥 WEBHOOK HIT')

  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('❌ Signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      await connectDB()

      const existingOrder = await Order.findOne({
        stripeSessionId: session.id,
      })

      if (existingOrder) {
        return NextResponse.json({ received: true })
      }

      const items = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : []

      await Order.create({
        stripeSessionId: session.id,
        customer: {
          firstName: session.metadata?.firstName,
          middleName: session.metadata?.middleName,
          lastName: session.metadata?.lastName,
          address: session.metadata?.address,
          contactNumber: session.metadata?.contactNumber,
          //email: session.customer_details?.email,
          email: session.metadata?.email,
        },
        items,
        amountTotal: (session.amount_total ?? 0) / 100,
        currency: session.currency,
        paymentStatus: session.payment_status,
      })

      console.log('✅ Order saved successfully')
    } catch (err) {
      console.error('❌ Failed to save order:', err)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
