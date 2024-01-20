export type TextIconProps = {
  title: string;
  iconUrl: string;
};

export function TextIcon(props: TextIconProps) {
  return (
    <div className="text-icon">
      <img src={props.iconUrl} />
      <h3>{props.title}</h3>
    </div>

  );
}
