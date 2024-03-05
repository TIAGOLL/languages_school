import SideBar from "../../../components/student/SideBar";
import BookViewer from "../../../components/student/BookViewer";
import { useBook } from "./useBook";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
function Book() {

  const { book, lesson } = useBook();

  return (
    <div>
      <SideBar />
      <Select onValueChange={(value) => setValue('gender', value)} >
        <SelectTrigger>
          <SelectValue placeholder="Lesson" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="M">Masculino</SelectItem>
            <SelectItem value="F">Feminino</SelectItem>
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