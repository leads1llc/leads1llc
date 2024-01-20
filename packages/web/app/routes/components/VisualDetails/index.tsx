import { CSSProperties } from "react";

export type VisualDetailsProps = {
  title: string;
  description: string;
  imageUrl: string;
  style?: CSSProperties;
};

export function VisualDetails(props: VisualDetailsProps) {
  return (
    <section className="visual-details" style={props.style}>
      <div className="image">
        <img src={props?.imageUrl} />
      </div>
      <div className="content">
        <div>
          <h2>{props?.title}</h2>
          <p>{props?.description}</p>
        </div>
      </div>
    </section>
  );
}
