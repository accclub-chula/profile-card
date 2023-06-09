import * as htmlToImage from "html-to-image";
import { Button } from "./Button";
import type { Component } from "solid-js";
import clsx from "clsx";
import toast from "solid-toast";

interface SaveImageProps {
  show: boolean;
}

export const SaveImage: Component<SaveImageProps> = (props) => {
  const onClick = () => {
    const node = document.getElementById("card");
    const save = async () => {
      let dataUrl = "";
      const minDataLength = 2000000;
      let i = 0;
      const maxAttempts = 10;
      while (dataUrl.length < minDataLength && i < maxAttempts) {
        dataUrl = await htmlToImage.toPng(node!, {
          filter: (node: HTMLElement) => !node.classList?.contains("no-print"),
        });
        i += 1;
        console.log(`${i + 1} attemps`, dataUrl.length);
      }
      const link = document.createElement("a");
      link.download = "profile-card.png";
      link.href = dataUrl;
      link.click();
    };
    toast.promise(save(), {
      loading: "Loading",
      success: "Downloading...",
      error: (
        <div class="flex flex-col items-center">
          <b>An error occurred 😔</b>
          <p>Please try another browser</p>
        </div>
      ),
    });
  };
  return (
    <div class={clsx(props.show ? "animate-bounce" : "hidden")}>
      <Button onClick={onClick}>Save & Share!</Button>
    </div>
  );
};
