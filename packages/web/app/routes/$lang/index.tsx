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

  const languagesCodes = supportedLanguages.map((supportedLanguage) => supportedLanguage.code);

  const lang: string = params.lang as string;
  if (!lang || !languagesCodes.includes(lang)) {
    return redirect('/404');
  }
''
  return { lang, supportedLanguages};
};

export default function Route() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Nav lang={data.lang} supportedLanguages={data.supportedLanguages}/>
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </>
  );
}


export const action = async ({request}: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const path = formData.get('path');
  return redirect(path);
};
