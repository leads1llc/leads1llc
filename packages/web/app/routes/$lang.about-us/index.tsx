import { LoaderFunctionArgs } from "@remix-run/node";
import { HeroSection } from "../../components/HeroSection";
import { useLoaderData } from "@remix-run/react";
import { TextIcon } from "./components/TextIcon";
import { SideImage } from "../../components/SideImage";
import { strapiGet, strapiResourceUrl } from "~/services/strapi";
import { Contact } from "../$lang.home/sections/Contact";
import { callingCodesWithFlags } from "~/utils/countries";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const locale = params.lang;
  const clientChallengesRes = await strapiGet(`/api/client-challenges`, { populate: '*', locale });
  const clientChallengesJson = await clientChallengesRes.json();

  const clientChallenges = !clientChallengesJson.data ? [] : clientChallengesJson.data.map((clientChallenge) => {
    return {
      id: clientChallenge.id,
      title: clientChallenge.attributes.title,
      icon: {
        url: strapiResourceUrl(clientChallenge?.attributes?.icon?.data?.attributes?.url)
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
        url: strapiResourceUrl(coreValue?.attributes?.icon?.data?.attributes?.url)
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

  // TODO: Refactor this and pass the parameters from lang route.

  const homePageRes = await strapiGet('/api/home-page', {
    populate: {
      trainingPrograms: '*',
      heroSection: {
        populate: {
          button: '*',
          image: {
            fields: ['url']
          }
        }
      },
      trustedBy: '*',
      services: '*',
      testimonialTitle: '*',
      FAQTitle: '*'
    }, locale: locale
  });
  const homePageJson = await homePageRes.json();
  const homePageData = homePageJson.data;
  const homePage = homePageData.attributes;

  const trainingProgramsRes = await strapiGet('/api/training-programs', {
    populate: {
      fields: ['title', 'description'],
      type: {
        populate: {
          fields: ['title', 'description']
        }
      },
      cover: {
        fields: ['url']
      }
    },
    locale
  });

  const trainingProgramsData = await trainingProgramsRes.json();
  const trainingPrograms = trainingProgramsData.data.map((trainingProgram) => {
    const programType = trainingProgram.attributes.type;
    return {
      id: trainingProgram.id,
      title: trainingProgram.attributes.title,
      description: trainingProgram.attributes.description,
      type: {
        id: programType.data.id,
        title: programType.data.attributes.title
      },
      cover: {
        url: trainingProgram?.attributes?.cover?.data?.attributes?.url
      }
    }
  });

  const trainingProgramsCategory: any = {};

  for (const trainingProgram of trainingPrograms) {
    const programType = trainingProgram.type;
    const programTitle = programType.title;
    const programId = programType.id;

    if (!trainingProgramsCategory[programId]) {
      trainingProgramsCategory[programId] = {
        id: programId,
        title: programTitle,
        description: programType.description,
        programs: [],
      };
    }

    trainingProgramsCategory[programId].programs.push({
      id: trainingProgram.id,
      title: trainingProgram.title,
      description: trainingProgram.description,
      image: { url: strapiResourceUrl(trainingProgram.cover.url) }
    });
  }


  const servicesRes = await strapiGet('/api/services', {
    populate: {
      cover: {
        fields: ['url']
      }
    },
    locale: locale
  });

  const servicesJson = await servicesRes.json();

  const services = !servicesJson.data ? [] : servicesJson.data.map((service) => {
    return {
      id: service.id,
      title: service.attributes.title,
      description: service.attributes.description,
      image: { url: strapiResourceUrl(service?.attributes?.cover?.data?.attributes?.url) }
    }
  });

  const contactFormRes = await strapiGet('/api/contact-form', { populate: '*', locale });
  const contactFormJson = await contactFormRes.json();
  const contactForm = contactFormJson.data.attributes;

  const countries = await callingCodesWithFlags();


  return {
    hero: {
      title: heroSection.title,
      description: heroSection.description,
      button: {
        title: "EXPLORE OUR TRAINING PROGRAMS",
        url: "",
      },
      image: {
        url: strapiResourceUrl(heroSection?.image?.data?.attributes?.url)
      }
    },
    clientChallenges,
    coreValues,
    mission: {
      title: mission.title,
      description: mission.description,
      image: {
        url: strapiResourceUrl(mission?.image?.data?.attributes?.url)
      },
      side: mission.side
    },
    vision: {
      title: vision.title,
      description: vision.description,
      image: {
        url: strapiResourceUrl(vision?.image?.data?.attributes?.url)
      },
      side: vision.side
    },
    contactForm: {
      title: {
        ...contactForm.title
      },
      description: contactForm.description,
      fields: contactForm.fields,
      errorMessage: contactForm.errorMessage,
      successMessage: contactForm.successMessage,
      productCategories: [
        {
          id: 1,
          title: homePage.trainingPrograms.title,
          products: trainingPrograms
        },
        {
          id: 2,
          title: homePage.services.title,
          products: services
        },

      ],
      submit: {
        ...contactForm.submit
      }
    },
   countries
  };
}

export default function Route() {
  const { hero, clientChallenges, coreValues, vision, mission , contactForm, countries} = useLoaderData<typeof loader>();

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
            <TextIcon className="py-2 border-solid border-l border-b w-full border-t border-primary-300 justify-center" title={coreValue.title} iconUrl={coreValue.icon.url} />
          </div>
          );
        })}
      </section>


      <SideImage title={mission?.title} description={mission?.description} imageUrl={mission?.image.url!} side={mission.side} />

      <SideImage title={vision?.title} description={vision?.description} imageUrl={vision?.image.url!} side={vision.side} />

      <Contact
        submit={contactForm.submit}
        title={contactForm.title}
        productCategories={contactForm.productCategories}
        fields={contactForm.fields}
        description={contactForm.description}
        countries={countries}
        errorMessage={contactForm.errorMessage}
        successMessage={contactForm.successMessage}
      />
    </div>
  );
}
