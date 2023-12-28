import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { Leads1LLCLogoMark } from "~/components/Leads1LLCLogoMark";

export const loader = ({ params }: LoaderFunctionArgs) => {
  return { lang: params.lang };
};

export function Nav() {
  const { lang } = useLoaderData<typeof loader>();

  const links = [{
    title: "Home",
    to: "/home"
  },
  {
    title: "Traning Programs",
    to: "/training-programs"
  },
  {
    title: "Services",
    to: "/services"
  },
  {
    title: "Experience",
    to: "/experience"
  }, {
    title: "About us",
    to: "/about-us"
  }
  ];

  const contact = {
    title: "Train with us",
    to: "#train-with-us"
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" }
  ];

  return (
    <nav className="layout-nav">
      <Leads1LLCLogoMark size={70} foregroundColor="#BDBDBD" backgroundColor="#1F1F1F" />
      <ul>
        {links.map((link, index) => {
          const linkTo = `/${lang}${link.to}`;
          return (<li>
            <NavLink key={index} to={linkTo}>{link.title}</NavLink>
          </li>);
        })}

        <li>
          <select name="page-language" id="">
            {languages.map((language) => (<option selected={language.code === lang} value={language.code}>{language.flag} {language.code}</option>))}
          </select>
        </li>

        <li className="train-with-us">
          <Link to={contact.to}>{contact.title}</Link>
        </li>
      </ul>
    </nav>
  );
}
