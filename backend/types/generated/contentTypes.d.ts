import type { Schema, Attribute } from "@strapi/strapi";

export interface AdminPermission extends Schema.CollectionType {
  collectionName: "admin_permissions";
  info: {
    name: "Permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<"admin::permission", "manyToOne", "admin::role">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::permission", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"admin::permission", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: "admin_users";
  info: {
    name: "User";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    roles: Attribute.Relation<"admin::user", "manyToMany", "admin::role"> & Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::user", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"admin::user", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: "admin_roles";
  info: {
    name: "Role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<"admin::role", "manyToMany", "admin::user">;
    permissions: Attribute.Relation<"admin::role", "oneToMany", "admin::permission">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::role", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"admin::role", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: "strapi_api_tokens";
  info: {
    name: "Api Token";
    singularName: "api-token";
    pluralName: "api-tokens";
    displayName: "Api Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<"">;
    type: Attribute.Enumeration<["read-only", "full-access", "custom"]> &
      Attribute.Required &
      Attribute.DefaultTo<"read-only">;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<"admin::api-token", "oneToMany", "admin::api-token-permission">;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::api-token", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"admin::api-token", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: "strapi_api_token_permissions";
  info: {
    name: "API Token Permission";
    description: "";
    singularName: "api-token-permission";
    pluralName: "api-token-permissions";
    displayName: "API Token Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<"admin::api-token-permission", "manyToOne", "admin::api-token">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::api-token-permission", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"admin::api-token-permission", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: "strapi_transfer_tokens";
  info: {
    name: "Transfer Token";
    singularName: "transfer-token";
    pluralName: "transfer-tokens";
    displayName: "Transfer Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<"">;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<"admin::transfer-token", "oneToMany", "admin::transfer-token-permission">;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::transfer-token", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"admin::transfer-token", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: "strapi_transfer_token_permissions";
  info: {
    name: "Transfer Token Permission";
    description: "";
    singularName: "transfer-token-permission";
    pluralName: "transfer-token-permissions";
    displayName: "Transfer Token Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<"admin::transfer-token-permission", "manyToOne", "admin::transfer-token">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::transfer-token-permission", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"admin::transfer-token-permission", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: "files";
  info: {
    singularName: "file";
    pluralName: "files";
    displayName: "File";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<"plugin::upload.file", "morphToMany">;
    folder: Attribute.Relation<"plugin::upload.file", "manyToOne", "plugin::upload.folder"> & Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"plugin::upload.file", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"plugin::upload.file", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: "upload_folders";
  info: {
    singularName: "folder";
    pluralName: "folders";
    displayName: "Folder";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<"plugin::upload.folder", "manyToOne", "plugin::upload.folder">;
    children: Attribute.Relation<"plugin::upload.folder", "oneToMany", "plugin::upload.folder">;
    files: Attribute.Relation<"plugin::upload.folder", "oneToMany", "plugin::upload.file">;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"plugin::upload.folder", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"plugin::upload.folder", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: "strapi_releases";
  info: {
    singularName: "release";
    pluralName: "releases";
    displayName: "Release";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    actions: Attribute.Relation<
      "plugin::content-releases.release",
      "oneToMany",
      "plugin::content-releases.release-action"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"plugin::content-releases.release", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"plugin::content-releases.release", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
  collectionName: "strapi_release_actions";
  info: {
    singularName: "release-action";
    pluralName: "release-actions";
    displayName: "Release Action";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<["publish", "unpublish"]> & Attribute.Required;
    entry: Attribute.Relation<"plugin::content-releases.release-action", "morphToOne">;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      "plugin::content-releases.release-action",
      "manyToOne",
      "plugin::content-releases.release"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"plugin::content-releases.release-action", "oneToOne", "admin::user"> &
      Attribute.Private;
    updatedBy: Attribute.Relation<"plugin::content-releases.release-action", "oneToOne", "admin::user"> &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: "i18n_locale";
  info: {
    singularName: "locale";
    pluralName: "locales";
    collectionName: "locales";
    displayName: "Locale";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"plugin::i18n.locale", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"plugin::i18n.locale", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
  collectionName: "up_permissions";
  info: {
    name: "permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<"plugin::users-permissions.permission", "manyToOne", "plugin::users-permissions.role">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"plugin::users-permissions.permission", "oneToOne", "admin::user"> &
      Attribute.Private;
    updatedBy: Attribute.Relation<"plugin::users-permissions.permission", "oneToOne", "admin::user"> &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: "up_roles";
  info: {
    name: "role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >;
    users: Attribute.Relation<"plugin::users-permissions.role", "oneToMany", "plugin::users-permissions.user">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"plugin::users-permissions.role", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"plugin::users-permissions.role", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: "up_users";
  info: {
    name: "user";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<"plugin::users-permissions.user", "manyToOne", "plugin::users-permissions.role">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"plugin::users-permissions.user", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"plugin::users-permissions.user", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiAboutContentAboutContent extends Schema.SingleType {
  collectionName: "about_contents";
  info: {
    singularName: "about-content";
    pluralName: "about-contents";
    displayName: "AboutContent";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Intro: Attribute.RichText;
    Testimonials: Attribute.Relation<"api::about-content.about-content", "oneToMany", "api::testimonial.testimonial">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::about-content.about-content", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::about-content.about-content", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiAnnualReportAnnualReport extends Schema.CollectionType {
  collectionName: "annual_reports";
  info: {
    singularName: "annual-report";
    pluralName: "annual-reports";
    displayName: "Annual Report";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Year: Attribute.Integer & Attribute.Required & Attribute.Unique;
    File: Attribute.Media & Attribute.Required;
    CoverImage: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::annual-report.annual-report", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::annual-report.annual-report", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiBlogPostBlogPost extends Schema.CollectionType {
  collectionName: "blog_posts";
  info: {
    singularName: "blog-post";
    pluralName: "blog-posts";
    displayName: "Blog Post";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    FeatureImage: Attribute.Media;
    Title: Attribute.String & Attribute.Required & Attribute.Unique;
    Summary: Attribute.Text;
    DateWritten: Attribute.Date;
    Tags: Attribute.Relation<"api::blog-post.blog-post", "oneToMany", "api::blog-tag.blog-tag">;
    Slug: Attribute.UID<"api::blog-post.blog-post", "Title">;
    ContentBlocks: Attribute.DynamicZone<["common.action-button", "common.html", "common.text-block", "common.image"]>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::blog-post.blog-post", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::blog-post.blog-post", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiBlogTagBlogTag extends Schema.CollectionType {
  collectionName: "blog_tags";
  info: {
    singularName: "blog-tag";
    pluralName: "blog-tags";
    displayName: "Blog Tags";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Tag: Attribute.String;
    BlogPost: Attribute.Relation<"api::blog-tag.blog-tag", "manyToOne", "api::blog-post.blog-post">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::blog-tag.blog-tag", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::blog-tag.blog-tag", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiCountryCountry extends Schema.CollectionType {
  collectionName: "countries";
  info: {
    singularName: "country";
    pluralName: "countries";
    displayName: "Country";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String;
    Content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::country.country", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::country.country", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiDonateContentDonateContent extends Schema.SingleType {
  collectionName: "donate_contents";
  info: {
    singularName: "donate-content";
    pluralName: "donate-contents";
    displayName: "DonateContent";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    DonateStatement: Attribute.Component<"home.mission-statement">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::donate-content.donate-content", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::donate-content.donate-content", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiDonorDonor extends Schema.CollectionType {
  collectionName: "donors";
  info: {
    singularName: "donor";
    pluralName: "donors";
    displayName: "Donors";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required & Attribute.Unique;
    Logo: Attribute.Media & Attribute.Required;
    SortOrder: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::donor.donor", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::donor.donor", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiDynamicContentDynamicContent extends Schema.SingleType {
  collectionName: "dynamic_contents";
  info: {
    singularName: "dynamic-content";
    pluralName: "dynamic-contents";
    displayName: "DynamicContent";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.DynamicZone<["common.action-button", "common.html", "common.image", "common.text-block"]>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::dynamic-content.dynamic-content", "oneToOne", "admin::user"> &
      Attribute.Private;
    updatedBy: Attribute.Relation<"api::dynamic-content.dynamic-content", "oneToOne", "admin::user"> &
      Attribute.Private;
  };
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: "faqs";
  info: {
    singularName: "faq";
    pluralName: "faqs";
    displayName: "Faqs";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Question: Attribute.String;
    Response: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::faq.faq", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::faq.faq", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiHomeContentHomeContent extends Schema.SingleType {
  collectionName: "home_contents";
  info: {
    singularName: "home-content";
    pluralName: "home-contents";
    displayName: "HomeContent";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    HeroImages: Attribute.Component<"home.hero-image", true>;
    MissionStatement: Attribute.Component<"home.mission-statement">;
    ProjectSummary: Attribute.Component<"home.project-summary">;
    GetInvolved: Attribute.Component<"home.get-involved">;
    ImpactSection: Attribute.Component<"home.impact-section">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::home-content.home-content", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::home-content.home-content", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiMemberMember extends Schema.CollectionType {
  collectionName: "members";
  info: {
    singularName: "member";
    pluralName: "members";
    displayName: "Members";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String;
    Photo: Attribute.Media;
    Bio: Attribute.RichText;
    Email: Attribute.Email;
    LinkedIn: Attribute.String;
    BioImage: Attribute.Media;
    SortOrder: Attribute.Decimal;
    Tags: Attribute.JSON & Attribute.CustomField<"plugin::multi-select.multi-select", ["SAMI", "AMI", "Trustee"]>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::member.member", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::member.member", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiPartnerPartner extends Schema.CollectionType {
  collectionName: "partners";
  info: {
    singularName: "partner";
    pluralName: "partners";
    displayName: "Partners";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Logo: Attribute.Media & Attribute.Required;
    Name: Attribute.String & Attribute.Required & Attribute.Unique;
    SortOrder: Attribute.Decimal & Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::partner.partner", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::partner.partner", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiProjectTypeProjectType extends Schema.CollectionType {
  collectionName: "project_types";
  info: {
    singularName: "project-type";
    pluralName: "project-types";
    displayName: "Projects";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String;
    Icon: Attribute.Media;
    HomeSummary: Attribute.Text;
    PageSummary: Attribute.RichText;
    PageContent: Attribute.DynamicZone<["common.text-block", "common.html", "common.image", "common.action-button"]>;
    FeatureImage: Attribute.Media;
    Slug: Attribute.String & Attribute.Required & Attribute.Unique;
    Status: Attribute.Enumeration<["Ongoing", "Completed"]>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::project-type.project-type", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::project-type.project-type", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiResourceResource extends Schema.CollectionType {
  collectionName: "resources";
  info: {
    singularName: "resource";
    pluralName: "resources";
    displayName: "Resources";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String;
    Image: Attribute.Media;
    Description: Attribute.Text;
    Media: Attribute.Media;
    Links: Attribute.Component<"common.action-button", true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::resource.resource", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::resource.resource", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: "testimonials";
  info: {
    singularName: "testimonial";
    pluralName: "testimonials";
    displayName: "Testimonials";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Photo: Attribute.Media & Attribute.Required;
    Content: Attribute.Text & Attribute.Required;
    Bio: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::testimonial.testimonial", "oneToOne", "admin::user"> & Attribute.Private;
    updatedBy: Attribute.Relation<"api::testimonial.testimonial", "oneToOne", "admin::user"> & Attribute.Private;
  };
}

export interface ApiVolunteerContentVolunteerContent extends Schema.SingleType {
  collectionName: "volunteer_contents";
  info: {
    singularName: "volunteer-content";
    pluralName: "volunteer-contents";
    displayName: "VolunteerContent";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.DynamicZone<["common.html", "common.action-button", "common.text-block", "common.image"]>;
    faqs: Attribute.Relation<"api::volunteer-content.volunteer-content", "oneToMany", "api::faq.faq">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"api::volunteer-content.volunteer-content", "oneToOne", "admin::user"> &
      Attribute.Private;
    updatedBy: Attribute.Relation<"api::volunteer-content.volunteer-content", "oneToOne", "admin::user"> &
      Attribute.Private;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface ContentTypes {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "admin::api-token-permission": AdminApiTokenPermission;
      "admin::transfer-token": AdminTransferToken;
      "admin::transfer-token-permission": AdminTransferTokenPermission;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::content-releases.release": PluginContentReleasesRelease;
      "plugin::content-releases.release-action": PluginContentReleasesReleaseAction;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
      "api::about-content.about-content": ApiAboutContentAboutContent;
      "api::annual-report.annual-report": ApiAnnualReportAnnualReport;
      "api::blog-post.blog-post": ApiBlogPostBlogPost;
      "api::blog-tag.blog-tag": ApiBlogTagBlogTag;
      "api::country.country": ApiCountryCountry;
      "api::donate-content.donate-content": ApiDonateContentDonateContent;
      "api::donor.donor": ApiDonorDonor;
      "api::dynamic-content.dynamic-content": ApiDynamicContentDynamicContent;
      "api::faq.faq": ApiFaqFaq;
      "api::home-content.home-content": ApiHomeContentHomeContent;
      "api::member.member": ApiMemberMember;
      "api::partner.partner": ApiPartnerPartner;
      "api::project-type.project-type": ApiProjectTypeProjectType;
      "api::resource.resource": ApiResourceResource;
      "api::testimonial.testimonial": ApiTestimonialTestimonial;
      "api::volunteer-content.volunteer-content": ApiVolunteerContentVolunteerContent;
    }
  }
}
