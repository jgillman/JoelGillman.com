---
date: "2013-01-05"
tags:
- html
- markup
- responsive
- tutorial
- web development
title: '&nbsp; What Non-Breaking Spaces Are For'
---


As a web developer I've always been familiar with non-breaking spaces or
`&nbsp;`.  I'm most familiar with them from dopey CMSs. They'll ingest a user's
content and spit it back out with awful markup and littered with `&nbsp;`
everywhere. You sometimes also see them used several in succession to indent a
line of content as below.

```html
&nbsp;&nbsp;&nbsp;&nbsp;This is not how you should intent something.
```

Turns out that there is a legitimate and powerful use. I was looking at
Automattic's site and found myself viewing their source. Right in their `h1` I
saw `&nbsp;` used not once but TWICE!

```html
<h1>We are passionate about making <em>the&nbsp;web</em> a better&nbsp;place.</h1>
```

"What a bunch of newbs," the kneejerk part of my brain said. But Automattic is
full of a lot of smart people so I knew there was no way they would have done
it by without intention.

Upon opening up the web dev tools on the right (where it should be) the
responsive CSS kicked in and the header wrapped onto another line. The `&nbsp;`
prevented "else." from getting widowed on the end! By using
`something&nbsp;else.` the browser treats them as one continuous word that will
always wrap together.

If you look up documentation about non-breaking spaces you will find that it
states that this is the correct use. Now go use that handy element!

