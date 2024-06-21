import { useSearchParams } from "react-router-dom";

export const usePreferences = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab");

	const cleanParams = () => {
		// setSearchParams();
	};

	function handleTab(e) {
		setSearchParams((state) => {
			state.set("tab", e);
			return state;
		});
		cleanParams();
	}

	return { handleTab, activeTab };
};
