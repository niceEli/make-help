# MakeMan

An Opinionated GNU Make Help System

It's man(1) But For Make Projects

## Usage

```make
.PHONY: help

help: 
    npx makeman help.yaml ${TARGET}
```

```sh
make help

make help TARGET=build
```

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo framework](https://create.bingo).
