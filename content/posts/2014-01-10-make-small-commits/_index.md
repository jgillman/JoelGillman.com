---
date: "2014-01-10"
tags:
- git
title: Make Small Commits
kind: page
---

As a general rule of thumb, when you write code you want to keep it modular,
bite-sized, and easy to read. The end product is more methods that are smaller
in size. It is easier to digest a method that encapsulates a single action or
idea.

You should apply the same idea to your commits.

Do not open a feature branch, do several hours of work, then commit one giant
commit. Doing so is a great way to make messy merge commits and blow away a lot
of work (either yours or your coworkers).

{{< figure
  src="big-commits.png"
  alt="A screenshot of a git commit with the message '* shit load of changes, biggest commit ever, haha' and the author name blurred out"
  caption="I swear this is a real commit. Name and avatar changed to protect the semi-innocent."
>}}

Make small commits that contain changes that make sense to go together. Commit
logs become more digestible and you think of your changes as a series of
smaller changes towards a larger goal. It also makes hunting down bugs way
easier when you can track it to a single commit. Digging through a massive
commit with hundreds of changes is annoying and difficult.

## Workflow Tools

I often have more than one commit's worth of work unstaged. Here's a few tools
that can help you visualize your working changes and commit smaller.

### Tig

I love jonas's [tig](http://jonas.nitro.dk/tig/). Using `tig status` to go
through my changes, stage the parts that make sense together, and commit those.

### Git add -i

Git has a built-in "interactive add" mode: `git add --interactive` or `git add
-i` for short. The [git-add man
page](https://www.kernel.org/pub/software/scm/git/docs/git-add.html#_interactive_mode)
has more info on how to use that.

### Others

[Many other Git GUI](http://git-scm.com/downloads/guis) will let you achieve the same goal.

  [1]: https://lh5.googleusercontent.com/-SDFArjTvFyo/UtA3_cUr4iI/AAAAAAAAAGs/VBv3gf_1-sg/s0/big-commits.png
