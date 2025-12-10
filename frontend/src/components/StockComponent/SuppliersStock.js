import React, { useEffect, useRef, useState } from "react";
import { searchSuppliersByName } from "../../services/suppliersService";
import {  Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

function SuppliersStock() {
    const [suppliersList, setSuppliersList] = useState([]);
    const [originSuppliers, setOriginSuppliers] = useState([]);
    const [selectedSupplier,setSelectedSupplier] = useState([])
    const searchName = useRef('');
    const navigate = useNavigate();
    const [showSelectModel, setShowSelectModal] = useState(false);
    const location = useLocation().state;
    const originState = JSON.parse(JSON.stringify(location)); //chuyển sang string, rồi chuyển lại json để lưu ở ô nhớ mới
    useEffect(() => {
        const fetchData = async () => {
            try {
                let name = searchName.current.value;
                const list = await searchSuppliersByName(name);
                setSuppliersList(list);
                setOriginSuppliers(list);
            } catch (error) {
                
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const text = searchName.current.value;
        const filteredProducts = originSuppliers.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
        setSuppliersList(filteredProducts);
    };

    const handelSelectSupplier = (supplier) =>{
        setSelectedSupplier(supplier);
        setShowSelectModal(true);
        console.log(originState);
    }

    const handleConfirmSelect = () => {
        navigate(`/AddStock`, {
            state: {
                ...originState,
                idSupplierSelected: selectedSupplier.id,
                nameSupplierSelected: selectedSupplier.name,
            }
        });
        setShowSelectModal(false);
    };

    const handleClose = () => {
        setShowSelectModal(false);
    };

    
    return (
        <div style={{ border: "2px solid #ebedee", borderRadius: "8px", padding: "20px", maxWidth: "1000px", margin: "20px auto", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <Link to={"/AddStock"} className="btn btn-sm button_exit"><i className="fa-solid fa-rotate"></i></Link>
            <h4 style={{ textAlign: "center", color: "#333" }}>DANH SÁCH NHÀ CUNG CẤP</h4>
            <div className="search_body">
                <div className="search_input1">
                    <input ref={searchName} placeholder="Nhập tên nhà cung cấp cần tìm" className="form-control search_input1" />
                    <button className="btn button_search1" type="button" onClick={handleSearch}>
                        <i className="fas fa-search"></i> 
                    </button>
                </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#fee2e2" }}>
                        <th>STT</th>
                        <th>Tên nhà cung cấp</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliersList && suppliersList.map((e, i) => (
                        <tr key={e.id}>
                            <td>{i+1}</td>
                            <td>{e.name}</td>
                            <td>{e.address}</td>          
                            <td>{e.phone}</td>
                            <td>{e.email}</td>
                            <td>
                            <button onClick={() => handelSelectSupplier(e)} className="btn btn-sm btn-custom"><i className="fa-solid fa-square"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showSelectModel} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có muốn chọn nhà cung cấp này không?</Modal.Body>
                    <Modal.Footer>
                        <Button className="button_exit" onClick={handleClose}>
                        Thoát
                        </Button>
                        <Button className="button_add" onClick={handleConfirmSelect}>
                        Chọn
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SuppliersStock;