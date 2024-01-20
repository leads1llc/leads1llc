import React, { Children } from "react";

export type HeroSectionProps = {
  title: string;
  description?: string;
  buttonTitle?: string;
  imageUrl: string;
  children?: React.ReactNode;
};

export function HeroSection(props : HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-headline">
        <h1>{props.title}</h1>
        {props.description &&  <h2>{props.description}</h2> }
        {props.buttonTitle && <button>{props.buttonTitle}</button>}
        {props.children}
      </div>
      <div className="hero-image">
        <img src={props.imageUrl} />
      </div>
    </section>
  );
}
