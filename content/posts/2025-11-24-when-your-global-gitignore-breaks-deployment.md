---
date: "2025-11-24"
description: "How a global .gitignore file blocked my production deployment and how I fixed it using Git's .git/info/exclude for local-only ignore patterns."
tags:
- git
- productivity
- troubleshooting
- vim
title: When Your Global .gitignore Breaks Deployment
---

While making changes to this blog, I discovered that my edits to the [tags]( {{< ref "tags" >}} ) page would not appear in production. I modified both the layout (`layouts/tags`) and content (`content/tags`), yet nothing changed.

Years ago, I had used [ctags][] in vim, which generated a `tags` folder at the root of my project. Rather than add it to the project's `.gitignore` and clutter the file for my team, I added it to my personal `~/.gitignore`.

[ctags]: https://github.com/universal-ctags/ctags

I removed `tags` from my personal `~/.gitignore` and fixed the deployment issue. But this created a new problem: I wanted to use ctags again without committing a project-specific `.gitignore` entry. Git provides a solution: `.git/info/exclude`. This [file accepts the same patterns as `.gitignore`][gitignore] but affects only the local repository. I added the pattern there, and the problem disappeared.

[gitignore]: https://git-scm.com/docs/gitignore
