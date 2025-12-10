import React, { useEffect, useRef, useState } from "react";
import { deleteStockById, getAllStock, searchStockByName } from "../../services/stockService";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import './StockCSS.css';
import { formarCurrency } from "../../utils/common";

function ListStock() {
  const [productList, setProductList] = useState([]);
  const searchName = useRef('');
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteStock, setDeleteStock] = useState({ id: '', name: '' }); 
  const [showDeleteModel, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, totalRecord } = await getAllStock(page, size);
        setProductList(data);
        setTotalPage(Math.ceil(totalRecord / size));
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } 
    };
    fetchData();
  }, [page, size]);

  const handleSearch = async () => {
    const name = searchName.current.value.trim();
    try {
      const searchList = await searchStockByName(name);
      setProductList(searchList);
    } catch (error) {
      console.error("Error searching stocks:", error);
    }
  };

  const handleDelete = async () => {
    await deleteStockById(deleteStock.id);
    setProductList(prevList => prevList.filter(stock => stock.id !== deleteStock.id));
    setIsLoading((pre => !pre));
    handleClose();
  };

  const handleShowDeleteModal = (stock) => {
    setDeleteStock(stock);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="border-form">
      <div className="title-form">
        <h4>QUẢN LÝ KHO</h4>
        <div className="search_body">
          <div className="search_input">
            <input
              ref={searchName}
              placeholder="Nhập tên sản phẩm cần tìm"
              className="form-control search-input"
            />
            <button className="btn button_search" type="button" onClick={handleSearch}>
              <i className="fas fa-search"></i> 
            </button>
          </div>
        </div>
      </div>
      <div className="button-list">
        <Link className="btn button_add" to={"/AddStock"}>
          Nhập kho
        </Link>
        <Link to={"/home"} className="btn button_exit"><i className="fa-solid fa-rotate"></i></Link>
      </div>
      <hr style={{ margin: "20px 0" }} />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
        <tr style={{ background: 'linear-gradient(90.63deg, rgb(239, 68, 68) -15.16%, rgb(248, 113, 113) 105.15%)' }}>
            <th>STT</th>
            <th>Ngày</th>
            <th>Tên hàng</th>
<th>Tên nhà cung cấp</th>
            <th>Số lượng nhập</th>
            <th>Đơn giá</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList.map((e, i) => (
              <tr key={e.id}>
                <td>{(page - 1) * size + (i + 1)}</td>
                <td>{e.importDate}</td>
                <td>{e.product ? e.product.name : "N/A"}</td>
                <td>{e.supplier ? e.supplier.name : "N/A"}</td>
                <td>{e.quantity}</td>
                <td>{formarCurrency(e.importPrice)}</td>
                <td>
                <Link to={'/ListStock/EditStock/' + e.id} className="btn btn-sm btn-custom">
                  <i className="fa-solid fa-pen-to-square"></i> 
                </Link>
                </td>
                <td>
                  <button className="btn btn-sm btn-custom" onClick={() => handleShowDeleteModal(e)}><i className="fa-solid fa-trash-can"></i></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Không tìm thấy kết quả nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button className="btn btn-secondary btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>&lt;&lt;</button>
        {[...Array(totalPage)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm ms-1 ${page === i + 1 ? "btn-color" : "btn-light"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button className="btn btn-secondary btn-sm ms-1" disabled={page === totalPage} onClick={() => setPage(page + 1)}>&gt;&gt;</button>
        <span className="ms-2">Trang {page} / {totalPage}</span>
      </div>
      
      {/* Delete Modal */}
      <Modal show={showDeleteModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa sản phẩm trong kho này không?</Modal.Body>
        <Modal.Footer>
          <Button className="button_exit" onClick={handleClose}>
            Thoát
          </Button>
          <Button className="button_add" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListStock;