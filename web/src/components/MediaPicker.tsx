"use client";
import React, { ChangeEvent } from "react";

const MediaPicker = ({ defaultFile }: { defaultFile?: string }) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <input
        // value={file}
        type="file"
        id="media"
        hidden
        name="coverUrl"
        accept="image/*"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
      />
      {(preview ?? defaultFile) && (
        <img
          src={preview ?? defaultFile}
          className="aspect-video h-[400px] w-full rounded-lg object-cover"
          alt="imagem de fundo"
        />
      )}
    </>
  );
};

export { MediaPicker };
