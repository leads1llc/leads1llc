import { LoaderFunctionArgs } from "@remix-run/node";
import { HeroSection } from "../../components/HeroSection";
import { useLoaderData } from "@remix-run/react";
import { TextIcon } from "./components/TextIcon";
import { VisualDetails } from "../../components/VisualDetails";
import { strapiGet, strapiResourceUrl } from "~/services/strapi";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const locale = params.lang;
  const ClientChallengesRes = await strapiGet(`/api/client-challenges`, {populate: "*"});
  const ClientChallenges = await ClientChallengesRes.json();

  const clientChallenges = !ClientChallenges.data ? [] : ClientChallenges.data.map((clientChallenge) => {
    return {
      id: clientChallenge.id,
      title: clientChallenge.attributes.title,
      icon: {
        url: strapiResourceUrl(clientChallenge.attributes.icon.data.attributes.url)
      }
    }
  });


  const CoreValuesRes = await strapiGet(`/api/core-values`, {populate: "*", locale});
  const CoreValues = await CoreValuesRes.json();

  const coreValues = !CoreValues.data ? [] : CoreValues.data.map((coreValue) => {
    return {
      id: coreValue.id,
      title: coreValue.attributes.title,
      icon: {
        url: strapiResourceUrl(coreValue.attributes.icon.data.attributes.url)
      }
    }
  });


  const VisionRes = await strapiGet(`/api/vision`, {populate: '*', locale});
  const Vision = await VisionRes.json();

  const vision = !Vision.data ? null :
    {
      title: Vision.data.attributes.title,
      description: Vision.data.attributes.description,
      image: {
        url: strapiResourceUrl(Vision.data.attributes.image.data.attributes.url)
      }
    };

  const MissionRes = await strapiGet(`/api/mission`, {populate: '*', locale});
  const Mission = await MissionRes.json();

  console.log(Mission);

  const mission = !Mission.data ? null :
    {
      title: Mission.data.attributes.title,
      description: Mission.data.attributes.description,
      image: {
        url: strapiResourceUrl(Mission.data.attributes.image.data.attributes.url)
      }
    };



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
    coreValues,
    vision,
    mission
  };
}

export default function Route() {
  const { hero, clientChallenges, coreValues, vision, mission} = useLoaderData<typeof loader>();

  return (
    <div className="about-us">
      <HeroSection title={hero.title} description={hero.description} imageUrl={hero.image.url}>
        {clientChallenges.map((challenge) => {
          return (
            <TextIcon title={challenge.title} iconUrl={challenge.icon.url} />
          );
        })}
      </HeroSection>

      <section className="core-values">
        {coreValues.map((coreValue) => {
          return (
            <TextIcon title={coreValue.title} iconUrl={coreValue.icon.url} />
          );
        })}
      </section>


      <VisualDetails title={mission?.title} description={mission?.description} imageUrl={mission?.image.url!}/>

      <VisualDetails title={vision?.title} description={vision?.description} imageUrl={vision?.image.url!} style={{flexDirection: "row-reverse"}}/>

    </div>
  );
}
