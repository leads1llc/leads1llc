import { useState } from "react";
import { Section } from "~/components/Section";

export type ContactProps = {
  contact: any;
};

export function Contact({ contact }: ContactProps) {
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

  return (
    <Section className="contact" headline={{ title: contact.title, description: contact.description }}>

      <span>Complete the following form</span>


      <div className="products">
        {products.map((product, index) => {
          return (<div className="product">
            <div className={`checkbox ${index == 0 ? 'active' : ''}`}>
              <div></div>
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


      <form>
        <div className="form-item">
          <label>Company name</label>
          <input placeholder="Company name" />
        </div>

        <div className="form-parent">
          <div className="form-item">
            <label>First name</label>
            <input placeholder="First name" />
          </div>

          <div className="form-item">
            <label>Last name</label>
            <input placeholder="Last name" />
          </div>
        </div>

        <div className="form-item">
          <label>Company email</label>
          <input placeholder="Company email" />
        </div>

        <div className="form-submit">
          <input type="submit" value="Train with us"/>
        </div>

      </form>


    </Section>
  );
}
