import { toast } from "react-toastify";
import { useState } from "react";
import { GetUser } from "../../../../lib/utils";
import api from "../../../../services/api";

export const useUpdateProfessionalPhoto = () => {
	const user = JSON.parse(localStorage.getItem("@ticketsPRO"));
	const [professionalPhotoUrl, setProfessionalPhotoUrl] = useState(GetUser().avatarUrl);
	const [professionalPhoto, setProfessionalPhoto] = useState(null);
	const [diaglogOpen, setDialogOpen] = useState(null);

	async function handleProfessionalPhoto(e) {
		if (e.target.files[0]) {
			const image = e.target.files[0];
			if (image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/webp") {
				setProfessionalPhoto(image);
				setProfessionalPhotoUrl(URL.createObjectURL(image));
			} else {
				toast.error("Envie uma imagem do tipo PNG ou JPEG");
				setProfessionalPhoto(null);
				return;
			}
		}
	}

	async function updateProfessionalPhoto() {
		if (professionalPhoto == null || !professionalPhoto) return toast.error("Selecione uma foto");
		await api.professionals
			.UploadPhoto(GetUser().id, professionalPhoto)
			.then(() => {
				GetUser().avatarUrl = professionalPhotoUrl;
				// setar o avatarUrl atual no localStorage
				localStorage.setItem("@ticketsPRO", JSON.stringify({ ...JSON.parse(localStorage.getItem("@ticketsPRO")), avatarUrl: professionalPhotoUrl }));
				setDialogOpen(false);
			})
			.catch((error) => {
				toast.error(`Erro ao salvar foto [${error.message}]`);
			});
	}

	return {
		user,
		professionalPhotoUrl,
		setProfessionalPhotoUrl,
		professionalPhoto,
		setProfessionalPhoto,
		handleProfessionalPhoto,
		updateProfessionalPhoto,
		diaglogOpen,
		setDialogOpen,
	};
};
