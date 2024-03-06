import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { Progams } from "./components/Programs";
import { Section } from "../../components/Section";
import { Services } from "./sections/Services";
import { CeoBackground } from "./sections/CeoBackground";
import { Testimonies } from "./sections/Testimonies";
import { Contact } from "./sections/Contact";
import { HeroSection } from "../../components/HeroSection";
import { strapiGet, strapiResourceUrl } from "~/services/strapi";
import { BiDownArrow } from "react-icons/bi";
import { FaArrowDown, FaArrowsUpDown } from "react-icons/fa6";
import { TrustedCompaniesSection } from "./sections/TrustedCompanies";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const locale = params.lang;

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
      ceoBackground: {
        populate: {
          title: '*',
          experience: {
            populate: {
              icon: {
                fields: ['url']
              }
            }
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

  const trustedCompaniesRes = await strapiGet(`/api/trusted-companies`, {
    populate: {
      fields: ['title', 'pageUrl'],
      logo: {
        fields: ['url']
      }
    }, locale: locale
  });
  const trustedCompanies = await trustedCompaniesRes.json();

  const companies = !trustedCompanies.data ? [] : trustedCompanies.data.map((trustedBy) => {
    return {
      id: trustedBy.id,
      title: trustedBy.attributes.title,
      logo: {
        url: strapiResourceUrl(trustedBy.attributes.logo.data.attributes.url)
      }
    }
  });

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

  const trainingPrograms = await trainingProgramsRes.json();

  const trainingProgramsCategory: any = {};

  for (const trainingProgram of trainingPrograms.data) {
    const programType = trainingProgram.attributes.type;
    const programTitle = programType.data.attributes.title;
    const programId = programType.data.id;

    if (!trainingProgramsCategory[programId]) {
      trainingProgramsCategory[programId] = {
        id: programId,
        title: programTitle,
        description: programType.data.attributes.description,
        programs: [],
      };
    }

    trainingProgramsCategory[programId].programs.push({
      id: trainingProgram.id,
      title: trainingProgram.attributes.title,
      description: trainingProgram.attributes.description,
      image: { url: strapiResourceUrl(trainingProgram.attributes.cover.data.attributes.url) }
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
      image: { url: strapiResourceUrl(service.attributes.cover.data.attributes.url) }
    }
  });

  const contactFormRes = await strapiGet('/api/contact-form', { populate: '*', locale });
  const contactFormJson = await contactFormRes.json();
  const contactForm = contactFormJson.data.attributes;

  return {
    locale: locale,
    hero: {
      title: homePage.heroSection.description,
      button: {
        title: homePage.heroSection.button[0].title,
        link: homePage.heroSection.button[0].url,
      },
      image: {
        url: strapiResourceUrl(homePage.heroSection.image.data.attributes.url)
      }
    },
    trustedBy: {
      title: homePage.trustedBy,
      companies
    },
    trainingPrograms: {
      title: homePage.trainingPrograms.title,
      subtitle: homePage.trainingPrograms.subtitle,
      categories: Object.values(trainingProgramsCategory)
    },
    services: {
      title: homePage.services.title,
      subtitle: homePage.services.subtitle,
      services: services
    },
    ceoBackground: {
      title: homePage.ceoBackground.title.title,
      subtitle: homePage.ceoBackground.title.subtitle,
    },
    testimonies: {
      title: homePage.testimonialTitle.title,
      subtitle: homePage.testimonialTitle.subtitle,
      testimonies: [...Array(3).keys()].map(() => ({
        company: {
          site: "",
          name: "Armada de colombia",
          logo: { url: "http://localhost:1337/uploads/armada_colombia_b7f756733f.png" }
        },
        quote: "The best company in the world",
        author: {
          photo: { url: "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" },
          name: "Mark Antony",
          socialMedia: "Facebook"
        }
      }))
    },
    contactForm: {
      title: {
        ...contactForm.title
      },
      fields: contactForm.fields,
      submit: {
        ...contactForm.submit
      }
    },
    faq: {
      title: homePage.FAQTitle.title,
      subtitle: homePage.FAQTitle.subtitle
    }
  };
};

export default function Route() {
  const { hero, trustedBy, trainingPrograms, services, ceoBackground, testimonies, contactForm, faq, locale } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  return (
    <>

      <HeroSection title={hero.title} buttonTitle={hero.button.title} imageUrl={hero.image.url} />

      <TrustedCompaniesSection companies={trustedBy.companies} title={trustedBy.title}></TrustedCompaniesSection>

      <Section headline={{ title: trainingPrograms.title, subtitle: trainingPrograms.subtitle }}>

        <ul className="flex flex-col gap-32">
          {trainingPrograms.categories.map((category, categoryIndex) => {
            const isOdd = categoryIndex % 2 !== 0;
            return <li key={categoryIndex} className="flex flex-col gap-8"  >
              <div
                className="flex flex-col gap-2"
                style={{ textAlign: isOdd ? "right" : "left" }}
              >
                <h3 className="font-bold text-2xl">{category.title}</h3>
                <p className="text-md font-light">{category.description}</p>
              </div>

              <Progams onClick={(id) => {
                const url = `/${locale}/training-program/${id}`;
                navigate(url);
              }} className="flex gap-12" programs={category.programs} isOdd={isOdd} />

            </li>;
          })}
        </ul>
      </Section>

      <Services services={services} />

      <CeoBackground ceoBackground={ceoBackground} />

      <Contact submit={contactForm.submit} title={contactForm.title} fields={contactForm.fields} />

      <Testimonies testimonies={testimonies} />

      <Section className="w-full" headline={{ title: faq.title, subtitle: faq.subtitle }}>
        <span>Not implemented yet!</span>
      </Section>

    </>
  );
}
