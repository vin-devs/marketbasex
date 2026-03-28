import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />

      {/* pb-20: Space at bottom for Mobile Nav 
          md:pb-0: Remove bottom space on Desktop
          md:pl-20: Space on left for Desktop Sidebar
      */}
      <main className="py-3 pb-24 md:pb-0 md:pl-20 min-h-screen transition-all duration-300">
        <Outlet />
      </main>
    </>
  );
}

export default App;
