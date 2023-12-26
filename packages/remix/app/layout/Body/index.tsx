import { ReactNode } from "react";

export type BodyProps = {
  children: ReactNode;
};

export function Body({ children }: BodyProps) {
  return (
    <section className="body">
      {children}
    </section>
  );
}
