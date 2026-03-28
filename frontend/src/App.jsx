import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* Optimized Toast Notifications for Dark UI */}
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="bg-[#111114] border border-slate-800 rounded-2xl shadow-2xl font-bold uppercase text-[10px] tracking-widest text-white"
        progressClassName="bg-gradient-to-r from-pink-500 to-indigo-500"
      />

      <Navigation />

      {/* pb-24: Extra breathing room for the bottom Mobile Nav
          md:pb-0: Reset for desktop
          md:pl-20: Left-side space for the sidebar navigation
      */}
      <main className="py-3 pb-24 md:pb-0 md:pl-20 min-h-screen bg-[#0a0a0c] transition-all duration-300">
        <Outlet />
      </main>
    </>
  );
}

export default App;
