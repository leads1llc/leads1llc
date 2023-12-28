import { redirect } from "@remix-run/node"
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = ({ }: LoaderFunctionArgs) => {
  return redirect('/404');
};
