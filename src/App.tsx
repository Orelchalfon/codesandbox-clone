import Collaboration from "./Components/Collaboration";
import Hero from "./Components/Hero";
import { Branches } from "./Components/Branches";

function App() {
  return (
    <div className={`bg-background text-text `}>
      <main>
        <Hero />
        <div className="relative z-10 w-full overflow-x-clip">
          <Collaboration />
          <Branches />
        </div>
      </main>
    </div>
  )
}

export default App
