import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Contact } from "../$lang.home/sections/Contact";
import { strapiGet, strapiResourceUrl } from "~/services/strapi";
import { capitalizeFirstLetter } from "~/utils/utils";
import { contactFormAction, getContactForm } from "../$lang.home";

export const action = async ({ request }: ActionFunctionArgs) => {
    return contactFormAction(request);
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const lang: string = params.lang as string;
    const locale = lang.split('-')[1];

    const experiencePageRes = await strapiGet('/api/experience-page', {
        populate: '*',
        locale
    });

    const experiencePageJson = await experiencePageRes.json();
    const experiencePageData = experiencePageJson.data;
    const experience = {
        title: experiencePageData?.attributes?.title,
        description: experiencePageData?.attributes?.description
    };

    const experiencesRes = await strapiGet('/api/experiences', {
        populate: {
            location: "*",
            experiences: "*",
            country: {
                name: "*",
                populate: {
                    flag: {
                        fields: ['url']
                    }
                }
            },
            pictures: "*"
        },
        locale
    });


    const experiencesJson = await experiencesRes.json();
    const experiencesData = experiencesJson.data;


    let experiences: any = {};

    for (const experienceData of experiencesData) {
        const experienceAttributes = experienceData.attributes;
        const country = experienceAttributes.country.data.attributes.name;
        if (!experiences[country]) {
            experiences[country] = {
                country: country,
                flag: {
                    url: strapiResourceUrl(experienceAttributes.country.data.attributes.flag.data.attributes.url)
                },
                trainingPrograms: []
            };
        }

        experiences[country].trainingPrograms.push({
            title: experienceAttributes.title,
            description: experienceAttributes.description,
            date: experienceAttributes.date,
            location: experienceAttributes.location,
            pictures: experienceAttributes.pictures.data.map((picture) => {
                return {
                    url: strapiResourceUrl(picture.attributes.url)
                };
            })
        });
    }

    experiences = Object.values(experiences);


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

    const contactForm = await getContactForm(locale)
    const countries = contactForm.countries;

    return {
        locale,
        title: experience.title,
        description: experience.description,
        experiences,
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
                    products: trainingPrograms,
                    slug: 'Training Programs'
                },
                {
                    id: 2,
                    title: homePage.services.title,
                    products: services,
                    slug: 'Services'
                },

            ],
            submit: {
                ...contactForm.submit
            },
        },
        countries
    };
};


export default function Route() {

    const { locale, title, description, contactForm, countries, experiences } = useLoaderData<typeof loader>();

    return (
        <>

            <section className="w-full flex flex-col flex-start gap-12 px-8 py-16 border-box text-left">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <p className="font-light">{description}</p>
                </div>

                <div className="flex flex-col gap-16 md:gap-52">
                    {experiences.map((experience) => {
                        return (
                            <div className="flex flex-col gap-8">
                                <div className="flex gap-2">
                                    <img className="w-8 object-contain" src={experience.flag.url} />
                                    <h2 className="text-2xl md:text-4xl font-medium">{experience.country}</h2>
                                </div>
                                {experience.trainingPrograms.map((trainingProgram) => {
                                    const date = new Date(trainingProgram.date);
                                    const month = date.toLocaleString(locale === "es" ? "es-ES" : "en-US", { month: 'long' });
                                    const year = date.getFullYear();
                                    return (
                                        <div className="flex flex-col gap-8">
                                            <h3 className="text-2xl md:text-4xl font-black">{trainingProgram.title}</h3>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <span>{trainingProgram.location}, {experience.country}</span>
                                                    <span>{capitalizeFirstLetter(month)}, {year}</span>
                                                </div>

                                                <span className="border-solid border"></span>
                                            </div>

                                            <div className="flex flex-col gap-8">
                                                {trainingProgram.pictures.map((picture) => {
                                                    return (
                                                        <img src={picture.url} />
                                                    )
                                                })}
                                            </div>

                                            <p>{trainingProgram.description}</p>
                                        </div>
                                    );
                                })}
                            </div>)
                    })}

                </div>

            </section>


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
        </>
    );
}
