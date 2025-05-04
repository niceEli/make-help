# Make Help

A GNU Make Help System

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
