import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { apiGet } from "../services/api";
import Leads1LLCIcon from "../static/Leads1LLCIcon";
import { TrainButton } from "./TrainButton";
import { grayColor, primaryColor, secondaryColor } from "../static/colors";
import { useSelector } from "react-redux";

export type StrapiAPIDataResponse<T> = {
  attributes: T
};

export type StrapiAPIEndpointResponse<T> = {
  data: T
};

export type PagesType = {
  title: string;
  link: string;
  commonLink: string;
};

export function NavBar() {
  const locale = useSelector((state) => state.settingsSliceReducer.locale);
  const [pages, setPages] = useState<Array<StrapiAPIDataResponse<PagesType>>>([]);
  useEffect(() => {
    (async () => {
      const pages = await (await apiGet('/pages', { locale: locale })).json();
      setPages(pages.data ?? []);
    })();
  }, []);
  return (
    <View style={style.navBarParent}>
      <Pressable><Leads1LLCIcon width={60} height={60} /></Pressable>
      <View style={style.navBarItems}>
        {pages.map((page, index) => {
          return (
            <Pressable key={index}>
              <Text style={page.attributes.commonLink === "/home" ? style.navBarActiveItem : style.navBarItem}>
                {page.attributes.title}
              </Text>
            </Pressable>
          );
        })}
        <TrainButton />
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  navBarParent: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: secondaryColor,
    borderBottomWidth: 1,
    borderBottomColor: primaryColor
  },
  navBarIcon: {},
  navBarItems: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  navBarItem: {
    color: grayColor
  },
  navBarActiveItem: {
    color: primaryColor,
    fontWeight: "bold",
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderColor: primaryColor
  }
});
