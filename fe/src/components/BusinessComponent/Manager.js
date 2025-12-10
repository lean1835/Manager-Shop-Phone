import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import styles from './Manager.module.css'
function Manager (){
    const navigate=useNavigate();
    return(
        <>
<div className={styles.menu}>
    <div className={styles.bao}>
       <div className={styles.khung_start}>
            <h1>Quản lý kinh doanh</h1><hr/>
        </div>
        <div className={styles.manager}> 
            <button className={styles.button_retail} onClick={() => navigate('/home/manager/retail')}>
                Quản lý giá bán lẻ
            </button>
            <button className={styles.button_customer} onClick={() => navigate('/home/manager/customer')}>
                Quản lý khách hàng
            </button>               
        </div>
    </div>
</div>
        </>
    );
}
export default Manager;