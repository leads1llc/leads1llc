import { ActionFunctionArgs, redirect } from "@remix-run/node"
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Nav } from "./components/Nav";
import { Body } from "./components/Body";
import Footer from "./components/Footer";

export const loader = ({ context, request, params }: LoaderFunctionArgs) => {
  // TODO: add language support check using api
  const supportedLanguages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" }
  ];

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
    title: "About us",
    to: "/about-us"
  }
  ];

  const contact = {
    title: "Train with us",
    to: "#train-with-us"
  };


  const languagesCodes = supportedLanguages.map((supportedLanguage) => supportedLanguage.code);

  const lang: string = params.lang as string;
  if (!lang || !languagesCodes.includes(lang)) {
    return redirect('/404');
  }
  ''
  return { lang, supportedLanguages, contact, links };
};

export default function Route() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Nav lang={data.lang} supportedLanguages={data.supportedLanguages} contact={data.contact} links={data.links} />
      <Body>
        <Outlet/>
      </Body>
      <Footer />
    </>
  );
}