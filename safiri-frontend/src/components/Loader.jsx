function Loader({ text = "Curating Your Collection..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-[#eee6df] border-t-[#c2a67a] rounded-full animate-spin"></div>

      <p className="mt-6 text-[#7a6a61] tracking-[0.2em] uppercase text-sm">
        {text}
      </p>
    </div>
  );
}

export default Loader;