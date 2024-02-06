import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { studentSchema } from "./schema";

export const useCreateStudent = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(studentSchema),
    mode: "all",
    criteriaMode: "all",
  });

  async function createStudent(data) {
    await api.students
      .CreateStudent(data)
      .then((res) => {
        toast.success(res.message);
        navigate("/admin/students?tab=all");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  }

  function Data() {
    const { data: books, isLoading } = useQuery({
      queryKey: ["book"],
      queryFn: () => api.books.GetBooks(),
    });
    return { books, isLoading };
  }

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    createStudent,
    books: Data().books,
    isLoading: Data().isLoading,
  };
};
