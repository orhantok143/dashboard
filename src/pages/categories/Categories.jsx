import React, { useState } from "react";
import "./categories.css";
// import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { delCategory } from "../../redux/category/categorySlice";

export const Categories = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);

  const allCategories = useState(
    useSelector((state) => {
      const cat = state.categories.Categories.categories
        ? state.categories.Categories.categories
        : [];

      return cat;
    })
  );

  setCategories(allCategories[0]);

  console.log(value);

  const handleDelete = (id) => {
    // Redux'tan kategori silme işlemi
    dispatch(delCategory(id));

    // categories state'ini güncelle (silinecek kategoriyi hariç tutarak)
    setCategories(categories.filter((c) => c._id !== id));
  };

  const handleFilter = (value) => {
    // Arama işlemi
    setValue(value);

    // categories state'ini güncelle (filtreleme işlemi)
    setCategories(
      allCategories[0].filter((c) =>
        c.title.toLowerCase().includes(value.toLowerCase().trim())
      )
    );
    console.log("cat", categories);
  };

  console.log("categories::", allCategories[0]);

  return (
    <div className="__table">
      <div className="__table_header">
        <div className="title">
          <h4>Categories</h4>
          <input
            type="search"
            placeholder="Ara"
            onChange={(e) => {
              handleFilter(e.target.value);
            }}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th className="__category">Categories</th>
              {/* <th className="__subCategory">Sub Categories</th> */}

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((product, i) => {
              return (
                <tr key={i}>
                  <td className="__category">{product.title}</td>

                  <td className="__action">
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
