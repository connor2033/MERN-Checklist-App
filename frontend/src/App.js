import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewListPage from "./screens/NewListPage/NewListPage";
import ListPreviewPage from "./screens/ListPreviewPage/ListPreviewPage";
import ListPage from "./screens/ListPage/ListPage";
import EditListPage from "./screens/EditListPage/EditListPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/newlist" element={<NewListPage />} />
          <Route path="/template/:id" element={<ListPreviewPage />} />
          <Route path="/list/:id" element={<ListPage />} />
          <Route path="/list/edit/:id" element={<EditListPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
