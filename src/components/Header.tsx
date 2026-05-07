import { ShoppingCart } from "lucide-react"

import { useCart } from "../context/CartContext"

interface HeaderProps {
  onOpenCart: () => void
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { totalItems } = useCart()

  return (
    <header
      className="
        sticky
        top-0
        z-40
        bg-zinc-950/80
        backdrop-blur-md
        border-b
        border-zinc-800
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h1 className="text-3xl font-bold text-white">DevBurger</h1>

          <p className="text-zinc-400 text-sm">Os melhores burgers 🍔</p>
        </div>

        <button
          onClick={onOpenCart}
          className="
            relative
            bg-orange-500
            hover:bg-orange-600
            transition
            p-3
            rounded-xl
            cursor-pointer
          "
        >
          <ShoppingCart size={24} />

          {totalItems > 0 && (
            <span
              className="
                absolute
                -top-2
                -right-2
                bg-white
                text-black
                text-xs
                font-bold
                w-6
                h-6
                rounded-full
                flex
                items-center
                justify-center
              "
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
