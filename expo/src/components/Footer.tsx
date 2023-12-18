import { Image, Text, View } from "react-native";
import IconLight from "../../../assets/icon_light.png"
import { secondaryColor } from "../static/colors";
import Leads1LLCIcon from "../static/Leads1LLCIcon";

// TODO: pass the following arrays to strapi content

const SOCIAL_MEDIA = [
  { icon: "https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/tBxa1IFcTQH.png", name: "Instagram", link: "https://www.instagram.com/" },
  { icon: "https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/tBxa1IFcTQH.png", name: "Instagram", link: "https://www.instagram.com/" }
]

const FOOTER_LINK_ITEMS = [
  {
    title: "Develop",
    links: [
      { name: "API", link: "https://leads1llc.com/docs/api/" }
    ]
  },
  {
    title: "Develop",
    links: [
      { name: "API", link: "https://leads1llc.com/docs/api/" }
    ]
  },
  {
    title: "Develop",
    links: [
      { name: "API", link: "https://leads1llc.com/docs/api/" }
    ]
  },
  {
    title: "Develop",
    links: [
      { name: "API", link: "https://leads1llc.com/docs/api/" }
    ]
  },
];

const FOOTER_COPYRIGHT = "Copyright © 2023 Leads1LLC."


export function Footer() {
  const footerLinkItems = FOOTER_LINK_ITEMS;
  return (
    <View style={{ flex: 1, backgroundColor: secondaryColor, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 80, paddingVertical: 50, gap: 50 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 80}}>
        {footerLinkItems.map((footerLinkItem) => {
          return (
            <View>
              <Text style={{ color: "white" }}>{footerLinkItem.title}</Text>
              <View>
                {footerLinkItem.links.map((footerLink) => {
                  return (
                    <View>
                      <Text style={{ color: "white" }}>{footerLink.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20}}>
        <Leads1LLCIcon size={100}/>
        <Text style={{color: "white"}}>1-888-550 (2769)</Text>
        <Text style={{color: "white"}}>Site map</Text>
      </View>
      <Text style={{ color: "white" }}>{FOOTER_COPYRIGHT}</Text>
    </View>
  );
}
