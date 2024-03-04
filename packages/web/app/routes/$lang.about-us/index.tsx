import { LoaderFunctionArgs } from "@remix-run/node";
import { HeroSection } from "../../components/HeroSection";
import { useLoaderData } from "@remix-run/react";
import { TextIcon } from "./components/TextIcon";
import { VisualDetails } from "../../components/VisualDetails";
import { strapiGet, strapiResourceUrl } from "~/services/strapi";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const locale = params.lang;
  const clientChallengesRes = await strapiGet(`/api/client-challenges`, { populate: '*', locale });
  const clientChallengesJson = await clientChallengesRes.json();
  console.log(clientChallengesJson);

  const clientChallenges = !clientChallengesJson.data ? [] : clientChallengesJson.data.map((clientChallenge) => {
    return {
      id: clientChallenge.id,
      title: clientChallenge.attributes.title,
      icon: {
        url: strapiResourceUrl(clientChallenge.attributes.icon.data.attributes.url)
      }
    }
  });


  const coreValuesRes = await strapiGet(`/api/our-values`, { populate: "*", locale });
  const coreValuesJson = await coreValuesRes.json();

  console.log(coreValuesJson);

  const coreValues = !coreValuesJson.data ? [] : coreValuesJson.data.map((coreValue) => {
    return {
      id: coreValue.id,
      title: coreValue.attributes.title,
      icon: {
        url: strapiResourceUrl(coreValue.attributes.icon.data.attributes.url)
      }
    }
  });


  const aboutUsPageRes = await strapiGet('/api/about-us-page', {
    populate: {
      heroSection: {
        populate: {
          image: {
            fields: ['url']
          }
        }
      },
      mission: {
        populate: {
          image: {
            fields: ['url']
          }
        }
      },
      vision: {
        populate: {
          image: {
            fields: ['url']
          }
        }
      }
    }, locale
  });
  
  const aboutUsPageJson = await aboutUsPageRes.json();
  const heroSection = aboutUsPageJson.data.attributes.heroSection;

  const mission = aboutUsPageJson.data.attributes.mission;
  const vision = aboutUsPageJson.data.attributes.vision;
  
  return {
    hero: {
      title: heroSection.title,
      description: heroSection.description,
      button: {
        title: "EXPLORE OUR TRAINING PROGRAMS",
        link: "",
      },
      image: {
        url: strapiResourceUrl(heroSection.image.data.attributes.url)
      }
    },
    clientChallenges,
    coreValues,
    mission:  {
      title: mission.title,
      description: mission.description,
      image: {
        url: strapiResourceUrl(mission.image.data.attributes.url)
      }
    },
    vision: {
      title: vision.title,
      description: vision.description,
      image: {
        url: strapiResourceUrl(vision.image.data.attributes.url)
      }
    }
  };
}

export default function Route() {
  const { hero, clientChallenges, coreValues, vision, mission } = useLoaderData<typeof loader>();

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


      <VisualDetails title={mission?.title} description={mission?.description} imageUrl={mission?.image.url!} />

      <VisualDetails title={vision?.title} description={vision?.description} imageUrl={vision?.image.url!} style={{ flexDirection: "row-reverse" }} />

    </div>
  );
}
