"use client";

import { Camera } from "lucide-react";
import React, { FormEvent } from "react";
import { MediaPicker } from "./MediaPicker";
import { api } from "../lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

const NewMemoryForm = () => {
  const router = useRouter();
  const handleCreateMemory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);
      const uploadResponse = await api.post("/upload", uploadFormData);
      coverUrl = uploadResponse.data.fileUrl;
    }

    const token = Cookie.get("token");

    await api.post(
      "/memories",
      {
        public: formData.get("isPublic") as string,
        content: formData.get("content") as string,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/");
  };
  return (
    <>
      <form
        className="flex flex-1 flex-col gap-2 p-8"
        onSubmit={handleCreateMemory}
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-300 hover:text-gray-100"
          >
            <Camera className="h-4 w-4" />
            Anexar media
          </label>
          <label
            htmlFor="isPublic"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-300 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              value={"true"}
              className="h-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            />
            Tornar memória pública
          </label>
        </div>
        <MediaPicker />
        <textarea
          name="content"
          spellCheck="false"
          placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiencia que você quer lembrar para sempre"
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        ></textarea>

        <button
          type="submit"
          className=" inline-block self-end rounded-full bg-green-500 px-5 py-5  font-alt text-sm uppercase leading-none text-black transition-all hover:bg-green-600"
        >
          Salvar
        </button>
      </form>
    </>
  );
};

export { NewMemoryForm };
