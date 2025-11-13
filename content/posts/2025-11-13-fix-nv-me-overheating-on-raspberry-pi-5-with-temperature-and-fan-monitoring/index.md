---
date: "2025-11-13"
tags:
- bash
- hardware
- home assistant
- linux
- monitoring
- nvme
- raspberry pi
- raspberry pi 5
- scripting
- troubleshooting
- tutorial
title: Fix NVMe Overheating on Raspberry Pi 5 with Temperature and Fan Monitoring
description: "Fix Raspberry Pi 5 NVMe overheating issues by configuring fan control and adding temperature monitoring to Home Assistant. Includes complete configuration and bash script."
---

When my Raspberry Pi 5 running Home Assistant started experiencing I/O errors, I discovered the NVMe drive was overheating because the fan wasn't running. Here's how I fixed the fan configuration and added comprehensive temperature monitoring to Home Assistant.

**TL;DR:** [Jump to the solution](#solutions) for configuration files and scripts.

## Preamble

I've been running Home Assistant in a container on my Unraid server for a couple years now and it's mostly been a positive experience. Over time, however, as I tinker with the Unraid server, sometimes the whole system goes down and it can take some debugging (and time) to bring it back online. As I've become increasingly invested in Home Assistant it's no longer acceptable to have extended downtime and between my job and a child I don't have the spare cycles to pour into debugging that I once did.

So I packed it all up and migrated it to a newly purchased Raspberry Pi 5! I knew I didn't want to run it off the slow microSD card that Pis usually run off of so I bought [an aluminum case that included active cooling and a NVMe expansion board][argon-neo-5-link] so I could take advantage of modern storage speeds.

[argon-neo-5-link]: https://argon40.com/products/argon-neo-5-m-2-nvme-for-raspberry-pi-5

After some struggles with how to get the Pi to see and then boot off of the NVMe without a microSD card inserted I was off to the races. I created a new backup from the containerised Home Assistant, shut it down, and then imported it into the freshly booted Home Assistant OS running on the Pi. When the import finished everything surprisingly just worked!

I moved the Pi into the closet with my networking rats nest and happily forgot about it. For awhile anyways...

## Problems

A day later, things stopped responding. My shades wouldn't open. The white noise machine didn't turn off just before my alarm in the morning. The lights didn't gently turn on when I stumbled into the kitchen at 3am to get a fresh bottle. My home was dumb again.

I opened up the Home Assistant webpage and it sorta loaded. I managed to get to the logs page where it was full of "I/O errors" saying that it couldn't read various files on the NVMe! I had seen this before and suspected it was a heat issue.

I opened the closet, picked up the Pi and, sure enough, it was definitely warmer than it should be. As I inspected the still-powered device I found the problem. The fan wasn't running!

![Toni, it's so hot. It's the heat.](its-the-heat.jpg)

## Solutions

With the general issue identified I knew what my next steps would be:
1. Get the fan working.
2. Add monitoring to Home Assistant for the NVMe temperature and to verify that the fan is running when it's supposed to.

### Configure Raspberry Pi 5 Fan Control

This took some research but in the end it was simple: I just needed to amend the `/boot/config.txt` file on the Pi so it knew what it was supposed to do with the fan. At the bottom of the config file, under `[all]` I added:

```ini
[all]
dtparam=nvme
dtparam=pciex1_gen=3
usb_max_current_enabled=1

dtparam=fan_temp0=35000
dtparam=fan_temp0_hyst=5000
dtparam=fan_temp0_speed=175
```

I read that you can set multiple "trigger points" for what fan speed to use at what temperature but I figured I would start simple just to make sure it was even working. Once working, with more data I could fine tune the trigger points so the fan only runs as fast and often as it needs to.

### Monitor NVMe Temperature in Home Assistant

This ended up being trickier. Here's the solution I came to after lots of tinkering and many tears:

```yaml
command_line:
  - sensor:
      name: "Pi 5 Fan Speed"
      icon: "mdi:fan"
      unique_id: "command_line_pi_5_fan_speed"
      command: '/config/scripts/get_hwmon_value.sh pwmfan fan1_input'
      unit_of_measurement: "RPM"
      scan_interval: 30
      value_template: "{{ value | int }}"
      state_class: "measurement"

  - sensor:
      name: "Pi 5 Fan PWM State"
      icon: >
        {% set state_value = value | int(0) %}
        {% if state_value == 0 %}
          mdi:fan-off
        {% elif state_value == 1 %}
          mdi:fan-speed-1
        {% elif state_value == 2 %}
          mdi:fan-speed-2
        {% elif state_value == 3 %}
          mdi:fan-speed-3
        {% else %}
          mdi:fan-alert
        {% endif %}
      unique_id: "command_line_pi_5_fan_pwm_state"
      command: 'cat /sys/class/thermal/cooling_device0/cur_state'
      scan_interval: 30
      value_template: "{{ value | int }}"
      state_class: "measurement"

  - sensor:
      name: "NVMe Composite Temp"
      icon: "mdi:harddisk"
      unique_id: "command_line_nvme_composite_temp"
      command: '/config/scripts/get_hwmon_value.sh nvme temp1_input'
      unit_of_measurement: "°C"
      scan_interval: 60
      value_template: "{{ (value | int / 1000) | round(1) }}"
      device_class: "temperature"
      state_class: "measurement"

  - sensor:
      name: "NVMe Sensor 1 Temp"
      icon: "mdi:thermometer-high"
      unique_id: "command_line_nvme_sensor1_temp"
      command: '/config/scripts/get_hwmon_value.sh nvme temp2_input'
      unit_of_measurement: "°C"
      scan_interval: 60
      value_template: "{{ (value | int / 1000) | round(1) }}"
      device_class: "temperature"
      state_class: "measurement"

  - sensor:
      name: "NVMe Sensor 2 Temp"
      icon: "mdi:thermometer"
      unique_id: "command_line_nvme_sensor2_temp"
      command: '/config/scripts/get_hwmon_value.sh nvme temp3_input'
      unit_of_measurement: "°C"
      scan_interval: 60
      value_template: "{{ (value | int / 1000) | round(1) }}"
      device_class: "temperature"
      state_class: "measurement"
```

The above configuration works like a charm and also adds in all sorts of nice icons, unique_ids (for additional config from the UI), and defines `device_class` where possible so Home Assistant knows what kind of data it's getting. It's also using a helper script that I wrote to grab the values from the hardware monitors. I partially wrote it because it made the `configuration.txt` file cleaner but also because the specific location of each monitor can (and does) change after every reboot.

`/config/scripts/get_hwmon_value.sh`

```bash
#!/usr/bin/env bash

# Usage: get_hwmon_value.sh <device_name> <value_file>
# Example: get_hwmon_value.sh pwmfan fan1_input
# Example: get_hwmon_value.sh nvme temp1_input

# Each hardware monitor (hwmon) has a name file and one or more value files.
# All the available monitors can be located in /sys/class/hwmon/

if [ $# -ne 2 ]; then
  echo "Error: requires 2 arguments: device_name and value_file"
  exit 1
fi

DEVICE_NAME="$1"
VALUE_FILE="$2"

for d in /sys/class/hwmon/hwmon*; do
  if [ "$(cat $d/name 2>/dev/null)" = "$DEVICE_NAME" ]; then
    if [ -f "$d/$VALUE_FILE" ]; then
      cat "$d/$VALUE_FILE" 2>/dev/null
      exit 0
    else
      echo "Error: found device '$DEVICE_NAME' but file '$VALUE_FILE' doesn't exist"
      exit 1
    fi
  fi
done

echo "Error: can't find hwmon device with name '$DEVICE_NAME'"
exit 1
```

The script looks for the device's name (via the `name` file) and then reads the requested value. If it fails, it logs errors to Home Assistant so you know something's wrong. After a reboot, the hwmon device locations can change, but this script handles that automatically by searching for the device by name rather than assuming a fixed path.
