"use client";

import { useRouter } from "next/navigation";
import LandingPage from "../LandingPage";

export default function Home() {
  const router = useRouter();
  return <LandingPage onLaunch={() => router.push("/app")} />;
}
