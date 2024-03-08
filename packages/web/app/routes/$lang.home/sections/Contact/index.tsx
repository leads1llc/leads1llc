import { useActionData, useFetcher, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Checkbox } from "~/components/Core/Checkbox";
import { Section } from "~/components/Section";

export type ContactProps = {
  countries: [{ flag: string, callingCode: string }];
  title: {
    title: string;
    subtitle: string;
  },
  description: string,
  successMessage: string,
  errorMessage: string,
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
    name: string;
    errorMessage?: string;
  }],
  productCategories: [{
    id: number;
    title: string;
    products: [{
      id: number;
      title: string;
    }],
    slug: string;
  }],
};



export function Contact(props: ContactProps) {
  const [productOptionIndex, setProductOptionIndex] = useState<number>(0);
  const [agree, setAgree] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetcher = useFetcher();
  const isSent = fetcher?.data?.success;
  const isError = fetcher?.data?.error;
  const formItemClassName = 'flex w-full flex-col gap-4';

  return (
    <Section id="train-with-us" className="flex flex-col gap-4 w-full bg-dark-500 text-primary-300 " headlineClassName="border-primary-300" headline={props.title}>
      <fetcher.Form method="POST" className="flex flex-col gap-8 border-box">
        {isSent || isError ?
          isSent && <span>{props.successMessage}</span> ||
          isError && <span>{props.errorMessage}</span>
          :
          <>
            <span>{props.description}</span>

            <div className="flex gap-4">
              {props.productCategories.map((product, productIndex) => {
                const isSelected = productIndex === productOptionIndex;
                return (
                  <Checkbox name='product' value={props.productCategories[productOptionIndex].slug} key={productIndex} isSelected={isSelected} title={product.title}
                    onClick={() => {
                      setProductOptionIndex(productIndex);
                    }} />
                )
              })}
            </div>

            <div className="flex flex-col gap-2">
              <span>{props.productCategories[productOptionIndex]?.title}</span>
              <select name="productId" className="p-2 border-solid border borde-primary-300 bg-primary-300 text-dark-500">
                {props.productCategories[productOptionIndex]?.products.map((option) => (<option value={option.id}>{option.title}</option>))}
              </select>
            </div>

            {props.fields.map((field, key) => {
              if (field.__component === "input.text-input") {
                if (field.type === "phone") {
                  return (
                    <div key={key} className="flex flex-col gap-4">
                      <label>{field.title}</label>
                      <div className="flex gap-4">

                        <select name="countryCode" className=" p-2 text-primary-300 bg-transparent border-solid border">
                          {props.countries.map((country) => {
                            return (<option value={country.callingCode}>{country.flag} {country.callingCode.replace('+', '')}</option>);
                          })}
                        </select>

                        <input
                          onKeyDown={(e) => {
                            !e.key.match(/[0-9]+|Backspace|Enter|Tab|[.]/) && e.preventDefault()
                          }}
                          name={field.name}
                          required={field.required}
                          className="w-full p-2 border-none bg-dark-300 text-primary-300"
                          placeholder={field.placeholder}
                        />
                      </div>

                    </div>
                  );
                }

                if (field.type === "mail") {
                  return (
                    <div key={key} className={formItemClassName}>
                      <label className="">{field.title}</label>
                      <input
                        name={field.name}
                        required={field.required}
                        className="p-2 border-none text-primary-300 bg-dark-300"
                        placeholder={field.placeholder} />
                      {fetcher.data?.errors?.email && <span className="text-primary-300">{field.errorMessage}</span>}
                    </div>);
                }

                return (
                  <div key={key} className={formItemClassName}>
                    <label className="">{field.title}</label>
                    <input name={field.name} required={field.required} className="p-2 border-none text-primary-300 bg-dark-300" placeholder={field.placeholder} />
                  </div>);
              }

              if (field.__component === "input.checkbox") {
                return (
                  <div key={key} className="flex w-full gap-4">
                    <Checkbox name={field.name} isSelected={agree} title={field.message}
                      onClick={() => {
                        setAgree(!agree);
                      }} />
                  </div>
                );
              }
            })}

            <div className="w-full">
              <input
                type="submit"
                className='w-full flex cursor-pointer text-center text-dark-500 bg-primary-300 duration-300 ease hover:bg-primary-500 p-4 border-none'
                value={props.submit.title}
              />
            </div>

          </>
        }
      </fetcher.Form>

    </Section>
  );
}
