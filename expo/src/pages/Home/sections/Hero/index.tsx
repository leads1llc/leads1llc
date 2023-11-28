import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { grayColor, primaryColor, secondaryColor } from "../../../../static/colors";
import { Image, Pressable, Text, View } from "react-native";
import { apiGet, apiResource } from "../../../../services/api";
import { StrapiAPIDataResponse } from "../../../../components/NavBar";

export type HeroSectionType = {
  title: string;
  link: string;
  commonLink: string;
};

export function HeroSection() {
  const locale = useSelector((state) => state.settingsSliceReducer.locale);
  const [section, setSection] = useState<StrapiAPIDataResponse<HeroSectionType>>();
  useEffect(() => {
    (async () => {
      const sections = await (await apiGet('/hero-sections', { locale: locale, populate: '*' })).json();
      setSection(sections.data[0] ?? []);
    })();
  }, []);

  const headerWordsTitle = section?.attributes.title.split(' ')!;


  return (
    <View style={{ flex: 1, backgroundColor: secondaryColor, flexDirection: "row", minHeight: 600 }}>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRightWidth: 1, borderColor: primaryColor }}>
        <View style={{ width: 380, paddingVertical: 50, paddingHorizontal: 20, gap: 50 }}>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", columnGap: 20 }}>
            {
              headerWordsTitle && headerWordsTitle.map((headerWordTitle) => {
                if (headerWordTitle.startsWith("**")) {
                  return <Text style={{ color: grayColor, fontSize: 36, fontWeight: "bold" }}>{headerWordTitle.replaceAll("**", "")}</Text>
                }
                return <Text style={{ color: grayColor, fontSize: 36 }}>{headerWordTitle}</Text>
              })
            }
          </View>

          <Pressable>
            <Text style={{ color: primaryColor, borderWidth: 1, borderColor: primaryColor, fontSize: 12, padding: 20, position: "absolute" }}>
              {section?.attributes.buttonLink.data.attributes.title}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 2, backgroundColor: "orange" }}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          source={{ uri: apiResource(section?.attributes.image.data.attributes.url) }} />
      </View>
    </View>
  );
}
