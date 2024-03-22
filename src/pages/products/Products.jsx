import React, { useState } from "react";
import "./products.css";
// import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { delProduct, setProductToEdit } from "../../redux/product/productSlice";
// import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";

const Products = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [value, setValue] = useState("");
  const [cat, setCat] = useState("");

  const [subCategory, setSubCategory] = useState("");

  const handleonChange = (e) => {
    let val = e.target.value;
    setValue(val);
  };

  const handleOnChangeCategory = (cat) => {
    setCat(cat.target.value);
  };

  const handleOnChangeSubCategory = (cat) => {
    setSubCategory(cat.target.value);
  };

  console.log("cat::", cat);

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products"))
  );

  let newProducts = cat ? products.filter((p) => p.category === cat) : products;

  let newSub = subCategory
    ? newProducts.filter((p) => p.subCategory === subCategory)
    : newProducts;

  console.log("newProducts::", newSub);

  const [category, setCategory] = useState(
    JSON.parse(localStorage.getItem("categories"))
  );

  const handleEdit = (product) => {
    dispatch(setProductToEdit(product));
    navigator("../add-product");
  };

  const handleDelete = (id) => {
    dispatch(delProduct(id));
    let pro = products.filter((p) => p._id !== id);
    setProducts(pro);
  };

  return (
    <div className="_table">
      <div className="_table_header">
        <div className="title">
          <h4>Products</h4>
          <input
            type="search"
            placeholder="Ara"
            onChange={(e) => {
              handleonChange(e);
            }}
          />
        </div>
        <select
          className="modern-select"
          name="title"
          id="title"
          onChange={(e) => handleOnChangeCategory(e)}
        >
          <option>Ana Kategori Seçiniz...</option>
          {category.map((category, i) => (
            <option key={i} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>

        <select
          className="modern-select"
          name="title"
          id="title"
          onChange={(e) => handleOnChangeSubCategory(e)}
        >
          <option>Ana Kategori Seçiniz...</option>
          {cat ? (
            category
              .find((ca) => ca.title === cat)
              .subCategory.map((c, i) => (
                <option key={i}> {c.subCategory} </option>
              ))
          ) : (
            <></>
          )}
        </select>
        <table>
          <thead>
            <tr>
              <th>Title</th>

              <th className="_category">Category</th>
              <th className="_subCategory">Sub Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newSub
              .filter((p) =>
                p.title
                  .trim()
                  .toLowerCase()
                  .includes(value.trim().toLowerCase())
              )
              .map((product, i) => {
                return (
                  <tr key={i}>
                    <td> {product.title} </td>

                    <td className="_category">{product.category}</td>
                    <td className="_subCategory">{product.subCategory}</td>
                    <td>{product.price}</td>
                    <td className="_action">
                      <FaRegEdit onClick={() => handleEdit(product)} />

                      <MdDeleteOutline
                        onClick={() => handleDelete(product._id)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
