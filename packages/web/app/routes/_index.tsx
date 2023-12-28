import { redirect } from "@remix-run/node"
import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = ({ }: LoaderFunctionArgs) => {
  // TODO: Determine the language of the user and redirect to it
  const  lang = 'en';
  const supportedLanguages = ['en', 'es'];
  if(supportedLanguages.includes(lang)){
    return redirect(`${lang}/home`);
  }

  return redirect('/404');
};

export const meta: MetaFunction = () => {
  return [
    { title: "Leads1LLC" },
    { name: "description", content: "Welcome to Leads1LLC" },
  ];
};

export default function Index() {
  const {lang} = useLoaderData<typeof loader>();

  return (
    <>Loading...</>
  );
}
