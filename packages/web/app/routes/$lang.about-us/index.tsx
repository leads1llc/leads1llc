import { LoaderFunctionArgs } from "@remix-run/node";
import { HeroSection } from "../components/HeroSection";
import { useLoaderData } from "@remix-run/react";

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
    clientChallenges
  };
}

export default function Route() {
  const { hero, clientChallenges } = useLoaderData<typeof loader>();

  return (
    <>
      <HeroSection title={hero.title} description={hero.description} imageUrl={hero.image.url}>
        {clientChallenges.map((challenge) => {
          return (
            <div className="client-challenge">
              <img src={challenge.icon.url}/>
              <h3>{challenge.title}</h3>
            </div>
          );
        })}
      </HeroSection>
    </>
  );
}
