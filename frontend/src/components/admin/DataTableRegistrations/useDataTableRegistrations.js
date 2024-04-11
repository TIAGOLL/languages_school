import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { CreatePaginationArray } from "../../../lib/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useDataTableRegistrations = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [dialogLockedOpen, setDialogLockedOpen] = useState(false);
	const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
	const [dialogHandleClassroomOpen, setDialogHandleClassroomOpen] = useState(false);
	const [currentClassroom, setCurrentClassroom] = useState("");
	const navigate = useNavigate();
	const activeTab = searchParams.get("tab");
	const page = searchParams.get("page");
	const per_page = searchParams.get("per_page");

	const {
		data: registrations,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["registrations1"],
		queryFn: () => api.professionals.GetRegistrations(),
	});

	const { data: classrooms } = useQuery({
		queryKey: ["classrooms"],
		queryFn: () => api.professionals.GetClassrooms(),
	});

	const registrationsPagination = CreatePaginationArray(registrations, page, per_page);

	async function handleLockRegistration(id) {
		await api.professionals
			.HandleLockRegistration(id)
			.then((res) => {
				toast.info(res.message);
				refetch();
				setDialogLockedOpen(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	async function deleteRegistration(id) {
		await api.professionals
			.DeleteRegistration(id)
			.then((res) => {
				toast.info(res.message);
				refetch();
				setDialogDeleteOpen(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	async function handleClassroom(currentClassroom, registrationId) {
		await api.professionals
			.HandleClassroom(currentClassroom, registrationId)
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	async function handleValuePaid(id) {
		await api.professionals
			.HandleValuePaid(id)
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	useEffect(() => {
		if (!activeTab) {
			setSearchParams((state) => {
				state.set("tab", "all");
				return state;
			});
		}
	}, [activeTab, setSearchParams]);

	return {
		isLoading,
		registrations,
		registrationsPagination,
		handleLockRegistration,
		handleClassroom,
		handleValuePaid,
		dialogLockedOpen,
		setDialogLockedOpen,
		dialogDeleteOpen,
		setDialogDeleteOpen,
		deleteRegistration,
		dialogHandleClassroomOpen,
		setDialogHandleClassroomOpen,
		currentClassroom,
		setCurrentClassroom,
		setSearchParams,
		searchParams,
		navigate,
		classrooms,
	};
};