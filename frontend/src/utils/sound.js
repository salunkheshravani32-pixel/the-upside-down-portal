import click from "../assets/sounds/click.mp3";
import success from "../assets/sounds/success.mp3";
import del from "../assets/sounds/delete.mp3";
import complete from "../assets/sounds/complete.mp3";

export const playClick = () => {
  if (localStorage.getItem("sound") === "off") return;

  new Audio(click).play();
};

export const playSuccess = () => {
  if (localStorage.getItem("sound") === "off") return;

  new Audio(success).play();
};

export const playDelete = () => {
  if (localStorage.getItem("sound") === "off") return;

  new Audio(del).play();
};

export const playComplete = () => {
  if (localStorage.getItem("sound") === "off") return;

  new Audio(complete).play();
};