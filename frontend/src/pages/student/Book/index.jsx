import SideBar from "../../../components/student/SideBar";
import BookViewer from "../../../components/student/BookViewer";
import { useBook } from "./useBook";

function Book() {

  const { book, } = useBook();
  return (
    <div>
      <SideBar />
      <div>
        <BookViewer book={book} />
      </div>

    </div >

  );
}

export default Book;