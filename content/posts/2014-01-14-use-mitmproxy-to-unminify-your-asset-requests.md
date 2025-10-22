---
date: "2014-01-14"
tags:
- proxy
- web-development
- debug
- http
title: Use mitmproxy to Unminify Your Requests
---

Sometimes, when hunting bugs in production, I don't want all of the minified
resources. All my CSS and JS is minified and, while efficient, isn't very
friendly for debugging.

## Enter mitmproxy

In my words: [mitmproxy][1] is a fast little proxy that runs on the command
line and can be extremely powerful.

In their own words:
> [mitmproxy][1] is an interactive, SSL-capable man-in-the-middle proxy for
> HTTP with a console interface.

I have an alias for the following command:

```bash
mitmproxy --replace ":~q ~u \\.min\\.(js|css):\\.min:"
```

In short, it tells mitmproxy to start up and find all incoming requests (`~q`)
that match the regex `\.min\.(js|css)` in the URL (`~u`). Then in those
requests that finds it will replace `\.min` with 'nothing'.

The semi-cryptic documentation on 'replace' can be [found in their
documentation][2].

mitmproxy can be used for much more than this is only a simple example. Check
it out!

  [1]: http://mitmproxy.org/
  [2]: http://mitmproxy.org/doc/features/replacements.html

