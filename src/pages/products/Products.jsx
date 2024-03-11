import React, { useState } from "react";
import "./products.css";
// import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { delProduct } from "../../redux/product/productSlice";

const Products = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const handleonChange = (e) => {
    let val = e.target.value;
    setValue(val);
  };

  const [products, setProducts] = useState(
    useSelector((state) => {
      const pro = state.products.products.product
        ? state.products.products.product.filter((c) =>
            c.title.toLowerCase().includes(value.toLowerCase().trim())
          )
        : [];
      return pro;
    })
  );

  const handleDelete = (id) => {
    dispatch(delProduct(id));
    let pro = products.filter((p) => p._id !== id);
    setProducts(pro);
  };

  console.log("Products::", products);
  console.log("Value::", value);

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
            {products.map((product, i) => {
              return (
                <tr key={i}>
                  <td> {product.title} </td>

                  <td className="_category">{product.category}</td>
                  <td className="_subCategory">{product.subCategory}</td>
                  <td>{product.price}</td>
                  <td className="_action">
                    <FaRegEdit />

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
