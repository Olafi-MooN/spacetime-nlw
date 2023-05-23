import { randomUUID } from 'crypto';
import { extname, resolve } from 'path';
import { FastifyInstance } from 'fastify';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pump = promisify(pipeline);
export async function uploadRoute(app: FastifyInstance) {
	app.post('/upload', async (request, reply) => {
		const upload = await request.file({
			limits: {
				fileSize: 5 * 1024 * 1024, // 5mb,
			},
		});

		if (!upload) {
			return reply.status(400).send({});
		}

		const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;
		const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);

		if (!isValidFileFormat) {
			return reply.status(400).send({});
		}

		const fieldId = randomUUID();
		const extension = extname(upload.filename);
		const filename = fieldId.concat(extension);

		const writeStream = createWriteStream(resolve(__dirname, '../../uploads', filename));

		await pump(upload.file, writeStream);

		const fullUrl = request.protocol.concat('://').concat(request.hostname);
		const fileUrl = new URL(`uploads/${filename}`, fullUrl).toString();

		return { fileUrl };
	});
}
