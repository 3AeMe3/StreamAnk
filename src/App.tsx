import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Movies from "./components/Movies";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Hero />
        <Movies />
      </main>
    </>
  );
}

export default App;
