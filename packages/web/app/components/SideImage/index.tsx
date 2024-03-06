import { CSSProperties } from "react";

export type VisualDetailsProps = {
  title: string;
  description: string;
  imageUrl: string;
  style?: CSSProperties;
  side: "left" | "right";
  className?: string;
};

export function SideImage(props: VisualDetailsProps) {
  return (
    <section className={`flex w-full ${props.side === 'right' ? 'flex-row-reverse': '' }`} style={props.style}>
      <div className="w-1/2 h-full border-box">
        <img className="w-full h-full" src={props?.imageUrl} />
      </div>
      <div className="flex w-1/2 justify-center items-center p-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-bold">{props?.title}</h2>
          <p>{props?.description}</p>
        </div>
      </div>
    </section>
  );
}
