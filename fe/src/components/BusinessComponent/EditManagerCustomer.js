import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from "formik";
import { getCustomerById, updateCustomer } from "../../services/customerService";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import styles from './EditManagerCustomer.module.css'
function EditManagerCustomer (){
    const {id}=useParams();
    const [customer,setCustomer]=useState(null);
    const navigate=useNavigate();;
    useEffect(()=>{
        const fetchCustomer= async()=>{
            let customer= await getCustomerById(id);
            setCustomer(customer);          
        }
        fetchCustomer();
    },[])
    const handleSubmit = async (value) => {
        const customer={
            ...value
        }
        await updateCustomer(id,customer);
        toast.success("Chỉnh sửa thành công");
        navigate('/home/manager/customer');
    }
    const handleValidate = Yup.object({
        name: Yup.string().required("Tên không được để trống"),
        phone: Yup.number().required("Vui lòng nhập số điện thoại"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
        age: Yup.number().required("Vui lòng nhập tuổi"),
        email: Yup.string().required("Vui lòng nhập email")
        })
        

        if(customer==null){
            return "";
        } 
        const handleOut=()=>{
            navigate('/home/manager/customer')
        }         
    return(
        <>
            <div className={styles.edit_customer}>              
                {/* <Formik initialValues={product} onSubmit={handleSubmit} validationSchema={handleValidate} > */}
                <Formik initialValues={customer} onSubmit={handleSubmit} validationSchema={handleValidate}>
                    <Form>{/* from thông tin */}
                        <div className={styles.info_product}>
                            <div className={styles.khung_start}>
                                <h1>Chỉnh sửa thông tin khách hàng</h1><hr/>
                            </div>
                            <div className={styles.cover_form}>
                            <div className={styles.form_group}> 
                                <label >Họ và tên</label>
                                <Field className={styles.input}  type='text' name='name'/>
                                <ErrorMessage name='name' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div  className={styles.form_group}> 
                                <label >Số điện thoại</label>
                                <Field className={styles.input} type='number' name='phone'/>
                                <ErrorMessage name='phone' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div className={styles.form_group} > 
                                <label >Địa chỉ</label>
                                <Field className={styles.input}  type='text' name='address'/>
                                <ErrorMessage name='address' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div  className={styles.form_group}> 
                                <label >Tuổi</label>
                                <Field className={styles.input} type='number' name='age'/>
                                <ErrorMessage name='age' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div className={styles.form_group}> 
                                <label >Email</label>
                                <Field className={styles.input} type='text' name='email'/>
                                <ErrorMessage name='email' style={{color: 'red'}} component='div'/>
                            </div></div><br/>
                        </div>                    
                            <button className={styles.button_submit} type={'submit'}>Sửa</button>
                            
                    </Form>
                </Formik>
                            <button 
                                className={styles.button_exit}
                                onClick={() => navigate('/home/manager/customer')}>
                                Thoát
                            </button>
            </div>
        </>
    );
}
export default EditManagerCustomer;