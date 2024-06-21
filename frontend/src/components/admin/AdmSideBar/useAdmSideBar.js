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

	function getLinks() {
		return [
			{ title: "Dashboard", links: [{ name: "Dashboard", to: "/admin/dashboard" }] },
			{
				title: "Alunos",
				links: [
					{ name: "Ver alunos", to: "/admin/students?tab=all" },
					{ name: "Cadastrar aluno", to: "/admin/students?tab=create" },
				],
			},
			{
				title: "Cursos",
				links: [
					{ name: "Ver cursos", to: "/admin/courses?tab=all" },
					{ name: "Cadastrar curso", to: "/admin/courses?tab=create" },
					{ name: "Ver matrículas", to: "/admin/registrations?tab=all" },
					{ name: "Matricular aluno", to: "/admin/registrations?tab=create" },
				],
			},
			{
				title: "Turmas",
				links: [
					{ name: "Ver todas", to: "/admin/classrooms?tab=all" },
					{ name: "Cadastrar turma", to: "/admin/classrooms?tab=create" },
				],
			},
			{
				title: "Funcionários",
				links: [
					{ name: "Ver todos", to: "/admin/professionals?tab=all" },
					{ name: "Cadastrar funcinário", to: "/admin/professionals?tab=create" },
				],
			},
		];
	}

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
		getLinks,
	};
};
