"use client";

import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { api } from "../../../../lib/api";
import { useParams } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PublicMemories = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMemory = async () => {
    const token = Cookie.get("token");
    setIsLoading(true);
    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);
    setMemory(response.data);
  };

  useEffect(() => {
    getMemory();
  }, [id]);

  return (
    <>
      {memory && (
        <div key={memory.id} className="space-y-4 p-[30px]">
          {memory?.createdAt && (
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
            </time>
          )}
          {memory?.coverUrl && (
            <Image
              src={memory?.coverUrl}
              alt={"uma imagem de capa"}
              className="aspect-ratio w-full rounded-lg object-cover"
              height={592}
              width={280}
            />
          )}
          {memory?.content && (
            <p
              className="text-lg leading-relaxed text-gray-100"
              dangerouslySetInnerHTML={{ __html: memory?.content }}
            ></p>
          )}
        </div>
      )}
    </>
  );
};

export default PublicMemories;
