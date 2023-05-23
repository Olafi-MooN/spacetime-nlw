import { EmptyMemories } from "../components/EmptyMemories";
import { Hero } from "../components/Hero";
import { Profile } from "../components/Profile";
import { SignIn } from "../components/SignIn";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Copyright } from "../components/Copyright";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});
const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NLW Spacetime",
  description:
    "Uma capsula do tempo, construída com Next, Typescript e TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="en">
      <body
        className={`${robotoFlex.variable} ${baiJamjuree.variable} bg-zinc-950 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
            {isAuthenticated ? <Profile /> : <SignIn />}
            {/* hero */}
            <Hero />
            <Copyright />
          </div>
          {/* right */}
          <div className="flex max-h-screen flex-col overflow-auto bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
