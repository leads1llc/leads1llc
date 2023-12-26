import { Link, NavLink } from "@remix-run/react";
import { Leads1LLCLogoMark } from "~/components/Leads1LLCLogoMark";

export function Nav() {
  const links = [{
    title: "Home",
    to: "/"
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

  const languages = [{
    code: "En",
    name: "English",
    flag: "🇺🇸"
  }];

  return (
    <nav className="layout-nav">
      <Leads1LLCLogoMark size={70} foregroundColor="#BDBDBD" backgroundColor="#1F1F1F" />
      <ul>
        {links.map((link, index) => (<li>
          <NavLink key={index} to={link.to}>{link.title}</NavLink>
        </li>))}

        <li>
          <select name="page-language" id="">
            {languages.map((language) => (<option>{language.flag} {language.code}</option>))}
          </select>
        </li>

        <li className="train-with-us">
          <Link to={contact.to}>{contact.title}</Link>
        </li>
      </ul>
    </nav>
  );
}
