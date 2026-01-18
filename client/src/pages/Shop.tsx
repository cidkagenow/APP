import { useProducts } from "@/hooks/use-products";
import { SectionHeader } from "@/components/SectionHeader";
import { ShoppingCart } from "lucide-react";

export default function Shop() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <SectionHeader title="Official Store" subtitle="Wear the colors with pride" className="mb-0" />
          <button className="bg-white text-background px-6 py-2 rounded-sm font-display font-bold uppercase hover:bg-gray-200 transition-colors flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Cart (0)
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-card animate-pulse rounded-lg" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.map(product => (
              <div key={product.id} className="group bg-card border border-white/5 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300">
                <div className="aspect-square overflow-hidden relative bg-white/5 p-4 flex items-center justify-center">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <button className="absolute bottom-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-xs text-primary font-bold uppercase mb-1">{product.category}</div>
                  <h3 className="font-display font-bold text-lg text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-white/80 font-bold">
                    ${(product.price / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
