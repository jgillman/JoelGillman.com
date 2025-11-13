---
date: "2015-01-09"
tags:
- command line
- mtr
- network
- tools
- troubleshooting
- tutorial
title: Why is my internet slow? MTR can help
---

Sometimes I'm trying to load a site up in my browser and it suddenly gets
reaaaallly slow. That sucks, but forget I wanna know where exactly it's slowing
down. Somehow knowing where the problem is makes me feel better, even if I can't
do anything about it.

You can do `ping mydomain.com` but that only gives you limited information and
usually just tells you what you already know — Shit is slow right now.

# Enter MTR

In short, MTR is like `traceroute` and `ping` combined together.

Running a quick MTR report will probe the routers along the path between me
and the server I'm trying to reach. It looks something like this:

```sh
› mtr --report youtube.com
HOST: zenspace.local              Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 192.168.1.1                0.0%    10    1.5   1.1   0.8   1.6   0.0
  2.|-- 10.0.11.17                 0.0%    10   23.1  16.4   4.4  31.9   9.4
  3.|-- ???                       100.0    10    0.0   0.0   0.0   0.0   0.0
  4.|-- 2-3.365.core.sfo.web-pass  0.0%    10   33.5  24.1   7.1  75.4  20.2
  5.|-- 199.247.173.web-pass.com   0.0%    10    7.7  16.9   7.5  48.2  12.2
  6.|-- x.123.28.204.web-pass.com  0.0%    10   28.5  31.2  11.0  96.8  25.4
  7.|-- 2-1.760.core.fre.web-pass  0.0%    10   12.4  18.5  11.7  32.8   7.6
  8.|-- eqixsj-google-gige.google  0.0%    10   10.6  18.7  10.6  30.2   7.3
  9.|-- 216.239.49.168             0.0%    10   31.8  28.3  10.7  67.5  17.4
 10.|-- 72.14.232.35               0.0%    10   11.4  19.0  10.6  39.9  10.9
 11.|-- nuq04s19-in-f1.1e100.net   0.0%    10   14.4  23.9  10.5  65.7  19.3
```

> **Side note:** Running MTR in `--report` mode means that it will not run
> interactively. After it's done running the report will get printed to the
> screen.

In the above report, 1 is my local router and 2 is most likely the router for
my building.  Let's skip 3 for a minute here. Then you have 4 through 7 bounces
around at my ISP (Webpass).  Finally, starting at 8, you see the request hit
one of Google's servers and on through to it's final destination at 11.

At this point it should start becoming clear why this is so useful. To the
right there is the normal data you would get from a `ping`. If I, for example,
saw an average response time of 200 ms right away at #1 I'd know something was
up with my router. If I saw a high percentage of packet loss somewhere in 4
through 7 I would know that something might be up with my ISP. (Webpass is
super awesome though!)

## What's up with the `???`?

So what's up with #3? The `???` and 100% packet loss looks pretty bad! It's
actually normal to see that. It's most likely a local gateway that just doesn't
respond to the ICMP packets that MTR is sending. The biggest giveaway is that
all of the subsequent routers are respond just fine.

This is just a cursory look through MTR and you go much deeper with your
analysis. Hopefully the next time your internet slows down on you MTR can give
you some peace of mind.
