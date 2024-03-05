export type TextIconProps = {
  title: string;
  iconUrl: string;
};

export function TextIcon(props: TextIconProps) {
  return (
    <div className="flex items-center gap-8">
      <img className="w-16 h-16" src={props.iconUrl} />
      <h3 className="text-primary-300">{props.title}</h3>
    </div>

  );
}
