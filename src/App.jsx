import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardLayout from "./components/DashboardLayout"
import DashboardPage from "./pages/DashboardPage"
import CategoriesPage from "./pages/CategoriesPage"
import SubCategoriesPage from "./pages/SubCategoriesPage"
import AttributesPage from "./pages/AttributesPage"
import ProductsPage from "./pages/ProductsPage"
import AddProductPage from "./pages/AddProductPage"
import BulkImportPage from "./pages/BulkImportPage"
import BulkExportPage from "./pages/BulkExportPage"
import LimitedStocksPage from "./pages/LimitedStocksPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="subcategories" element={<SubCategoriesPage />} />
          <Route path="attributes" element={<AttributesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="bulk-import" element={<BulkImportPage />} />
          <Route path="bulk-export" element={<BulkExportPage />} />
          <Route path="limited-stocks" element={<LimitedStocksPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
