import Categories from "@/components/Categories";
import FeaturedListing from "@/components/FeaturedListing";
import Hero from "@/components/Hero";
import Livestock from "@/components/Livestock";
import Seller from "@/components/Seller";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedListing />
      <Livestock />
      <Seller />
    </main>
  );
}
