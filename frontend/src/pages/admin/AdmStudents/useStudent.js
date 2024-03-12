import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { useEffect } from "react";
import { studentsCreateSchema, studentsUpdateSchema } from "./schemas";

export const useStudent = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const {
		register: registerCreate,
		handleSubmit: handleSubmitCreate,
		formState: errorsCreate,
		watch: watchCreate,
		setValue: setValueCreate,
	} = useForm({
		resolver: zodResolver(studentsCreateSchema),
		mode: "all",
		criteriaMode: "all",
	});

	const {
		register: registerUpdate,
		handleSubmit: handleSubmitUpdate,
		formState: errorsUpdate,
		watch: watchUpdate,
		setValue: setValueUpdate,
	} = useForm({
		resolver: zodResolver(studentsUpdateSchema),
		mode: "all",
		criteriaMode: "all",
	});

	const email = searchParams.get("email");

	function datesForCalendar() {
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
		await api.professionals
			.CreateStudent(data)
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/students");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.message);
			});
	}

	async function updateStudent(data) {
		await api.professionals
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
			queryFn: () => api.professionals.GetStudentByEmail(email),
		});

		useEffect(() => {
			setValueUpdate("email", student?.email);
			setValueUpdate("dateOfBirth", student?.date_of_birth);
			setValueUpdate("firstName", student?.first_name);
			setValueUpdate("lastName", student?.last_name);
			setValueUpdate("cpf", student?.cpf);
			setValueUpdate("phone", student?.phone);
			setValueUpdate("gender", student?.gender);
			setValueUpdate("zipCode", student?.adresses?.zip_code);
			setValueUpdate("street", student?.adresses?.street);
			setValueUpdate("district", student?.adresses?.district);
			setValueUpdate("complement", student?.adresses?.complement);
			setValueUpdate("state", student?.adresses?.state);
			setValueUpdate("city", student?.adresses?.city);
			setValueUpdate("book", student?.books?.id);
			setValueUpdate("id", student?.id);
			setValueUpdate("number", student?.adresses?.number);
			setValueUpdate("user", student?.user);
			setValueUpdate("password", student?.password);
		}, [student]);

		return { books, student, isLoading };
	}

	function cleanParams() {
		setSearchParams((state) => {
			state.delete("name");
			state.delete("email");
			state.delete("book");
			state.delete("per_page");
			state.delete("page");
			return state;
		});
	}

	function cleanFilter() {
		setSearchParams((state) => {
			state.delete("name");
			state.delete("email");
			state.delete("book");
			return state;
		});
	}

	function handleFilterStudents({ name, email, book }) {
		setSearchParams((state) => {
			if (name) {
				state.set("name", name);
			} else {
				state.delete("name");
			}
			return state;
		});

		setSearchParams((state) => {
			if (email) {
				state.set("email", email);
			} else {
				state.delete("email");
			}
			return state;
		});

		setSearchParams((state) => {
			if (book) {
				state.set("book", book);
			} else {
				state.delete("book");
			}
			return state;
		});
	}

	return {
		registerCreate,
		handleSubmitCreate,
		errorsCreate: errorsCreate.errors,
		watchCreate,
		setValueCreate,
		createStudent,
		updateStudent,
		books: Data().books,
		isLoading: Data().isLoading,
		student: Data().student,
		datesForCalendar,
		handleFilterStudents,
		cleanParams,
		cleanFilter,
		searchParams,
		registerUpdate,
		handleSubmitUpdate,
		errorsUpdate: errorsUpdate.errors,
		watchUpdate,
		setValueUpdate,
	};
};
