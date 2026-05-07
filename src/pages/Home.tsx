import { useEffect, useState } from "react"

import { api } from "../api/api"
import ProductCard from "../components/ProductCard"
import ProductModal from "../components/ProductModal"
import Header from "../components/Header"
import CartSidebar from "../components/CartSidebar"

import type { Product } from "../types/Product"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  function handleOpenModal(product: Product) {
    setSelectedProduct(product)
  }

  async function fetchProducts() {
    try {
      const response = await api.get("/products")

      setProducts(response.data)

      setLoading(false)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      alert(
        "Ocorreu um erro ao carregar os produtos. Por favor, tente novamente mais tarde.",
      )
      setLoading(false)
    }
  }

  function handleOpenCart() {
    setIsCartOpen(true)
  }

  function handleCloseCart() {
    setIsCartOpen(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <Header onOpenCart={handleOpenCart} />

        <section
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
          mt-14
        "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={handleOpenModal}
            />
          ))}
        </section>

        <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </main>
  )
}
