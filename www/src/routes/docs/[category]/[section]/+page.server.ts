import { error, type Load } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const load: Load = async ({ params }) => {
	const section = params.section.toLowerCase();
	const category = params.category.toLowerCase();
	try {
		const md = fs.readFileSync(path.join('static', 'docs', category, section + '.md'));
		const toc = generateTableOfContents(md.toString());
		return {
			md: md.toString(),
			toc,
			sectionName: section
		};
	} catch (err) {
		throw error(404, 'page not found');
	}
};

function generateTableOfContents(mdText: string) {
	const lines = mdText.split('\n');
	const toc = [];
	const headerRegex = /^(#+)\s+(.*)/;

	for (const line of lines) {
		const match = line.match(headerRegex);
		if (match) {
			const degree = match[1].length;
			const name = match[2].trim().replace(/[\*_]/g, '');
			toc.push({ degree, name });
		}
	}

	return toc;
}
