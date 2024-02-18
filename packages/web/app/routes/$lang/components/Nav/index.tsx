import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, NavLink, useFetcher, useLoaderData, useLocation, useNavigate, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Leads1LLCLogoMark } from "~/components/Leads1LLCLogoMark";

export type NavProps = {
  lang: string;
  supportedLanguages: {
    code: string;
    name: string;
    flag: string;
  }[];
};

export function Nav({ lang, supportedLanguages }: NavProps) {
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLangSelect = (langSelected: string) => {
    const path = location.pathname.replace(lang, langSelected) + location.hash;
    navigate(path);
  };

  return (
    <nav className="nav">
      <Leads1LLCLogoMark size={70} foregroundColor="#BDBDBD" backgroundColor="#1F1F1F" />
      <input className="checkbox" type="checkbox" id="menu-trigger" />
      <label className="menu-icon" htmlFor="menu-trigger" />
      <ul>
        {links.map((link, index) => {
          const linkTo = `/${lang}${link.to}`;
          return (<li>
            <NavLink key={index} to={linkTo}>{link.title}</NavLink>
          </li>);
        })}


        <li>
          <select
            onChange={(e) => handleLangSelect(e.target.value)}
            name="lang" id="">
            {supportedLanguages.map((language) => (<option selected={language.code === lang} value={language.code}>{language.flag} {language.code}</option>))}
          </select>
        </li>

        <li className="train-with-us">
          <Link to={contact.to}>{contact.title}</Link>
        </li>
      </ul>
    </nav>
  );
}
