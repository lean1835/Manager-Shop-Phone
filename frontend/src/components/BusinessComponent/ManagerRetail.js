import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import { getProductById, updateProduct } from "../../services/productService";
import { toast } from "react-toastify";
import styles from './ManagerRetail.module.css'
function ManagerRetail (){
    const {id}=useParams();
    const [oneProduct,setOneProduct]=useState({id:' ',name:" ",price:' ',image:' ',screen_size:' ',camera:' ',selfie:' ',cpu:' ',storage:' ',description:' '})
    const priceRef=useRef();
    const navigate=useNavigate();
        useEffect(()=>{ 
        if(id!=null){
            const fetchData=async ()=>{
                const product= await getProductById(id);
                setOneProduct(product);
            }
            fetchData();   
        } 
    },[])
    const handleSubmit = async () => {
        const newPrice= priceRef.current.value;
        console.log(newPrice)
        if(id!=null&&newPrice!=''){
            // const newPrice= priceRef.current.value;
            const product = {
                ...oneProduct,
                price: newPrice
            }
            await updateProduct(id,product);
            toast.success("Cập nhật giá thành công");
            navigate('/home/manager')
        }else{
            toast.error("Cập nhật giá thất bại");
        }         
        }    
    const handleOut=()=>{
        navigate('/home/manager')
    }
    return(
        <>
            <div className={styles.manager_retail}>
                
            <div className={styles.khung}>
                <div className={styles.khung_start}>
                <h1>Quản lý giá bán lẻ</h1><hr/>
            </div>
                <button className={styles.button_choice_product} onClick={() => navigate('/home/manager/retail/product')}>
                    Chọn sản phẩm
                </button>

                        <div className={styles.info_product}>

                            <h2>Thông tin sản phẩm:</h2>
                            <div> 
                                <label className={styles.first_label} >Tên sản phẩm:   </label>
                                <span className={styles.span}>  {oneProduct.name}</span>
                            </div><br/>
                            <div> 
                                <label className={styles.label} >Giá:</label>
                                <span className={styles.span}> {oneProduct.price}</span>
                            </div><br/>
                            <div> 
                                <label className={styles.label}>Kích thước màn hình:</label>
                                <span className={styles.span}> {oneProduct.screen_size}</span>
                            </div><br/>
                            <div> 
                                <label className={styles.label}>Camera:</label>
                                <span className={styles.span}> {oneProduct.camera}</span>
                            </div><br/>
                            <div> 
                                <label className={styles.label}>Selfie:</label>
                                <span className={styles.span}> {oneProduct.selfie}</span>
                            </div><br/>
                            <div> 
                                <label className={styles.label}>Cpu:</label>
                                <span className={styles.span}> {oneProduct.cpu}</span>
                            </div><br/>
                            <div> 
                                <label className={styles.label}>Dung lượng:</label>
                                <span className={styles.span}> {oneProduct.storage}</span>
                            </div><br/>
                            <div> 
                                <label className={styles.label}>Mô tả:</label>
                                <span className={styles.span}> {oneProduct.description}</span>
                            </div><br/>
                        </div>
                        {/* Nhập giá */}
                        <div className={styles.form_input}> 
                                <label className={styles.form_label} >Nhập giá bán lẻ</label>
                                <input className={styles.input_price} type="number" name="price" ref={priceRef} placeholder=""/>
                            </div><br/>
                        {/* Lựa chọn */}
                        <div className={styles.up_or_exit}>
                            <button className={styles.button_update}  onClick={handleSubmit} >Cập nhật giá bán lẻ</button>
                            <button className={styles.button_exit} onClick={handleOut} >Thoát</button>
                        </div>
            </div>
            </div>
        </>
    );
}
export default ManagerRetail;