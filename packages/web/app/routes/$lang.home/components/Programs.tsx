import { Link } from "@remix-run/react";
import { useRef, useState } from "react";
import { FaArrowDown, FaChevronDown } from "react-icons/fa6";
import { concatClassNames } from "~/utils/utils";
import { animated, useSpring } from "@react-spring/web";

export type ProgramsProps = {
  programs: Array<any>;
  isOdd: boolean;
  className: string;
  onClick: (id: number) => void;
};
export function Progams({ programs, isOdd, className, onClick }: ProgramsProps) {
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
          const spring = useSpring({ from: { rotate: isActive ? -90 : 0 }, to: { rotate: isActive ? 0 : -90 } });

          return <li>
            {isActive ?
              <img className="flex w-full border-solid border border-dark-500 sm:hidden" src={program.image.url} /> : <></>
            }

            <div key={programKey} className={concatClassNames(
              `flex flex-col gap-4 cursor-pointer p-4 border-solid border border-dark-500  hover:bg-primary-300 duration-300 ease `,
              'active:bg-primary-300 active:cursor-default',
              isActive ? 'active' : ''
            )} onClick={() => {
              setProgramIdSelected(program.id);
            }}>
              <div className="flex w-full justify-between duration-300 ease-in-out">
                <h4 className="font-bold">{program.title}</h4>
                <animated.div className='w-6 h-6 flex justify-center items-center' style={{ ...spring }}>
                  <FaChevronDown />
                </animated.div>

              </div>

              
                {isActive ? <div>
                  <p>{program.description}</p>
                  <span className="cursor-pointer hover:border-solid hover:border-b" onClick={() => onClick(program.id)}>See more</span>
                </div>
                  : <></>}
            </div>
          </li>
        })}
      </ul>
    </div>
  );
}
