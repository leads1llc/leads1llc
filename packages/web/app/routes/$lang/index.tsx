import { ActionFunctionArgs, redirect } from "@remix-run/node"
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { Nav } from "./components/Nav";
import { Body } from "./components/Body";
import Footer from "./components/Footer";
import { strapiGet } from "~/services/strapi";
import { FaArrowUp } from "react-icons/fa6";
import { COLORS } from "~/styles/variables";
import { getSupportedLanguages } from "../_index";

export const loader = async ({ context, request, params }: LoaderFunctionArgs) => {
  const lang: string = params.lang as string;
  const supportedLanguagesLang = await getSupportedLanguages();
  const locale = lang.split('-')[1];

  if(!supportedLanguagesLang.includes(lang)){
    return redirect("/");
  }


  const globalRes = await strapiGet('/api/global', {
    populate: {
      title: '*',
      description: '*',
      nav: '*',
      contact: '*',
      countries: {
        populate: {
          languagesCode: '*',
          flag: {
            fields: ['url']
          }
        }
      }
    }, locale: locale
  });


  const globalJson = await globalRes.json();
  const globalData = globalJson?.data?.attributes;

  const supportedLanguages= globalData.countries.data.map((country => {
    return {
      code: country.attributes.code + "-" + country.attributes.languageCode,
      flag: country.attributes.flag.data.attributes.url
    }
  }));

  const links = globalData?.nav;
  const contact = globalData?.contact;

  const languagesCodes = supportedLanguages.map((supportedLanguage) => supportedLanguage.code);

  if (!languagesCodes.includes(lang)) {
    return redirect(`${supportedLanguages[0].code}/home`);
  }
  return { lang, supportedLanguages, contact, links };
};

export default function Route() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="relative">
      <Nav lang={data.lang} supportedLanguages={data.supportedLanguages} contact={data.contact} links={data.links} />
      <Body>
        <script dangerouslySetInnerHTML={{
          __html: `
          window.onscroll = () => {
            const scrollOffset = document.documentElement.scrollTop;
            const offset = 250;
            const topBotton = document.getElementById('top-botton');
            if(scrollOffset < offset){
              topBotton.style.visibility = 'hidden';
              topBotton.style.opacity = '0';
            }
            if(scrollOffset > offset){
              topBotton.style.visibility = 'visible';
              topBotton.style.opacity = '1';

            }
          }
          `}}
        />
        <div id="top-botton" className="fixed invisible duration-300 ease bottom-8 right-8 bg-primary-500 p-4 cursor-pointer hover:bg-light-500 hover:border-solid hover:border hover:border-primary-500"
          onClick={() => window.scrollTo(0, 0)} ><FaArrowUp color={COLORS["dark-500"]} size={24} /></div>
        <Outlet />
      </Body>
      <Footer />
    </div>
  );
}