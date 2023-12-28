import { Leads1LLCLogoMark } from "~/components/Leads1LLCLogoMark";
import { COLORS } from "~/styles/variables";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="copyright">
        <Leads1LLCLogoMark size={100} backgroundColor={COLORS["dark-500"]} foregroundColor={COLORS["primary-300"]} />
        <span>Copyright © 2023 Leads1LLC.</span>
      </div>
    </footer>
  );
}
