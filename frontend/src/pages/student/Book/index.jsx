import SideBar from "../../../components/student/SideBar";
import BookViewer from "../../../components/student/BookViewer";
import { useBook } from "./useBook";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
function Book() {

  const { book, lesson, handleLesson } = useBook();

  return (
    <div>
      <SideBar />
      <Select onValueChange={(e) => handleLesson(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Lesson" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">Lesson 1</SelectItem>
            <SelectItem value="2">Lesson 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <BookViewer book={book} lesson={parseInt(lesson)} />
      </div>

    </div >

  );
}

export default Book;