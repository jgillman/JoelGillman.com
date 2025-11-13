---
date: "2013-06-28"
tags:
- productivity
- shortcut
- snippet
- sublime text
title: Text header snippet for Sublime Text
---

I was just playing around with snippets in Sublime Text for the first time (despite being a long time Sublime user). This was just for fun but it's useful and shows off how powerful the snippets can be.

```xml
<snippet>
  <content><![CDATA[##${1/./#/g}#
# ${1:header}
##${1/./#/g}#]]></content>
  <tabTrigger>thead</tabTrigger>
</snippet>
```

Just type `thead` and hit tab and you'll be presented with:

```
#########
# header
#########
```

Not super special yet, but while `header` is still highlighted try typing in your text header and it auto-magically expands to the right width. I'm sure someone could add to it to make it accept hard returns as well!

```
#########################
# always one step ahead!
#########################
```

