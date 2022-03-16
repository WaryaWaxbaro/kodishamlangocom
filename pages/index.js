import ApartmentActions from "../components/ApartmentActions";
import ContactInfo from "../components/ContactInfo";
import FeaturedApartments from "../components/FeaturedApartments";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import PopularPlaces from "../components/PopularPlaces";
import Pricing from "../components/Pricing";
import SearchAgentInfo from "../components/SearchAgentInfo";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularPlaces />
      <FeaturedProperties />
      <WhyChooseUs />
    </>
  );
}
