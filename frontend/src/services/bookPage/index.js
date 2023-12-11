import axios from "axios";

export default {
  async loadData(email) {
    const page = await axios.get(`http://localhost:3030/pagebook/${email}`);
    return page.data;
  },
};
