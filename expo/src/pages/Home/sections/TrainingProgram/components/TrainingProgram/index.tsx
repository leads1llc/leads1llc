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

  return (
    <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
      {
        trainingPrograms &&
        <>
          <View style={{ flex: 1 }}>
            {trainingPrograms?.length > indexSelected &&

              <Image style={{ width: "100%", height: "100%" }} source={{ uri: apiResource(trainingPrograms[indexSelected].attributes.cover.data.attributes.url) }} />
            }
          </View>

          <View style={{ flex: 1 }}>
            {trainingPrograms.map((trainingProgram, index) => {
              return (
                <Pressable style={{ padding: 20, borderWidth: 1, gap: 20 }}
                  onPress={() => {
                    setIndexSeleted(index);
                  }}
                >
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>{trainingProgram.attributes.title}</Text>
                  {
                    indexSelected === index &&
                    <Text>{trainingProgram.attributes.description}</Text>
                  }
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>See more</Text>
                </Pressable>
              );
            })}
          </View>

        </>
      }
    </View >
  )
}
