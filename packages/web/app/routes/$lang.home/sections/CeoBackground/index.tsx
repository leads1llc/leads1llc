import { Section } from "~/components/Section";

export type CeoBackgroundProps = {
  ceoBackground: any;
};


export type PairTextProps = {
  leftText: string;
  rightText: string;
}

export function PairText({ leftText, rightText }: PairTextProps) {
  return (
    <div className="pair-text">
      <span className="left">{leftText}</span>
      <span className="right">{rightText}</span>
    </div>
  );
}

export function CeoBackground({ ceoBackground }: CeoBackgroundProps) {

  const honorMedals = [
    "🇺🇸 Navy and Marine Corps commendation Medal vector",
    "🇨🇴 Herido en Acción",
    "🇨🇴 Servicios Distinguidos a la Infanteria de Marina"
  ];

  const personalData = [
    { leftText: "Fullname: ", rightText: "Eduar Michaels" },
    { leftText: "Range: ", rightText: "Official" },
    { leftText: "Deparment: ", rightText: "Marine" }
  ];

  const dataItemClass = "flex flex-col gap-4";
  const dataItemListClass = "flex flex-col gap-2"

  return (
    <Section className="flex flex-col sm:flex-row gap-8" headline={{ title: ceoBackground.title, subtitle: ceoBackground.subtitle }}>
      <div className="flex w-full h-full border-solid border border-dark-500">
        <img className="w-full h-full" src="https://df6f8e1b9b.clvaw-cdnwnd.com/c733a0c8b7e4b610c4296892ad379276/200000125-70cab70cad/_NPB0764.webp?ph=df6f8e1b9b" />
      </div>
      <div className="flex w-full flex-col gap-12">
        <div className={dataItemClass}>
          <h3 className="font-bold text-xl">Personal Data</h3>
          <ul className={dataItemListClass}>
            {personalData.map((personalData) => <li>
              <PairText
                leftText={personalData.leftText}
                rightText={personalData.rightText} />
            </li>)}
          </ul>
        </div>
        <div className={dataItemClass}>
          <h3 className="font-bold text-xl ">Honor medals</h3>
          <ul className={dataItemListClass}>
            {honorMedals.map((honorMedal) => {
              return <li>
                <span>{honorMedal}</span>
              </li>
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
