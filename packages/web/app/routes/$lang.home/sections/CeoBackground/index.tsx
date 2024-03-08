import { Section } from "~/components/Section";
import { strapiResourceUrl } from "~/services/strapi";

export type CeoBackgroundProps = {
  title: {
    title: string;
    subtitle: string;
  };
  info: [
    {
      title: string;
      pairText?: [PairTextProps],
      iconText?: [IconTextProps]
    }
  ];
  image: {
    url: string;
  }
};

export type IconTextProps = {
  title: string;
  icon: {url: string},
};

export type PairTextProps = {
  left: string;
  right: string;
}

export function PairText(props: PairTextProps) {
  return (
    <div className="flex gap-2">
      <span className="left text-xl font-thin">{props.left}</span>
      <span className="right text-2xl font-bold">{props.right}</span>
    </div>
  );
}

export function CeoBackground(props: CeoBackgroundProps) {
  const dataItemClass = "flex flex-col gap-4";
  const dataItemListClass = "flex flex-col gap-4"

  return (
    <Section className="w-full flex flex-col sm:flex-row gap-8 bg-primary-300" headline={props.title}>
      <div className="flex w-full h-full border-solid border border-dark-500">
        <img className="w-full h-full" src={props.image.url} />
      </div>

      <div className="flex w-full flex-col gap-12">
        {props.info?.map((info, infoKey) => {
          return (
            <div key={infoKey} className={dataItemClass}>
              <h3 className="font-bold text-2xl text-dark-100">{info.title}</h3>
              <ul className={dataItemListClass}>
                {info?.pairText?.map((pairText, pairTextkey) => {
                  return (
                    <li key={pairTextkey}>
                      <PairText
                        left={pairText.left}
                        right={pairText.right} />
                    </li>
                  );
                })}

                {info?.iconText?.map((iconText, iconTextKey) => {
                  return(
                    <li className="flex gap-2">
                      <img className="w-8 h-6 object-content" src={ strapiResourceUrl(iconText?.icon?.data?.attributes.url)}/>
                      <span>{iconText.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

    </Section>
  );
}
