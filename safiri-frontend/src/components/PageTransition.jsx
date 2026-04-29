function PageTransition({ children }) {
  return (
    <div className="animate-[fadeIn_0.45s_ease-in-out]">
      {children}
    </div>
  );
}

export default PageTransition;