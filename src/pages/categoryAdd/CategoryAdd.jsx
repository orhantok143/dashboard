import React, { useEffect, useState } from "react";
import "./categoryAdd.css";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategories } from "../../redux/category/categorySlice";

const validationSchema = yup.object({
  title: yup.string().required("Ana kategori gereklidir"),
  subCategory: yup.string().required("Alt kategori gereklidir"),
  image: yup.mixed().required("Resim gereklidir"),
});

const CategoryAdd = () => {
  const dispatch = useDispatch();

  const [subcat, setSubCat] = useState("False");
  const [cate, setCate] = useState("False");
  const [loadImage, setImage] = useState("");
  // const [file, setFile] = useState("");

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  let categories = useSelector((state) => {
    const cat = state.categories.Categories.categories
      ? state.categories.Categories.categories
      : [];
    return cat;
  });

  const handleSetCategory = (e) => {
    const newSubCategories = categories.find(
      (category) => category.title === e.target.value
    );
    if (newSubCategories) setSubCategories(newSubCategories.subCategory);
  };

  const initialValues = {
    image: "",
    title: "",
    subCategory: "",
  };

  const transformData = (file) => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setImage(fileReader.result);
      };
    } else setImage("");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        values.image = loadImage;
        dispatch(addCategory(values));

        resetForm();
      }}
    >
      {(formik) => (
        <Form
          className="input-container"
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
        >
          <h4>Kategori Ekle </h4>

          <div className="toggle-container">
            <label className="switch">
              <input
                onClick={() => setCate(!cate)}
                type="checkbox"
                id="toggleSwitch"
              />
              <span className="slider"> Ana kategori Ekle</span>
            </label>
          </div>

          {cate ? (
            <>
              <Field
                className="modern-select"
                name="title"
                id="title"
                as="select"
                onBlur={handleSetCategory}
                onChange={formik.handleChange}
              >
                <option>Ana Kategori Seçiniz...</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </Field>
              {formik.errors.title && formik.touched.title && (
                <p className="error" name="title">
                  {formik.errors.title}
                </p>
              )}
            </>
          ) : (
            <>
              <Field
                type="text"
                placeholder="Kategori gir..."
                className="modern-input"
                name="title"
                id="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.title && formik.touched.title && (
                <p className="error" name="title">
                  {formik.errors.title}
                </p>
              )}
            </>
          )}
          <div className="toggle-container">
            <label className="switch">
              <input
                onClick={() => setSubCat(!subcat)}
                type="checkbox"
                id="toggleSwitch"
              />
              <span className="slider"> Alt kategori Ekle</span>
            </label>
          </div>
          {subcat ? (
            <>
              <Field
                as="select"
                className="modern-select"
                name="subCategory"
                id="subCategory"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Alt Kategori Seçiniz...</option>

                {subCategories.map((subCategory, i) => (
                  <option key={i} value={subCategory.subCategory}>
                    {subCategory.subCategory}
                  </option>
                ))}
              </Field>
              {formik.errors.subCategory && formik.touched.subCategory && (
                <p className="error" name="subCategory">
                  {formik.errors.subCategory}
                </p>
              )}
            </>
          ) : (
            <>
              <Field
                type="text"
                placeholder="Alt kategori gir..."
                className="modern-input"
                name="subCategory"
                id="subCategory"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.subCategory && formik.touched.subCategory && (
                <p className="error" name="subCategory">
                  {formik.errors.subCategory}
                </p>
              )}
            </>
          )}

          <input
            name="image"
            className="modern-input"
            id="image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
              transformData(event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.errors.image && formik.touched.image && (
            <p className="error" name="image">
              {formik.errors.image}
            </p>
          )}
          <button id="modern-button" type="submit" disabled={!formik.isValid}>
            Ekle
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryAdd;
