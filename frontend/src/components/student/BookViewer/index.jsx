import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import { useEffect } from "react";

function BookViewer({ book, lesson }) {

  const queryClient = useQueryClient();

  const { data: url, isLoading, } = useQuery({
    queryKey: ["urlLesson"],
    queryFn: () => api.students.GetUrlLesson(book, lesson),
  });

  useEffect(() => {
    queryClient.invalidateQueries("urlLesson");
  }, [book, lesson, queryClient])

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="w-full h-[calc(100vh-80px)]">
      <iframe className="pointer-events-auto bg-white" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
        src={url + "?embed"} />
    </div>
  )
}

export default BookViewer;