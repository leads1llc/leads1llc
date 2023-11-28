import { useSelector } from "react-redux";
import { StrapiAPIDataResponse } from "../../../../components/NavBar";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { secondaryColor } from "../../../../static/colors";
import { apiGet, apiResource } from "../../../../services/api";

export type TrustedBySectionType = {
  companyName: string;
  companyLogo: {
    data:
    StrapiAPIDataResponse<{
      url: string;
    }>
  }
};

export function TrustedBySection() {
  const locale = useSelector((state) => state.settingsSliceReducer.locale);
  const [trustedBies, setTrustedBy] = useState<Array<StrapiAPIDataResponse<TrustedBySectionType>>>();
  useEffect(() => {
    (async () => {
      const sections = await (await apiGet('/trusted-bies', { locale: locale, populate: '*' })).json();
      setTrustedBy(sections.data ?? []);
    })();
  }, []);


  return (
    <View style={{ flex: 1, minHeight: 80, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 80, borderBottomColor: secondaryColor, borderBottomWidth: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>Trusted by our clients and partners</Text>
      </View>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", gap: 20 }}>
        {trustedBies && trustedBies.map((trustedBy) => {
          return <Image style={{ width: 80, height: 40, resizeMode: "contain" }} source={{ uri: apiResource(trustedBy.attributes.companyLogo.data.attributes.url) }} />
        })}
      </View>
    </View>
  );

}
