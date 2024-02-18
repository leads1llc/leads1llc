import { Section } from "~/components/Section";

export type TestimoniesProps = {
  testimonies: any;
};

export function Testimonies({ testimonies }: TestimoniesProps) {
  return (
    <Section className="testimonies" headline={{ title: testimonies.title, description: testimonies.description }}>
      <ul>
        {testimonies.testimonies.map((testimony) => {
          return (
            <li>
              <div className="testimony">
                <div className="company">
                  <img src={testimony.company.logo.url} />
                  <h4>{testimony.company.name}</h4>
                </div>

                <blockquote>{testimony.quote}</blockquote>

                <div className="social-media">
                  <img src={testimony.author.photo.url}/>
                  <div>
                    <h4>{testimony.author.name}</h4>
                    <span>{testimony.author.socialMedia}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
