import ApartmentActions from "../components/ApartmentActions";
import ContactInfo from "../components/ContactInfo";
import FeaturedApartments from "../components/FeaturedApartments";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import SearchAgentInfo from "../components/SearchAgentInfo";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedApartments />
      <ApartmentActions />
      <SearchAgentInfo />
      <HowItWorks />
      <Pricing />
      <ContactInfo />
    </>
  );
}
