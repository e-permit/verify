import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "images",
  name: "Images",
  particles: {
    collisions: {
      mode: "destroy",
      enable: true,
    },
    move: {
      enable: true,
      speed: 4,
      direction: "left",
      angle: 90,
      straight: true,
    },
    number: {
      limit: { mode: "wait", value: 10 },
      value: 10,
    },
    opacity: {
      value: 1,
    },
    shape: {
      options: {
        image: [
          {
            name: "truck-towards-left",
          },
        ],
      },
      type: "image",
    },
    size: {
      value: 120,
    },
  },
  background: {
    color: "#e4e4e7",
  },
  preload: [
    {
      src: "truck-towards-left.png",
      name: "truck-towards-left",
      width:300,
      height:150,
    },
  ],
};
export default options;
