import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { memoriesRoute } from './routes/memories';
import { authRoute } from './routes/auth';
import { uploadRoute } from './routes/upload';
import { resolve } from 'path';

const app = fastify();

app.register(cors, {
	origin: true,
});

app.register(multipart);

app.register(jwt, {
	secret: 'spacetime',
});

app.register(fastifyStatic, {
	root: resolve(__dirname, '..', 'uploads'),
	prefix: '/uploads',
});

app.register(authRoute);
app.register(uploadRoute);
app.register(memoriesRoute);

app.listen({ port: 3333 }).then(() => {
	console.log('Server listening on port 3333');
});
