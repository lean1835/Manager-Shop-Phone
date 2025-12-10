import React, { useEffect, useState } from 'react';
import './BodyComponent.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../services/productService';
function BodyComponent() {
    const account = useSelector(state => state.user.account)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/');
    }
    const [productsList, setProductsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const feachData = async () => {
            const listProduct = await getAllProducts();
            setProductsList(listProduct)
        }
        feachData()
    }, [isLoading])
    const [visibleCount, setVisibleCount] = useState(5);
    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Tăng số card hiển thị thêm 5
    };
    return (
        <>
            <div className="body-list-container">
                <div className="body-list">
                    {productsList.slice(0, visibleCount).map((products, i) => (
                        <Link className="link" key={i}>
                            <div className="card" style={{ width: "16rem" }}>
                                <img src={products.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">
                                        <strong>{parseInt(products.price).toLocaleString("vi-VN")} ₫</strong>
                                    </p>
                                    <h5>{products.name} {products.storage}</h5>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {visibleCount < productsList.length && (
                    <div className="button-container">
                        <button className="loading" onClick={loadMore}>
                            Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </>
    );

}
export default BodyComponent;