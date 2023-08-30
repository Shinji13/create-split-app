import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const content = fs.readFileSync(
	'D:/Documents/study/Projects/CREATE-SPLIT-APP/www/src/lib/server/ReadMe.md'
);

prismaClient.section
	.create({
		data: {
			name: 'typescript',
			category: 'usage',
			content: content.toString(),
			toc: {
				createMany: {
					data: [
						{ name: 'Introduction', degree: 1, order: 1 },
						{ name: 'Benefits of TypeScript in SvelteKit', degree: 2, order: 2 },
						{ name: 'Static Type Checking', degree: 3, order: 3 },
						{ name: 'Readability and Documentation', degree: 3, order: 4 },
						{ name: 'Development Experience', degree: 3, order: 5 },
						{ name: 'Refactoring Confidence', degree: 3, order: 6 },
						{ name: 'Collaboration', degree: 3, order: 7 },
						{ name: 'SvelteKit Integration', degree: 3, order: 8 }
					]
				}
			}
		}
	})
	.then((er) => console.log(er));
