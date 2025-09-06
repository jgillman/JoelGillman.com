---
{{- $titleFromBaseName := replaceRE `\d{4}-\d{2}-\d{2}-` "" .File.ContentBaseName 1 }}
{{- $titleFromBaseName := replace $titleFromBaseName "-" " " | title }}
date: "{{ dateFormat "2006-01-02" .Date }}"
draft: true
tags:
- lorem
title: {{ $titleFromBaseName }}
---
