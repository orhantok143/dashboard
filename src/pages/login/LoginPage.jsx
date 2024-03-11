// LoginPage.js

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../redux/category/categorySlice";
import { getProducts } from "../../redux/product/productSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Kullanıcı adı zorunludur"),
  password: Yup.string().required("Şifre zorunludur"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(loginUser(values));

    // Burada form gönderme işlemleri gerçekleştirilebilir.
    console.log(values);
  };

  const authState = useSelector((state) => state.user);

  const { user, error, success, loading } = authState;
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      navigator("admin/products");
    } else {
      navigator("");
    }
  }, [user, error, success, loading]);

  return (
    <div className="glassmorphic-container">
      <div className="login-box">
        <h2 className="head">Giriş Yap</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <Field
                className="moder-input"
                type="email"
                id="email"
                name="email"
                placeholder="Kullanıcı Adı"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field
                className="moder-input"
                type="password"
                id="password"
                name="password"
                placeholder="Şifre"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button className="button" type="submit">
              Giriş Yap
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
