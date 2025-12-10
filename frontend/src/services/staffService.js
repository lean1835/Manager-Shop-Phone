import axios from "axios";
class StaffService {
  async getAll() {
    return await axios.get("https://manager-shop-phone.onrender.com/api/staff");
  }
  async add(staff) {
    return await axios.post("https://manager-shop-phone.onrender.com/api/staff", staff);
  }

  async update(id, staff) {
    return await axios.put(`https://manager-shop-phone.onrender.com/api/staff/${id}`, staff);
  }

  async remove(id) {
    return await axios.delete(`https://manager-shop-phone.onrender.com/api/staff/${id}`);
  }
}

export default new StaffService();
