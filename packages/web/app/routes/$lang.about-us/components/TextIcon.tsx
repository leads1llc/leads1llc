import { concatClassNames } from "~/utils/utils";

export type TextIconProps = {
  title: string;
  iconUrl: string;
  className: string;
};

export function TextIcon(props: TextIconProps) {
  return (
    <div className={concatClassNames(`flex items-center gap-8`, props.className)}>
      <img className="w-16 h-16" src={props.iconUrl} />
      <h3 className="text-primary-300">{props.title}</h3>
    </div>
  );
}
