import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { HeroSection } from "~/components/HeroSection";
import { strapiGet, strapiResourceUrl } from "~/services/strapi";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const locale = params.lang;
    const id = params.id;

    const trainingProgramRes = await strapiGet(`/api/training-programs/${id}`, {
        populate:
        {
            cover: {
                fields: ['url']
            }
        }, locale
    });
    const trainingProgramJson = await trainingProgramRes.json();
    const trainingProgramData = trainingProgramJson.data;
    const trainingProgram = trainingProgramData.attributes;

    console.log(trainingProgram)


    return  {
        id: trainingProgramData.id,
        title: trainingProgram.title,
        description: trainingProgram.description,
        image: { url: strapiResourceUrl(trainingProgram.cover.data.attributes.url) }
    };

}

export default function Route() {

    const { title, description, image} = useLoaderData<typeof loader>();

    return (
        <HeroSection title={title} imageUrl={image.url} description={description} ></HeroSection>
    );
}