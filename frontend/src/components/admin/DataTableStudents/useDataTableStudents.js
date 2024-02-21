import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";

export const useDataTableStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const book = searchParams.get("book");

  const { data: students, isLoading } = useQuery({
    queryKey: ["students", name, email, book],
    queryFn: () => api.students.GetActiveStudents(name, email, book),
  });

  const lastPostIndex = page * per_page;
  const firstPostIndex = lastPostIndex - per_page;
  const currentPosts = students?.slice(firstPostIndex, lastPostIndex);

  return {
    students,
    isLoading,
    currentPosts,
    searchParams,
    setSearchParams,
  };
};
