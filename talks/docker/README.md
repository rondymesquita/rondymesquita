---
title: Introducing Docker 🐳
sub_title: A brief overview
author: Rondy Mesquita
theme:
  name: light
  override:
    # default:
    #   margin:
    #     percent: 4
    #   colors:
    #     foreground: "d3edec"
    #     background: "2d3b3b"

    # slide_title:
    #   alignment: center
    #   padding_bottom: 2
    #   padding_top: 1
    #   padding_left: 8
    #   colors:
    #     foreground: "4dc7f0"
        # background: "ffffff"

    code:
      alignment: left
      minimum_size: 1
      minimum_margin:
        percent: 12
      # theme_name: base16-mocha.dark
      padding:
        horizontal: 2
        vertical: 1

    # execution_output:
    #   colors:
    #     foreground: "e6e6e6"
    #     background: "2d2d2d"

    # inline_code:
    #   colors:
    #     foreground: "ffffff"
    #     background: "1f82a6"

    # intro_slide:
    #   title:
    #     alignment: center
    #     colors:
    #       foreground: "4dc7f0"
    #   subtitle:
    #     alignment: center
    #     colors:
    #       foreground: "a5d7e8"
    #   author:
    #     alignment: center
    #     colors:
    #       foreground: "4dc7f0"
    #     positioning: page_bottom

    # headings:
    #   h1:
    #     prefix: "██"
    #     colors:
    #       foreground: "d3edec"
    #   h2:
    #     prefix: "▓▓▓"
    #     colors:
    #       foreground: "d3edec"
    #   h3:
    #     prefix: "▒▒▒▒"
    #     colors:
    #       foreground: "d3edec"
    #   h4:
    #     prefix: "░░░░░"
    #     colors:
    #       foreground: "d3edec"
    #   h5:
    #     prefix: "░░░░░░"
    #     colors:
    #       foreground: "d3edec"
    #   h6:
    #     prefix: "░░░░░░░"
    #     colors:
    #       foreground: "d3edec"

    # block_quote:
    #   prefix: "▍ "
    #   colors:
    #     foreground: "f0f0f0"
    #     background: "292e42"

    # typst:
    #   colors:
    #     foreground: "f0f0f0"
    #     background: "292e42"

    # footer:
    #   style: progress_bar
    #   colors:
    #     foreground: "bedad8"

    # modals:
    #   selection_colors:
    #     foreground: "ee9322"

---

# Docker
![](./icons8-docker-240.jpg)

---

Basically, consists in `Images` and `Containers`.

`Image` -> equivalent to `ISO`.

`Container` -> equivalent to a running `VM`.

In other words...
Container is a `instance` of a `image`!
---


<!-- end_slide -->
<!-- jump_to_middle -->
Interacting with images.
---



<!-- end_slide -->
# docker run

```bash
docker run ubuntu
```
<!-- pause -->
```bash
docker run [image_name]
```
<!-- pause -->
```bash
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
29202e855b20: Pull complete
Digest: sha256:e6173d4dc55e76b87c4af8db8821b1feae4146dd47341e4d431118c7dd060a74
Status: Downloaded newer image for ubuntu:latest
```
<!-- pause -->
In interactive mode...
```bash +exec
docker run -ti ubuntu
```



<!-- end_slide -->
# docker ps

In another terminal...

```bash +exec
docker ps
```
<!-- pause -->
```bash
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
b8f9ea7c752b   ubuntu    "/bin/bash"   36 seconds ago   Up 35 seconds             amazing_taussig
```



<!-- end_slide -->
# docker run

[Image] -> run -> [Container]

Every `docker run` creates a new `container`.
---



<!-- end_slide -->
<!-- jump_to_middle -->
Interacting with containers.
---



<!-- end_slide -->

# docker start

Once a container is already created, we can start it again.

```bash
docker start amazing_taussig
```
<!-- pause -->
```bash
docker start [container_name]
```
<!-- pause -->
```bash
docker stop amazing_taussig
```

All data changed inside the container is kept.
---



<!-- end_slide -->
# docker rm
```bash
docker rm amazing_taussig
```

If you destroy the container, all data is lost. You need to create a new container using `docker run`.

Remember

- Container is a instance of a image.
- You can create a container using `docker run`.
- You can have `multiple containers` from the `same image`.
- Each container will have its own `state` (filesystem).



<!-- end_slide -->
# Dockerfile

It is a template file that describes the image.

```bash
FROM ubuntu
RUN apt-get update && apt-get install -y cowsay fortune
COPY icons8-docker-240.jpg /home/
```

```bash
docker build .
```
<!-- pause -->
```bash
docker images
```
<!-- pause -->
```bash
docker build -t my-ubuntu .
```



<!-- end_slide -->
# Dockerfile
```bash
docker run -ti my-ubuntu bash
```

```bash
docker run -ti my-ubuntu [cmd]
```


<!-- end_slide -->
# Volumes

Persist data between containers and host system.

```bash
docker run -v /host/path:/container/path ubuntu
```
<!-- pause -->
```bash
docker run -v [host_folder]:[container_folder] ubuntu
```

<!-- pause -->
- Any data put on `/host/path` will be shared to `/container/path` and `vice-versa`.
<!-- pause -->
- It can have `multiple volumes` in the same container.
<!-- pause -->
- The sharing is made in `real time`. Any change is reflected in both sides.
<!-- pause -->
- The file is `not copied`. It is `shared` between the host and the container.
<!-- pause -->
- Similar of `sharing a folder` in same network.



<!-- end_slide -->
# Ports

Expose a service from the container to the host.

```bash
FROM oven/bun
WORKDIR /home
COPY server.ts /home
ARG NODE_ENV
CMD [ "bun", "server.ts" ]
```

```bash
docker build -t server .
```
<!-- pause -->
```bash
docker run -ti --rm --name my-server server
```
<!-- pause -->
Missing port exposed to host system.

```bash
docker run -ti -p 5500:3000 --rm --name my-server server
```


<!-- end_slide -->
<!-- jump_to_middle -->
Docker Compose
---



<!-- end_slide -->
# docker compose
Agregatte multiple containers configuration in a single file.

```yaml
version: "3.4"
services:
  server:
    build:
      context: ../my-server/
      dockerfile: Dockerfile
      args:
        - NODE_ENV=development
    environment:
      - PORT=3300
    volumes:
      - ./:/home/mounted-volume
    ports:
      - 5500:3300
```



<!-- end_slide -->
# docker compose
```bash
docker compose up

docker compose build

docker compose up --build

docker compose down

docker compose ps
```



<!-- end_slide -->
<!-- jump_to_middle -->
End 🐳
---
<!-- end_slide -->
