# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site. The site is configured for Joel Gillman's
personal website at joelgillman.com.

## Development Commands

### Local Development
```bash
# Start development server with drafts and remote access (preferred for development)
hugo server --buildDrafts --bind 0.0.0.0

# Start basic development server
hugo server

# Build the site
hugo

# Build with minification
hugo --minify

# Clean the public directory
rm -rf public/
```

The `hugo server` commands start the development server and run until the server is stopped. Do not expect it to exit by itself.

The local development server is reachable locally at http://127.0.0.1:1313

## Architecture and Structure

### Site Configuration
- Main config: `hugo.yaml` - contains site metadata, menu configuration
- Content structure follows Hugo conventions with `content/`, `static/`, `layouts/`, `assets/`
- Blog posts are in `content/posts/`
- Professional work is in `content/work/`
- Art portfolio is in `content/art/`
- Side projects are in `content/projects/`

### Theme Architecture (Shibui-derived)
- Originally based on the [shibui theme](https://github.com/ntk148v/shibui), but now fully inlined and customized directly in this repo's `layouts/` and `assets/` — the `themes/` directory is empty and there is no live theme dependency in `hugo.yaml`.
- **Design Philosophy**: Minimalist following Japanese Shibui aesthetics
- **Minimal JavaScript**: CSS solutions for functionality where possible
- **Color Scheme**: Warm, paper-like palette with CSS variables for customization
- **Typography**: Monospace fonts with semantic HTML styling
- **Features**: Dark/light theme support, nested heading counters, mobile-responsive

### Key Directories
- `content/` - Markdown content files
- `static/` - Static assets served as-is
- `layouts/` - Custom layouts (this repo's fork of the Shibui theme, not overrides of an external theme)
- `assets/` - Site-specific CSS/JS assets for processing

### Theme Customization
- Key variables: `--color-bg-primary`, `--color-text-primary`, `--font-family-mono`, `--spacing-base`
- Theme uses semantic HTML with minimal JavaScript
- A "dark mode" version of the UI is mainly controlled by changing the CSS variables.

## Site Configuration Details

Current menu structure (from `hugo.yaml`):
- About (`/about/`)
- Work (`/work/`)
- Tools (`/tools/`)
- Posts (`/posts/`)

`/resume/` and `/contact/` exist as pages but are deliberately left out of the main nav menu — they're linked from the homepage copy (`content/_index.md`) instead, not surfaced site-wide.

Author: Joel Gillman (joel@joelgillman.com)
Base URL: https://www.joelgillman.com/

## Content Management

### Creating New Content
```bash
# Create new post
./bin/new-post "title of the post"

# Create new page
hugo new about.md
```

### Renaming content
When changing the title of a post make sure the filename reflects the change.

### List all current content in CSV format
Instead of searching the whole file system yourself just use this command to quickly list all content for the site so you can then quickly access the files directly.
```bash
hugo list all
```

### List all content tags
The quickest way to reference all the tags currently being used is to build the site with hugo, then list the directories in the public/tags folder:
```bash
hugo build --cleanDestinationDir --buildDrafts
ls public/tags | grep -v index | tr "-" " "
```

### Front Matter Template
```yaml
---
date: 2023-06-13
tags:
- tag1
- tag2
title: "Your Title"
---
```

Always sort tags alphabetically.

## Deployment

Deployment is handled by pushing to the remote `main` branch with git (git push).

Cloudflare monitors the `main` branch for new commits and automatically builds and deploys to production with Wrangler.


<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:970c3bf2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Agent Context Profiles

The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.

- **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
- **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. **File issues for remaining work** - Create beads for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Handle git/sync by active profile**:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   bd dolt push
   git push
   git status
   ```
5. **Hand off** - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**
- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.
<!-- END BEADS INTEGRATION -->
