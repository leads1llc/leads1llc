import { ReactNode } from "react";

export type SectionProps = {
  headline: {
    title: string;
    description: string;
  }
  children?: ReactNode;
  className?: string;
}

export function Section({ children, headline, className }: SectionProps) {
  return (
    <div className={`section-${className}`}>
      <section className="section">
        <div className="headline">
          <h2>{headline.title}</h2>
          <p>{headline.description}</p>
        </div>

        <div className={className}>
          {children}
        </div>
      </section>
    </div>
  );
}
