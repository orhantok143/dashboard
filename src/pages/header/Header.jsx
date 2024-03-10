import React from "react";
import Products from "../products/Products";
import ProductAdd from "../productAdd/ProductAdd";
import { Categories } from "../categories/Categories";
import CategoryAdd from "../categoryAdd/CategoryAdd";

const Header = () => {
  return (
    <>
      <Products />
      <ProductAdd />
      <Categories />
      <CategoryAdd />
    </>
  );
};

export default Header;
