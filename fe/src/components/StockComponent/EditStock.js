import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editNewStock, getStockById } from "../../services/stockService";
import { toast } from "react-toastify";
function EditStock(){
    const { id } = useParams();
    const [stock, setStock] = useState(null);
    useEffect(() => {
        const fetchStock = async () => {
        let stock = await getStockById(id);
        setStock(stock);
        };
        fetchStock();
        console.log(stock);
        
    }, []);

    const navigate = useNavigate();

    const handleSubmit= async(value)=>{
        console.log(value);
        const newStock ={
            ...value,
        }
        await editNewStock(id, newStock);
        toast.success("Chỉnh sửa thành công");
        navigate("/ListStock");
}

    if (stock == null) {
        return "";
    }
    return(
        <div style={{ 
            border: "2px solid #ebedee", 
            borderRadius: "8px", 
            padding: "20px", 
            maxWidth: "600px", 
            margin: "20px auto", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
            // backgroundColor: "#f9f9f9"
          }}>
          <h4 style={{ textAlign: "center", color: "#333" }}>CHỈNH SỬA THÔNG TIN</h4>
            
            <Formik initialValues={stock} onSubmit={handleSubmit}>
                <Form>
                    <div className="mb-3">
                        <label className="form-label">Ngày nhập</label>
                        <Field className="form-control" type="date" name="importDate"  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tên sản phẩm</label>
                        <Field className="form-control" type="text" name="product.name" disabled />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tên nhà cung cấp</label>
                        <Field className="form-control" type="text" name="supplier.name" disabled />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số lượng</label>
                        <Field className="form-control" type="text" name="quantity" placeholder="Enter the quantity"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giá</label>
                        <Field className="form-control" type="text" name="importPrice" placeholder="Enter the price" />
                    </div>
                    <div style={{ textAlign: "center" }}>
                    <button type="submit" className='btn button_add me-2'>Sửa</button>
                    <Link to={"/Liststock"} type="button" className='btn button_exit'>Hủy</Link>
                    </div>
                </Form>
            </Formik>
        </div>

    )
}
export default EditStock;

