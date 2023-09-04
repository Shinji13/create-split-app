import { sectionsMap } from './consts';

export const handleAsync = async <T>(Promise: Promise<T>): Promise<[T | null, any]> => {
	try {
		const data = await Promise;
		return [data, null];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return [null, error];
	}
};

export const findSectionNeigbors = (sectioName: string) => {
	const sectionsArray = Array.from(sectionsMap).reduce<string[]>((previous: string[], current) => {
		return previous.concat(current[1]);
	}, []);
	const sectionIndex = sectionsArray.findIndex(
		(section) =>
			section
				.toLowerCase()
				.replace(/ /g, '-')
				.replace(/[@#:\$%\^&?\*]/g, '') == sectioName
	);
	return {
		previous: {
			section: sectionsArray[sectionIndex - 1] || '',
			category: getCategory(sectionsArray[sectionIndex - 1] || '')
		},
		next: {
			section: sectionsArray[sectionIndex + 1] || '',
			category: getCategory(sectionsArray[sectionIndex + 1] || '')
		}
	};
};

export const getCategory = (sectioName: string) => {
	if (sectioName == '') return '';
	const sectionsArray = Array.from(sectionsMap);
	const categoryIndex = sectionsArray.findIndex((entry) => entry[1].includes(sectioName));
	return sectionsArray[categoryIndex][0];
};
