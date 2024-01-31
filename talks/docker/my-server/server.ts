
const PORT = process.env.PORT || 3000
const server = Bun.serve({
  port: PORT,
  fetch(request) {
    return new Response("Welcome to Bun!");
  },
});

console.log(`Listening on ${server.url}`);
