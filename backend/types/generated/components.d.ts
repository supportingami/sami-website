import type { Schema, Attribute } from "@strapi/strapi";

export interface CommonActionButton extends Schema.Component {
  collectionName: "components_common_action_buttons";
  info: {
    displayName: "ActionButton";
    description: "";
    icon: "ad";
  };
  attributes: {
    Text: Attribute.String & Attribute.Required;
    Link: Attribute.String & Attribute.Required;
  };
}

export interface CommonHtml extends Schema.Component {
  collectionName: "components_common_htmls";
  info: {
    displayName: "HTML";
    description: "";
  };
  attributes: {
    HTML: Attribute.RichText & Attribute.Required;
  };
}

export interface CommonImage extends Schema.Component {
  collectionName: "components_common_images";
  info: {
    displayName: "Image";
    icon: "landscape";
    description: "";
  };
  attributes: {
    Media: Attribute.Media & Attribute.Required;
    AltText: Attribute.String;
    Caption: Attribute.Text;
  };
}

export interface CommonTextBlock extends Schema.Component {
  collectionName: "components_common_text_blocks";
  info: {
    displayName: "TextBlock";
    description: "";
  };
  attributes: {
    Text: Attribute.Text & Attribute.Required;
  };
}

export interface HomeGetInvolved extends Schema.Component {
  collectionName: "components_home_get_involveds";
  info: {
    displayName: "GetInvolved";
    description: "";
  };
  attributes: {
    Title: Attribute.String;
    Text: Attribute.Text;
    Description: Attribute.RichText;
    Image: Attribute.Media;
    ActionButtons: Attribute.Component<"common.action-button", true>;
  };
}

export interface HomeHeroImage extends Schema.Component {
  collectionName: "components_home_hero_images";
  info: {
    displayName: "HeroImage";
    description: "";
  };
  attributes: {
    Image: Attribute.Media & Attribute.Required;
    Text: Attribute.String & Attribute.Required;
    ActionButtons: Attribute.Component<"common.action-button", true>;
  };
}

export interface HomeImpactNumbers extends Schema.Component {
  collectionName: "components_home_impact_numbers";
  info: {
    displayName: "ImpactNumbers";
  };
  attributes: {
    Number: Attribute.String;
    Title: Attribute.String;
  };
}

export interface HomeImpactSection extends Schema.Component {
  collectionName: "components_home_impact_sections";
  info: {
    displayName: "ImpactSection";
    icon: "medal";
  };
  attributes: {
    Statement: Attribute.Text;
    ImpactNumbers: Attribute.Component<"home.impact-numbers", true>;
  };
}

export interface HomeMissionStatement extends Schema.Component {
  collectionName: "components_home_mission_statements";
  info: {
    displayName: "MissionStatement";
    description: "";
  };
  attributes: {
    Image: Attribute.Media;
    Text: Attribute.Text;
    Heading: Attribute.String;
    ActionButtons: Attribute.Component<"common.action-button", true>;
    Description: Attribute.RichText;
  };
}

export interface HomeProjectSummaryItem extends Schema.Component {
  collectionName: "components_home_project_summary_items";
  info: {
    displayName: "ProjectSummaryItem";
  };
  attributes: {
    Icon: Attribute.Media;
    Title: Attribute.String;
    Description: Attribute.Text;
  };
}

export interface HomeProjectSummary extends Schema.Component {
  collectionName: "components_home_project_summaries";
  info: {
    displayName: "ProjectSummary";
    description: "";
  };
  attributes: {
    Title: Attribute.String;
    Text: Attribute.Text;
    ActionButtons: Attribute.Component<"common.action-button", true>;
    Image: Attribute.Media;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "common.action-button": CommonActionButton;
      "common.html": CommonHtml;
      "common.image": CommonImage;
      "common.text-block": CommonTextBlock;
      "home.get-involved": HomeGetInvolved;
      "home.hero-image": HomeHeroImage;
      "home.impact-numbers": HomeImpactNumbers;
      "home.impact-section": HomeImpactSection;
      "home.mission-statement": HomeMissionStatement;
      "home.project-summary-item": HomeProjectSummaryItem;
      "home.project-summary": HomeProjectSummary;
    }
  }
}
