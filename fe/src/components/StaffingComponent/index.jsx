import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import staffService from "../../services/staffService";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Button, Modal, Form } from "react-bootstrap";
import { getAllAccounts } from "../../services/accountService";
import "../../assets/button.css";
import "./index.css";
import { toast } from "react-toastify";

export default function StaffingComponent() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    accountID: "",
    phone: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [staffResponse, accountResponse] = await Promise.all([
        staffService.getAll(),
        getAllAccounts(),
      ]);

      // Cả hai đều là axios response -> dùng .data
      const staffData = staffResponse?.data ?? [];
      const accountData = accountResponse?.data ?? [];

      setAccounts(accountData);

      const combinedData = staffData.map((s) => ({
        ...s,
        account: accountData.find((a) => String(a.id) === String(s.accountID)),
      }));

      setStaff(combinedData.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = (staff = null) => {
    setSelectedStaff(staff);
    setFormData(staff || { name: "", dob: "", address: "", accountID: "", phone: "" });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.warn("Họ và tên không được để trống");
      return;
    }
    if (!formData.dob) {
      toast.warn("Ngày sinh không được để trống");
      return;
    }
    if (!formData.address.trim()) {
      toast.warn("Địa chỉ không được để trống");
      return;
    }
    if (!formData.accountID) {
      toast.warn("Vui lòng chọn công việc");
      return;
    }
    if (!formData.phone.trim() || !/^\d{10,11}$/.test(formData.phone)) {
      toast.warn("Số điện thoại không hợp lệ (phải có 10-11 chữ số)");
      return;
    }

    try {
      if (selectedStaff) {
        await staffService.update(selectedStaff.id, formData);
      } else {
        await staffService.add(formData);
      }
      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi lưu nhân viên", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await staffService.remove(id);
      fetchData();
    } catch (error) {
      console.error("Lỗi khi xóa nhân viên", error);
    }
  };

  const handleDeleteConfirm = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
      handleDelete(id);
      alert("Nhân viên đã được xóa thành công!");
    } else {
      alert("Hủy xóa nhân viên!");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaff = staff.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(staff.length / itemsPerPage);

  return (
    <div className='container py-5 staff-wrapper red-shadow'>
      <Card>
        <Card.Header>
          <div className="text-center fw-bold">Danh sách nhân viên</div>
        </Card.Header>
        <Card.Body>
          <div className='mb-3'>
            <Button className='gradient-button me-2' variant='primary' onClick={() => handleShowModal()}>
              Thêm nhân viên
            </Button>
          </div>
          <Table bordered hover>
            <thead>
              <tr className="bg-danger text-white">
                <th className="text-center">Họ và tên</th>
                <th className="text-center">Ngày sinh</th>
                <th className="text-center">Địa chỉ</th>
                <th className="text-center">Công việc</th>
                <th className="text-center">Số điện thoại</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentStaff.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.name}</td>
                  <td>{staff.dob}</td>
                  <td>{staff.address}</td>
                  <td>{staff.account?.role}</td>
                  <td>{staff.phone}</td>
                  <td>
                    <Button size='sm' className='gradient-button me-2' onClick={() => handleShowModal(staff)}>
                      Sửa
                    </Button>
                    <Button size='sm' className='gradient-button me-2' onClick={() => handleDeleteConfirm(staff.id)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <Pagination className='justify-content-center'>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStaff ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type='date'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control type='text' name='address' value={formData.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Công việc</Form.Label>
              <Form.Select name='accountID' value={formData.accountID} onChange={handleChange}>
                <option value=''>Chọn công việc</option>
                {(accounts ?? []).map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.role}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type='text' name='phone' value={formData.phone} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
