import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProductModal from "./AddProductModal";
import EditProduct from "./EditProduct";
import "./ProductInfoPage.css";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://manager-shop-phone.onrender.com/api";

const ProductInfoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const itemsPerPage = 5;

  // 🚀 Lấy danh sách sản phẩm từ API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
    }
  };

  // 🚀 Xử lý thêm sản phẩm (Nhận từ AddProductModal)
  const handleAddProduct = (newProduct) => {
    // Có thể gọi fetchProducts() để đồng bộ với server
    setProducts((prev) => [...prev, newProduct]);
    setShowModal(false);
  };

  // 🚀 Mở modal chỉnh sửa sản phẩm
  const handleEditProduct =async (id) => {
   await setEditProductId(id);
    setEditModal(true);
  };

  // 🚀 Cập nhật danh sách sản phẩm sau khi chỉnh sửa
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // 🚀 Xóa một sản phẩm
  const handleDeleteSingleProduct = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // 🚀 Xóa nhiều sản phẩm đã chọn
  const handleDeleteSelectedProducts = async () => {
    if (selectedProducts.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để xóa.");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn không?")) return;

    try {
      await Promise.all(
        selectedProducts.map((id) => axios.delete(`${API_BASE}/products/${id}`))
      );
      setProducts((prev) => prev.filter((p) => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // 🚀 Chọn checkbox
  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // 🔍 Lọc sản phẩm
  const filteredProducts = products.filter((product) =>
    (product?.[searchCategory] ?? product?.[searchCategory === "screen_size" ? "screenSize" : searchCategory])
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <button
            className="btn btn-primary text-white"
            onClick={() => setShowModal(true)}
          >
            Thêm mới hàng hóa
          </button>

          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="name">Tên</option>
              <option value="price">Giá</option>
              <option value="storage">Lưu trữ</option>
              {/* nếu backend trả camelCase, bạn có thể thêm option screenSize */}
              {/* <option value="screenSize">Màn hình</option> */}
            </select>
            <input
              type="text"
              className="form-control"
              placeholder={searchCategory}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                className="btn btn-success"
                onClick={() => setSearchTerm("")}
              >
                Thoát
              </button>
            )}
          </div>
        </div>

        <AddProductModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onAdd={handleAddProduct}
        />
        <EditProduct
          show={editModal}
          onClose={() => setEditModal(false)}
          productId={editProductId}
          onUpdate={handleUpdateProduct}
        />

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Chọn</th>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>CPU</th>
              <th>Lưu trữ</th>
              <th>Màn hình</th>
              <th>Camera</th>
              <th>Selfie</th>
              <th>Mô tả</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>
                  <img src={product.image} alt={product.name} width="50" />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.cpu}</td>
                <td>{product.storage}</td>
                {/* Nếu backend trả camelCase 'screenSize', hiển thị fallback */}
                <td>{product.screen_size ?? product.screenSize}</td>
                <td>{product.camera}</td>
                <td>{product.selfie}</td>
                <td>{product.description}</td>
                <td className="w-10">
                  <button
                    className="btn btn-success text-white p-2"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger text-white p-2 m-2"
                    onClick={() => handleDeleteSingleProduct(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-wrapper d-flex justify-content-center align-items-center gap-2">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo; Trước
          </button>

          <span>
            Trang {currentPage} / {totalPages}
          </span>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau &raquo;
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductInfoPage;
