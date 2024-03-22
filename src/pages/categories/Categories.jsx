import React, { useState } from "react";
import "./categories.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { delCategory } from "../../redux/category/categorySlice";

export const Categories = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories"))
  );

  const handleDelete = (id) => {
    dispatch(delCategory(id));

    setCategories(categories.filter((c) => c._id !== id));
  };

  const handleFilter = (value) => {
    setValue(value);
  };

  return (
    <div className="__table">
      <div className="__table_header">
        <div className="title">
          <h4>Categories</h4>
          <input
            type="search"
            placeholder="Ara"
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th className="__category">Categories</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((c) =>
                c.title.toLowerCase().includes(value.toLowerCase().trim())
              )
              .map((category, i) => (
                <tr key={i}>
                  <td className="__category">{category.title}</td>

                  <td className="__action">
                    <FaRegEdit />

                    <MdDeleteOutline
                      onClick={() => handleDelete(category._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
