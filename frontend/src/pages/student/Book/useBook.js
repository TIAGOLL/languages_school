import { useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useBook = () => {
	const user = JSON.parse(localStorage.getItem("@ticketsPRO"));
	const [searchParams, setSearchParams] = useSearchParams();

	const lesson = searchParams.get("lesson");

	useEffect(() => {
		if (!searchParams.has("lesson")) {
			setSearchParams({ lesson: 1 });
		}
	}, [searchParams, setSearchParams]);

	const { data: book } = useQuery({
		queryKey: ["book", user.email],
		queryFn: () => api.students.GetBook(user.email),
	});

	function handleLesson(value) {
		console.log(value);
		setSearchParams({ lesson: value });
	}

	return { book, user, lesson, handleLesson };
};
