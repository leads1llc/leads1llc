import { ReactNode } from "react";
import { concatClassNames } from "~/utils/utils";

export type SectionProps = {
  headline: {
    title: string;
    subtitle: string;
  }
  children?: any;
  className?: string;
  headlineClassName?: string;
}

export function Section({ children, headline, className, headlineClassName }: SectionProps) {
  return (
    <div className={className}>
      <section className="w-full flex flex-col flex-start gap-12 px-8 py-16 border-box text-left">
        <div className={concatClassNames("flex flex-col gap-4 border-b pb-2 border-solid border-dark-500", headlineClassName ?? "")}>
          <h2 className="text-4xl font-bold">{headline.title}</h2>
          <p className="text-md font-light">{headline.subtitle}</p>
        </div>

        <div className={className}>
          {children}
        </div>
      </section>
    </div>
  );
}
