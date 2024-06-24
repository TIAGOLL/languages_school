import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SideBar from "../../../components/student/SideBar";
import { useBook } from "./useBook";
import BookViewer from '../../../components/student/BookViewer';

function Book() {

  const { book, lesson, handleLesson, handleBook, infoOfStudent } = useBook();

  return (
    <div>
      <div className="flex flex-row items-center max-sm:justify-end">
        <div className="absolute left-0 top-1">
          <SideBar />
        </div>
        <div className="w-full items-center justify-center flex mt-5 max-sm:w-[130px] max-sm:mr-10 flex-row">
          <div className="w-[600px] flex flex-row gap-4">
            <div className="flex flex-col gap-1 w-6/12">
              <Label>Livro</Label>
              <Select onValueChange={(e) => handleBook(e)} value={parseInt(book)}>
                <SelectTrigger>
                  <SelectValue placeholder="Livro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      infoOfStudent?.books?.map((book) => {
                        return <SelectItem value={book.id} key={book.id}>{book?.courses?.name} | {book.name}</SelectItem>
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 w-6/12">
              <Label>Lição</Label>
              <Select onValueChange={(e) => handleLesson(e)} value={parseInt(lesson)}>
                <SelectTrigger>
                  <SelectValue placeholder="Lição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      infoOfStudent?.books?.map((item) => {
                        if (item.id == parseInt(book)) {
                          return item.lessons.map((lesson) => {
                            return <SelectItem value={lesson.id} key={lesson.id}>{lesson.name}</SelectItem>
                          })
                        }
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div >
      <div className="mt-1">
        {lesson && <BookViewer book={parseInt(book)} lesson={parseInt(lesson)} />}
      </div>
    </div>
  );
}

export default Book;