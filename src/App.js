import { BrowserRouter } from "react-router-dom";
import Nav from "./Components/Nav";
import Pages from "./Components/Pages";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Pages/>
        <Footer />
      </BrowserRouter>
    
    </div>
  );
}

export default App;
