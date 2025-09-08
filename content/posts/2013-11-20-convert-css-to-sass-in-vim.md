---
date: "2013-11-20"
tags:
- css
- sass
- vim
- regex
title: Convert CSS or Scss to Sass in Vim
---

When I copy/paste some CSS or Scss into my .sass using projects it's annoying
to have to clean up all the extra syntax. I've got this bit of regex on hand in
Vim that makes it much easier.

```
:%s/}\| {\|;//g
```

Or, if you want to nuke new lines after a closing `}` as well you can use:

```
:%s/}\n\| {\|;//g
```

Here's the regex as a simple railroad diagram (via [regexplained](www.regexplained.co.uk)).

<svg height="110.265625" version="1.1" width="105" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative;"><path fill="none" stroke="#000000" d="M85,55.1328125Q75,55.1328125,75,65.1328125V78.5546875Q75,88.5546875,65,88.5546875H63" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#000000" d="M20,55.1328125Q30,55.1328125,30,65.1328125V78.5546875Q30,88.5546875,40,88.5546875H42" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#000000" d="M85,55.1328125C75,55.1328125,75,55.1328125,65,55.1328125" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#000000" d="M20,55.1328125C30,55.1328125,30,55.1328125,40,55.1328125" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#000000" d="M85,55.1328125Q75,55.1328125,75,45.1328125V31.7109375Q75,21.7109375,65,21.7109375H63.5" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#000000" d="M20,55.1328125Q30,55.1328125,30,45.1328125V31.7109375Q30,21.7109375,40,21.7109375H41.5" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect x="41.5" y="10" width="22" height="23.421875" r="0" rx="3" ry="3" fill="#dae9e5" stroke="#dae9e5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><text x="52.5" y="21.7109375" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: normal; font-family: Arial;" font-size="12px"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4.15625">"}"</tspan></text><rect x="40" y="43.421875" width="25" height="23.421875" r="0" rx="3" ry="3" fill="#dae9e5" stroke="#dae9e5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><text x="52.5" y="55.1328125" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: normal; font-family: Arial;" font-size="12px"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4.15625">" {"</tspan></text><rect x="42" y="76.84375" width="21" height="23.421875" r="0" rx="3" ry="3" fill="#dae9e5" stroke="#dae9e5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><text x="52.5" y="88.5546875" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: normal; font-family: Arial;" font-size="12px"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4.15625">";"</tspan></text><path fill="none" stroke="#000000" d="M10,55.1328125H20" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><circle cx="10" cy="55.1328125" r="5" fill="#6b6659" stroke="#000" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle><path fill="none" stroke="#000000" d="M95,55.1328125H85" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><circle cx="95" cy="55.1328125" r="5" fill="#6b6659" stroke="#000" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle></svg>

This is not a "true" conversion from CSS to Sass, but at least it gets all the
extra syntax out of the way so you can start moving stuff around!

*By the way*, I have nothing against `.scss` or `.css`, I just prefer `.sass`.

