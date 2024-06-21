import { useSearchParams } from "react-router-dom";

export const useClasses = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab");

	function cleanParams() {
		setSearchParams((state) => {
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

	return {
		handleTab,
		activeTab,
	};
};
