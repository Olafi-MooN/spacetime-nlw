"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Camera, Copy } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";
import { MediaPicker } from "./MediaPicker";
import { api } from "../lib/api";
import Cookie from "js-cookie";
import copyText from "../utils/copy";

const UpdateMemoryForm = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateMemory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let coverUrl = "";
    const formData = new FormData(event.currentTarget);
    const fileToUpload = formData.get("coverUrl") as File;

    if (fileToUpload?.name) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);
      const uploadResponse = await api.post("/upload", uploadFormData);
      coverUrl = uploadResponse.data.fileUrl ?? data.coverUrl;
    }

    const token = Cookie.get("token");

    await api.put(
      `/memories/${id}`,
      {
        id,
        isPublic: formData.get("isPublic") === "on" ? true : false,
        content: formData.get("content") as string,
        coverUrl: coverUrl || data.coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // router.push("/");
  };

  const getMemory = async () => {
    const token = Cookie.get("token");
    setIsLoading(true);
    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);

    setData(response.data);
  };

  useEffect(() => {
    getMemory();
  }, [id]);

  return (
    <>
      {!isLoading && (
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
                checked={data?.isPublic}
                onChange={() =>
                  setData((prev: any) => ({
                    ...prev,
                    isPublic: !prev.isPublic,
                  }))
                }
                className="h-4 rounded border-gray-400 bg-gray-700 text-purple-500"
              />
              Tornar memória pública
            </label>
            {data.isPublic && (
              <button
                className=" flex w-auto cursor-pointer items-center text-sm text-gray-300 hover:text-gray-100"
                onClick={() =>
                  copyText(window.location.href + "/public-memories")
                }
              >
                <Copy className="h-4 w-4" />{" "}
                <p className="ml-2"> Copiar link</p>
              </button>
            )}
          </div>

          <MediaPicker defaultFile={data.coverUrl} />
          <textarea
            name="content"
            spellCheck="false"
            placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiencia que você quer lembrar para sempre"
            className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          >
            {data.content}
          </textarea>

          <button
            type="submit"
            className=" inline-block self-end rounded-full bg-green-500 px-5 py-5  font-alt text-sm uppercase leading-none text-black transition-all hover:bg-green-600"
          >
            Salvar
          </button>
        </form>
      )}
    </>
  );
};

export { UpdateMemoryForm };
