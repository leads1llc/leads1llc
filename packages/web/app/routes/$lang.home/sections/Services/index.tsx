import { Section } from "~/routes/components/Section";

export type ServiceProps = {
  services: any;
};

export function Services({ services }: ServiceProps) {
  return (
    <Section className="services" headline={{ title: services.title, description: services.description }}>
      {services.services.map((service) => {
        return <div className="service" onClick={() => {
          // TODO: Implement send to service page.
        }}>
          <img src={service.image.url} />
          <div className="service-title">
            <h3>{service.title}</h3>
          </div>
        </div>;
      })}
    </Section>

  );
}
