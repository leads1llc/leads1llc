import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Progams } from "./components/Programs";
import { Section } from "../components/Section";

export const loader = async ({ }: LoaderFunctionArgs) => {

  const API_URL = `http://localhost:1337`;
  const trustedBiesRes = await fetch(`${API_URL}/api/trusted-bies?populate=*`);
  const trustedBies = await trustedBiesRes.json();

  const companies = trustedBies.data.map((trustedBy) => {
    return {
      id: trustedBy.id,
      title: trustedBy.attributes.companyName,
      logo: {
        url: `${API_URL}${trustedBy.attributes.companyLogo.data.attributes.url}`
      }
    }
  });

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
      companies
    },
    trainingPrograms: {
      title: "Training Programs",
      description: "You should choose one of the following",
      categories: [
        {
          title: "Training for Managerial Staff Teams",
          description: "Strengthen the skills, abilities, and attitudes of your organization's managers and staff members with the aim of enhancing business performance and profitability.",
          programs: [
            {
              id: 1,
              title: "Staff Functions Training for Decision Making",
              image: {
                url: "https://df6f8e1b9b.clvaw-cdnwnd.com/c733a0c8b7e4b610c4296892ad379276/200000084-c2850c2851/WhatsApp%20Image%202022-05-17%20at%209.36.53%20PM.webp?ph=df6f8e1b9b"
              },
              description: "Identify the key functions and responsibilities of your Staff, using the methodology of the planning process and contributing to effective decision-making and the conduct of successful operations.",
            },
            { id: 2, title: "Risk Management Training", image: { url: "" }, description: "" },
          ]
        },
        {
          title: "Training for Managerial Staff Teams",
          description: "Strengthen the skills, abilities, and attitudes of your organization's managers and staff members with the aim of enhancing business performance and profitability.",
          programs: [
            {
              id: 1,
              title: "Staff Functions Training for Decision Making",
              image: {
                url: "https://df6f8e1b9b.clvaw-cdnwnd.com/c733a0c8b7e4b610c4296892ad379276/200000084-c2850c2851/WhatsApp%20Image%202022-05-17%20at%209.36.53%20PM.webp?ph=df6f8e1b9b"
              },
              description: "Identify the key functions and responsibilities of your Staff, using the methodology of the planning process and contributing to effective decision-making and the conduct of successful operations.",
            },
            { id: 2, title: "Risk Management Training", image: { url: "" }, description: "" },
          ]
        },
        {
          title: "Training for Managerial Staff Teams",
          description: "Strengthen the skills, abilities, and attitudes of your organization's managers and staff members with the aim of enhancing business performance and profitability.",
          programs: [
            {
              id: 1,
              title: "Staff Functions Training for Decision Making",
              image: {
                url: "https://df6f8e1b9b.clvaw-cdnwnd.com/c733a0c8b7e4b610c4296892ad379276/200000084-c2850c2851/WhatsApp%20Image%202022-05-17%20at%209.36.53%20PM.webp?ph=df6f8e1b9b"
              },
              description: "Identify the key functions and responsibilities of your Staff, using the methodology of the planning process and contributing to effective decision-making and the conduct of successful operations.",
            },
            { id: 2, title: "Risk Management Training", image: { url: "" }, description: "" },
          ]
        }
      ],
    },
    services: {
      title: "Services",
      description: "We also provide specific services"
    },
    ceoBackground: {
      title: "Ceo Background",
      description: "Train with the best"
    },
    testimonies: {
      title: "Here’s what people have to say about us",
      description: "Our clients and partners help us to grow"
    },
    form: {
      title: "You will be a better leadership",
      description: "Improve your skill today",
    },
    faq: {
      title: "Frequently Asked Questions",
      description: "Common community questions"
    }
  };
};

export default function Route() {
  const { hero, trustedBy, trainingPrograms, services, ceoBackground, testimonies, form, faq} = useLoaderData<typeof loader>();


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
                <img src={company.logo.url} />
              </Link></li>
            );
          })}
        </ul>
      </section>

      <Section headline={{ title: "Training Programs", description: "You should choose one of the following" }}>

        <ul className="categories">
          {trainingPrograms.categories.map((category, categoryIndex) => {
            const isOdd = categoryIndex % 2 !== 0;
            return <li key={categoryIndex} className="category"  >
              <div
                style={{ textAlign: isOdd ? "right" : "left" }}
              >
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>

              <Progams programs={category.programs} isOdd={isOdd} />

            </li>;
          })}
        </ul>
      </Section>

      <Section headline={{ title: services.title, description: services.description }}>
        <span>Not implemented yet!</span>
      </Section>

      <Section headline={{ title: ceoBackground.title, description: ceoBackground.description }}>
        <span>Not implemented yet!</span>
      </Section>

      <Section headline={{ title: testimonies.title, description: testimonies.description }}>
        <span>Not implemented yet!</span>
      </Section>

      <Section headline={{ title: form.title, description: form.description }}>
        <span>Not implemented yet!</span>
      </Section>

      <Section headline={{ title: faq.title, description: faq.description }}>
        <span>Not implemented yet!</span>
      </Section>

    </>
  );
}
