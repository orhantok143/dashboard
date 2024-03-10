import React, { useState } from "react";
import "./productAdd.css";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/product/productSlice";

const validationSchema = yup.object({
  title: yup.string().required("Ürün ismi gereklidir"),
  description: yup.string().required("Açıklama gereklidir"),
  category: yup.string().required("Kategori gereklidir"),
  subCategory: yup.string().required("Alt kategori gereklidir"),
  price: yup
    .number()
    .min(0, "Fiyat 0'dan büyük olmalıdır")
    .required("Fiyat gereklidir"),
  image: yup.mixed().required("Lütfen bir resim seçin"),
});

const ProductAdd = () => {
  const dispatch = useDispatch();

  let categories = useSelector((state) => {
    const cat = state.categories.Categories.categories
      ? state.categories.Categories.categories
      : [];
    return cat;
  });

  const [loadImage, setImage] = useState("");
  const [subCategories, setsubCategories] = useState([]);

  const handleSetCategory = (e) => {
    const newSubCategories = categories.find(
      (categori) => categori.title === e.target.value
    );
    if (newSubCategories) setsubCategories(newSubCategories.subCategory);
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
  const initialValues = {
    title: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    image: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log("values", values);
        values.image = loadImage;

        dispatch(addProduct(values));
        actions.resetForm();
      }}
    >
      {(formik) => (
        <Form className="input-container" onSubmit={formik.handleSubmit}>
          <h4>Ürün Ekle </h4>
          <Field
            className="modern-input"
            id="title"
            type="text"
            name="title"
            placeholder="Ürün ismi...."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="error" name="title">
              {formik.errors.title}
            </p>
          )}

          <Field
            className="modern-input"
            id="description"
            type="textarea"
            name="description"
            placeholder="Açıklama...."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.description && formik.touched.description && (
            <p className="error" name="description">
              {formik.errors.description}
            </p>
          )}

          <Field
            className="modern-select"
            name="category"
            id="category"
            as="select"
            onBlur={handleSetCategory}
            onChange={formik.handleChange}
          >
            <option>Ana Kategori Seçiniz...</option>
            {categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </Field>
          {formik.errors.category && formik.touched.category && (
            <p className="error" name="category">
              {formik.errors.category}
            </p>
          )}
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

          <Field
            className="modern-input"
            id="price"
            type="number"
            name="price"
            placeholder="Fiyatı giriniz..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.price && formik.touched.price && (
            <p className="error" name="price">
              {formik.errors.price}
            </p>
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

export default ProductAdd;
