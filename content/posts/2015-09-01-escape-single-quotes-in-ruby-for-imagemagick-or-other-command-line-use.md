---
date: "2015-09-01"
tags:
- command line
- imagemagick
- regex
- ruby on rails
- snippet
title: Escape single quotes in Ruby for ImageMagick or other command line use
---

Impatient? [Skip to the answer.](#answer)

I recently started piping customer-created-content into my Ruby application and
sometimes people wanna use an apostrophe. Usually, the apostrophe ends up being
a single quote and when I threw that into ImageMagick (via the `mini_magick`
gem) the application would barf everywhere. The culprit is that MiniMagick was
not sanitizing all of my strings in the way I hoped it would.

Specifically I'm using something like:

```ruby
image.draw "text 0,0 '#{ some_user_var }'"
```

Assuming `some_user_var = "I 'love' quotes!"` MiniMagick turns around and
executes on the command line:

```sh
mogrify -draw text 0,0, 'I 'love' quotes!'
```

<a name='answer'></a>

See the problem? Gotta escape those single quotes inside the other single quotes.


# Answer!

[Stack Overflow][] says: `yourString.gsub( "'", "\\\\'" )`

That'll work. If you wanna know why, continue.

[stack overflow]: http://stackoverflow.com/questions/2180322/ruby-gsub-doesnt-escape-single-quotes


# Why?

If you're familiar with RegEx matching and replacing you probably know that you can output a captured group in your replace with special syntax. I can't tell you exactly what `\'` is supposed to output, but it seems to contain everything in the string *after* the first match.

In any case, first you have to escape `\'` so you get `\\'`. Next you have to escape your escape character (`\`) so you have `\\`. Finally, combine the two, and you get `\\\\'`.

My head hurts.
