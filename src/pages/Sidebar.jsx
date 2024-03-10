import React from "react";
import "./sidebar.css";
import { RiShoppingBasketLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdLibraryBooks } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/login/loginSlice";

const Sidebar = () => {
  // const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <aside className="_sidebar">
      <div className="_dashboard">
        <h2>Dashboard</h2>

        <RxDashboard className="_logo" />
      </div>

      <ul className="_list">
        <li>
          <NavLink to="products">
            <h5>Ürünler</h5>
            <RiShoppingBasketLine />
          </NavLink>
        </li>
        <li>
          <NavLink to="add-product">
            <h5>Ürün Ekle</h5>
            <TbShoppingBagPlus />
          </NavLink>
        </li>
        <li>
          <NavLink to="categories">
            <h5>Kategori</h5>
            <MdLibraryBooks />
          </NavLink>
        </li>
        <li>
          <NavLink to="add-category">
            <h5>Kategori Ekle</h5>
            <BiBookAdd />
          </NavLink>
        </li>

        <li>
          <NavLink to="/">
            <h5>Products</h5>
            <RiShoppingBasketLine />
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <h5>Products</h5>
            <MdLogout onClick={() => handleLogout()} />
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
