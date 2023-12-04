import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { StrapiAPIDataResponse } from "../../../../components/NavBar";
import { apiGet } from "../../../../services/api";
import { TrainingProgram } from "./components/TrainingProgram";

export type TrainingProgramsType = {
  title: string;
  description: string;
  companyLogo: {
    data:
    StrapiAPIDataResponse<{
      url: string;
    }>
  }
};

export function TrainingProgramSection() {
  const locale = useSelector((state) => state.settingsSliceReducer.locale);
  const [trainingPrograms, setTrainingPrograms] = useState<Array<StrapiAPIDataResponse<TrainingProgramsType>>>();

  useEffect(() => {
    (async () => {
      const sections = await (await apiGet('/training-program-types', { locale: locale, populate: '*' })).json();
      setTrainingPrograms(sections.data ?? []);
    })();
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 80, paddingVertical: 50, gap: 50 }}>
      {trainingPrograms && trainingPrograms.map((trainingProgram) => {
        return (
          <View style={{ flex: 1, gap: 50 }}>
            <View>
              <Text style={{ fontSize: 48, fontWeight: "bold" }}>{trainingProgram.attributes.title}</Text>
              <Text style={{ fontSize: 14, fontWeight: "300" }}>{trainingProgram.attributes.description}</Text>
            </View>
            <TrainingProgram />
          </View>
        );
      })}
    </View>
  );
}
