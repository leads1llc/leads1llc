import { useEffect, useRef, useState } from "react";
import { GiConsoleController } from "react-icons/gi";

export type CheckboxProps = {
    required?: boolean;
    title?: string;
    isSelected?: boolean;
    onClick?: () => void;
    name?: string;
    value?: string;
};

export function Checkbox(props: CheckboxProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const isSelected = props.isSelected;

    useEffect(()=> {
        if(inputRef.current) inputRef.current.checked = true;
    }, [])

    return (
        <div
            className="flex gap-4 justify-center items-center"
            onClick={() => {

                if (inputRef.current) {
                    inputRef.current.checked = !isSelected;
                } 

                if (props.onClick) props.onClick();
            }}
        >

            <div className={`flex justify-center items-center group min-w-6 min-h-6 border-solid border border-primary-300 ${isSelected ? 'bg-primary-300' : ''}`}>
                <input name={props.name} value={props.value || String(isSelected)} ref={inputRef} required={props.required} type="checkbox" className="pointer-events-none bg-dark-500 color-dark-500 appearance-none absolute border-none " />

                {
                    isSelected && <div className="w-3 h-3 bg-dark-300"></div>
                }
            </div>

            <p>{props.title}</p>
        </div>

    );
}