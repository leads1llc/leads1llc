import { ScrollView, Text } from "react-native";
import { NavBar } from "../../components/NavBar";
import { HeroSection } from "./sections/Hero";
import { TrustedBySection } from "./sections/TrustedBy";

export function HomePage() {
  return (
    <ScrollView>
      <NavBar />
      <HeroSection />
      <TrustedBySection />
    </ScrollView>
  );
}
