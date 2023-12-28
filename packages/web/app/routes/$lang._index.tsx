import { redirect } from "@remix-run/node"
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
  const { lang } = useLoaderData<typeof loader>();
  return (
    <h1>
      Leads1LLC {lang}
    </h1>
  );
}
