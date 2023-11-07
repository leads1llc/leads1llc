import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StrapiAPIEndpointResponse } from "./NavBar";
import { apiGet } from "../services/api";
import { primaryColor, secondaryColor } from "../static/colors";


export type CommonAnchorSectionType = {
  title: string;
  section: string;
};

export function TrainButton() {
  const [train, setTrain] = useState<StrapiAPIEndpointResponse<CommonAnchorSectionType>>();
  useEffect(() => {
    (async () => {
      const train = await (await apiGet('/common-anchor-section/train-with-us', {locale:"es"})).json();
      setTrain(train);
    })();
  }, []);

  return (
    <View style={style.button}>
      {train?.data && <Text style={style.buttonText}>{train.data.attributes.title}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: primaryColor
  },
  buttonText: {
    color: secondaryColor,
    fontWeight: "bold"
  }
});
