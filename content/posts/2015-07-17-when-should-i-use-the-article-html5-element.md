---
date: "2015-07-17"
tags:
- html
- html5
- markup
- web development
title: When should I use the <article> HTML5 element?
description: "Learn when and how to properly use the HTML5 article element for semantic markup and better content structure in web development."
---

I was recently asked what the appropriate use of the `<article>` element is.
Since it's HTML, you can technically use it however you'd like, but the
`<article>` element is defined as:

> a self-contained composition intended to be independently distributable or
> reusable, e.g., in syndication

With that in mind, you can just use this simple test:

*Does this contain something I'd put in an RSS feed?*

If the answer is 'yes', then using `<article>` is probably appropriate. If the
answer is 'no', then it might not be the right element to use. No shame in just
throwing it in the `<div>`!
