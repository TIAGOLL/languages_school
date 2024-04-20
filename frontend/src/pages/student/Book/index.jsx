import SideBar from "../../../components/student/SideBar";
import BookViewer from "../../../components/student/BookViewer";
import { useBook } from "./useBook";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

function Book() {

  const { book, lesson, handleLesson, getQtdLessons, getQtdWaks, course, handleCourse, infoOfStudent } = useBook();
  console.log(book)

  return (
    <div>
      <div className="flex flex-row items-center max-sm:justify-end">
        <div className="absolute left-0 top-1">
          <SideBar />
        </div>
        <div className="w-full items-center justify-center flex mt-5 max-sm:w-[130px] max-sm:mr-10 flex-row">
          <div className="w-[600px] flex flex-row gap-4">
            <div className="flex flex-col gap-1 w-6/12">
              <Label>Curso</Label>
              <Select onValueChange={(e) => handleCourse(e)} defaultValue={1}>
                <SelectTrigger>
                  <SelectValue placeholder="Curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      infoOfStudent?.registrations.map((registration) => (
                        <SelectItem value={registration?.courses_id} key={registration.id}>{registration?.courses.name}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 w-6/12">
              <Label>Livro</Label>
              <Select onValueChange={(e) => handleLesson(e)} defaultValue={1}>
                <SelectTrigger>
                  <SelectValue placeholder="Lição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      Array.from({ length: getQtdLessons() }, (_, i) => (
                        <SelectItem value={i + 1} key={i}>Lesson {i + 1}</SelectItem>
                      ))
                    }
                    {
                      Array.from({ length: getQtdWaks() }, (_, i) => (
                        <SelectItem value={i + 1 + parseInt(getQtdLessons())} key={i + getQtdLessons()}>Wak {i + 1}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div >
      <div className="mt-1">
        <BookViewer book={book} course={parseInt(course)} lesson={parseInt(lesson)} />
      </div>
    </div>
  );
}

export default Book;