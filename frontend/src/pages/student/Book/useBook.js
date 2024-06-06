import { useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { GetUser } from "../../../lib/utils";

export const useBook = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const lesson = searchParams.get("lesson");
	const book = searchParams.get("book");

	const { data: infoOfStudent } = useQuery({
		queryKey: ["infoOfStudent", GetUser().email],
		queryFn: () => api.students.GetInfoOfStudent(GetUser().email),
	});

	function handleLesson(value) {
		setSearchParams((state) => {
			state.set("lesson", value);
			return state;
		});
	}
	function handleBook(value) {
		setSearchParams((state) => {
			state.set("book", value);
			return state;
		});
	}

	return { book, user: GetUser(), infoOfStudent, handleBook, lesson, handleLesson };
};
