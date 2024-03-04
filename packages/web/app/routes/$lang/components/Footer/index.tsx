import { Leads1LLCLogoMark } from "~/components/Leads1LLCLogoMark";
import { COLORS } from "~/styles/variables";

export default function Footer() {
  return (
    <footer className="flex items center flex-col p-28 bg-dark-500">
      <div className="flex flex-col items-center justify-center gap-4">
        <Leads1LLCLogoMark size={100} backgroundColor={COLORS["dark-500"]} foregroundColor={COLORS["primary-300"]} />
        <span className="text-primary-300">Copyright © 2023 Leads1LLC.</span>
      </div>
    </footer>
  );
}
