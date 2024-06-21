import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

function BookViewer({ book, lesson }) {


  const { data: url, isLoading, } = useQuery({
    queryKey: ["urlLesson"],
    queryFn: () => api.students.GetUrlLesson(book, lesson),
  });

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="w-full h-[calc(100vh-80px)]">
      <iframe className="pointer-events-auto bg-white" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
        src={url + "?embed"} />
    </div>
  )
}

export default BookViewer;