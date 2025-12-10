import http from "../libs/http";

class StaffService {
  async getAll() {
    return await http.get("/staff");
  }
}

export default new StaffService();
