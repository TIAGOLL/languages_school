import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StudentsFilterSchema } from "./searchOfStudentsSchema";
import { useSearchParams } from "react-router-dom";
import api from "../../../../services/api";
import { useQuery } from "@tanstack/react-query";

export const useSearchOfStudentsForm = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const name = searchParams.get("name");
	const email = searchParams.get("email");
	const course = searchParams.get("course");

	const { register, handleSubmit, setValue, watch } = useForm({
		resolver: zodResolver(StudentsFilterSchema),
		values: {
			name: name ?? "",
			email: email ?? "",
			course: course ?? "",
		},
	});

	const { data: courses } = useQuery({
		queryKey: ["coursessearch"],
		queryFn: () => api.professionals.GetCourses(),
	});

	function cleanFilter() {
		setSearchParams((state) => {
			state.delete("name");
			state.delete("email");
			state.delete("course");
			return state;
		});
	}

	function handleFilterStudents({ name, email, course }) {
		setSearchParams((state) => {
			state.set("page", 1);
			if (name) {
				state.set("name", name);
			} else {
				state.delete("name");
			}
			if (email) {
				state.set("email", email);
			} else {
				state.delete("email");
			}
			if (course) {
				state.set("course", course);
			} else {
				state.delete("course");
			}
			return state;
		});
	}

	return { cleanFilter, register, handleSubmit, setValue, watch, handleFilterStudents, searchParams, courses };
};
