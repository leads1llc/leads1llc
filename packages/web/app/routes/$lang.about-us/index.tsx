import { LoaderFunctionArgs } from "@remix-run/node";
import { HeroSection } from "../../components/HeroSection";
import { useLoaderData } from "@remix-run/react";
import { TextIcon } from "./components/TextIcon";
import { SideImage } from "../../components/SideImage";
import { strapiGet, strapiResourceUrl } from "~/services/strapi";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const locale = params.lang;
  const clientChallengesRes = await strapiGet(`/api/client-challenges`, { populate: '*', locale });
  const clientChallengesJson = await clientChallengesRes.json();

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
  console.log(heroSection.image);

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
    mission: {
      title: mission.title,
      description: mission.description,
      image: {
        url: strapiResourceUrl(mission.image.data.attributes.url)
      },
      side: mission.side
    },
    vision: {
      title: vision.title,
      description: vision.description,
      image: {
        url: strapiResourceUrl(vision.image.data.attributes.url)
      },
      side: vision.side
    }
  };
}

export default function Route() {
  const { hero, clientChallenges, coreValues, vision, mission } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <HeroSection title={hero.title} description={hero.description} imageUrl={hero.image.url}>
        {clientChallenges.map((challenge) => {
          return (
            <TextIcon title={challenge.title} iconUrl={challenge.icon.url} />
          );
        })}
      </HeroSection>

      <section className="flex w-full sm:flex-row flex-col">
        {coreValues.map((coreValue) => {
          return (
          <div className="flex flex-wrap  w-full border-solid border-r bg-dark-500 border-primary-300">
            <TextIcon className="border-solid border-l border-b w-full border-t border-primary-300 justify-center" title={coreValue.title} iconUrl={coreValue.icon.url} />
          </div>
          );
        })}
      </section>


      <SideImage title={mission?.title} description={mission?.description} imageUrl={mission?.image.url!} side={mission.side} />

      <SideImage title={vision?.title} description={vision?.description} imageUrl={vision?.image.url!} side={vision.side} />

    </div>
  );
}
