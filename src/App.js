// libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";

// components
import Header from "./components/navigation/Header";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import FriendPage from "./pages/FriendPage";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";

// context
import { PopupProvider } from "./PopupContecxt";
import MaintenanceMode from "./components/special_components/MaintenanceMode";


function App() {
  const [isMaintenance, setIsMaintenance] = useState(true);
  return (

    <PopupProvider>
      <div className="app">
        {
          isMaintenance ? <MaintenanceMode /> :

            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home form="" />} />
                <Route path="/sign-in" element={<Home form="login" />} />
                <Route path="/sign-up" element={<Home form="register" />} />
                <Route path="/page-personelle" element={<UserPage />} />
                <Route path="/tableau-de-bord" element={<Dashboard />} />
                <Route path="/page-de-mes-contacts" element={<FriendPage />} />
                <Route path="/a-propos" element={<About />} />
              </Routes>
              <Footer />
            </Router>
        }
      </div>
    </PopupProvider>
  );
}

export default App;