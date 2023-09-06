import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prismaClient = new PrismaClient();

async function run() {
	const content = fs.readFileSync('D:/Documents/Obsidian Vault/split/folder-structure.md');
	await prismaClient.section.update({
		where: {
			name: 'folder-structure'
		},
		data: {
			content: content.toString()
		}
	});
}

run().catch((er) => console.log(er));
