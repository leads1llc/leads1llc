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
    <section className="w-full flex flex-col bg-dark-500 text-primary-200 sm:flex-row sm">
      <div className="flex flex-col gap-4 p-4 flex-start justify-center sm:p-12">
        <h1 className="text-4xl">{props.title}</h1>
        {props.description &&  <h2>{props.description}</h2> }
        {props.buttonTitle && <button className="p-4 bg-dark-500 text-primary-300 border-solid border border-primary-300 border-box hover:bg-primary-300 hover:text-dark-500 ease-in-out duration-300 hover:font-bold">{props.buttonTitle}</button>}
        {props.children}
      </div>
      <div className="flex w-full h-full justify-center items-center ">
        <img className="w-full h-full" src={props.imageUrl} />
      </div>
    </section>
  );
}
