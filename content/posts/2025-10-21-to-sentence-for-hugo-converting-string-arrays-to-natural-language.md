---
date: "2025-10-21"
tags:
- go
- hugo
- ruby on rails
- templates
- tutorial
- web-development
title: "to_sentence for Hugo: Converting String Arrays to Natural Language"
---

When rebuilding my website with Hugo, I ran into a common problem: I had arrays of strings (like tags or clients) that I wanted to display as natural-sounding sentences. You know, the kind where `["apples", "oranges", "bananas"]` becomes "apples, oranges, and bananas" with proper comma placement and an "and" before the last item.

Coming from Ruby on Rails, where `to_sentence` is built right into the framework, I initially expected this to be more complicated in Go templates. But Hugo's template functions made it surprisingly elegant. Here's how I built a reusable Hugo partial to join string arrays with proper grammar—Oxford comma included.

## The Problem

I needed a way to concatenate and join arrays of strings into readable sentences with these rules:
- Single item: just the item ("apples")
- Two items: join with "and" ("apples and oranges")
- Three or more: use commas with an Oxford comma before "and" ("apples, oranges, and bananas")
- Bonus: filter out any empty or nil values

## The Solution

Here's what I ended up with in [`layouts/_partials/to_sentence.html`][to_sentence]:

[to_sentence]: https://github.com/jgillman/JoelGillman.com/blob/6d61ea7dbf5f0a0e9dbe0991dfab9ea01de66b5b/layouts/_partials/to_sentence.html

```go {lineNos=inline}
{{ $s := slice }}
{{ $result := "" }}

{{/* Rebuild the array excluding falsey values */}}
{{ range . }}
  {{ with . }}
    {{ $s = $s | append . }}
  {{ end }}
{{ end }}

{{/* Oxford comma or gtfo */}}
{{ if gt ($s | len) 2 }}
  {{ $result = delimit $s ", " ", and " }}
{{ else }}
  {{ $result = delimit $s " and " }}
{{ end }}
{{ return $result }}
```

That's it. About 17 lines of code, including comments.

## How It Works

This Hugo partial does two main things:

1. **Filter out falsey values** (lines 4-9)
Using Hugo's `with` statement inside a `range` loop, we rebuild the array excluding any empty strings or nil values. The `with` block only executes if the value is truthy.
2. **Join with appropriate delimiters** (lines 11-16)
Hugo's `delimit` function is the secret sauce here. It takes three arguments: the array, the separator, and an optional last separator.

For arrays with more than two items, we use `delimit $s ", " ", and "` which puts commas between items and ", and " before the last one. For two or fewer items, we simply use " and " as the separator.

## Using It

To use this partial in your templates, just pass it an array:

```go
{{ partial "to_sentence.html" .Params.tags }}
{{ partial "to_sentence.html" (slice "one" "two" "three") }}
```

## Why I Like This

As someone with basically no Go experience, I was pleasantly surprised by how concise this turned out. The `delimit` function doing the heavy lifting for the last separator is particularly elegant—no need for manual index tracking or special-casing the final element.

Plus, that Oxford comma comment is staying. Some things are non-negotiable.
