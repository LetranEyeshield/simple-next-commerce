// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// export type CartItem = {
//   _id: string
//   name: string
//   price: number
//   //image: string
//   quantity: number
// }

// type CartState = {
//   items: CartItem[]
//   addItem: (item: Omit<CartItem, 'quantity'>) => void
//   removeItem: (id: string) => void
//   updateQuantity: (id: string, quantity: number) => void
//   clearCart: () => void
//   getTotal: () => number
// }

// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       items: [],

//       addItem: (item) => {
//         try {
//           set((state) => {
//             const existing = state.items.find(i => i._id === item._id)

//             if (existing) {
//               return {
//                 items: state.items.map(i =>
//                   i._id === item._id
//                     ? { ...i, quantity: i.quantity + 1 }
//                     : i
//                 )
//               }
//             }

//             return {
//               items: [...state.items, { ...item, quantity: 1 }]
//             }
//           })
//         } catch (error) {
//           console.error('❌ Add to cart failed:', error)
//         }
//       },

//       removeItem: (id) => {
//         try {
//           set((state) => ({
//             items: state.items.filter(i => i._id !== id)
//           }))
//         } catch (error) {
//           console.error('❌ Remove item failed:', error)
//         }
//       },

//       updateQuantity: (id, quantity) => {
//         try {
//           if (quantity < 1) return

//           set((state) => ({
//             items: state.items.map(i =>
//               i._id === id ? { ...i, quantity } : i
//             )
//           }))
//         } catch (error) {
//           console.error('❌ Update quantity failed:', error)
//         }
//       },

//       clearCart: () => {
//         try {
//           set({ items: [] })
//         } catch (error) {
//           console.error('❌ Clear cart failed:', error)
//         }
//       },

//       getTotal: () => {
//         try {
//           return get().items.reduce(
//             (total, item) => total + item.price * item.quantity,
//             0
//           )
//         } catch (error) {
//           console.error('❌ Get total failed:', error)
//           return 0
//         }
//       }
//     }),
//     {
//       name: 'guest-cart'
//     }
//   )
// )


import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  _id: string
  name: string
  price: number
  image: string
  quantity: number
  selected: boolean
}

type CartState = {
  items: CartItem[]

  addToCart: (item: Omit<CartItem, 'quantity' | 'selected'>) => void
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  toggleSelect: (id: string) => void
  selectAll: () => void
  unselectAll: () => void
  selectedItems: () => CartItem[]

  removeItem: (id: string) => void
  removeSelectedItems: () => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        try {
          set((state) => {
            const existing = state.items.find(
              (i) => i._id === item._id
            )

            if (existing) {
              return {
                items: state.items.map((i) =>
                  i._id === item._id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                ),
              }
            }

            return {
              items: [
                ...state.items,
                { ...item, quantity: 1, selected: true },
              ],
            }
          })
        } catch (error) {
          console.error('❌ Add to cart failed:', error)
        }
      },

      addItem: (item) => {
        try {
          set((state) => {
            const existing = state.items.find(i => i._id === item._id)

            if (existing) {
              return {
                items: state.items.map(i =>
                  i._id === item._id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                )
              }
            }

            return {
              items: [...state.items, { ...item, quantity: 1 }]
            }
          })
        } catch (error) {
          console.error('❌ Add to cart failed:', error)
        }
      },

      toggleSelect: (id) => {
        try {
          set((state) => ({
            items: state.items.map((item) =>
              item._id === id
                ? { ...item, selected: !item.selected }
                : item
            ),
          }))
        } catch (error) {
          console.error('❌ Toggle select failed:', error)
        }
      },

      selectAll: () => {
        try {
          set((state) => ({
            items: state.items.map((item) => ({
              ...item,
              selected: true,
            })),
          }))
        } catch (error) {
          console.error('❌ Select all failed:', error)
        }
      },

      unselectAll: () => {
        try {
          set((state) => ({
            items: state.items.map((item) => ({
              ...item,
              selected: false,
            })),
          }))
        } catch (error) {
          console.error('❌ Unselect all failed:', error)
        }
      },

      selectedItems: () => {
        try {
          return get().items.filter((item) => item.selected)
        } catch (error) {
          console.error('❌ Get selected items failed:', error)
          return []
        }
      },

      removeItem: (id) => {
        try {
          set((state) => ({
            items: state.items.filter((i) => i._id !== id),
          }))
        } catch (error) {
          console.error('❌ Remove item failed:', error)
        }
      },

      removeSelectedItems: () => {
  try {
    set((state) => ({
      items: state.items.filter((item) => !item.selected),
    }))
  } catch (error) {
    console.error('❌ Remove selected items failed:', error)
  }
},


      updateQuantity: (id, quantity) => {
        try {
          if (quantity < 1) return

          set((state) => ({
            items: state.items.map((i) =>
              i._id === id ? { ...i, quantity } : i
            ),
          }))
        } catch (error) {
          console.error('❌ Update quantity failed:', error)
        }
      },

      clearCart: () => {
        try {
          set({ items: [] })
        } catch (error) {
          console.error('❌ Clear cart failed:', error)
        }
      },

      getTotal: () => {
        try {
          return get().items
            .filter((item) => item.selected) // ✅ checkout only selected
            .reduce(
              (total, item) =>
                total + item.price * item.quantity,
              0
            )
        } catch (error) {
          console.error('❌ Get total failed:', error)
          return 0
        }
      },
    }),
    {
      name: 'guest-cart', // localStorage key
    }
  )
)




