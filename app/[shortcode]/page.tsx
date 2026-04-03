import { BASE_URL } from "@/lib/constants";
import { ApiResponse } from "@/types/api";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ shortcode: string }>;
}

export default async function RedirectPage({ params }: Props) {
  // const { shortcode } = await params;
  // let targetUrl: string | null = null;

  // try {
  //   console.log("redirecting to short code: ", shortcode);
  //   const response = await fetch(`${BASE_URL}/${shortcode}`, {
  //     cache: "no-store",
  //   });

  //   if (!response.ok) {
  //     redirect("/");
  //   } else {
  //     const json: ApiResponse<{ longUrl: string }> = await response.json();
  //     targetUrl = json.data?.longUrl || null;
  //   }
  // } catch (error) {
  //   console.log("Redirect error: ", error);
  // }

  // if (targetUrl) {
  //   const finalUrl = targetUrl.startsWith("http")
  //     ? targetUrl
  //     : `https://${targetUrl}`;
  //   redirect(finalUrl);
  // } else {
  //   notFound();
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-6 text-center">
      <h1 className="text-4xl font-serif mb-4 tracking-tighter text-black uppercase">
        Link Expired
      </h1>
      <p className="text-zinc-500 mb-8 max-w-md font-light">
        The shortcode you followed is no longer active or was never created.
      </p>
      <Link
        href="/"
        className="border border-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
