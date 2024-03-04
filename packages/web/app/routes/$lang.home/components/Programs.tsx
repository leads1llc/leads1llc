import { Link } from "@remix-run/react";
import { useState } from "react";

export type ProgramsProps = {
  programs: Array<any>;
  isOdd: boolean;
  className: string;
  onClick: (id: number) => void;
};
export function Progams({ programs, isOdd, className, onClick}: ProgramsProps) {
  const [programIdSelected, setProgramIdSelected] = useState<number>(programs[0].id);
  const program = programs.find((value) => value.id === programIdSelected);

  return (
    <div className={className}
      style={{ flexDirection: isOdd ? "row-reverse" : "row" }}
    >
      <img className="hidden sm:block border-solid border border-dark-500" src={program.image.url} />

      <ul className="flex flex-col">
        {programs.map((program, programKey) => {
          const isActive = programIdSelected === program.id;

          return <li>
            {isActive ?
              <img className="flex w-full border-solid border border-dark-500 sm:hidden" src={program.image.url} /> : <></>
            }

            <div key={programKey} className={`flex flex-col p-4 gap-4 border-solid border border-dark-500 active:bg-primary-300 hover:bg-primary-300 duration-300 ease ${isActive ? 'active' : ''}`} onClick={() => {
              setProgramIdSelected(program.id);
            }}>
              <h4 className="font-bold">{program.title}</h4>
              {isActive ? <>
                <p>{program.description}</p>
                <p className="py-2 cursor-pointer" onClick={() => onClick(program.id)}>See more</p>
              </>
                : <></>}
            </div>
          </li>
        })}
      </ul>
    </div>
  );
}
