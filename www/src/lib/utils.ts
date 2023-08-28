export const handleAsync = async <T>(Promise: Promise<T>): Promise<[T | null, any]> => {
	try {
		const data = await Promise;
		return [data, null];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return [null, error];
	}
};
