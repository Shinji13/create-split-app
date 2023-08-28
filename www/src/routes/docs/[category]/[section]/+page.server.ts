import { error, type Load } from '@sveltejs/kit';
import prismaClient from '$lib/server/prisma';
import { handleAsync } from '$lib/utils';

export const load: Load = async ({ params }) => {
	const sectionName = params.section.toLowerCase();
	const category = params.category.toLowerCase();
	let [data, err] = await handleAsync(
		Promise.all([
			prismaClient.section.findUnique({
				where: {
					name: sectionName,
					category: category
				},
				select: {
					name: true,
					content: true
				}
			}),
			prismaClient.toc_links.findMany({
				where: {
					sectionName: sectionName
				},
				select: {
					sectionName: false,
					degree: true,
					name: true,
					order: true
				}
			})
		])
	);
	if (err) throw error(404, 'section not found');
	return {
		md: data[0].content,
		toc: data[1] || [],
		sectionName: data[0].name
	};
};
