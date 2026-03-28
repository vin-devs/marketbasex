import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaGlobe,
  FaCity,
  FaMailBulk,
  FaCreditCard,
} from "react-icons/fa";

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-32">
      <div className="container mx-auto px-5 pt-10">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <ProgressSteps step1 step2 />
        </div>

        <div className="flex justify-center items-start">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-2xl bg-slate-900/60 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400 shadow-lg shadow-indigo-500/10">
                <FaTruck size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight uppercase">
                  Shipping <span className="text-indigo-500">Details</span>
                </h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Where should we send your order?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Street Address
                </label>
                <div className="relative group">
                  <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/60 border border-slate-700/50 p-4 pl-14 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-medium placeholder:text-slate-600"
                    placeholder="123 Tech Avenue"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  City
                </label>
                <div className="relative group">
                  <FaCity className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/60 border border-slate-700/50 p-4 pl-14 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="New York"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              {/* Postal Code */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Postal Code
                </label>
                <div className="relative group">
                  <FaMailBulk className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/60 border border-slate-700/50 p-4 pl-14 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="10001"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Country */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Country
                </label>
                <div className="relative group">
                  <FaGlobe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/60 border border-slate-700/50 p-4 pl-14 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="United States"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Payment Selection */}
            <div className="mt-12 pt-10 border-t border-slate-800">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 ml-1">
                Payment Method
              </label>
              <div
                className={`relative flex items-center p-5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "PayPal"
                    ? "bg-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-500/5"
                    : "bg-slate-800/30 border-slate-800"
                }`}
                onClick={() => setPaymentMethod("PayPal")}
              >
                <input
                  type="radio"
                  className="h-5 w-5 accent-indigo-500 bg-slate-800"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="ml-4 flex items-center gap-3">
                  <FaCreditCard
                    size={18}
                    className={
                      paymentMethod === "PayPal"
                        ? "text-indigo-400"
                        : "text-slate-500"
                    }
                  />
                  <span
                    className={`font-bold text-sm tracking-tight ${paymentMethod === "PayPal" ? "text-white" : "text-slate-500"}`}
                  >
                    PayPal or Credit Card
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-12 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
            >
              Continue to Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
