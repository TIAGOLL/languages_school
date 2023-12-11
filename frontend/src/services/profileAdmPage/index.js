import axios from "axios";

export default {
  async loadData() {
    try {
      const data = await axios.get("http://localhost:3030/profileadm");
      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};
