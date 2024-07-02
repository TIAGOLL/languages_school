import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import api from "../services/api";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function PasswordGenerator(date, firstName) {
	if (!date || !firstName) return "";
	firstName = firstName.replace(/\s/g, ""); // tira os espaços do nome
	const day = date?.getDate().toString().length == 1 ? `0${date?.getDate()}` : date?.getDate(); // verifica se o dia tem 1 ou 2 digitos
	const month = date?.getMonth().toString().length == 1 ? `0${date?.getMonth() + 1}` : date?.getMonth() + 1; // verifica se o mês tem 1 ou 2 digitos
	const password = `${firstName}${day}${month}`; // gera a senha
	return password;
}

export function UserGenerator(date, firstName) {
	if (!firstName || !date) return "";
	firstName = firstName.replace(/\s/g, ""); // tira os espaços do nome
	const day = date?.getDate().toString().length == 1 ? `0${date?.getDate()}` : date?.getDate(); // verifica se o dia tem 1 ou 2 digitos
	const month = date?.getMonth().toString().length == 1 ? `0${date?.getMonth() + 1}` : date?.getMonth() + 1; // verifica se o mês tem 1 ou 2 digitos
	const user = `${firstName?.toLowerCase()}${day}${month}`; // gera o usuário
	return user;
}

export async function VerifyUserExists(user) {
	const studentsUsers = await api.professionals.GetStudentUsers();
	const professionalsUsers = await api.professionals.GetUsers();

	let res = true;

	studentsUsers.map((item) => {
		if (item.user == user) {
			return (res = false);
		}
	});
	professionalsUsers.map((item) => {
		if (item.user == user) {
			return (res = false);
		}
	});
	return res;
}

export async function VerifyEmailExists(email) {
	const studentEmails = await api.professionals.GetStudentEmails();
	const professionalsEmails = await api.professionals.GetEmails();

	let res = true;
	studentEmails.map((item) => {
		if (item.email == email) {
			return (res = false);
		}
	});
	professionalsEmails.map((item) => {
		if (item.email == email) {
			return (res = false);
		}
	});
	return res;
}

export function DaysOfWeek() {
	const dates = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
	return dates;
}

export function CreatePaginationArray(data, page, per_page) {
	const lastPostIndex = page * per_page;
	const firstPostIndex = lastPostIndex - per_page;
	const currentPosts = data?.slice(firstPostIndex, lastPostIndex);

	return currentPosts;
}

export function GetUser() {
	const user = JSON.parse(localStorage.getItem("@ticketsPRO"));
	return user;
}

export function DatesForCalendar() {
	var date = new Date();
	var end = date.getFullYear();
	var start = new Date(date.getFullYear() - 70, 0, 0).getFullYear();
	var ans = [];
	for (let i = start; i <= end; i++) {
		ans.push(i);
	}
	return ans;
}

export async function VerifyCpfExistsStudents(cpf) {
	const studentsCpf = await api.professionals.GetStudentCpfs();
	let res = true;
	studentsCpf.map((item) => {
		if (item.cpf == cpf) {
			return (res = false);
		}
	});

	return res;
}
export async function VerifyCpfExistsProfessionals(cpf) {
	const professionalsCpf = await api.professionals.GetProfessionalsCpfs();
	let res = true;
	professionalsCpf.map((item) => {
		if (item.cpf == cpf) {
			return (res = false);
		}
	});

	return res;
}
