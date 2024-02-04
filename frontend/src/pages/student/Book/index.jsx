import { useEffect, useState } from "react";
import SideBar from "../../../components/student/SideBar";
import api from "../../../services/api";
import BookViewer from "../../../components/student/BookViewer";

function Book() {

  const user = JSON.parse(localStorage.getItem("@ticketsPRO"));

  const [book, setBook] = useState('');

  console.log(user);
  async function loadData() {
    const response = await api.students.GetBookNumber(user.email);
    console.log(response);
    setBook(response);
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
    <div>
      <SideBar />
      <div>
        <BookViewer number={book.id} />
      </div>

    </div >

  );
}

export default Book;