import { LoaderFunctionArgs } from "@remix-run/node";
import { HeroSection } from "../components/HeroSection";
import { useLoaderData } from "@remix-run/react";
import { TextIcon } from "./components/TextIcon";

export const loader = async ({ }: LoaderFunctionArgs) => {
  // TODO: Create a api service point to the same url
  const API_URL = `http://10.6.0.5:1337`;
  const ClientChallengesRes = await fetch(`${API_URL}/api/client-challenges?populate=*`);
  const ClientChallenges = await ClientChallengesRes.json();

  const clientChallenges = !ClientChallenges.data ? [] : ClientChallenges.data.map((clientChallenge) => {
    return {
      id: clientChallenge.id,
      title: clientChallenge.attributes.title,
      icon: {
        url: `${API_URL}${clientChallenge.attributes.icon.data.attributes.url}`
      }
    }
  });


  const CoreValuesRes = await fetch(`${API_URL}/api/core-values?populate=*`);
  const CoreValues = await CoreValuesRes.json();

  const coreValues = !CoreValues.data ? [] : CoreValues.data.map((coreValue) => {
    return {
      id: coreValue.id,
      title: coreValue.attributes.title,
      icon: {
        url: `${API_URL}${coreValue.attributes.icon.data.attributes.url}`
      }
    }
  });

  return {
    hero: {
      title: "Who we are?",
      description: "A private company that offers innovate solutions for the our client challenges related with",
      button: {
        title: "EXPLORE OUR TRAINING PROGRAMS",
        link: "",
      },
      image: {
        url: "https://df6f8e1b9b.clvaw-cdnwnd.com/c733a0c8b7e4b610c4296892ad379276/200000084-c2850c2851/WhatsApp%20Image%202022-05-17%20at%209.36.53%20PM.webp?ph=df6f8e1b9b"
      }
    },
    clientChallenges,
    coreValues
  };
}

export default function Route() {
  const { hero, clientChallenges, coreValues } = useLoaderData<typeof loader>();

  return (
    <div className="about-us">
      <HeroSection title={hero.title} description={hero.description} imageUrl={hero.image.url}>
        {clientChallenges.map((challenge) => {
          return (
            <TextIcon title={challenge.title} iconUrl={challenge.icon.url} />
          );
        })}
      </HeroSection>

      <div className="core-values">
        {coreValues.map((coreValue) => {
          return (
            <TextIcon title={coreValue.title} iconUrl={coreValue.icon.url} />
          );
        })}
      </div>

    </div>
  );
}
