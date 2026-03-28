import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="group relative w-full overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-800/40 p-4 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Heart Icon Overlay - Always visible but pops on hover */}
        <div className="absolute right-4 top-4 z-10 transition-transform duration-300 hover:scale-110">
          <HeartIcon product={product} />
        </div>

        {/* Subtle Gradient Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Product Details */}
      <div className="mt-5 px-1 pb-1">
        <Link to={`/product/${product._id}`} className="block">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="text-lg font-black tracking-tight text-white transition-colors group-hover:text-indigo-400 leading-tight uppercase">
              {product.name}
            </h2>

            {/* Professional Price Tag - High Visibility */}
            <span className="shrink-0 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-black text-white shadow-lg shadow-indigo-600/20 border border-indigo-500/30">
              ${product.price}
            </span>
          </div>

          {/* Brand/Category Line */}
          {product.brand && (
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-4 bg-slate-700 group-hover:bg-indigo-500 transition-colors" />
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-slate-500 group-hover:text-slate-400 transition-colors">
                {product.brand}
              </p>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Product;
