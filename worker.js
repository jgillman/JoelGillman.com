export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Get the asset from Workers Assets
    const response = await env.ASSETS.fetch(request);

    // Check if this is a static asset that should be cached long-term
    const isStaticAsset = /\.(css|js|woff|woff2|ttf|eot|svg|jpg|jpeg|png|gif|webp|ico)$/i.test(url.pathname);

    if (isStaticAsset) {
      // Clone response and modify headers
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }

    // Return original response for non-static assets (HTML, etc.)
    return response;
  }
};
