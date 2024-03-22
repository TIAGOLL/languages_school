import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useCourses = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab");

	function cleanParams() {
		setSearchParams((state) => {
			state.delete("email");
			return state;
		});
	}

	function handleTab(e) {
		setSearchParams((state) => {
			state.set("tab", e);
			return state;
		});
		cleanParams();
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
		handleTab,
		activeTab,
	};
};
