import api from "../../../services/api";
import { useQuery } from "@tanstack/react-query";

export const useBook = () => {
  const user = JSON.parse(localStorage.getItem("@ticketsPRO"));

  const { data: book } = useQuery({
    queryKey: ["book"],
    queryFn: () => api.students.GetBook(user.email),
  });
  return { book, user };
};
