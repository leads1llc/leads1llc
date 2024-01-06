import { Section } from "~/routes/components/Section";

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

  return (
    <Section className="ceo-background" headline={{ title: ceoBackground.title, description: ceoBackground.description }}>
      <div className="photo">
        <img src="https://df6f8e1b9b.clvaw-cdnwnd.com/c733a0c8b7e4b610c4296892ad379276/200000125-70cab70cad/_NPB0764.webp?ph=df6f8e1b9b" />
      </div>
      <div className="data">
        <div className="data-item">
          <h3>Personal Data</h3>
          <ul>
            {personalData.map((personalData) => <li>
              <PairText
                leftText={personalData.leftText}
                rightText={personalData.rightText} />
            </li>)}
          </ul>
        </div>
        <div className="data-item">
          <h3>Honor medals</h3>
          <ul>
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
