import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProductModal = ({ show, onClose, onAdd }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    screen_size: "",
    camera: "",
    selfie: "",
    cpu: "",
    storage: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Tránh submit 2 lần

  // Xử lý thêm sản phẩm
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Kiểm tra nhập đầy đủ thông tin
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.screen_size ||
      !newProduct.camera ||
      !newProduct.selfie ||
      !newProduct.cpu ||
      !newProduct.storage ||
      !newProduct.description
    ) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log(" -------yêu cầu thêm sản phẩm -----");
      // Gửi dữ liệu lên JSON Server bằng Axios
      const response = await axios.post(
        "https://manager-shop-phone.onrender.com/api/products",
        {
          id: Math.random().toString(16).slice(2), // Tạo ID ngẫu nhiên
          ...newProduct,
        }
      );

      // Kiểm tra phản hồi từ API
      if (response.status !== 201) {
        throw new Error("Lỗi khi thêm sản phẩm.");
      }

      // Cập nhật danh sách sản phẩm
      if (onAdd) {
      onAdd(response.data);
      }
      // Reset dữ liệu
      setNewProduct({
        name: "",
        price: "",
        image: "",
        screen_size: "",
        camera: "",
        selfie: "",
        cpu: "",
        storage: "",
        description: "",
      });

      // Đóng modal
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thêm sản phẩm mới</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Tên sản phẩm"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Giá"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Màn hình"
                  value={newProduct.screen_size}
                  onChange={(e) => setNewProduct({ ...newProduct, screen_size: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Camera"
                  value={newProduct.camera}
                  onChange={(e) => setNewProduct({ ...newProduct, camera: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Selfie"
                  value={newProduct.selfie}
                  onChange={(e) => setNewProduct({ ...newProduct, selfie: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="CPU"
                  value={newProduct.cpu}
                  onChange={(e) => setNewProduct({ ...newProduct, cpu: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Lưu trữ"
                  value={newProduct.storage}
                  onChange={(e) => setNewProduct({ ...newProduct, storage: e.target.value })}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Mô tả"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                ></textarea>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Dán URL hình ảnh"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
                {newProduct.image && (
                  <img src={newProduct.image} alt="Hình ảnh sản phẩm" className="img-thumbnail mb-2 w-100" />
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Đang thêm..." : "Thêm"}
            </button>
            <button className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
