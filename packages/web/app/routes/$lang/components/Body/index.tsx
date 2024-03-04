import { ReactNode } from "react";

export type BodyProps = {
  children: ReactNode;
};

export function Body({ children }: BodyProps) {
  return (
    <section className="flex flex-col items-center z-10">
      {children}
    </section>
  );
}
