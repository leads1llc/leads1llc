import { ReactNode } from "react";

export type SectionProps = {
  headline: {
    title: string;
    description: string;
  }
  children?: ReactNode;
}

export function Section({ children, headline }: SectionProps) {
  return (
    <section className="section">
      <div className="headline">
        <h2>{headline.title}</h2>
        <p>{headline.description}</p>
      </div>
      {children}
    </section>
  );
}
