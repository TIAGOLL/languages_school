import SideBar from "../../../components/student/SideBar";
import BookViewer from "../../../components/student/BookViewer";
import { useBook } from "./useBook";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Book() {

  const { book, lesson, handleLesson, getQtdLessons } = useBook();

  return (
    <div>
      <div className="flex flex-row items-center max-sm:justify-end">
        <div className="absolute left-0 top-1">
          <SideBar />
        </div>
        <div className="w-full items-center justify-center flex mt-5 max-sm:w-[130px] max-sm:mr-10">
          <div className="w-[300px]">
            <Select onValueChange={(e) => handleLesson(e)} defaultValue={1}>
              <SelectTrigger>
                <SelectValue placeholder="Lesson" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    Array.from({ length: getQtdLessons() }, (_, i) => (
                      <SelectItem value={i + 1} key={i}>Lesson {i + 1}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div >
      <div className="mt-5">
        <BookViewer book={book} lesson={parseInt(lesson)} />
      </div>
    </div>

  );
}

export default Book;