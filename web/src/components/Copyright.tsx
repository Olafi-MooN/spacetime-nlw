import Link from "next/link";
import React from "react";

const Copyright = () => {
  return (
    <p className="text-sm leading-relaxed text-gray-200">
      Feito com 💜 no NLW da Rocketseat por{" "}
      <Link
        href="https://github.com/Olafi-Moon"
        target="_blank"
        className="underline"
      >
        Alef
      </Link>{" "}
    </p>
  );
};

export { Copyright };
