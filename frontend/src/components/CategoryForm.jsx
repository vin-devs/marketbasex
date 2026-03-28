const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Field - Fixed Contrast for Dark Theme */}
        <div className="relative group">
          <input
            type="text"
            className="w-full py-4 px-5 bg-slate-800/60 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-400 
                       focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 
                       transition-all duration-300 shadow-inner font-medium"
            placeholder="Enter category name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Main Action Button */}
          <button
            type="submit"
            className="w-full sm:flex-1 px-8 py-4 bg-pink-600 text-white font-bold uppercase tracking-widest text-[10px] 
                       rounded-2xl hover:bg-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] 
                       active:scale-95 transition-all duration-200"
          >
            {buttonText}
          </button>

          {/* Delete Button - Only shows in Modal */}
          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:flex-1 px-8 py-4 bg-rose-600/10 text-rose-500 border border-rose-500/20 
                         font-bold uppercase tracking-widest text-[10px] rounded-2xl
                         hover:bg-rose-600 hover:text-white hover:border-rose-600 
                         active:scale-95 transition-all duration-200"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
