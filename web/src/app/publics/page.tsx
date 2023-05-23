import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { EmptyMemories } from "../../components/EmptyMemories";
import { api } from "../../lib/api";

dayjs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  content: string;
  excerpt: string;
  createdAt: string;
}

export default async function PublicsRoutes() {
  const isAuthenticated = cookies().has("token");
  const token = cookies().get("token")?.value;

  let memories: Memory[] = [] as Memory[];

  const response = isAuthenticated
    ? await api.get(`/memories/public`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    : ({} as AxiosResponse<Memory[]>);
  memories = response.data;

  if (!isAuthenticated || memories.length === 0) return <EmptyMemories />;

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex w-full justify-normal gap-4 text-sm text-gray-100">
        <Link href="/" className="rounded-sm p-4 hover:bg-gray-100/20">
          Minhas mémorias
        </Link>
        <Link href="/publics" className="rounded-sm bg-gray-100/20 p-4">
          Memorias públicas
        </Link>
      </div>
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
          </time>
          {memory?.coverUrl && (
            <Image
              src={memory?.coverUrl}
              alt={memory?.content}
              className="aspect-ratio w-full rounded-lg object-cover"
              height={592}
              width={280}
            />
          )}
          <p className="text-lg leading-relaxed text-gray-100">
            {memory?.excerpt}
          </p>
          <Link
            href={`/memories/${encodeURIComponent(memory.id)}/public-memories`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            {" "}
            Leia mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
