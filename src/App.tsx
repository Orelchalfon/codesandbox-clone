import {
  Branches,
  Collaboration,
  Features,
  Hero,
  MoreFeatures,
  NoLock,
  StreamLineExp,
} from "@/Components";

function App() {
  return (
    <div className={`bg-background text-text `}>
      <main>
        <Hero />
        <div className='relative z-10 w-full overflow-x-clip'>
          <Collaboration />
          <Branches />
          <StreamLineExp />
          <Features />
          <MoreFeatures />
          <NoLock />
        </div>
      </main>
    </div>
  );
}

export default App;
