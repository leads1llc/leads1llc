import { useState } from "react";
import { Section } from "~/components/Section";

export type ContactProps = {
  title: {
    title: string;
    subtitle: string;
  },
  submit: {
    title: string;
    url: string;
  },
  products?: any;
  productOptions?: any;
  fields: [{
    __component: string;
    title?: string;
    placeholder?: string;
    message?: string;
    type?: string;
    required: boolean;
  }];
};

export function Contact({ title, fields, submit }: ContactProps) {
  const [productOptionIndex, setProductOptionIndex] = useState<number>(0);
  const products = [
    {
      title: "Training programs",
      slug: "training_programs"
    },
    {
      title: "Services",
      slug: "services"
    }
  ];

  const productOptions = [
    {
      title: "Staff Functions Training for Decision Making",
      slug: "services"
    }
  ];

  const formParentClassName = 'flex gap-8 w-full';
  const formItemClassName = 'flex w-full flex-col gap-8';

  return (
    <Section className="flex flex-col gap-4 w-full bg-dark-500 text-primary-300 " headlineClassName="border-primary-300" headline={{ title: title.title, subtitle: title.description }}>

      <span>Complete the following form</span>

      <div className="flex gap-4">
        {products.map((product, index) => {
          return (<div className="flex gap-2 justify-center items-center">
            <div className={`flex justify-center items-center group w-4 h-4 border-solid border border-primary-300 `}>
              <div className={`active:w-8 active:h-8 ${index == 0 ? 'active' : ''}`}></div>
            </div>
            <span>{product.title}</span>
          </div>)
        })}
      </div>

      <div className="product-options">
        <span>{products[productOptionIndex].title}</span>
        <select>
          {productOptions.map((option) => (<option>{option.title}</option>))}
        </select>
      </div>


      <form className="flex flex-col gap-12 border-box">

        {fields.map((field) => {

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
          <input className="w-full text-dark-500 bg-primary-300 p-4 border-none" type="submit" value={submit.title} />
        </div>

      </form>

    </Section>
  );
}
