import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AddStock.css";
import { addNewStock } from "../../services/stockService";
import { toast } from "react-toastify";
import * as Yup from "yup";

function AddStock() {
  const location = useLocation();
  const [newStock, setNewStock] = useState({
    idSelectedProduct: location.state?.idSelectedProduct || "",
    nameSelectedProduct: location.state?.nameSelectedProduct || "",
    imageSelectedProduct: location.state?.imageSelectedProduct || "",
  });

  const [newSupplier, setNewSupplier] = useState({
    idSupplierSelected: location.state?.idSupplierSelected || "",
    nameSupplierSelected: location.state?.nameSupplierSelected || "",
  });

  const [newAddStock, setNewAddStock] = useState({
    productId: "",
    supplierId: "",
    quantity: "",
    importPrice: "",
    importDate: "",
  });

  const navigate = useNavigate();
  
  const handleSubmit = async (values) => {
   
    const stockData = {
      productId: newStock.idSelectedProduct,
      supplierId: newSupplier.idSupplierSelected,
      quantity: values.quantity,
      importPrice: values.importPrice,
      importDate: values.importDate,
    };

    await addNewStock(stockData);
    toast.success("Thêm mới thành công");
    navigate("/ListStock");
  };

  const handleSupplier = () => {
    console.log(newStock);
    console.log(newSupplier);
    navigate("/AddStock/SuppliersStock", {
      state: {
        idSelectedProduct: newStock.idSelectedProduct,
        nameSelectedProduct: newStock.nameSelectedProduct,
        imageSelectedProduct: newStock.imageSelectedProduct,
        idSupplierSelected: newSupplier.idSupplierSelected,
        nameSupplierSelected: newSupplier.nameSupplierSelected
      },
    });
  };

  const handleValidateStock = Yup.object({
    quantity: Yup.number().required("Yêu cầu không để trống"),
    importPrice: Yup.number().required("Yêu cầu không để trống"),
    importDate: Yup.date().required("Vui lòng chọn ngày nhập kho"),
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
        // backgroundColor: "#f9f9f9",
      }}
    >
      <h4 style={{ textAlign: "center", color: "#333" }}>NHẬP KHO</h4>
      <div className="button-container">
        <Link className="btn button_input" to="/AddStock/ProductsInStock">
          Chọn hàng hóa đã từng nhập kho
        </Link>
        <Link to={"/AddStock/AddNewProduct"} className="btn button-add-product">
          Thêm sản phẩm mới
        </Link>
      </div>
      <Formik initialValues={newAddStock} validationSchema={handleValidateStock} onSubmit={handleSubmit} >
      
        
        <Form>
          <div className="mb-3">
            <label className="form-label">Tên sản phẩm</label>
            <Field
              className="form-control"
              type="text"
              name="productId"
              placeholder="Nhập tên sản phẩm"
              value={newStock.nameSelectedProduct}
            />
          
          </div>
          <div className="mb-3 d-flex align-items-center">
            <div className="flex-grow-1">
              <label className="form-label">Nhà cung cấp</label>
              <Field
                className="form-control"
                type="text"
                name="supplierId"
                placeholder="Nhập tên nhà cung cấp"
                value={newSupplier.nameSupplierSelected}
              />
             
            </div>
            <button
              type="button"
              onClick={handleSupplier}
              className="btn button_supplier ms-2"
            >
              Chọn NCC
            </button>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Hình ảnh hàng hóa </label>
              {/* <Field className="form-control" type="text" name="image" placeholder="URL hình ảnh" value={newStock.imageSelectedProduct} /> */}
              {newStock.imageSelectedProduct && (
                <img
                  src={newStock.imageSelectedProduct}
                  alt="Hàng hóa"
                  className="img-fluid"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
              )}
            </div>
            <div className="col">
              <label className="form-label">Số lượng nhập</label>
              <Field
                className="form-control"
                type="text"
                name="quantity"
                placeholder="Nhập số lượng"
              />
              <ErrorMessage name="quantity" component="div" className="text-danger" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Giá</label>
              <Field
                className="form-control"
                type="text"
                name="importPrice"
                placeholder="Nhập giá sản phẩm"
              />
              <ErrorMessage name="importPrice" component="div" className="text-danger" />
            </div>
            <div className="col">
              <label className="form-label">Ngày</label>
              <Field className="form-control" type="date" name="importDate" />
              <ErrorMessage name="importDate" component="div" className="text-danger" />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn me-2 button_add">
              Thêm vào kho
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

export default AddStock;
