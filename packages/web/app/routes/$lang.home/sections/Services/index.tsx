import { Section } from "~/components/Section";

export type ServiceProps = {
  services: any;
};

export function Services({ services }: ServiceProps) {
  return (
    <Section className="flex w-full flex-col sm:flex-row gap-8 justify-center items-center sm:items-start" headline={{ title: services.title, subtitle: services.subtitle }}>
      {services.services.map((service,key) => {
        return <div key={key} className="h-full w-72 group cursor-pointer overflow-hidden border-solid border border-dark-500" onClick={() => {
          // TODO: Implement send to service page.
        }}>
          <img className="w-72 h-56 object-cover" src={service.image.url} />
          <div className="flex h-full p-2 group-hover:bg-primary-300">
            <h3>{service.title}</h3>
          </div>
        </div>;
      })}
    </Section>

  );
}
