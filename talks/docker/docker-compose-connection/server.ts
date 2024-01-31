
const PORT = process.env.PORT
const EXTERNAL_SERVICE = process.env.EXTERNAL_SERVICE

console.log({env: process.env})

const server = Bun.serve({
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(`I am a server at: ${PORT}`);
    }

    if (url.pathname === "/hello") {
      const response = await fetch(`http://${EXTERNAL_SERVICE}/`)
      const data = await response.text()
      return new Response(`Response from EXTERNAL_SERVICE: ${data}`);
    }

  },
});

console.log(`Listening on ${server.url}`);
