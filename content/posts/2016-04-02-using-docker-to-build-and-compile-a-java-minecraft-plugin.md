---
date: "2016-04-02"
tags:
- docker
- command line
- minecraft
- java
- gradle
title: Using Docker to build and compile a Java Minecraft plugin
---

## The Problem

I hate the inventory system in Minecraft. It's usually fine for a bit but
eventually it's just a pile of unorganized crap and I can never find anything.
Plus seeing all my chests of items all messy drives me nuts.

There's a great plugin called [Inventory Tweaks][] which I've used in the past
but I'm playing the latest version of Minecraft (1.9 at the moment) and there
isn't a stable version of Inventory Tweaks!

[Inventory Tweaks]: https://inventory-tweaks.readthedocs.org/en/latest/

It's [open sourced on Github][Inventory Tweaks Github] but there's no nightly
or dev builds available. I'm a developer and I know
command-line-buildy-compiley-things but I don't want to install an entire Java
development environment. It'll take up space on my machine and I'll have to
deal with updates, incompatibilities, and conflicts... It's just a lot more
work than I'm willing to put in just for a single Minecraft plugin.

[Inventory Tweaks Github]: https://github.com/Inventory-Tweaks/inventory-tweaks/

Luckily I have Docker installed and know enough to plod my way through most of
the basics.

## The First Try

This is the originally way I did it. It worked, but it was slower and took just
over 5 minutes to compile.

```sh
cd ~/Code
git clone git@github.com:Inventory-Tweaks/inventory-tweaks.git
cd inventory-tweaks
docker run -v ~/Code/inventory-tweaks:/app qlik/gradle build
```

Easy right? Docker takes care of creating a contained Java development
environment with gradle which is needed to build the plugin.

After it finishes running one of the final lines of output should say `BUILD
SUCCESSFUL` along with the total time.

I have never done any Java development or compiling before so I had to do a bit
of digging to figure out that it would output to `build/libs`. Sure enough,
taking a peek in the `build/libs` folder revealed three fresh new .jar files! I
popped `InventoryTweaks-1.61-dev.jar` into my Minecraft folder's `mods` folder
and it worked like a charm.


## Make It Faster

While the original way I did it worked, using a volume (`-v`) to add the
project source makes the whole build process kind of slow. If you've used
synced folders with Vagrant you have likely seen a similar issue. I'm not
actually doing any development, I just want a dev build of the plugin!

I wrote a small Dockerfile that simply ADDs the project source to the Docker
container and defaults to the `build` command.

Dockerfile:

```
FROM qlik/gradle

ADD . /app
CMD ["build"]
```

Assuming I'm still in the project folder I can build a new image for gradle
with the settings I've added in the Dockerfile.

```sh
docker build -t mc-inventory .
```

Finally, I re-run `docker run` this time tweaked and new options.

```sh
docker run --rm -v ~/Downloads/inventory-tweaks:/app/build/libs mc-inventory
```

- `--rm` Removes the container after it's done running. Since I just want the end product I don't really care about having the container lay around afterwards.
- `-v` This time I'm only adding a volume that syncs with `/app/build/libs` and I've set it to a folder in my local machine's Downloads folder.
- The image name changed from `qlik/gradle` to `mc-inventory` which is the new image created with `docker build`
- Don't need `build` at the very end any more because it's defined in the Dockerfile.
