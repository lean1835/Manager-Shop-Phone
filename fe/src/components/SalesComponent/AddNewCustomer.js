import React, { useState } from 'react';
import { addNewCustomer } from "../../services/customerService";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../../assets/saleComp.css';
import HeaderComponent from "../HomeComponent/HeaderComponent";
import {toast} from "react-toastify";

function AddNewCustomer() {
    const [newCustomer] = useState({
        name: "",
        phone: useLocation().state?.phone || "",
        address: "",
        age: "",
        email: ""
    });

    const navigate = useNavigate();
    const handleSubmit = async (value) => {
        await addNewCustomer(value);
        toast("Thêm mới khách hàng thành công");
        navigate('/SaleManager', { state: { phone: value.phone } });
    }
    const handleBack = () => {
        navigate('/SaleManager');
    }
    const handleValidate = Yup.object({
        name: Yup.string().required("Tên không được để trống"),
        phone: Yup.string().matches(/^\d{10}$/, "Số điện thoại phải 10 số trở lên").required("Số điện thoại không được để trống"),
        address: Yup.string().required("Địa chi không được để trống"),
        age: Yup.number().min(6, "Ít nhất là 6 tuổi").required("Tuổi không được để trống"),
        email: Yup.string().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid").required("Email không được để trống")
    });
    return (
        <div className="container">
            <Formik initialValues={newCustomer} onSubmit={handleSubmit} validationSchema={handleValidate}>
                <Form className="add-customer-container">
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <Field name="name" type="text" className="form-control"/>
                        <ErrorMessage name="name" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <Field name="phone" type="tel" className="form-control" disabled/>
                        <ErrorMessage name="phone" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <Field name="address" type="text" className="form-control"/>
                        <ErrorMessage name="address" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Tuổi</label>
                        <Field name="age" type="number" className="form-control"/>
                        <ErrorMessage name="age" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Field name="email" type="email" className="form-control"/>
                        <ErrorMessage name="email" component="div" className="error-message"/>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary add">Thêm mới</button>
                        <button type="button" className="btn btn-secondary back" onClick={handleBack}>Thoát</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default AddNewCustomer;