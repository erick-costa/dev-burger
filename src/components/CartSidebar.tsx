import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"

import { useCart } from "../context/CartContext"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            bg-black/60
            z-40
          "
        />
      )}

      <aside
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-full
          max-w-md
          bg-zinc-950
          border-l
          border-zinc-800
          z-50
          transition-transform
          duration-300
          flex
          flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <header
          className="
            p-6
            border-b
            border-zinc-800
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} />

            <h2 className="text-2xl font-bold">Carrinho</h2>
          </div>

          <button
            onClick={onClose}
            className="
              text-zinc-400
              hover:text-white
              transition
              cursor-pointer
            "
          >
            <X size={28} />
          </button>
        </header>

        {cartItems.length === 0 ? (
          <div
            className="
              flex-1
              flex
              items-center
              justify-center
              text-zinc-400
              p-6
              text-center
            "
          >
            Seu carrinho está vazio
          </div>
        ) : (
          <>
            <div
              className="
                flex-1
                overflow-y-auto
                p-6
                space-y-4
              "
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-zinc-900
                    rounded-2xl
                    p-4
                    flex
                    gap-4
                  "
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-24
                      h-24
                      rounded-xl
                      object-cover
                    "
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>

                    <strong
                      className="
                        text-orange-400
                        block
                        mt-1
                      "
                    >
                      R$ {item.price.toFixed(2)}
                    </strong>

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mt-4
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="
                            bg-zinc-800
                            p-1
                            rounded-md
                            cursor-pointer
                          "
                        >
                          <Minus size={16} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="
                            bg-zinc-800
                            p-1
                            rounded-md
                            cursor-pointer
                          "
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="
                          text-red-400
                          hover:text-red-500
                          transition
                          cursor-pointer
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer
              className="
                border-t
                border-zinc-800
                p-6
                space-y-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-lg
                "
              >
                <span>Total</span>

                <strong className="text-2xl text-orange-400">
                  R$ {totalPrice.toFixed(2)}
                </strong>
              </div>

              <button
                className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-600
                  transition
                  py-4
                  rounded-xl
                  font-semibold
                  cursor-pointer
                "
              >
                Finalizar pedido
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
