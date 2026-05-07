import type { Product } from "../types/Product"
import { useCart } from "../context/CartContext"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(product)
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
        z-50
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-zinc-900
          w-full
          max-w-4xl
          rounded-3xl
          overflow-hidden
          grid
          grid-cols-1
          md:grid-cols-2
          border
          border-zinc-800
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full
            h-72
            md:h-full
            object-cover
          "
        />

        <div className="p-8 flex flex-col">
          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-bold">{product.title}</h2>

            <button
              onClick={onClose}
              className="
                text-zinc-400
                hover:text-white
                text-2xl
                cursor-pointer
              "
            >
              ×
            </button>
          </div>

          <p className="text-zinc-400 mt-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-auto pt-10">
            <strong className="text-4xl text-orange-400 block">
              R$ {product.price.toFixed(2)}
            </strong>

            <button
              onClick={handleAddToCart}
              className="
                w-full
                mt-6
                bg-orange-500
                hover:bg-orange-600
                transition
                py-4
                rounded-xl
                font-semibold
                text-lg
                cursor-pointer
              "
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
