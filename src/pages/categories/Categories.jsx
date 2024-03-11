import React, { useEffect, useState } from "react";
import "./categories.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { delCategory } from "../../redux/category/categorySlice";

export const Categories = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);

  let a = useSelector((state) => {
    const cat = state.categories.Categories.categories
      ? state.categories.Categories.categories
      : [];

    return cat;
  });

  useEffect(() => {
    setCategories(a);
  }, [a]);

  console.log("Categories", a);
  console.log("Value", value);

  const handleDelete = (id) => {
    dispatch(delCategory(id));

    setCategories(categories.filter((c) => c._id !== id));
  };

  const handleFilter = (value) => {
    // Arama işlemi
    setValue(value);

    // categories state'ini güncelle (filtreleme işlemi)
    setCategories(
      categories[0].filter((c) =>
        c.title.toLowerCase().includes(value.toLowerCase().trim())
      )
    );
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
            {categories.map((category, i) => (
              <tr>
                <td className="__category">{category.title}</td>

                <td className="__action">
                  <FaRegEdit />

                  <MdDeleteOutline onClick={() => handleDelete(category._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
