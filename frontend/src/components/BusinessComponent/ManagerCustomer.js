
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import styles from './ManagerCustomer.module.css';
import { toast } from "react-toastify";
import { searchByNameOrAddress } from "../../services/customerService";

function ManagerCustomer() {
    const [customerList, setCustomerList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [typeId, setTypeId] = useState("1");
    const [isReload, setIsReload] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const searchNameRef = useRef();
    const searchAddressRef = useRef();
    const customersPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            const nameSearch = searchNameRef.current?.value || "";
            const addressSearch = searchAddressRef.current?.value || "";
            try {
                const customers = await searchByNameOrAddress(nameSearch, addressSearch);
                setCustomerList(customers);
                setTotalPages(Math.ceil(customers.length / customersPerPage));
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
                setCustomerList([]);
            }
        };
        fetchData();
    }, [isReload]);

    const handleRadioChange = (customerId) => {
        setSelectedCustomer(customerId);
    };

    const handleOut = () => {
        navigate('/home/manager');
    };

    const handleChoice = (event) => {
        setTypeId(event.target.value);
        setIsReload((prev) => !prev);
    };

    const handleSearch = () => {
        setIsReload((prev) => !prev);
    };

    const handleSubmit = () => {
        if (selectedCustomer !== null) {
            navigate(`/home/manager/customer/edit/${selectedCustomer}`);
            toast.success("Chọn thành công");
        } else {
            toast.error("Vui lòng chọn khách hàng");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const displayedCustomers = customerList.slice(
        (currentPage - 1) * customersPerPage,
        currentPage * customersPerPage
    );

    return (
        <div className={styles.manager_customer}>
            <div className={styles.boc}>
                <div className={styles.khung_start}>
                    <h1>Quản lý khách hàng</h1>
                    <hr />
                </div>
                <form>
                    <span>Tìm kiếm theo </span>
                    <select onChange={handleChoice} value={typeId} className={styles.custom_select}>
                        <option value="1">Tìm kiếm theo tên</option>
                        <option value="2">Tìm kiếm theo địa chỉ</option>
                    </select>
                    {typeId === "1" ? (
                        <input className={styles.search_input} ref={searchNameRef} placeholder="Nhập tên khách hàng" />
                    ) : (
                        <input className={styles.search_input} ref={searchAddressRef} placeholder="Nhập địa chỉ" />
                    )}
                    <button onClick={handleSearch} className={styles.button_search} type='button'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Tên</th>
                            <th className={styles.th}>Số điện thoại</th>
                            <th className={styles.th}>Tuổi</th>
                            <th className={styles.th}>Địa chỉ</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedCustomers.map((c) => (
                            <tr className={styles.tr} key={c.id}>
                                <td className={styles.td}>{c.name}</td>
                                <td className={styles.td}>{c.phone}</td>
                                <td className={styles.td}>{c.age}</td>
                                <td className={styles.td}>{c.address}</td>
                                <td className={styles.td}>{c.email}</td>
                                <td>
                                    <input
                                        type="radio"
                                        name="customer"
                                        checked={selectedCustomer === c.id}
                                        onChange={() => handleRadioChange(c.id)}
                                        className={styles.chon}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    <button className={styles.pre} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &laquo; Trước
                    </button>
                <span className={styles.page}>Trang  {currentPage} / {totalPages}</span>
                    <button className={styles.post} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Sau &raquo;
                    </button>
                </div>
                <button className={styles.button_edit} onClick={handleSubmit}>Chỉnh sửa</button>
                <button className={styles.button_exit} onClick={handleOut}>Thoát</button>
            </div>
        </div>
    );
}

export default ManagerCustomer;