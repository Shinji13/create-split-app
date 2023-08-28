import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const content = fs.readFileSync(
	'D:/Documents/study/Projects/CREATE-SPLIT-APP/www/src/lib/server/ReadMe.md'
);

prismaClient.section
	.create({
		data: {
			name: 'installation',
			category: 'create-split-app',
			content: content.toString(),
			toc: {
				createMany: {
					data: [
						{ degree: 1, order: 1, name: 'Getting Started' },
						{ degree: 1, order: 2, name: 'Installation' },
						{ degree: 1, order: 3, name: 'Usage' },
						{ degree: 2, order: 4, name: 'Remarks' },
						{ degree: 1, order: 5, name: 'Folder Structure' }
					]
				}
			}
		}
	})
	.then((er) => console.log(er));
