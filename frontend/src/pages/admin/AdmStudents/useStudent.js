import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { studentSchema } from "./schema";

export const useStudent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const email = searchParams.get("email");

  function datesForCalendar() {
    console.log();
    var date = new Date();
    var end = date.getFullYear();
    var start = new Date(date.getFullYear() - 70, 0, 0).getFullYear();
    var ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

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

  async function updateStudent(data) {
    await api.students
      .UpdateStudent(data)
      .then((res) => {
        toast.success(res.message);
        navigate("/admin/students");
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

    const { data: student } = useQuery({
      queryKey: ["student", email],
      queryFn: () => api.students.GetStudentByEmail(email),
    });

    return { books, student, isLoading };
  }

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    createStudent,
    updateStudent,
    books: Data().books,
    isLoading: Data().isLoading,
    student: Data().student,
    datesForCalendar,
  };
};
