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
    },
    trustedBy: {
      title: "Trusted by our clients and partners",
      companies: [
        { title: "Armada de Colombia", site: "https://www.armada.mil.co/",logo: { url: "https://www.reservanavalcolombia.co/wp-content/uploads/2023/02/escudo-horizontal.png" } },
      ]

    }
  };
};

export default function Route() {
  const { hero, trustedBy } = useLoaderData<typeof loader>();

  return (
    <>
      <section className="hero">
        <div className="hero-headline">
          <h1>{hero.title}</h1>
          <button>{hero.button.title}</button>
        </div>
        <div className="hero-image">
          <img src={hero.image.url} />
        </div>
      </section>

      <section className="trusted-by">
        <h2>{trustedBy.title}</h2>
        <ul className="companies">
          {trustedBy.companies.map((company) => {
            return (
              <li><Link to={company.site} target="_blank">
                <img src={company.logo.url}/>
              </Link></li>
            );
          })}
        </ul>
      </section>

    </>
  );
}
