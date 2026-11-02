import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { hand } from "@/lib/fonts";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-[#e3eaf6] pb-24 pt-36 lg:pb-32 lg:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,94,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 45%, #000 30%, transparent 85%)",
          }}
        />
        <div className="wrap relative flex max-w-2xl flex-col items-center text-center">
          <p className={`${hand.className} -rotate-2 text-[24px] text-[#1e5eeb]`}>this page is still a sketch</p>
          <div className="mt-4 rounded-3xl border-2 border-dashed border-[#1e5eeb]/40 bg-white/60 px-10 py-6">
            <span className="text-[5.5rem] font-bold leading-none tracking-[-0.05em] text-[#0b1a3b] sm:text-[7rem]">404</span>
          </div>
          <h1 className="mt-8 text-balance text-[2rem] font-bold leading-tight tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.6rem]">
            We couldn’t find that page.
          </h1>
          <p className="mt-3 text-[16.5px] leading-relaxed text-slate-600">
            The link may be old or mistyped. Everything we do is on the home page.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/"
              className="rounded-xl bg-[#0b1a3b] px-6 py-3.5 text-[15px] font-semibold text-white transition-[background-color,scale] duration-300 hover:bg-[#1e5eeb] active:scale-[0.97]"
            >
              Back to home
            </Link>
            <Link
              href="/enquire"
              className="rounded-xl bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0b1a3b] ring-1 ring-[#0b1a3b]/10 transition-[background-color,scale] duration-300 hover:bg-[#f4f8ff] active:scale-[0.97]"
            >
              Tell us your idea
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}