// import { NextResponse } from 'next/server'
// import { stripe } from '@/app/lib/stripe'

// type CheckoutItem = {
//   _id: string
//   name: string
//   price: number
//   quantity: number
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { items, customer } = body

//     if (!items || items.length === 0) {
//       return NextResponse.json(
//         { message: 'No items to checkout' },
//         { status: 400 }
//       )
//     }

//     if (!customer?.firstName || !customer?.lastName || !customer?.address || !customer?.contactNumber) {
//       return NextResponse.json(
//         { message: 'Missing customer information' },
//         { status: 400 }
//       )
//     }

//     const lineItems = items.map((item: CheckoutItem) => ({
//       price_data: {
//         currency: 'php',
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }))

//     const session = await stripe.checkout.sessions.create({
//       mode: 'payment',
//       line_items: lineItems,
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
//       customer_email: customer.email || undefined,
//       metadata: {
//         firstName: customer.firstName,
//         middleName: customer.middleName || '',
//         lastName: customer.lastName,
//         address: customer.address,
//         contactNumber: customer.contactNumber,
//         email: customer.email || '',
//         items: JSON.stringify(items),

//       },
//     })

//     return NextResponse.json({ url: session.url })
//   } catch (error) {
//     console.error('❌ Stripe checkout error:', error)

//     return NextResponse.json(
//       { message: 'Stripe session creation failed' },
//       { status: 500 }
//     )
//   }
// }





import { NextResponse } from 'next/server'
import { stripe } from '@/app/lib/stripe'

type CheckoutItem = {
  _id: string
  name: string
  price: number
  quantity: number
}

export async function POST(req: Request) {
  try {
    const { items, customer } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: 'No items to checkout' },
        { status: 400 }
      )
    }

    const lineItems = items.map((item: CheckoutItem) => ({
      price_data: {
        currency: 'php',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,

      expand: ['line_items'],

      //optional - include customer email if available for better tracking and communication
      //customer_email: customer?.email || undefined,

      // metadata: {
      //   firstName: customer.firstName,
      //   middleName: customer.middleName || '',
      //   lastName: customer.lastName,
      //   address: customer.address,
      //   contactNumber: customer.contactNumber,
      // },

      metadata: {
  firstName: customer.firstName,
  middleName: customer.middleName || '',
  lastName: customer.lastName,
  address: customer.address,
  email: customer.email,
  contactNumber: customer.contactNumber,
  items: JSON.stringify(
    items.map((item: { _id: String; name: String; price: Number; quantity: Number }) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }))
  ),
},


      //success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { message: 'Stripe session failed' },
      { status: 500 }
    )
  }
}
