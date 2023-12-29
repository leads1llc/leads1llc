import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = ({ }: LoaderFunctionArgs) => {
  return {
    hero: {
      title: "BE BETTER EVERY DAY, TRAIN LIKE A WARRIOR AND LEAD THE WAY TO EXCELLENCE.",
      button: {
        title: "EXPLORE OUR TRAINING PROGRAMS",
        link: "",
      },
      image: {
        url: "https://df6f8e1b9b.clvaw-cdnwnd.com/c733a0c8b7e4b610c4296892ad379276/200000084-c2850c2851/WhatsApp%20Image%202022-05-17%20at%209.36.53%20PM.webp?ph=df6f8e1b9b"
      }
    }
  };
};

export default function Route() {
  const { hero } = useLoaderData<typeof loader>();

  return (
    <section className="hero">
      <div className="hero-headline">
        <div>{hero.title}</div>
      </div>
      <div className="hero-image">
        <img src={hero.image.url}/>
      </div>
    </section>
  );
}
