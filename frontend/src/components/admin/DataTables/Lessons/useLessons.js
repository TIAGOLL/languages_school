import { useQuery } from "@tanstack/react-query";
import api from "../../../../services/api";
import { toast } from "react-toastify";

export const useLessons = (book) => {
	
	const { data: lessons, refetch } = useQuery({
		queryKey: ["lessonsbybook", book.id],
		queryFn: async () => {
			if (!book) return;
			return await api.professionals.GetLessonByBook(book.id);
		},
	});

	async function deleteLesson(id) {
		await api.professionals
			.DeleteLesson(id)
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message, {
					autoClose: 5000,
				});
			});
	}

	return { lessons, deleteLesson };
};
