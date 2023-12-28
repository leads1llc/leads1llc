import { redirect } from "@remix-run/node"
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Nav } from "./components/Nav";
import { Body } from "./components/Body";
import Footer from "./components/Footer";

export const loader = ({ params }: LoaderFunctionArgs) => {
  // TODO: add language support check using api
  const lang = params.lang as string;
  const supportedLanguages = ['en', 'es'];
  if (!supportedLanguages.includes(lang)) {
    return redirect('/404');
  }

  return { lang: params.lang };
};

export default function Route() {
  return (
    <>
      <Nav />
      <Body>
        <Outlet />
      </Body>
      <Footer/>
    </>
  );
}
