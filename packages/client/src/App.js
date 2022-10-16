import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "pages/HomePage";
import ProductDetailPage from "pages/ProductDetailPage";
import ShoppingCartPage from "pages/ShoppingCartPage";
import CheckoutPage from "pages/CheckoutPage";
import { ErrorBoundary, Layout } from "components";
import { CurrencyProvider } from "hooks/useCurrency";

function App() {
  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/p/:pid" component={ProductDetailPage} />
            <Route exact path="/cart" component={ShoppingCartPage} />
            <Route exact path="/checkout" component={CheckoutPage} />

            <Route
              component={({ location }) => {
                return (
                  <div
                    style={{
                      padding: "50px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    The page <code>{location.pathname}</code> could not be
                    found.
                  </div>
                );
              }}
            />
          </Switch>
        </Layout>
      </CurrencyProvider>
    </ErrorBoundary>
  );
}

export default App;
