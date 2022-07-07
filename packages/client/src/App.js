import { Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import ProductDetailPage from "pages/ProductDetailPage";
import ShoppingCartPage from "pages/ShoppingCartPage";
import CheckoutPage from "pages/CheckoutPage";
import { ErrorBoundary, Layout } from "components";

const App = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/p/:pid" element={<ProductDetailPage />} />
          <Route exact path="/cart" element={<ShoppingCartPage />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />

          <Route
            element={({ location }) => {
              return (
                <div
                  style={{
                    padding: "50px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  The page <code>{location.pathname}</code> could not be found.
                </div>
              );
            }}
          />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
