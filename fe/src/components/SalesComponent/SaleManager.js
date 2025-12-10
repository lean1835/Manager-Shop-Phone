import React, {useEffect, useState} from "react";
import {getAllCustomers} from "../../services/customerService";
import {useLocation, useNavigate} from "react-router-dom";
import {formarCurrency, getUriSearchParam} from "../../utils/common";
import '../../assets/saleComp.css';
import {Button, Modal} from 'react-bootstrap';
import {triggerWebhook} from "./checkOutProduct";
import {toast} from "react-toastify";

function SaleManager() {
    const location = useLocation();

    console.log('location; ', location);
    let params = {};
    if (location.search) {
        params = getUriSearchParam(location.search);
    }
    const [phone, setPhone] = useState(location.state?.phone || params.phone || "");
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();
    const [allSelectedProduct] = useState({
        selectedProductName : location.state?.selectedProductNames || "",
        selectedProduct: location.state?.selectedProducts || [],
        total: location.state?.total || 0,
        quantities: location.state?.quantities || []
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleCheck = async () => {
        let customers = await getAllCustomers();
        let customer = customers.find(c => c.phone === phone);
        if (customer) {
            setCustomer(customer);
            const newParams = new URLSearchParams();
            newParams.set("phone", customer.phone);
            navigate(`?${newParams.toString()}`);
        } else {
            navigate('/addNewCustomer', {state: {phone: phone}});
        }
    }

    useEffect(() => {
        if (phone) {
            getAllCustomers().then(customers => {
                let customer = customers.find(c => c.phone === phone);
                if (customer) {
                    setCustomer(customer);
                    const newParams = new URLSearchParams();
                    newParams.set("phone", customer.phone);
                    navigate(`?${newParams.toString()}`);
                }
            });
        }
    }, [navigate, phone]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCheckOut = async () => {
        if (!phone) {
            toast.error("Số điện thoại là bắt buộc");
            return;
        }

        if (allSelectedProduct.selectedProduct.length === 0) {
            toast.error("Bạn phải chọn ít nhất một sản phẩm");
            return;
        }

        const info = {
            name: customer.name,
            email: customer.email,
            selectedProductNames: allSelectedProduct.selectedProductName,
            quantities: allSelectedProduct.quantities.map(q => q.quantity),
            total: allSelectedProduct.total
        };
        await triggerWebhook(info);
        toast("Thanh toán thành công");
        navigate('/home');
    }

    return (
        <>
            <div className="container">
                <h1 className="sale-manager" >Quản lý bán hàng</h1>
                <div className="order-box order-box-1">
                    <div>
                        <label>Số điện thoại:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <button onClick={handleCheck}>Kiểm tra</button>
                    </div>
                    {customer && (
                        <table className="sales-table">
                            <tbody>
                            <tr className="render-tr">
                                <th className="render-th">Họ và tên</th>
                                <td className="render-td">{customer.name}</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr className="render-tr">
                                <th className="render-th">Số điện thoại</th>
                                <td className="render-td">{customer.phone}</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr className="render-tr">
                                <th className="render-th">Địa chỉ</th>
                                <td className="render-td">{customer.address}</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr className="render-tr">
                                <th className="render-th">Tuổi</th>
                                <td className="render-td">{customer.age}</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr className="render-tr">
                                <th className="render-th">Email</th>
                                <td className="render-td">{customer.email}</td>
                            </tr>
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="order-box order-box-2">
                    <button onClick={() => navigate('/searchProduct', {
                        state: {
                            selectedProductNames: allSelectedProduct.selectedProductName,
                            phone,
                            selectedProducts: allSelectedProduct.selectedProduct.map(product => product.id),
                            total: allSelectedProduct.total,
                            quantities: allSelectedProduct.quantities
                        }
                    })}>Chọn sản phẩm
                    </button>
                    <table className="sales-table">
                        <tbody>
                        <tr className="render-tr">
                            <th className="render-th">Chọn sản phẩm</th>
                            <td className="render-td">{allSelectedProduct.selectedProductName}</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr className="render-tr">
                            <th className="render-th">Tổng</th>
                            <td className="render-td">{formarCurrency(allSelectedProduct.total)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="sales-table">
                        <thead>
                        <tr className="render-tr">
                            <th className="render-th">Tên sản phẩm</th>
                            <th className="render-th">Số lượng</th>
                            <th className="render-th">Giá</th>
                            <th className="render-th">Tổng cộng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allSelectedProduct.selectedProduct.map((product, index) => (
                            <tr key={index} className="render-tr">
                                <td className="render-td"
                                    onClick={() => handleProductClick(product)}>{product.name}</td>
                                <td className="render-td">{allSelectedProduct.quantities.find(q => q.productId === product.id).quantity || 1}</td>
                                <td className="render-td">{formarCurrency(product.price)}</td>
                                <td className="render-td">{formarCurrency(product.price * allSelectedProduct.quantities.find(q => q.productId === product.id).quantity || 1)}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr className="render-tr">
                            <th className="render-th">Tổng</th>
                            <td className="render-td" colSpan="2"
                                style={{borderRight: 'none'}}>{formarCurrency(allSelectedProduct.total)}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                    <button className="check-out" onClick={handleCheckOut}>Thanh toán</button>
                </div>
            </div>

            {selectedProduct && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Tên sản phẩm:</strong> {selectedProduct.name}</p>
                        <p><strong>Giá:</strong> {formarCurrency(selectedProduct.price)}</p>
                        <p><strong>Hình ảnh:</strong> <img src={selectedProduct.image} alt={selectedProduct.name}
                                                        className="product-image"/></p>
                        <p><strong>Màn hình:</strong> {selectedProduct.screen_size}</p>
                        <p><strong>Camera:</strong> {selectedProduct.camera}</p>
                        <p><strong>Selfie:</strong> {selectedProduct.selfie}</p>
                        <p><strong>CPU:</strong> {selectedProduct.cpu}</p>
                        <p><strong>Lưu trữ:</strong> {selectedProduct.storage}</p>
                        <p><strong>Mô tả:</strong> {selectedProduct.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Thoát
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export default SaleManager;