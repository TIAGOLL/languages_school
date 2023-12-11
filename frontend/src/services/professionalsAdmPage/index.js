import axios from "axios";

export default {
  async loadData() {
    try {
      const professionals = await axios.get("http://localhost:3030/professionalsadmpage");
      console.log(professionals.data);
      return professionals.data;
    } catch (error) {
      console.log(error);
    }
  },

};
