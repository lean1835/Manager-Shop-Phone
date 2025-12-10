import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewProduct } from "../../services/productService";
import * as Yup from "yup";

function AddNewProduct() {
  const [newAddProduct] = useState({
    name: "",
    price: "",
    image: "",
    screen_size: "",
    camera: "",
    selfie: "",
    cpu: "",
    storage: "",
    description: "",
  });

  const navigate = useNavigate();

  
  const handleSubmit = async (value) => {
    await addNewProduct(value);
    toast.success("Thêm mới thành công");
    navigate("/AddStock");
  };

  const handleValidate = Yup.object({
    name: Yup.string().required("Yêu cầu k để trống"),
    price: Yup.string()
      .required("Yêu cầu không để trống")
      .transform((value) => value.replace(/\./g, "").replace(/,/g, ".")) // Chuyển đổi 1.050.290 thành 1050290
      .test(
        "is-number",
        "Giá phải là một số dương",
        (value) => !isNaN(value) && parseFloat(value) > 0
      ),
    image: Yup.string().required("Yêu cầu không để trống"),
    screen_size: Yup.string()
    .required("Yêu cầu không để trống")
    .test("is-number", "Màn hình phải là số", (value) => !isNaN(value) && parseFloat(value) > 0),
    camera: Yup.number().required("Yêu cầu không để trống"),
    selfie: Yup.number().required("Yêu cầu không để trống"),
    cpu: Yup.string().required("Yêu cầu không để trống"),
    storage: Yup.number().required("Yêu cầu không để trống"),
    description: Yup.string().required("Yêu cầu không để trống"),
  });
  return (
    <div
      style={{
        border: "2px solid #ebedee",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "700px",
        margin: "20px auto",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h4 style={{ textAlign: "center", color: "#333" }}>THÊM SẢN PHẨM MỚI</h4>
      <Formik initialValues={newAddProduct} validationSchema={handleValidate} onSubmit={handleSubmit}>
        <Form>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Tên sản phẩm</label>
              <Field
                className="form-control"
                type="text"
                name="name"
                placeholder="Nhập tên sản phẩm"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="col">
              <label className="form-label">Giá</label>
              <Field
                className="form-control"
                type="text"
                name="price"
                placeholder="Nhập giá sản phẩm"
              />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Hình ảnh</label>
              <Field
                className="form-control"
                type="text"
                name="image"
                placeholder="URL hình ảnh"
              />
              <ErrorMessage name="image" component="div" className="text-danger" />
            </div>
            <div className="col">
              <label className="form-label">Màn hình</label>
              <Field
                className="form-control"
                type="text"
                name="screen_size"
                placeholder="Nhập thông tin"
              />
              <ErrorMessage name="screen_size" component="div" className="text-danger" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Camera</label>
              <Field
                className="form-control"
                type="text"
                name="camera"
                placeholder="Nhập thông tin"
              />
              <ErrorMessage name="camera" component="div" className="text-danger" />
            </div>
            <div className="col">
              <label className="form-label">Selfie</label>
              <Field
                className="form-control"
                type="text"
                name="selfie"
                placeholder="Nhập thông tin"
              />
              <ErrorMessage name="selfie" component="div" className="text-danger" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">CPU</label>
              <Field
                className="form-control"
                type="text"
                name="cpu"
                placeholder="Nhập thông tin"
              />
              <ErrorMessage name="cpu" component="div" className="text-danger" />
            </div>
            <div className="col">
              <label className="form-label">Lưu trữ</label>
              <Field
                className="form-control"
                type="text"
                name="storage"
                placeholder="Nhập thông tin"
              />
              <ErrorMessage name="storage" component="div" className="text-danger" />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <Field
              className="form-control"
              type="text"
              name="description"
              placeholder="Nhập thông tin"
            />
            <ErrorMessage name="description" component="div" className="text-danger" />
          </div>

          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn button_add me-2">
              Thêm
            </button>
            <Link to={"/Liststock"} type="button" className="btn button_exit">
              Hủy
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default AddNewProduct;
