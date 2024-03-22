import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useClassrooms = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab");

	function handleTab(e) {
		setSearchParams((state) => {
			state.set("tab", e);
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
