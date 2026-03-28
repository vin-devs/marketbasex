const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          {/* Backdrop with heavy blur for that premium feel */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          ></div>

          {/* Modal Content Card */}
          <div className="relative w-full max-w-lg bg-[#111114] border border-slate-800 p-8 rounded-[2.5rem] z-[101] shadow-2xl shadow-black/50 overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-6 right-8 text-slate-500 hover:text-white text-xl font-light transition-colors focus:outline-none"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Content Wrapper */}
            <div className="mt-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
