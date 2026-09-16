import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  return (
    <div className="bg-parchment-base text-ink-primary font-serif min-h-screen p-8 flex flex-col items-center justify-center gap-4">
      <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
      <h1 className="text-3xl font-bold">Before He Was Fred</h1>
      <p className="text-ink-secondary font-sans text-sm">
        Tailwind theme test: <span className="bg-source-highlight text-ink-primary font-serif px-1">[Letter 1, p. 8]</span>
      </p>
      <button className="bg-route-red hover:bg-route-red-hover text-parchment-base font-sans text-sm px-4 py-2 rounded transition-colors cursor-pointer">
        Continue Journey &rarr;
      </button>
    </div>
  )
}

export default App