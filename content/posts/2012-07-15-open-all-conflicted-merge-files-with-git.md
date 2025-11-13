---
date: "2012-07-15"
tags:
- awk
- command line
- conflict
- git
- merge
- snippet
- tutorial
- vim
title: Open all conflicted merge files with Git
---

When merging branches something I often want to open all of the conflicted
files in my editor. There's no built in way to do this (that I know of) but
it's actually not terribly complicated to do.

```bash
vim $(git status -s | grep ^UU | awk '{print $2}')
```

Let's break it down.

First you've got `git status -s` which prints your status but in it's short
(`-s`) format. Anything starting with the code UU means that both versions of
the file have been modified and it's unmerged.

We pipe that into `grep ^UU` which just gives us all the lines of the status
that start with "UU".

Finally we use `awk '{print $2}'` to grab the second argument from each line.
In each line the first "argument" is the status (UU) and the second is the
actual file location.

That's it! Super easy.

You can take this and throw it into an executable script or set it up as an
alias in your `.gitconfig`!

Script:

```bash
#!/bin/sh
vim $(git status -s | grep ^UU | awk '{print $2}')
```

Git Alias:

```bash
[alias]
  edit-conflicts = "!f() { git status -s | grep ^UU | awk '{print $2}' ; }; vim `f`"
```

