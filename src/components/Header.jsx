export default function Header() {
  return (
    <header className="text-center mb-16 relative">
      <div className="absolute inset-x-0 -top-10 mx-auto w-32 h-32 bg-fuchsia-500/20 blur-3xl rounded-full"></div>
      <h1 className="relative text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 tracking-tight mb-4 drop-shadow-sm">
        AI Product Content Generator
      </h1>
      <p className="relative text-indigo-100/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
        Generate professional product content using AI. Enter your product details below and experience the magic of dynamic content creation.
      </p>
    </header>
  );
}
