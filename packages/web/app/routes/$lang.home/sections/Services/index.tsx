import { Section } from "~/components/Section";

export type ServiceProps = {
  services: any;
};

export function Services({ services }: ServiceProps) {
  return (
    <Section className="w-full" headline={{ title: services.title, subtitle: services.subtitle }}>
      {services.services.map((service) => {
        return <div className="w-48 group flex flex-col border-solid border border-dark-500" onClick={() => {
          // TODO: Implement send to service page.
        }}>
          <img className="w-48 h-56 object-cover" src={service.image.url} />
          <div className="p-2 group-hover:bg-primary-300">
            <h3 className="">{service.title}</h3>
          </div>
        </div>;
      })}
    </Section>

  );
}
