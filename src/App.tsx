import { Branches } from "./Components/Branches";
import Collaboration from "./Components/Collaboration";
import Hero from "./Components/Hero";

function App() {
  return (
    <div className={`bg-background text-text`}>
      <main>
        <Hero />
        <Collaboration />
        <Branches />
      </main>
    </div>
  )
}

export default App
