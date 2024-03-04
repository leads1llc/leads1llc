import type { Schema, Attribute } from '@strapi/strapi';

export interface InputCheckbox extends Schema.Component {
  collectionName: 'components_input_checkboxes';
  info: {
    displayName: 'Checkbox';
  };
  attributes: {
    message: Attribute.RichText & Attribute.Required;
    required: Attribute.Boolean & Attribute.Required;
  };
}

export interface InputTextInput extends Schema.Component {
  collectionName: 'components_input_text_inputs';
  info: {
    displayName: 'TextInput';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    placeholder: Attribute.String;
    type: Attribute.Enumeration<['text', 'phone', 'number']> &
      Attribute.Required;
    required: Attribute.Boolean & Attribute.Required;
  };
}

export interface PageButton extends Schema.Component {
  collectionName: 'components_page_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface PageHeroSection extends Schema.Component {
  collectionName: 'components_page_hero_sections';
  info: {
    displayName: 'HeroSection';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText;
    image: Attribute.Media & Attribute.Required;
    button: Attribute.Component<'page.button', true>;
  };
}

export interface PageIconLink extends Schema.Component {
  collectionName: 'components_page_icon_links';
  info: {
    displayName: 'IconLink';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.Media & Attribute.Required;
  };
}

export interface PageIconText extends Schema.Component {
  collectionName: 'components_page_icon_texts';
  info: {
    displayName: 'IconText';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    icon: Attribute.Media & Attribute.Required;
  };
}

export interface PageLinkCategory extends Schema.Component {
  collectionName: 'components_page_link_categories';
  info: {
    displayName: 'LinkCategory';
  };
  attributes: {
    category: Attribute.String & Attribute.Required;
    links: Attribute.Component<'page.link', true>;
  };
}

export interface PageLink extends Schema.Component {
  collectionName: 'components_page_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface SectionPersonBackground extends Schema.Component {
  collectionName: 'components_section_person_backgrounds';
  info: {
    displayName: 'PersonBackground';
    description: '';
  };
  attributes: {
    title: Attribute.Component<'section.title'> & Attribute.Required;
    profesionalDataTitle: Attribute.String & Attribute.Required;
    experienceTitle: Attribute.String & Attribute.Required;
    experience: Attribute.Component<'page.icon-text', true> &
      Attribute.Required;
  };
}

export interface SectionSideImage extends Schema.Component {
  collectionName: 'components_section_side_images';
  info: {
    displayName: 'SideImage';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.RichText & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    side: Attribute.Enumeration<['left', 'right']> & Attribute.Required;
  };
}

export interface SectionTitle extends Schema.Component {
  collectionName: 'components_section_titles';
  info: {
    displayName: 'Title';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'input.checkbox': InputCheckbox;
      'input.text-input': InputTextInput;
      'page.button': PageButton;
      'page.hero-section': PageHeroSection;
      'page.icon-link': PageIconLink;
      'page.icon-text': PageIconText;
      'page.link-category': PageLinkCategory;
      'page.link': PageLink;
      'section.person-background': SectionPersonBackground;
      'section.side-image': SectionSideImage;
      'section.title': SectionTitle;
    }
  }
}
