---
date: "2013-11-20"
tags:
- git
- command line
- awk
title: Git stash vs Git reset HEAD^
---

Git stash is a pretty sweet feature, but I don't always remember that I've
stashed something when I come back to a commit. Instead of stashing unfinished
work I've been committing everything with `git commit -am "wip"`.

Then I updated my prompt so that when the previous commit starts with "wip" it
adds a little red indicator to my prompt. That way, when I go back to a branch
with unfinished work I'm immediately aware that I need to `git reset HEAD^` and
finish what I started.

I'm using zsh for my shell, this is what the "wip prompt" logic looks like:

```bash
git_wip() {
     wip=$(/usr/bin/git log -1 --oneline 2>/dev/null | awk '{print tolower($2)}' | awk '{gsub(/[^a-z]/, ""); print}')
  if [[ $wip == "wip" ]]
  then
    echo "%{$fg[red]%}± wip%{$reset_color%}"
  else
    echo ""
  fi
  unset wip
}
```

Pulling that nasty command apart:

Print the last commit:

```bash
/usr/bin/git log -1 --oneline 2>/dev/null
```

Take the 2nd argument (1st argument is the commit hash), and force it to lower
case

```bash
awk '{print tolower($2)}'
```

Take that and take out anything that isn't a letter

```bash
awk '{gsub(/[^a-z]/, ""); print}'
```


This lets me be a bit lazy with my commit message. I can do "wip", "WIP",
"w.i.p.", or "w..i..p.. still working…" and they all get converted to "wip"
which I can then test against.
