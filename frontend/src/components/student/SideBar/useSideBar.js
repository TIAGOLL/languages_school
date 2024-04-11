import { toast } from "react-toastify";
import api from "../../../services/api";
import { useState } from "react";
import { GetUser } from "../../../lib/utils";

export const useSideBar = () => {
	const [studentPhotoUrl, setStudentPhotoUrl] = useState(GetUser().avatarUrl);
	const [studentPhoto, setStudentPhoto] = useState(null);
	const [diaglogOpen, setDialogOpen] = useState(null);

	async function handleStudentPhoto(e) {
		if (e.target.files[0]) {
			const image = e.target.files[0];
			if (image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/webp") {
				setStudentPhoto(image);
				setStudentPhotoUrl(URL.createObjectURL(image));
			} else {
				toast.error("Envie uma imagem do tipo PNG ou JPEG");
				setStudentPhoto(null);
				return;
			}
		}
	}

	async function saveStudentPhoto() {
		await api.students
			.UploadPhoto(GetUser().id, studentPhoto)
			.then(() => {
				setDialogOpen(false);
				GetUser().avatarUrl = studentPhotoUrl;
				toast.success("Foto salva com sucesso");
			})
			.catch((error) => {
				console.log(error.message);
				toast.error(`Erro ao salvar foto!`);
			});
	}

	return {
		user: GetUser(),
		studentPhotoUrl,
		studentPhoto,
		setStudentPhotoUrl,
		setStudentPhoto,
		diaglogOpen,
		setDialogOpen,
		handleStudentPhoto,
		saveStudentPhoto,
	};
};
