import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { StrapiAPIDataResponse, StrapiAPIEndpointResponse } from "../../../../components/NavBar";
import { apiGet } from "../../../../services/api";
import { TrainingProgramItems } from "./components/TrainingProgramItems";

export type ITrainingProgramType = {
  title: string;
  description: string;
  slug: string;
};

export type ITrainingProgramItem = {
  title: string;
  description: string;
  cover: StrapiAPIEndpointResponse<StrapiAPIDataResponse<{ url: string; }>>;
};

export type ITrainingProgramItemRes = StrapiAPIDataResponse<
  ITrainingProgramItem &
  {
    type?: StrapiAPIEndpointResponse<StrapiAPIDataResponse<ITrainingProgramType>>
  }
>
  ;

export type ITrainingProgramsRes = StrapiAPIEndpointResponse<Array<ITrainingProgramItemRes>>;

export type ITrainingPrograms = Record<
  string,
  { programs?: Array<ITrainingProgramItemRes> } & ITrainingProgramType
>;

export function TrainingProgramSection() {
  //@ts-ignore
  const locale = useSelector((state) => state.settingsSliceReducer.locale);
  const [trainingPrograms, setTrainingPrograms] = useState<ITrainingPrograms>({});

  useEffect(() => {
    (async () => {
      // TODO: Add loading state
      // TODO: Add error state

      const programs: ITrainingProgramsRes = await (await apiGet('/training-programs', { locale: locale, populate: '*' })).json();

      const trainingProgramsStructured: ITrainingPrograms = {};

      programs.data.forEach((program) => {
        const type: ITrainingProgramType | undefined = program.attributes.type?.data?.attributes;

        if (!type) return;

        const key: string = type.slug;

        if (!(key in trainingProgramsStructured)) {
          trainingProgramsStructured[key] = {
            ...type,
            programs: []
          };
        }

        delete program.attributes.type;
        trainingProgramsStructured[key].programs!.push(program);
      });

      setTrainingPrograms(trainingProgramsStructured);
    })();
  }, []);

  if (!trainingPrograms) {
    // TODO: Add in progress component
    return <>Loading...</>
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 80, paddingVertical: 50, gap: 100 }}>
      {Object.values(trainingPrograms).map((programType) => {
        return (
          <View style={{ flex: 1, gap: 50 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 48, fontWeight: "bold" }}>{programType.title}</Text>
              <Text style={{ fontSize: 14, fontWeight: "300" }}>{programType.description}</Text>
            </View>

            {programType.programs && <TrainingProgramItems programs={programType.programs} />}
          </View>
        );
      })}
    </View>
  );
}
