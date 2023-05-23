import Link from "next/link";
import React from "react";

const EmptyMemories = () => {
  return (
    <>
      <div className="flex h-full items-center justify-center p-16">
        <p className="w-[360px] text-center leading-relaxed">
          Você ainda não registrou nenhuma lembrança, comece a{" "}
          <Link className="underline hover:text-gray-50" href="/memories/new">
            criar agora!
          </Link>{" "}
        </p>
      </div>
    </>
  );
};

export { EmptyMemories };
