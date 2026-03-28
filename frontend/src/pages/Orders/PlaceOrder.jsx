import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaBox,
  FaArrowRight,
} from "react-icons/fa";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-32">
      <div className="container mx-auto px-5 lg:px-12 pt-10">
        <ProgressSteps step1 step2 step3 />

        {cart.cartItems.length === 0 ? (
          <div className="mt-16 text-center">
            <Message>Your cart is empty</Message>
            <Link
              to="/shop"
              className="text-indigo-400 font-bold uppercase text-xs tracking-widest hover:text-white transition-colors"
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 mt-12">
            {/* LEFT SIDE: Items & Logistics */}
            <div className="flex-1 space-y-8">
              {/* Items Card */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-xl">
                <div className="p-8 border-b border-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <FaBox className="text-indigo-500" />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Review Order
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900/50 text-slate-400 text-[10px] font-bold uppercase tracking-[2px]">
                      <tr>
                        <th className="px-8 py-5 text-left">Product</th>
                        <th className="px-8 py-5 text-center">Qty</th>
                        <th className="px-8 py-5 text-right">Price</th>
                        <th className="px-8 py-5 text-right text-indigo-400">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {cart.cartItems.map((item, index) => (
                        <tr
                          key={index}
                          className="group hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-5">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-lg"
                              />
                              <Link
                                to={`/product/${item.product}`}
                                className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors tracking-tight"
                              >
                                {item.name}
                              </Link>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center font-bold text-slate-300">
                            {item.qty}
                          </td>
                          <td className="px-8 py-6 text-right text-slate-400 font-medium">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-8 py-6 text-right font-black text-white">
                            ${(item.qty * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Delivery & Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/40 border border-slate-800 p-8 rounded-[2rem] shadow-lg">
                  <h3 className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <FaMapMarkerAlt className="text-indigo-500" /> Shipping
                    Destination
                  </h3>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    <span className="block text-white font-bold mb-1">
                      {cart.shippingAddress.address}
                    </span>
                    {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode}
                    <br />
                    {cart.shippingAddress.country}
                  </p>
                </div>

                <div className="bg-slate-800/40 border border-slate-800 p-8 rounded-[2rem] shadow-lg">
                  <h3 className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <FaCreditCard className="text-indigo-500" /> Method of
                    Payment
                  </h3>
                  <div className="flex">
                    <span className="bg-indigo-500/10 text-indigo-400 px-5 py-2 rounded-xl border border-indigo-500/20 font-black text-[10px] uppercase tracking-widest">
                      {cart.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Summary Card */}
            <div className="w-full lg:w-[400px]">
              <div className="sticky top-28 bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl -mr-16 -mt-16" />

                <h2 className="text-2xl font-black mb-10 tracking-tight uppercase">
                  Order Summary
                </h2>

                <div className="space-y-5 mb-10">
                  <div className="flex justify-between text-slate-400 font-medium">
                    <span>Items Total</span>
                    <span className="text-white">${cart.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-medium">
                    <span>Shipping Fee</span>
                    <span className="text-white">${cart.shippingPrice}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-medium">
                    <span>Tax Estimate</span>
                    <span className="text-white">${cart.taxPrice}</span>
                  </div>
                  <div className="flex justify-between text-3xl font-black pt-8 border-t border-slate-800/60 mt-8">
                    <span className="tracking-tighter">Total</span>
                    <span className="text-indigo-500 tracking-tighter">
                      ${cart.totalPrice}
                    </span>
                  </div>
                </div>

                {error && (
                  <Message variant="danger">{error.data.message}</Message>
                )}

                <button
                  type="button"
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-[2px] text-[11px] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
                    isLoading
                      ? "bg-slate-800 text-slate-500"
                      : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 text-white"
                  }`}
                  disabled={cart.cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? (
                    <Loader size="sm" />
                  ) : (
                    <>
                      Place My Order <FaArrowRight size={10} />
                    </>
                  )}
                </button>

                <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-8 px-4 leading-loose">
                  Prices include all applicable taxes and fees.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
