import { useActionData, useFetcher, useNavigate } from "@remix-run/react";
import { useRef, useState } from "react";
import { Checkbox } from "~/components/Core/Checkbox";
import { Section } from "~/components/Section";
import Select from "react-select"
import { COLORS } from "~/styles/variables";
import { GoogleReCaptchaCheckbox } from '@google-recaptcha/react';
import { concatClassNames } from "~/utils/utils";

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
  const [isSubmitEnable, setIsSubmitEnable] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetcher = useFetcher();
  const isSent = fetcher?.data?.success;
  const isError = fetcher?.data?.error;
  const formItemClassName = 'flex w-full flex-col gap-4';
  const recapchaRef = useRef(null);

  const selectStyles: any = {
    menuList(base, props) {
      return {
        ...base,
        border: "solid",
        borderWidth: "1.5px",
        borderColor: COLORS["primary-300"]
      }
    },
    singleValue(base, props) {
      return {
        ...base,
        color: COLORS["primary-300"]
      }
    },
    control(base, props) {
      return {
        ...base,
        background: COLORS["dark-500"],
        borderColor: COLORS["primary-300"],
        color: COLORS["primary-300"],
        ":hover": {
          borderColor: COLORS["primary-300"]
        }
      }
    },
    option: (base, status) => {
      return {
        ...base,
        color: status.isFocused ? COLORS["dark-500"] : COLORS["primary-300"],
        background: status.isFocused ? COLORS["primary-300"] : COLORS["dark-500"],

      }
    },
    menu: (base, status) => {
      return {
        ...base,
        background: COLORS["dark-500"]
      }
    }
  };

  const callingCodeOptions = props.countries.map((country) => {
    return {
      value: country.callingCode,
      label: `${country.callingCode.replace("+", "")}`,
      image: country.flag
    }
  });

  const productsSelectOptions = props.productCategories[productOptionIndex]?.products.map((option) => {
    return {
      value: option.id,
      label: option.title,
      image: ""
    }
  });


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


            <div className="flex flex-col gap-2 w-full">
              <span>{props.productCategories[productOptionIndex]?.title}</span>

              <Select
                styles={selectStyles}
                name="productId" options={productsSelectOptions}
              />
            </div>

            {props.fields.map((field, key) => {
              if (field.__component === "input.text-input") {
                if (field.type === "phone") {
                  return (
                    <div key={key} className="flex flex-col gap-4">
                      <label>{field.title}</label>
                      <div className="flex  gap-4 w-full">
                        <Select
                          styles={selectStyles}
                          className="w-64 sm:w-32"
                          name="countryCode"
                          options={callingCodeOptions}
                          formatOptionLabel={country => (
                            <div className="flex gap-2">
                              <img width={20} src={country.image} alt="country-image" />
                              <span>{country.label}</span>
                            </div>
                          )}
                        />

                        <input
                          onKeyDown={(e) => {
                            !e.key.match(/[0-9]+|Backspace|Enter|Tab|[.]/) && e.preventDefault()
                          }}
                          name={field.name}
                          required={field.required}
                          className="flex p-2 border-none w-full bg-dark-300 text-primary-300"
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

            <GoogleReCaptchaCheckbox
              ref={recapchaRef}
              callback={(token) => {
                console.log(token);
                setIsSubmitEnable(true);
              }}
            />

            <div className="w-full">
              <input
                type="submit"
                disabled={!isSubmitEnable}
                className={concatClassNames(
                  'w-full flex cursor-pointer text-center text-dark-500 bg-primary-300 duration-300 ease p-4 border-none',
                  isSubmitEnable ? "bg-primary-300 hover:bg-primary-500": "bg-gray-100"
                )}
                value={props.submit.title}
              />
            </div>

          </>
        }
      </fetcher.Form>
    </Section>
  );
}
