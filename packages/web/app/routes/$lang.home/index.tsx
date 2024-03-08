import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { Progams } from "./components/Programs";
import { Section } from "../../components/Section";
import { Services } from "./sections/Services";
import { CeoBackground } from "./sections/CeoBackground";
import { Testimonies } from "./sections/Testimonies";
import { Contact } from "./sections/Contact";
import { HeroSection } from "../../components/HeroSection";
import { strapiGet, strapiPost, strapiResourceUrl } from "~/services/strapi";
import { callingCodesWithFlags } from "~/utils/countries";
import { TrustedCompaniesSection } from "./sections/TrustedCompanies";

const mailRegex = /^(?!.*[Ã±Ã‘ñ])(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = String(formData.get('email'));

  const data: any = {
    errors: {}
  };

  if (!email.match(mailRegex)) {
    data.errors.email = true;
  }

  if (Object.keys(data.errors).length > 0) {
    return json(data);
  }

  try {
    await strapiPost('/api/clients', Object.fromEntries(formData));
    data.success = true;
    return json(data);
  } catch (e) {
    data.error = true;
    return json(data);
  }
}

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
        url: strapiResourceUrl(trustedBy?.attributes?.logo?.data?.attributes?.url)
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

  const trainingProgramsData = await trainingProgramsRes.json();
  const trainingPrograms = trainingProgramsData.data.map((trainingProgram) => {
    const programType = trainingProgram.attributes.type;
    return {
      id: trainingProgram.id,
      title: trainingProgram.attributes.title,
      description: trainingProgram.attributes.description,
      type: {
        id: programType.data.id,
        title: programType.data.attributes.title,
        description: programType.data.attributes.description
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

  const ceoBackgroundRes = await strapiGet('/api/ceo-background', {
    populate: {
      title: '*',
      description: '*',
      picture: {
        fields: ['url']
      },
      info: {
        populate: {
          pairText: '*',
          iconText: {
            populate: {
              icon: {
                fields: ['url']
              }
            }
          }
        }
      }
    }, locale
  });
  const ceoBackgroundJson = await ceoBackgroundRes.json();
  const ceoBackground = ceoBackgroundJson.data.attributes;

  const contactFormRes = await strapiGet('/api/contact-form', { populate: '*', locale });
  const contactFormJson = await contactFormRes.json();
  const contactForm = contactFormJson.data.attributes;

  const testimoniesRes = await strapiGet('/api/testimony-section', {
    populate: {
      title: '*',
      testimonies: {
        populate: {
          author: {
            populate: {
              photo: { fields: ['url'] }
            }
          },
          company: {
            populate: {
              logo: { fields: ['url'] }
            }
          },
        }
      }

    }, locale
  });
  const testimoniesJson = await testimoniesRes.json();
  const testimoniesData = testimoniesJson?.data?.attributes;

  const testimonies = testimoniesData?.testimonies?.map((testimony) => {
    return {
      quote: testimony.quote,
      author: {
        name: testimony.author.name,
        photo: { url: strapiResourceUrl(testimony?.author?.photo?.data?.attributes?.url) },
        socialMedia: testimony.author.socialMedia
      },
      company: {
        name: testimony.company.name,
        logo: { url: strapiResourceUrl(testimony?.company?.logo?.data?.attributes?.url) }
      }
    };

  });

  const countries = await callingCodesWithFlags();

  return {
    countries: countries,
    locale: locale,
    hero: {
      title: homePage.heroSection.description,
      button: {
        title: homePage.heroSection.button[0].title,
        url: homePage.heroSection.button[0].url,
      },
      image: {
        url: strapiResourceUrl(homePage?.heroSection?.image?.data?.attributes?.url)
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
      title: {
        title: ceoBackground.title.title,
        subtitle: ceoBackground.title.subtitle,
      },
      image: {
        url: strapiResourceUrl(ceoBackground?.picture?.data?.attributes?.url)
      },
      info: ceoBackground.info,
    },
    testimonies: {
      title: testimoniesData?.title,
      testimonies: testimonies
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
    faq: {
      title: homePage.FAQTitle.title,
      subtitle: homePage.FAQTitle.subtitle
    }
  };
};

export default function Route() {
  const { hero, trustedBy, trainingPrograms, services, ceoBackground, testimonies, contactForm, faq, locale, countries } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <>

      <HeroSection title={hero.title} button={hero.button} imageUrl={hero.image.url} />

      <TrustedCompaniesSection companies={trustedBy.companies} title={trustedBy.title}></TrustedCompaniesSection>

      <Section id="training-programs" headline={{ title: trainingPrograms.title, subtitle: trainingPrograms.subtitle }}>

        <ul className="flex flex-col w-full gap-32">
          {trainingPrograms.categories.map((category, categoryIndex) => {
            const isOdd = categoryIndex % 2 !== 0;
            return <li key={categoryIndex} className="flex overflow-hidden w-full flex-col gap-8"  >
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

      <CeoBackground title={ceoBackground.title} info={ceoBackground.info} image={ceoBackground.image} />

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

      {testimonies?.testimonies?.length > 0 && 
        <Testimonies testimonies={testimonies.testimonies} title={testimonies.title} />
      }
      {/*
 

 <Section className="w-full" headline={{ title: faq.title, subtitle: faq.subtitle }}>
   <span>Not implemented yet!</span>
 </Section>
        */ }
    </>
  );
}
