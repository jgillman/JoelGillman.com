---
date: "2015-09-14"
tags:
- apple
- command line
- ios
- ruby on rails
- tutorial
title: Create Apple Push Notification certificates for Heroku with a .pem extension
---

There's a lot of info out there and a lot of tutorials on how to generate Apple
Push Notification certificates. Many of them ended up being dead ends or only
half-worked for me so, naturally, this is my own take on it for what worked for
me.

My company currently hosts our Rails app with Heroku. For hand-rolled push
notifications we use the gem [grocer][]. I
haven't found any guides that where specific for Heroku so hopefully this will
be helpful for someone in a similar position!

In this guide I will be using the default names of the certificate files as
they are downloaded from Apple or exported from Keychain Access. Some guides
rename them, but I found that confusing.

This guide assumes you're on a Mac, you have `openssl` installed, and you know
how to move around a file system in the Terminal.

[grocer]: https://github.com/grocer/grocer

---

## Get a SSL Certificate from Apple

First, follow the instructions in [Apple's documentation][apple-docs] to create
the Push Notification Client SSL Certificates.

At the end of that guide, you should be given the option to download the newly
generated certificate. Download it and the default name should be something
like `aps_staging.cer`.

Double click the newly downloaded certificate to add it to your Keychain.

[apple-docs]: http://help.apple.com/xcode/mac/current/#/dev11b059073


## Create a Key file

Find the certificate that you just added to Keychain Access and click the small
arrow to the left to open it up. A second item should be there with a key icon.
Holding shift, select both items (certificate and key), right click, and select
"Export 2 items…".

The default name should be `Certificates.p12`. Make sure you export it as a
`.p12` file. Save it somewhere.

> Notice that `.pem` is grayed out in the export menu. It's so
frustrating! I don't understand why it's not available.


## Convert everything to pem files

Now we do the converting stuff so you can actually use it! This part uses
`openssl` which probably came with your machine if you've got a Mac or Linux
box.

Create a pem certificate from the the `aps_staging.cer` you got from Apple:

```sh
openssl x509 -inform der -in aps_staging.cer -out my_push_cert.pem
```

Now create a pem key from the `Certificate.p12` you just exported from Keychain
Access:

```sh
openssl pkcs12 -nocerts -in Certificates.p12 -out my_push_key.encrypted.pem
```

> **Important:** You will be asked for a passphrase to encrypt the key file
you're creating. *Do not use a blank passphrase!* In the next step we will
remove the encryption for the case where you don't want it.


## Remove the passphrase (optional)

My gut says that removing the passphrasee is a bad thing to do, but for our
particular implimentation we needed to do it.

Use openssl to convert your encrypted key file to a non-encrypted one:

```sh
openssl rsa -in my_push_key.encrypted.pem -out my_push_key.pem
```


## Merge the certificate and key

Finally, merge the certificate and key into one happy file:

```sh
cat my_push_cert.pem my_push_key.pem > my_push_certkey.pem
```

> If using the encrypted key use `my_push_key.encrypted.pem` instead of
`my_push_key.pem`.


## Test it!

You can test your staging certificate with the following:

```sh
openssl s_client \
  -connect gateway.sandbox.push.apple.com:2195 \
  -cert my_push_certkey.pem \
  -key my_push_certkey.pem

# Or as one line:
openssl s_client -connect gateway.sandbox.push.apple.com:2195 -cert my_push_certkey.pem -key my_push_certkey.pem
```

> If using a production certificate, use the host `gateway.push.apple.com`
instead of `gateway.sandbox.push.apple.com`.

If the connection remains open then it's a success! Use `Ctrl + d` to close the
connection.

If the connection fails you will either get an error message or the connection
will close immediately.


<!-- { % image post {{page.path|filename}}/sample.png %} -->

