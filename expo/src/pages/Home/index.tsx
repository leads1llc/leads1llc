import { Dimensions, ScrollView, Text } from "react-native";
import { NavBar } from "../../components/NavBar";
import { HeroSection } from "./sections/Hero";
import { TrustedBySection } from "./sections/TrustedBy";
import { TrainingProgramSection } from "./sections/TrainingProgram";
import { Footer } from "../../components/Footer";

export function HomePage() {
  const { height } = Dimensions.get('window');

  return (
    <ScrollView style={{ minHeight: height }}>
      <NavBar />
      <HeroSection />
      <TrustedBySection />
      <TrainingProgramSection />
      <Footer/>
    </ScrollView>
  );
}
