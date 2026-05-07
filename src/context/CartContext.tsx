import { createContext, useContext, useEffect, useMemo, useState } from "react"

import type { Product } from "../types/Product"

interface CartItem extends Product {
  quantity: number
}

interface CartContextData {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  totalItems: number
  totalPrice: number
}

interface CartProviderProps {
  children: React.ReactNode
}

const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("@devburger:cart")

    return storedCart ? JSON.parse(storedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("@devburger:cart", JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product: Product) {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id)

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        )
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ]
    })
  }

  function removeFromCart(productId: number) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    )
  }

  function increaseQuantity(productId: number) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    )
  }

  function decreaseQuantity(productId: number) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
