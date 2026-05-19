import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import ServicesPage from "./pages/Services/Service";
import LearnMore from "./pages/Services/LearnMore";
import Blogs from "./pages/Blogs/Blog";
import BlogDetail from "./pages/Blogs/BlogDetail";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AboutPage from "./pages/About/About";
import Products from "./pages/products/Products";
import RouteLoadingWrapper from "./components/common/RouteLoadingWrapper";
import FloatingContact from "./components/common/FloatingContact";
import { ThemeProvider } from "./context/ThemeContext";
import ContactUsPage from "./pages/ContactUsPage";

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        <main className="flex-grow">
          <RouteLoadingWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceSlug" element={<LearnMore />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </RouteLoadingWrapper>
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </ThemeProvider>
  );
};

export default App;
