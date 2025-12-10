import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { searchByNameAndChoice } from "../../services/productService";
import styles from './ChoiceProduct.module.css'
import { toast } from "react-toastify";;
function ChoiceProduct() {
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const nameSearchRef = useRef();
    const navigate = useNavigate();
    const choiceRef = useRef(1);
    const [choiceDisplay, setChoiceDisplay] = useState();
    const [isReload, setIsReload] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const customersPerPage = 5;
    useEffect(() => {
        const fetchData = async () => {
            const nameSearch = nameSearchRef.current.value;
            const products = await searchByNameAndChoice(nameSearch, choiceDisplay);
            setProductList(products);
            setTotalPages(Math.ceil(products.length / customersPerPage));
        }
        fetchData();
    }, [isReload])

    const handleRadioChange = (productId) => {
        setSelectedProduct(productId);
    };
    const handleOut = () => {
        navigate('/home/manager/retail')
    }
    const handleSearch = () => {
        setIsReload((pre) => !pre);
    }
    const handleChoice = (event) => {
        setChoiceDisplay(event.target.value);
        setIsReload((pre) => !pre);
    }
    const handleSubmit = () => {
        if (selectedProduct !== null) {
            navigate(`/home/manager/retail/${selectedProduct}`)
            toast.success("Chọn thành công");
        } else {
            toast.error("Vui lòng chọn sản phẩm");
        }
    }
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const displayedCustomers = productList.slice(
        (currentPage - 1) * customersPerPage,
        currentPage * customersPerPage
    );
    return (
        <>

            <div className={styles.choice_product}>
                <div className={styles.bao}>
                    <div className={styles.khung_start}>
                        <h1>Chọn sản phẩm</h1><hr />
                    </div>
                    <div className={styles.display}>
                        <span >Hiển thị:</span>   <br />
                        <input className={styles.choice_display} type="radio" name="display" ref={choiceRef} onChange={handleChoice} value={"no_price"} /><span className={styles.body_input}>Các mặt hàng chưa có giá</span><br />
                        <input className={styles.choice_display} type="radio" name="display" ref={choiceRef} onChange={handleChoice} value={"all"} /><span className={styles.body_input}>Tất cả sản phẩm </span>
                    </div>

                    <form  >
                        <input className={styles.search_input} ref={nameSearchRef} name={'nameSearch'} placeholder={'iphone...'} />
                        <button className={styles.button_search} onClick={handleSearch} type={'button'} ><i class="fa-solid fa-magnifying-glass "></i></button>
                    </form>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr} >
                                <th className={styles.th}>Tên</th>
                                <th className={styles.th}>Giá</th>
                                <th className={styles.th}>Kích thước màn</th>
                                <th className={styles.th}>Độ phân giải</th>
                                <th className={styles.th}>Cpu</th>
                                <th className={styles.th}>Dung lượng</th>
                                <th className={styles.th}>Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedCustomers.map((p, i) => (
                                <tr className={styles.tr} key={p.id}>
                                    <td className={styles.td}>{p.name}</td>
                                    <td className={styles.td}>{p.price}</td>
                                    <td className={styles.td}>{p.screen_size}</td>
                                    <td className={styles.td}>{p.camera}/{p.selfie}</td>
                                    <td className={styles.td}>{p.cpu}</td>
                                    <td className={styles.td}>{p.storage}</td>
                                    <td className={styles.td}>
                                        <input
                                            type="radio"
                                            name="product"
                                            checked={selectedProduct === p.id}
                                            onChange={() => handleRadioChange(p.id)}
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
                        <span>Trang {currentPage} / {totalPages}</span>
                        <button className={styles.post} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Sau &raquo;
                        </button>
                    </div>
                    {/* {selectedProduct !== null && ( */}
                    <button
                        className={styles.button_choice}
                        onClick={handleSubmit}
                    >
                        Chọn
                    </button>
                    <button className={styles.button_exit_product} onClick={handleOut}>Thoát</button>

                </div></div>
        </>
    );
}
export default ChoiceProduct;