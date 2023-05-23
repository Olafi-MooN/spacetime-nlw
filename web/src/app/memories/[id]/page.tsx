import { ChevronLeft } from "lucide-react";
import { UpdateMemoryForm } from "../../../components/updateMemoryForm";
import Link from "next/link";

export default function NewMemoryTeste() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 p-4 text-sm text-gray-300  hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar a timeline
      </Link>
      <UpdateMemoryForm />
    </div>
  );
}
