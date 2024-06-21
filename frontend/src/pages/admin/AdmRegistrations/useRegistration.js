import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useRegistration = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab");

	function cleanParams() {
		setSearchParams((state) => {
			state.delete("per_page");
			state.delete("page");
			state.delete("id");
			return state;
		});
	}

	function handleTab(e) {
		setSearchParams((state) => {
			state.set("tab", e);
			cleanParams();
			return state;
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
		handleTab,
		activeTab,
	};
};
