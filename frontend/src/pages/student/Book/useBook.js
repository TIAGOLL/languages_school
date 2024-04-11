import { useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { GetUser } from "../../../lib/utils";

export const useBook = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const lesson = searchParams.get("lesson");

	useEffect(() => {
		if (!searchParams.has("lesson")) {
			setSearchParams({ lesson: 1 });
		}
	}, [searchParams, setSearchParams]);

	const { data: book } = useQuery({
		queryKey: ["book", GetUser().email],
		queryFn: () => api.students.GetBook(GetUser().email),
	});

	function handleLesson(value) {
		setSearchParams({ lesson: value });
	}

	function getQtdLessons() {
		return searchParams.get("ql");
	}
	function getQtdWaks() {
		return searchParams.get("qw");
	}

	return { book, user: GetUser(), lesson, handleLesson, getQtdLessons, getQtdWaks };
};
