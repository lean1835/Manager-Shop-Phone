import React, {useCallback, useEffect, useRef, useState} from "react";
import {searchProductByName} from "../../services/productService";
import {useLocation, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from 'react-bootstrap';
import {formarCurrency} from "../../utils/common";
import '../../assets/saleComp.css';
import HeaderComponent from "../HomeComponent/HeaderComponent";
import {toast} from "react-toastify";

function SearchProduct() {
    const [originProducts, setOriginProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const searchName = useRef("");
    const navigate = useNavigate();
    const originLocationState = JSON.parse(JSON.stringify(useLocation().state));
    const [selectedProducts, setSelectedProducts] = useState(useLocation().state?.selectedProducts || []);
    const [quantities, setQuantities] = useState(useLocation().state?.quantities || []);
    // const [quantities, setQuantities] = useState([]);
    const [selectedProductNames, setSelectedProductNames] = useState(useLocation().state?.selectedProductNames || "");
    const [total, setTotal] = useState(useLocation().state?.total || 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const phone = useLocation().state?.phone;

    useEffect(() => {
        const fetchData = async () => {
            let name = searchName.current.value;
            const data = await searchProductByName(name);
            setProducts(data);
            setOriginProducts(data);
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const text = searchName.current.value;
        const filteredProducts = originProducts.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
        setProducts(filteredProducts);
    }

    const handleCheckboxChange = useCallback((productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
            const newQuantities = quantities.filter(q => q.productId !== productId);
            setQuantities(newQuantities);
        } else {
            setSelectedProducts([...selectedProducts, productId]);
            setQuantities([...quantities, {productId, quantity: 1}]);
        }
    }, [products, selectedProducts, quantities]);

    const handleQuantityChange = useCallback((productId, quantity) => {
        const newQuantities = quantities.map(q => q.productId === productId ? {...q, quantity} : q);
        setQuantities(newQuantities);
    }, [quantities, selectedProducts]);

    const totalAndSelectedProductNames = useCallback(
        () => {
            let total = 0;
            let names = "";

            const allSelectedProducts = originProducts.filter(p => selectedProducts.includes(p.id));

            for (let i = 0; i < allSelectedProducts.length; i++) {
                const product = allSelectedProducts[i];
                const quantity = quantities.find(q => q.productId === product.id)?.quantity || 1;
                total += product.price * quantity;
                names += product.name + ", ";
            }

            setTotal(total);
            setSelectedProductNames(names.slice(0, -2));
            setIsModalOpen(true);
            console.log("selectedProducts:", selectedProducts);
        },
        [selectedProducts, originProducts, quantities],
    );

    const handleConfirm = useCallback(() => {
        toast("Chọn sản phẩm thành công");
        navigate('/SaleManager', {
            state: {
                selectedProductNames,
                selectedProducts: originProducts.filter(p => selectedProducts.includes(p.id)),
                total,
                phone,
                quantities,
            },
        });
    }, [products, selectedProductNames, selectedProducts, total, phone, quantities]);

    const handleBack = useCallback(() => {
        navigate('/SaleManager', {
            state: {
                ...originLocationState,
                selectedProducts: originProducts.filter(p => originLocationState.selectedProducts.includes(p.id)),
            }
        });
    }, [originLocationState, selectedProducts, products]);


    return (
        <div className="container">
            <div className="search-product-container">
                <input ref={searchName} name="searchName" placeholder="Nhập tên sản phẩm tìm kiếm" className="form-control"/>
                <button onClick={handleSearch} className="btn btn-primary">Tìm kiếm</button>
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Hình ảnh</th>
                        <th>Màn hình</th>
                        <th>Camera</th>
                        <th>Selfie</th>
                        <th>CPU</th>
                        <th>Dung lượng</th>
                        <th>Mô tả</th>
                        <th>Chọn</th>
                        <th>Tổng số lượng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{formarCurrency(p.price)}</td>
                            <td>
                                <img src={p.image} alt={p.name} className="product-image"/>
                            </td>
                            <td>{p.screen_size}</td>
                            <td>{p.camera}</td>
                            <td>{p.selfie}</td>
                            <td>{p.cpu}</td>
                            <td>{p.storage}</td>
                            <td>{p.description}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(p.id)}
                                    onChange={() => handleCheckboxChange(p.id)}
                                    className="form-check-input"
                                />
                            </td>
                            <td>
                                {selectedProducts.includes(p.id) && (
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities.find(q => q.productId === p.id)?.quantity || 1}
                                        onChange={(e) => handleQuantityChange(p.id, parseInt(e.target.value))}
                                        className="form-control"
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="form-actions">
                    <button onClick={handleBack} className="btn btn-secondary">Trở về</button>
                    <button onClick={() => totalAndSelectedProductNames()} className="btn btn-primary">Tính giá sản phẩm đã chọn
                    </button>
                </div>

                <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chọn sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Chọn sản phẩm: {selectedProductNames}</p>
                        <p>Tổng tiền: {formarCurrency(total)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Thoát
                        </Button>
                        <Button variant="primary" onClick={handleConfirm}>
                            Chọn
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default SearchProduct;