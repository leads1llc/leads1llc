import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { StrapiAPIDataResponse } from "../../../../../../components/NavBar";
import { apiGet, apiResource } from "../../../../../../services/api";

export type TrainingProgramType = {
  title: string;
  description: string;
  cover: {
    data:
    StrapiAPIDataResponse<{
      url: string;
    }>
  }
};

export function TrainingProgram() {
  const locale = useSelector((state) => state.settingsSliceReducer.locale);
  const [indexSelected, setIndexSeleted] = useState<number>(0);
  const [trainingPrograms, setTrainingPrograms] = useState<Array<StrapiAPIDataResponse<TrainingProgramType>>>();

  useEffect(() => {
    (async () => {
      const sections = await (await apiGet('/training-programs', { locale: locale, populate: '*' })).json();
      setTrainingPrograms(sections.data ?? []);
    })();
  }, []);

  console.log(trainingPrograms);

  return (
    <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
      {
        trainingPrograms &&
        <>
          {trainingPrograms?.length > indexSelected &&

            <Image style={{ width: 600, height: 350 }} source={{ uri: apiResource(trainingPrograms[indexSelected].attributes.cover.data.attributes.url) }} />
          }

          <View style={{flex: 1}}>
            {trainingPrograms.map((trainingProgram) => {
              return (
                <Pressable style={{ flex: 1, padding: 20, borderWidth: 1, gap: 20 }}>
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>{trainingProgram.attributes.title}</Text>
                  <Text>{trainingProgram.attributes.description}</Text>
                </Pressable>
              );
            })}
          </View>

        </>
      }
    </View >
  )
}
