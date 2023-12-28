import { redirect } from "@remix-run/node"
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Nav } from "./components/Nav";
import { Body } from "./components/Body";

export const loader = ({ params }: LoaderFunctionArgs) => {
  // TODO: add language support check using api
  const lang = params.lang as string;
  console.log(params.lang);
  console.log(params.ref);
  const supportedLanguages = ['en', 'es'];
  if (!supportedLanguages.includes(lang)) {
    return redirect('/404');
  }

  return { lang: params.lang };
};

export default function Route() {
  const { lang } = useLoaderData<typeof loader>();
  return (
    <>
      <Nav />
      <Body>
        <Outlet />
      </Body>
    </>
  );
}
