import React, { useState } from "react";
import "./products.css";
// import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { delProduct, setProductToEdit } from "../../redux/product/productSlice";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [value, setValue] = useState("");

  const handleonChange = (e) => {
    let val = e.target.value;
    setValue(val);
  };

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products"))
  );

  const handleEdit = (product) => {
    dispatch(setProductToEdit(product));
    navigator("../add-product");
  };

  const categoryLoading = useSelector((state) => state.categories.loading);
  const productLoading = useSelector((state) => state.products.loading);

  const loading = categoryLoading || productLoading;

  const handleDelete = (id) => {
    dispatch(delProduct(id));
    let pro = products.filter((p) => p._id !== id);
    setProducts(pro);
  };

  return loading ? (
    <Loading />
  ) : (
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
            {products
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
