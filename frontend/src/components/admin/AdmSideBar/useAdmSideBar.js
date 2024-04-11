import { toast } from "react-toastify";
import api from "../../../services/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaUpdateProfessionalPassword } from "./schemaUpdateProfessionalPassword";
import { GetUser } from "../../../lib/utils";

export const useAdmSideBar = () => {
	const [professionalPhotoUrl, setProfessionalPhotoUrl] = useState(GetUser().avatarUrl);
	const [professionalPhoto, setProfessionalPhoto] = useState(null);
	const [diaglogOpen, setDialogOpen] = useState(null);
	const [sheetOpen, setSheetOpen] = useState(false);

	const { register, handleSubmit, formState, watch, setValue } = useForm({
		resolver: zodResolver(SchemaUpdateProfessionalPassword),
		mode: "all",
		criteriaMode: "all",
	});

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

	async function saveProfessionalPhoto() {
		if (professionalPhoto == null || !professionalPhoto) return toast.error("Selecione uma foto");
		await api.professionals
			.UploadPhoto(GetUser().id, professionalPhoto)
			.then(() => {
				setDialogOpen(false);
				GetUser().avatarUrl = professionalPhotoUrl;
				toast.success("Foto salva com sucesso");
			})
			.catch((error) => {
				toast.error(`Erro ao salvar foto [${error.message}]`);
			});
	}

	async function changePassword() {}

	return {
		user: GetUser(),
		changePassword,
		professionalPhotoUrl,
		setProfessionalPhotoUrl,
		professionalPhoto,
		setProfessionalPhoto,
		diaglogOpen,
		setDialogOpen,
		handleProfessionalPhoto,
		saveProfessionalPhoto,
		sheetOpen,
		setSheetOpen,
		register,
		handleSubmit,
		formState,
		watch,
		setValue,
	};
};
