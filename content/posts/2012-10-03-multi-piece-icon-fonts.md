---
date: "2012-10-03"
tags:
- css
- fontface
- icon
title: Multi-piece icon fonts
---

## Background:
I've been slowly moving the icons we use on our site into a font. If you're not
familiar with this it gives you several advantages but the main two, in my
opinion, are:

- Vector icons look *amazing* on high resolution displays.
- They are extremely small, saving on bandwidth and http requests.

## The Problem:
Many of our icons utilize multiple colors for different parts.

{% image post {{page.path|filename}}/01.png %}

*This image is a bad example because it's all white and you can't actually see
the 30% transparent black.*

## A Solution:
I'm using the program [Glyphs](http://glyphsapp.com/) to build our icon font.
It's alright, but not without quirks. I'm still undecided whether these
"quirks" are part of the application or that
[I have no idea what I'm doing](http://i0.kym-cdn.com/photos/images/original/000/234/765/b7e.jpg).

### Zero-width characters
My first idea was to use "zero-width" characters. Setting some of the
characters with a width of zero makes the following characters to collapse on
top of the first. Using several of these zero-width characters you can layer up
some complex icons. Wrapping each one in a `<i>` would allow you to style them
easily with CSS.

``` html
<i class="outline">o</i>
<i class="fill">f</i>
<i class="play">p</i>
```

**This works.** For the most part anyways. I've run into some issues in Webkit
(I haven't tested other browsers yet) where if you use a css transition some of
the characters will inexplicably disappear. I don't know for sure, but I
suspect this is purely a rendering issue; It might be fixed in the future.

### Negative kerning
Trying to get around the rendering bug and thinking that having a zero-width
character was a bit of a hack I experimented with kerning (the space between
characters).

To keep everything as even as possible every character in the font is 1000
units wide. This makes resizing more predictable and math simpler.

For each character that is followed by a character that should overlap I have
that character a kerning of -1000 units. This worked really well *plus* it
might get rid of the disappearing character bug.

Unfortunately, after converting the font into the various files needed for
cross-browser compatibility it seemed to have lost any custom kerning I had
added in.

### Position absolute
Currently we are only using the zero-width characters when they're all the same
color and opacity. For glyphs that require multiple colors or opacity we're
having to use `position: absolute;` to manually overlay them.

It's not ideal, but it works. Hopefully the issues I've noted will be resolved
in the future.

## A Demo and an Update:
In the time between me writing the first part of this article and this demo
part it would appear that the rendering issues I encountered are fixed! I still
have more testing to do and will make updates here if/when they change.

### Normal
{% jsfiddle pEWUn result,html,css %}

### Zero Width
{% jsfiddle 3PFtp result,html,css %}

### Negative Kerning
*Note the `text-rendering: optimizeLegibility;`.*
{% jsfiddle ZJx9A result,html,css %}

[Download .glyph files](http://cl.ly/1i1J2h471M0y/download/multi-piece-icon-font.zip)
to see exactly how the zero-width and kerning works.
