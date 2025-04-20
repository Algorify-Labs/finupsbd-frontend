import FAQSection from "@/components/home-page/FAQ";
import FeaturedArticles from "@/components/home-page/FeaturedArticles";
import FinancialProducts from "@/components/home-page/FinancialProducts";
import HomeSlider from "@/components/home-page/HomeSlider";
import HowWeWorks from "@/components/home-page/HowWeWorks";
import PartnerSlider from "@/components/home-page/PartnerSlider";
import Promotion from "@/components/home-page/Promotion";
import Services from "@/components/home-page/Services";
import EMICalculatorButton from "@/components/tools/EMICalculatorButton";

const HomePage = () => {
  return (
    <div>
      <EMICalculatorButton />
      <HomeSlider />
      <Services />
      <FinancialProducts />
      <HowWeWorks />
      <FeaturedArticles />
      <PartnerSlider />
      <Promotion />
      <FAQSection />
    </div>
  );
};

export default HomePage;
