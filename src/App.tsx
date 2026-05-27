/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Planning from "./pages/Planning";
import Inventory from "./pages/Inventory";
import Delivery from "./pages/Delivery";
import Exceptions from "./pages/Exceptions";
import Settlement from "./pages/Settlement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="planning" element={<Planning />} />
          <Route path="production" element={<Planning />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="exceptions" element={<Exceptions />} />
          <Route path="settlement" element={<Settlement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
