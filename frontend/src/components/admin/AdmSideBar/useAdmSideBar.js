import { useState } from "react";

export const useAdmSideBar = () => {
	const [diaglogOpen, setDialogOpen] = useState(null);
	const [sheetOpen, setSheetOpen] = useState(false);

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

	return {
		diaglogOpen,
		setDialogOpen,
		sheetOpen,
		setSheetOpen,
		getLinks,
	};
};
