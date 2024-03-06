import { useState } from "react";
import { Section } from "~/components/Section";

export type ContactProps = {
  title: {
    title: string;
    subtitle: string;
  },
  description: string,
  submit: {
    title: string;
    url: string;
  },
  fields: [{
    __component: string;
    title?: string;
    message?: string;
    required: boolean;
    placeholder: string;
    type?: string;
  }],
  productCategories: [{
    id: string;
    title: string;
    products: [{
      id: number;
      title: string;
    }]
  }],
};

export function Contact(props: ContactProps) {
  const [productOptionIndex, setProductOptionIndex] = useState<number>(0);


  const formItemClassName = 'flex w-full flex-col gap-8';

  return (
    <Section className="flex flex-col gap-4 w-full bg-dark-500 text-primary-300 " headlineClassName="border-primary-300" headline={props.title}>

      <span>{props.description}</span>

      <div className="flex gap-4">
        {props.productCategories.map((product, index) => {
          const isSelected = product.id === props.productCategories[productOptionIndex].id;
          return (<div 
          className="flex gap-2 justify-center items-center"
          onClick={() => {
            setProductOptionIndex(index);
          }}
          >
            <div className={`flex justify-center items-center group w-6 h-6 border-solid border border-primary-300 ${ isSelected ? 'bg-primary-300': ''}`}>
              {
                isSelected && <div className="w-3 h-3 bg-dark-300"></div>
              }
            </div>

            <span>{product.title}</span>
          </div>)
        })}
      </div>

      <div className="flex flex-col gap-2">
        <span>{props.productCategories[productOptionIndex]?.title}</span>
        <select className="p-2 bg-transparent border-solid border borde-primary-300 bg-primary-300">
          {props.productCategories[productOptionIndex]?.products.map((option) => (<option>{option.title}</option>))}
        </select>
      </div>


      <form className="flex flex-col gap-12 border-box">

        {props.fields.map((field) => {

          if (field.__component === "input.text-input") {
            if (field.type === "phone") {
              return (
                <div className="flex flex-col gap-4">
                  <label>{field.title}</label>
                  <div className="flex gap-4">
                    
                    <select className=" p-2 text-primary-300 bg-transparent border-solid border">
                      <option value="+57">🇨🇴 +57 </option>
                    </select>

                    <input required={field.required} className="w-full p-2 border-none bg-dark-300 text-primary-300" placeholder={field.placeholder} />

                  </div>

                </div>
              );
            }

            return (
              <div className={formItemClassName}>
                <label className="">{field.title}</label>
                <input required={field.required} className="p-2 border-none text-primary-300 bg-dark-300" placeholder={field.placeholder} />
              </div>);
          }

          if (field.__component === "input.checkbox") {
            return (
              <div className="flex gap-4">
                <input required={field.required} type="checkbox" className="p-2 border-none bg-dark-300 bg-primary-300" placeholder={field.placeholder} />
                <label className="">{field.message}</label>
              </div>
            );
          }
        })}

        <div className="w-full">
          <input className="w-full text-dark-500 bg-primary-300 p-4 border-none" type="submit" value={props.submit.title} />
        </div>

      </form>

    </Section>
  );
}
