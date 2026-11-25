import Hero from "@/ui/sections/Hero";
import { hero } from "./config/hero";

export default async function Home() {
  return (
    <main className="bg-background text-foreground flex flex-col pt-(--header-height) min-h-screen">
      <Hero {...hero} />
    </main>
  );
}
