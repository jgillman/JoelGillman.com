---
date: "{{ dateFormat "2006-01-02" .Date }}"
draft: true
title: {{ replace .File.ContentBaseName "-" " " | title }}
---
