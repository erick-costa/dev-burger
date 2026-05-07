import type { Product } from "../types/Product"

interface ProductCardProps {
  product: Product
  onOpenModal: (product: Product) => void
}

export default function ProductCard({
  product,
  onOpenModal,
}: ProductCardProps) {
  return (
    <article
      className="
        bg-zinc-900
        rounded-2xl
        overflow-hidden
        border
        border-zinc-800
        hover:border-orange-500
        transition
        hover:-translate-y-1
      "
    >
      <img
        src={product.image}
        alt={product.title}
        className="
          w-full
          h-56
          object-cover
        "
      />

      <div className="p-5">
        <h2 className="text-xl font-semibold">{product.title}</h2>

        <p
          className="
            text-zinc-400
            text-sm
            mt-2
            line-clamp-2
          "
        >
          {product.description}
        </p>

        <div
          className="
            flex
            items-center
            justify-between
            mt-6
          "
        >
          <strong className="text-orange-400 text-xl">
            R$ {product.price.toFixed(2)}
          </strong>

          <button
            onClick={() => onOpenModal(product)}
            className="
              bg-orange-500
              hover:bg-orange-600
              px-4
              py-2
              rounded-lg
              font-medium
              transition
              cursor-pointer
            "
          >
            Ver mais
          </button>
        </div>
      </div>
    </article>
  )
}
