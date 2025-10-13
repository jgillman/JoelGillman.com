export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Get the asset from Workers Assets
    const response = await env.ASSETS.fetch(request);

    // Clone response so we can modify headers
    const newResponse = new Response(response.body, response);

    // Set long cache for fingerprinted static assets
    if (/\.(css|js|woff|woff2|ttf|eot|svg|jpg|jpeg|png|gif|webp|ico)$/i.test(url.pathname)) {
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    return newResponse;
  }
};
