// useCountrySearch.ts
import { useEffect, useState } from "react";

const useCountrySearch = (initialQuery: string = "") => {
	const [query, setQuery] = useState(initialQuery);
	const [countriesList, setCountriesList] = useState<string[]>([]);

	useEffect(() => {
		const delayTimer = setTimeout(() => {
			if (query.trim() !== "") {
				getCountriesList(query);
			} else {
				setCountriesList([]);
			}
		}, 300);

		return () => clearTimeout(delayTimer);
	}, [query]);

	const getCountriesList = async (inputValue: string) => {
		try {
			const res = await fetch(
				`https://restcountries.com/v3.1/name/${inputValue}`
			);
			const resData = await res.json();
			const countries = resData?.map((country: any) => country.name.common);
			setCountriesList(countries);
		} catch (error) {
			console.log(error);
		}
	};
	const handleCountrySelection = (selectedCountry: string) => {
		setQuery(selectedCountry);
		setCountriesList([]); // Clear the countries list after selection
	};

	return {
		query,
		setQuery,
		countriesList,
		handleCountrySelection,
	};
};

export default useCountrySearch;
