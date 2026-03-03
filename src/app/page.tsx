export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
            ShefaFx
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400 max-w-2xl">
            AI-Powered Trading Platform - Intelligent trading strategies driven
            by advanced AI agents
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="/auth/login"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
