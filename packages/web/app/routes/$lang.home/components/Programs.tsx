import { Link } from "@remix-run/react";
import { useState } from "react";

export type ProgramsProps = {
  programs: Array<any>;
  isOdd: boolean;
};
export function Progams({ programs, isOdd }: ProgramsProps) {
  const [programIdSelected, setProgramIdSelected] = useState<number>(programs[0].id);
  const program = programs.find((value) => value.id === programIdSelected);

  return (
    <div className="programs"
      style={{ flexDirection: isOdd ? "row-reverse" : "row" }}
    >
      <img src={program.image.url} />
      <ul>
        {programs.map((program, programKey) => {
          const isActive = programIdSelected === program.id;

          return <div key={programKey} className={`program ${isActive ? 'active' : ''}`} onClick={() => {
            setProgramIdSelected(program.id);
          }}>
            <h4>{program.title}</h4>
            {isActive ? <li>
              <p>{program.description}</p>
              <Link to="/home"><span>See more</span></Link>
            </li> : <></>}
          </div>
        })}
      </ul>
    </div>
  );
}
