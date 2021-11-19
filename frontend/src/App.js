import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewListPage from "./screens/NewListPage/NewListPage";
import ListPreviewPage from "./screens/ListPreviewPage/ListPreviewPage";
import ListPage from "./screens/ListPage/ListPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/newlist" element={<NewListPage />} />
          <Route path="/preview/" element={<ListPreviewPage />} />
          <Route path="/list/" element={<ListPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
