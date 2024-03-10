import React from "react";
import Sidebar from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import Products from "../products/Products";
import ProductAdd from "../productAdd/ProductAdd";
import { Categories } from "../categories/Categories";
import CategoryAdd from "../categoryAdd/CategoryAdd";

const SectionPage = () => {
  return (
    <section className="_section">
      <aside className="__sidebar">
        <Sidebar />
      </aside>

      <header className="_header">
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<ProductAdd />} />
          <Route path="categories" element={<Categories />} />
          <Route path="add-category" element={<CategoryAdd />} />
        </Routes>
      </header>
    </section>
  );
};

const ProductsRoute = () => <Route path="products" element={<Products />} />;

const ProductAddRoute = () => (
  <Route path="add-product" element={<ProductAdd />} />
);

const CategoriesRoute = () => (
  <Route path="categories" element={<Categories />} />
);

const CategoryAddRoute = () => (
  <Route path="add-category" element={<CategoryAdd />} />
);

export {
  SectionPage,
  ProductsRoute,
  ProductAddRoute,
  CategoriesRoute,
  CategoryAddRoute,
};
