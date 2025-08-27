import Fastify from 'fastify';

const fastify = Fastify({
    logger: true
});

const port = process.env.PORT;

console.log(port);
console.log(fastify);

