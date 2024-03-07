import { Section } from "~/components/Section";

export type TestimoniesProps = {
  title: {
    title: string;
    subtitole: string;
  };
  testimonies: [{
    quote: string;
    author: {
      photo: { url: string };
      socialMedia: string;
      name: string;
    };
    company: {
      name: string;
      logo: { url: string; };
    }
  }]
};

export function Testimonies(props: TestimoniesProps) {


  return (
    <Section className="w-full bg-light-500 overflow-hidden" headline={props.title}>
      <div className="flex flex-col sm:flex-row gap-8">

        {props.testimonies.map((testimony) => {
          return (
            <div className="flex flex-col gap-4 border-solid border p-4">
              <div className="flex  flex-start items-center gap-8">
                <img className="w-20 h-20 rounded-full object-cover border-solid border border-dark-500" src={testimony.company.logo.url} />
                <h4 className="font-light">{testimony.company.name}</h4>
              </div>

              <blockquote className="font-bold">{testimony.quote}</blockquote>

              <div className="flex items-center gap-8">
                <img className="w-16 h-16 rounded-full object-cover" src={testimony.author.photo.url} />
                <div>
                  <h4 className="font-light">{testimony.author.name}</h4>
                  <span className="font-light text-sm">{testimony.author.socialMedia}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </Section>
  );
}
