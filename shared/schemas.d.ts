import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  RichTextAttribute,
  MediaAttribute,
  DateAttribute,
  TextAttribute,
  SingleTypeSchema,
  ComponentAttribute,
  ComponentSchema,
} from "@strapi/strapi";

export interface AdminPermission extends CollectionTypeSchema {
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
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<"admin::permission", "manyToOne", "admin::role">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::permission", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"admin::permission", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
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
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<"admin::user", "manyToMany", "admin::role"> & PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<"admin::role", "manyToMany", "admin::user">;
    permissions: RelationAttribute<"admin::role", "oneToMany", "admin::permission">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"">;
    type: EnumerationAttribute<["read-only", "full-access"]> & DefaultTo<"read-only">;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::api-token", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"admin::api-token", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
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
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<"plugin::upload.file", "morphToMany">;
    folder: RelationAttribute<"plugin::upload.file", "manyToOne", "plugin::upload.folder"> & PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"plugin::upload.file", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"plugin::upload.file", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<"plugin::upload.folder", "manyToOne", "plugin::upload.folder">;
    children: RelationAttribute<"plugin::upload.folder", "oneToMany", "plugin::upload.folder">;
    files: RelationAttribute<"plugin::upload.folder", "oneToMany", "plugin::upload.file">;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"plugin::upload.folder", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"plugin::upload.folder", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
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
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"plugin::i18n.locale", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"plugin::i18n.locale", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
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
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<"plugin::users-permissions.permission", "manyToOne", "plugin::users-permissions.role">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"plugin::users-permissions.permission", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"plugin::users-permissions.permission", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >;
    users: RelationAttribute<"plugin::users-permissions.role", "oneToMany", "plugin::users-permissions.user">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"plugin::users-permissions.role", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"plugin::users-permissions.role", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
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
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<"plugin::users-permissions.user", "manyToOne", "plugin::users-permissions.role">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"plugin::users-permissions.user", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"plugin::users-permissions.user", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiAboutAbout extends CollectionTypeSchema {
  info: {
    singularName: "about";
    pluralName: "abouts";
    displayName: "About Page";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: StringAttribute;
    Content: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::about.about", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::about.about", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiAnnualReportAnnualReport extends CollectionTypeSchema {
  info: {
    singularName: "annual-report";
    pluralName: "annual-reports";
    displayName: "Annual Report";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Year: IntegerAttribute;
    File: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::annual-report.annual-report", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::annual-report.annual-report", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiBlogPostBlogPost extends CollectionTypeSchema {
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
    Content: RichTextAttribute;
    FeatureImage: MediaAttribute;
    Title: StringAttribute;
    Summary: StringAttribute;
    DateWritten: DateAttribute;
    Tags: RelationAttribute<"api::blog-post.blog-post", "oneToMany", "api::blog-tag.blog-tag">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::blog-post.blog-post", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::blog-post.blog-post", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiBlogTagBlogTag extends CollectionTypeSchema {
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
    Tag: StringAttribute;
    BlogPost: RelationAttribute<"api::blog-tag.blog-tag", "manyToOne", "api::blog-post.blog-post">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::blog-tag.blog-tag", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::blog-tag.blog-tag", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiCountryCountry extends CollectionTypeSchema {
  info: {
    singularName: "country";
    pluralName: "countries";
    displayName: "Country";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: StringAttribute;
    Content: RichTextAttribute;
    Project: RelationAttribute<"api::country.country", "manyToOne", "api::project.project">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::country.country", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::country.country", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiFaqFaq extends CollectionTypeSchema {
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
    Question: StringAttribute;
    Response: TextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::faq.faq", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::faq.faq", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiHomeContentHomeContent extends SingleTypeSchema {
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
    HeroImage: ComponentAttribute<"page-content.cover-image">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::home-content.home-content", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::home-content.home-content", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiMemberMember extends CollectionTypeSchema {
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
    Name: StringAttribute;
    Photo: MediaAttribute;
    Organisation: EnumerationAttribute<["AMI", "SAMI"]>;
    Bio: RichTextAttribute;
    Email: EmailAttribute;
    LinkedIn: StringAttribute;
    BioImage: MediaAttribute;
    Order: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::member.member", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::member.member", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiProjectProject extends CollectionTypeSchema {
  info: {
    singularName: "project";
    pluralName: "projects";
    displayName: "Project Page";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: StringAttribute;
    Summary: RichTextAttribute;
    ProjectTypes: RelationAttribute<"api::project.project", "oneToMany", "api::project-type.project-type">;
    Country: RelationAttribute<"api::project.project", "oneToMany", "api::country.country">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::project.project", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::project.project", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiProjectTypeProjectType extends CollectionTypeSchema {
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
    Name: StringAttribute;
    Content: RichTextAttribute;
    Project: RelationAttribute<"api::project-type.project-type", "manyToOne", "api::project.project">;
    Summary: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::project-type.project-type", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::project-type.project-type", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiResourceResource extends CollectionTypeSchema {
  info: {
    singularName: "resource";
    pluralName: "resources";
    displayName: "Resource Page";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: StringAttribute;
    Image: MediaAttribute;
    Description: TextAttribute;
    Media: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::resource.resource", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::resource.resource", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface ApiVolunteerVolunteer extends CollectionTypeSchema {
  info: {
    singularName: "volunteer";
    pluralName: "volunteers";
    displayName: "Volunteer Page";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: RichTextAttribute;
    ApplicationLink: StringAttribute;
    Title: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::volunteer.volunteer", "oneToOne", "admin::user"> & PrivateAttribute;
    updatedBy: RelationAttribute<"api::volunteer.volunteer", "oneToOne", "admin::user"> & PrivateAttribute;
  };
}

export interface PageContentCoverImage extends ComponentSchema {
  info: {
    displayName: "HeroImage";
    description: "";
  };
  attributes: {
    Image: MediaAttribute;
    ImageText: StringAttribute;
    ButtonText: StringAttribute;
    ButtonLink: StringAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
      "api::about.about": ApiAboutAbout;
      "api::annual-report.annual-report": ApiAnnualReportAnnualReport;
      "api::blog-post.blog-post": ApiBlogPostBlogPost;
      "api::blog-tag.blog-tag": ApiBlogTagBlogTag;
      "api::country.country": ApiCountryCountry;
      "api::faq.faq": ApiFaqFaq;
      "api::home-content.home-content": ApiHomeContentHomeContent;
      "api::member.member": ApiMemberMember;
      "api::project.project": ApiProjectProject;
      "api::project-type.project-type": ApiProjectTypeProjectType;
      "api::resource.resource": ApiResourceResource;
      "api::volunteer.volunteer": ApiVolunteerVolunteer;
      "page-content.cover-image": PageContentCoverImage;
    }
  }
}
