import { useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { GetUser } from "../../../lib/utils";

export const useBook = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const lesson = searchParams.get("lesson");
	const course = searchParams.get("course");

	useEffect(() => {
		if (!searchParams.has("lesson")) {
			setSearchParams((state) => {
				state.set("lesson", "1");
				return state;
			});
		}
		if (!searchParams.has("course")) {
			setSearchParams((state) => {
				state.set("course", "1");
				return state;
			});
		}
	}, [searchParams, setSearchParams]);

	const { data: book } = useQuery({
		queryKey: ["book"],
		queryFn: () => api.students.GetBook(GetUser().email, searchParams.get("course")),
	});

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
	function handleCourse(value) {
		setSearchParams((state) => {
			state.set("course", value);
			return state;
		});
	}

	function getQtdLessons() {
		return searchParams.get("ql");
	}
	function getQtdWaks() {
		return searchParams.get("qw");
	}

	return { book, user: GetUser(), infoOfStudent, handleCourse, course, lesson, handleLesson, getQtdLessons, getQtdWaks };
};
