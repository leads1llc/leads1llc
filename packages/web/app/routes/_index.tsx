import { redirect } from "@remix-run/node"
import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { strapiGet } from "~/services/strapi";

export async function getSupportedLanguages(): Promise<Array<string>>{
  const globalRes = await strapiGet('/api/global', {
    populate: {
      title: '*',
      description: '*',
      countries: {
        populate: {
          languagesCode: '*',
        }
      }
    }
  });


  const globalJson = await globalRes.json();
  const globalData = globalJson?.data?.attributes;

  return globalData.countries.data.map((country => {
    return country.attributes.code + "-" + country.attributes.languageCode
  }));
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const supportedLanguages = await getSupportedLanguages();
  const lang = params.lang ?? supportedLanguages[0];

  if (lang) {
    return redirect(`/${lang}/home`);
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
  const { lang } = useLoaderData<typeof loader>();

  return (
    <>Loading...</>
  );
}
