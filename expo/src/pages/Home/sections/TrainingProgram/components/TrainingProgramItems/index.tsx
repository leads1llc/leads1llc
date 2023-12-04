import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { apiResource } from "../../../../../../services/api";
import { ITrainingProgramItemRes } from "../..";
import { primaryColor } from "../../../../../../static/colors";

export type TrainingProgramItemProps = {
  programs: Array<ITrainingProgramItemRes>
};

export function TrainingProgramItems({ programs }: TrainingProgramItemProps) {
  const [indexSelected, setIndexSeleted] = useState<number>(0);

  return (
    <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
      {
        programs &&
        <>
          <View style={{ flex: 1 }}>
            {programs?.length > indexSelected &&

              <Image style={{ width: "100%", height: "100%" }} source={{ uri: apiResource(programs[indexSelected].attributes.cover.data.attributes.url) }} />
            }
          </View>

          <View style={{ flex: 1 }}>
            {programs.map((program, index) => {
              const isSelected = indexSelected === index;

              return (
                <Pressable style={{ padding: 20, borderWidth: 1, gap: 20, backgroundColor: isSelected ? primaryColor : "none" }}
                  onPress={() => {
                    setIndexSeleted(index);
                  }}
                >
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>{program.attributes.title}</Text>
                  {
                    isSelected ?
                      <Text>{program.attributes.description}</Text>
                      :
                      <Text>See more</Text>
                  }
                </Pressable>
              );
            })}
          </View>

        </>
      }
    </View >
  )
}
