import type { Schema, Struct } from "@strapi/strapi";

export interface CommonActionButton extends Struct.ComponentSchema {
  collectionName: "components_common_action_buttons";
  info: {
    description: "";
    displayName: "ActionButton";
    icon: "ad";
  };
  attributes: {
    ClassNames: Schema.Attribute.String;
    Link: Schema.Attribute.String & Schema.Attribute.Required;
    Text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonHtml extends Struct.ComponentSchema {
  collectionName: "components_common_htmls";
  info: {
    description: "";
    displayName: "HTML";
  };
  attributes: {
    HTML: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        "plugin::ckeditor5.CKEditor",
        {
          preset: "defaultHtml";
        }
      >;
  };
}

export interface CommonImage extends Struct.ComponentSchema {
  collectionName: "components_common_images";
  info: {
    description: "";
    displayName: "Image";
    icon: "landscape";
  };
  attributes: {
    AltText: Schema.Attribute.String;
    Caption: Schema.Attribute.Text;
    ClassNames: Schema.Attribute.String;
    Media: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
  };
}

export interface CommonTextBlock extends Struct.ComponentSchema {
  collectionName: "components_common_text_blocks";
  info: {
    description: "";
    displayName: "TextBlock";
  };
  attributes: {
    Text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeGetInvolved extends Struct.ComponentSchema {
  collectionName: "components_home_get_involveds";
  info: {
    description: "";
    displayName: "GetInvolved";
  };
  attributes: {
    ActionButtons: Schema.Attribute.Component<"common.action-button", true>;
    Description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        "plugin::ckeditor5.CKEditor",
        {
          preset: "defaultHtml";
        }
      >;
    Image: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    Text: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface HomeHeroImage extends Struct.ComponentSchema {
  collectionName: "components_home_hero_images";
  info: {
    description: "";
    displayName: "HeroImage";
  };
  attributes: {
    ActionButtons: Schema.Attribute.Component<"common.action-button", true>;
    Image: Schema.Attribute.Media<"images" | "files" | "videos" | "audios"> & Schema.Attribute.Required;
    Text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeImpactNumbers extends Struct.ComponentSchema {
  collectionName: "components_home_impact_numbers";
  info: {
    displayName: "ImpactNumbers";
  };
  attributes: {
    Number: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface HomeImpactSection extends Struct.ComponentSchema {
  collectionName: "components_home_impact_sections";
  info: {
    displayName: "ImpactSection";
    icon: "medal";
  };
  attributes: {
    ImpactNumbers: Schema.Attribute.Component<"home.impact-numbers", true>;
    Statement: Schema.Attribute.Text;
  };
}

export interface HomeMissionStatement extends Struct.ComponentSchema {
  collectionName: "components_home_mission_statements";
  info: {
    description: "";
    displayName: "MissionStatement";
  };
  attributes: {
    ActionButtons: Schema.Attribute.Component<"common.action-button", true>;
    Description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        "plugin::ckeditor5.CKEditor",
        {
          preset: "defaultHtml";
        }
      >;
    Heading: Schema.Attribute.String;
    Image: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    Text: Schema.Attribute.Text;
  };
}

export interface HomeProjectSummary extends Struct.ComponentSchema {
  collectionName: "components_home_project_summaries";
  info: {
    description: "";
    displayName: "ProjectSummary";
  };
  attributes: {
    ActionButtons: Schema.Attribute.Component<"common.action-button", true>;
    Image: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    Text: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface HomeProjectSummaryItem extends Struct.ComponentSchema {
  collectionName: "components_home_project_summary_items";
  info: {
    displayName: "ProjectSummaryItem";
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    Title: Schema.Attribute.String;
  };
}

declare module "@strapi/strapi" {
  export namespace Public {
    export interface ComponentSchemas {
      "common.action-button": CommonActionButton;
      "common.html": CommonHtml;
      "common.image": CommonImage;
      "common.text-block": CommonTextBlock;
      "home.get-involved": HomeGetInvolved;
      "home.hero-image": HomeHeroImage;
      "home.impact-numbers": HomeImpactNumbers;
      "home.impact-section": HomeImpactSection;
      "home.mission-statement": HomeMissionStatement;
      "home.project-summary": HomeProjectSummary;
      "home.project-summary-item": HomeProjectSummaryItem;
    }
  }
}
