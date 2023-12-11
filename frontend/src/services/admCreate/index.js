import axios from "axios";

export default {
  async loadData() {
    try {
      const states = await axios.get("http://localhost:3030/professionals");
      return states.data;
    } catch (error) {
      console.log(error);
    }
  },
};
