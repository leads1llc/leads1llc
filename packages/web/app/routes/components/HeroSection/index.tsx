export type HeroSectionProps = {
  title: string;
  buttonTitle: string;
  imageUrl: string;
};

export function HeroSection({title, buttonTitle, imageUrl}: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-headline">
        <h1>{title}</h1>
        <button>{buttonTitle}</button>
      </div>
      <div className="hero-image">
        <img src={imageUrl} />
      </div>
    </section>
  );
}
