import { CSSProperties } from "react";

export type VisualDetailsProps = {
  title: string;
  description: string;
  imageUrl: string;
  style?: CSSProperties;
  side: "left" | "right";
};

export function SideImage(props: VisualDetailsProps) {
  console.log(props.side);
  return (
    <section className={`flex w-full ${props.side === 'right' ? 'flex-row-reverse': '' }`} style={props.style}>
      <div className="w-full h-full">
        <img className="w-full h-full" src={props?.imageUrl} />
      </div>
      <div className="flex w-full justify-center items-center p-12">
        <div>
          <h2 className="text-2xl font-bold">{props?.title}</h2>
          <p>{props?.description}</p>
        </div>
      </div>
    </section>
  );
}
