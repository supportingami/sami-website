import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BlogPostContentBlocksDynamicZoneInput: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  DynamicContentContentDynamicZoneInput: { input: any; output: any };
  JSON: { input: any; output: any };
  ProjectTypePageContentDynamicZoneInput: { input: any; output: any };
  VolunteerContentContentDynamicZoneInput: { input: any; output: any };
};

export type AboutContent = {
  __typename?: "AboutContent";
  Intro?: Maybe<Scalars["String"]["output"]>;
  Testimonials: Array<Maybe<Testimonial>>;
  Testimonials_connection?: Maybe<TestimonialRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AboutContentTestimonialsArgs = {
  filters?: InputMaybe<TestimonialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AboutContentTestimonials_ConnectionArgs = {
  filters?: InputMaybe<TestimonialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AboutContentInput = {
  Intro?: InputMaybe<Scalars["String"]["input"]>;
  Testimonials?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type AnnualReport = {
  __typename?: "AnnualReport";
  CoverImage: UploadFile;
  File: UploadFile;
  Year: Scalars["Int"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AnnualReportEntityResponseCollection = {
  __typename?: "AnnualReportEntityResponseCollection";
  nodes: Array<AnnualReport>;
  pageInfo: Pagination;
};

export type AnnualReportFiltersInput = {
  Year?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<AnnualReportFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AnnualReportFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AnnualReportFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AnnualReportInput = {
  CoverImage?: InputMaybe<Scalars["ID"]["input"]>;
  File?: InputMaybe<Scalars["ID"]["input"]>;
  Year?: InputMaybe<Scalars["Int"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type BlogPost = {
  __typename?: "BlogPost";
  ContentBlocks?: Maybe<Array<Maybe<BlogPostContentBlocksDynamicZone>>>;
  DateWritten?: Maybe<Scalars["Date"]["output"]>;
  FeatureImage?: Maybe<UploadFile>;
  Slug?: Maybe<Scalars["String"]["output"]>;
  Summary?: Maybe<Scalars["String"]["output"]>;
  Title: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type BlogPostContentBlocksDynamicZone =
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | Error;

export type BlogPostEntityResponseCollection = {
  __typename?: "BlogPostEntityResponseCollection";
  nodes: Array<BlogPost>;
  pageInfo: Pagination;
};

export type BlogPostFiltersInput = {
  DateWritten?: InputMaybe<DateFilterInput>;
  Slug?: InputMaybe<StringFilterInput>;
  Summary?: InputMaybe<StringFilterInput>;
  Title?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<BlogPostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BlogPostInput = {
  ContentBlocks?: InputMaybe<Array<Scalars["BlogPostContentBlocksDynamicZoneInput"]["input"]>>;
  DateWritten?: InputMaybe<Scalars["Date"]["input"]>;
  FeatureImage?: InputMaybe<Scalars["ID"]["input"]>;
  Slug?: InputMaybe<Scalars["String"]["input"]>;
  Summary?: InputMaybe<Scalars["String"]["input"]>;
  Title?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]["input"]>;
  containsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  eqi?: InputMaybe<Scalars["Boolean"]["input"]>;
  gt?: InputMaybe<Scalars["Boolean"]["input"]>;
  gte?: InputMaybe<Scalars["Boolean"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]["input"]>;
  lte?: InputMaybe<Scalars["Boolean"]["input"]>;
  ne?: InputMaybe<Scalars["Boolean"]["input"]>;
  nei?: InputMaybe<Scalars["Boolean"]["input"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ComponentCommonActionButton = {
  __typename?: "ComponentCommonActionButton";
  ClassNames?: Maybe<Scalars["String"]["output"]>;
  Link: Scalars["String"]["output"];
  Text: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type ComponentCommonActionButtonFiltersInput = {
  ClassNames?: InputMaybe<StringFilterInput>;
  Link?: InputMaybe<StringFilterInput>;
  Text?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonFiltersInput>>>;
  not?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonFiltersInput>>>;
};

export type ComponentCommonActionButtonInput = {
  ClassNames?: InputMaybe<Scalars["String"]["input"]>;
  Link?: InputMaybe<Scalars["String"]["input"]>;
  Text?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentCommonHtml = {
  __typename?: "ComponentCommonHtml";
  HTML?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentCommonImage = {
  __typename?: "ComponentCommonImage";
  AltText?: Maybe<Scalars["String"]["output"]>;
  Caption?: Maybe<Scalars["String"]["output"]>;
  ClassNames?: Maybe<Scalars["String"]["output"]>;
  Media: UploadFile;
  id: Scalars["ID"]["output"];
};

export type ComponentCommonTextBlock = {
  __typename?: "ComponentCommonTextBlock";
  Text: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type ComponentHomeGetInvolved = {
  __typename?: "ComponentHomeGetInvolved";
  ActionButtons?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Description?: Maybe<Scalars["String"]["output"]>;
  Image?: Maybe<UploadFile>;
  Text?: Maybe<Scalars["String"]["output"]>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomeGetInvolvedActionButtonsArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentHomeGetInvolvedInput = {
  ActionButtons?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Description?: InputMaybe<Scalars["String"]["input"]>;
  Image?: InputMaybe<Scalars["ID"]["input"]>;
  Text?: InputMaybe<Scalars["String"]["input"]>;
  Title?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentHomeHeroImage = {
  __typename?: "ComponentHomeHeroImage";
  ActionButtons?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Image: UploadFile;
  Text: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type ComponentHomeHeroImageActionButtonsArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentHomeHeroImageFiltersInput = {
  ActionButtons?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  Text?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentHomeHeroImageFiltersInput>>>;
  not?: InputMaybe<ComponentHomeHeroImageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomeHeroImageFiltersInput>>>;
};

export type ComponentHomeHeroImageInput = {
  ActionButtons?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Image?: InputMaybe<Scalars["ID"]["input"]>;
  Text?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentHomeImpactNumbers = {
  __typename?: "ComponentHomeImpactNumbers";
  Number?: Maybe<Scalars["String"]["output"]>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomeImpactNumbersFiltersInput = {
  Number?: InputMaybe<StringFilterInput>;
  Title?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentHomeImpactNumbersFiltersInput>>>;
  not?: InputMaybe<ComponentHomeImpactNumbersFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomeImpactNumbersFiltersInput>>>;
};

export type ComponentHomeImpactNumbersInput = {
  Number?: InputMaybe<Scalars["String"]["input"]>;
  Title?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentHomeImpactSection = {
  __typename?: "ComponentHomeImpactSection";
  ImpactNumbers?: Maybe<Array<Maybe<ComponentHomeImpactNumbers>>>;
  Statement?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomeImpactSectionImpactNumbersArgs = {
  filters?: InputMaybe<ComponentHomeImpactNumbersFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentHomeImpactSectionInput = {
  ImpactNumbers?: InputMaybe<Array<InputMaybe<ComponentHomeImpactNumbersInput>>>;
  Statement?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentHomeMissionStatement = {
  __typename?: "ComponentHomeMissionStatement";
  ActionButtons?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Description?: Maybe<Scalars["String"]["output"]>;
  Heading?: Maybe<Scalars["String"]["output"]>;
  Image?: Maybe<UploadFile>;
  Text?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomeMissionStatementActionButtonsArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentHomeMissionStatementInput = {
  ActionButtons?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Description?: InputMaybe<Scalars["String"]["input"]>;
  Heading?: InputMaybe<Scalars["String"]["input"]>;
  Image?: InputMaybe<Scalars["ID"]["input"]>;
  Text?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentHomeProjectSummary = {
  __typename?: "ComponentHomeProjectSummary";
  ActionButtons?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Image?: Maybe<UploadFile>;
  Text?: Maybe<Scalars["String"]["output"]>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type ComponentHomeProjectSummaryActionButtonsArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentHomeProjectSummaryInput = {
  ActionButtons?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Image?: InputMaybe<Scalars["ID"]["input"]>;
  Text?: InputMaybe<Scalars["String"]["input"]>;
  Title?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentHomeProjectSummaryItem = {
  __typename?: "ComponentHomeProjectSummaryItem";
  Description?: Maybe<Scalars["String"]["output"]>;
  Icon?: Maybe<UploadFile>;
  Title?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  contains?: InputMaybe<Scalars["Date"]["input"]>;
  containsi?: InputMaybe<Scalars["Date"]["input"]>;
  endsWith?: InputMaybe<Scalars["Date"]["input"]>;
  eq?: InputMaybe<Scalars["Date"]["input"]>;
  eqi?: InputMaybe<Scalars["Date"]["input"]>;
  gt?: InputMaybe<Scalars["Date"]["input"]>;
  gte?: InputMaybe<Scalars["Date"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  lt?: InputMaybe<Scalars["Date"]["input"]>;
  lte?: InputMaybe<Scalars["Date"]["input"]>;
  ne?: InputMaybe<Scalars["Date"]["input"]>;
  nei?: InputMaybe<Scalars["Date"]["input"]>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars["Date"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Date"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Date"]["input"]>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]["input"]>;
  containsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  eqi?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  ne?: InputMaybe<Scalars["DateTime"]["input"]>;
  nei?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]["input"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type DeleteMutationResponse = {
  __typename?: "DeleteMutationResponse";
  documentId: Scalars["ID"]["output"];
};

export type DonateContent = {
  __typename?: "DonateContent";
  DonateStatement?: Maybe<ComponentHomeMissionStatement>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type DonateContentInput = {
  DonateStatement?: InputMaybe<ComponentHomeMissionStatementInput>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type Donor = {
  __typename?: "Donor";
  Logo: UploadFile;
  Name: Scalars["String"]["output"];
  SortOrder?: Maybe<Scalars["Float"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type DonorEntityResponseCollection = {
  __typename?: "DonorEntityResponseCollection";
  nodes: Array<Donor>;
  pageInfo: Pagination;
};

export type DonorFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  SortOrder?: InputMaybe<FloatFilterInput>;
  and?: InputMaybe<Array<InputMaybe<DonorFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<DonorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DonorFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DonorInput = {
  Logo?: InputMaybe<Scalars["ID"]["input"]>;
  Name?: InputMaybe<Scalars["String"]["input"]>;
  SortOrder?: InputMaybe<Scalars["Float"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type DynamicContent = {
  __typename?: "DynamicContent";
  Content?: Maybe<Array<Maybe<DynamicContentContentDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type DynamicContentContentDynamicZone =
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | Error;

export type DynamicContentInput = {
  Content?: InputMaybe<Array<Scalars["DynamicContentContentDynamicZoneInput"]["input"]>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export enum Enum_Projecttype_Status {
  Completed = "Completed",
  Ongoing = "Ongoing",
}

export type Error = {
  __typename?: "Error";
  code: Scalars["String"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
};

export type Faq = {
  __typename?: "Faq";
  Question?: Maybe<Scalars["String"]["output"]>;
  Response?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type FaqEntityResponseCollection = {
  __typename?: "FaqEntityResponseCollection";
  nodes: Array<Faq>;
  pageInfo: Pagination;
};

export type FaqFiltersInput = {
  Question?: InputMaybe<StringFilterInput>;
  Response?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<FaqFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FaqInput = {
  Question?: InputMaybe<Scalars["String"]["input"]>;
  Response?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type FaqRelationResponseCollection = {
  __typename?: "FaqRelationResponseCollection";
  nodes: Array<Faq>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]["input"]>;
  caption?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  contains?: InputMaybe<Scalars["Float"]["input"]>;
  containsi?: InputMaybe<Scalars["Float"]["input"]>;
  endsWith?: InputMaybe<Scalars["Float"]["input"]>;
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  eqi?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  ne?: InputMaybe<Scalars["Float"]["input"]>;
  nei?: InputMaybe<Scalars["Float"]["input"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Float"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]["input"]>;
};

export type GenericMorph =
  | AboutContent
  | AnnualReport
  | BlogPost
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | ComponentHomeGetInvolved
  | ComponentHomeHeroImage
  | ComponentHomeImpactNumbers
  | ComponentHomeImpactSection
  | ComponentHomeMissionStatement
  | ComponentHomeProjectSummary
  | ComponentHomeProjectSummaryItem
  | DonateContent
  | Donor
  | DynamicContent
  | Faq
  | HomeContent
  | I18NLocale
  | Member
  | Partner
  | ProjectType
  | Resource
  | ReviewWorkflowsWorkflow
  | ReviewWorkflowsWorkflowStage
  | Testimonial
  | UploadFile
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser
  | VolunteerContent;

export type HomeContent = {
  __typename?: "HomeContent";
  GetInvolved?: Maybe<ComponentHomeGetInvolved>;
  HeroImages?: Maybe<Array<Maybe<ComponentHomeHeroImage>>>;
  ImpactSection?: Maybe<ComponentHomeImpactSection>;
  MissionStatement?: Maybe<ComponentHomeMissionStatement>;
  ProjectSummary?: Maybe<ComponentHomeProjectSummary>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type HomeContentHeroImagesArgs = {
  filters?: InputMaybe<ComponentHomeHeroImageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type HomeContentInput = {
  GetInvolved?: InputMaybe<ComponentHomeGetInvolvedInput>;
  HeroImages?: InputMaybe<Array<InputMaybe<ComponentHomeHeroImageInput>>>;
  ImpactSection?: InputMaybe<ComponentHomeImpactSectionInput>;
  MissionStatement?: InputMaybe<ComponentHomeMissionStatementInput>;
  ProjectSummary?: InputMaybe<ComponentHomeProjectSummaryInput>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type I18NLocale = {
  __typename?: "I18NLocale";
  code?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: "I18NLocaleEntityResponseCollection";
  nodes: Array<I18NLocale>;
  pageInfo: Pagination;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  contains?: InputMaybe<Scalars["ID"]["input"]>;
  containsi?: InputMaybe<Scalars["ID"]["input"]>;
  endsWith?: InputMaybe<Scalars["ID"]["input"]>;
  eq?: InputMaybe<Scalars["ID"]["input"]>;
  eqi?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  ne?: InputMaybe<Scalars["ID"]["input"]>;
  nei?: InputMaybe<Scalars["ID"]["input"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]["input"]>;
  notContainsi?: InputMaybe<Scalars["ID"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  contains?: InputMaybe<Scalars["Int"]["input"]>;
  containsi?: InputMaybe<Scalars["Int"]["input"]>;
  endsWith?: InputMaybe<Scalars["Int"]["input"]>;
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  eqi?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  ne?: InputMaybe<Scalars["Int"]["input"]>;
  nei?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Int"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]["input"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  contains?: InputMaybe<Scalars["JSON"]["input"]>;
  containsi?: InputMaybe<Scalars["JSON"]["input"]>;
  endsWith?: InputMaybe<Scalars["JSON"]["input"]>;
  eq?: InputMaybe<Scalars["JSON"]["input"]>;
  eqi?: InputMaybe<Scalars["JSON"]["input"]>;
  gt?: InputMaybe<Scalars["JSON"]["input"]>;
  gte?: InputMaybe<Scalars["JSON"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  lt?: InputMaybe<Scalars["JSON"]["input"]>;
  lte?: InputMaybe<Scalars["JSON"]["input"]>;
  ne?: InputMaybe<Scalars["JSON"]["input"]>;
  nei?: InputMaybe<Scalars["JSON"]["input"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]["input"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type Member = {
  __typename?: "Member";
  Bio?: Maybe<Scalars["String"]["output"]>;
  BioImage?: Maybe<UploadFile>;
  Email?: Maybe<Scalars["String"]["output"]>;
  LinkedIn?: Maybe<Scalars["String"]["output"]>;
  Name?: Maybe<Scalars["String"]["output"]>;
  Photo?: Maybe<UploadFile>;
  SortOrder?: Maybe<Scalars["Float"]["output"]>;
  Tags?: Maybe<Scalars["JSON"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type MemberEntityResponseCollection = {
  __typename?: "MemberEntityResponseCollection";
  nodes: Array<Member>;
  pageInfo: Pagination;
};

export type MemberFiltersInput = {
  Bio?: InputMaybe<StringFilterInput>;
  Email?: InputMaybe<StringFilterInput>;
  LinkedIn?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  SortOrder?: InputMaybe<FloatFilterInput>;
  Tags?: InputMaybe<JsonFilterInput>;
  and?: InputMaybe<Array<InputMaybe<MemberFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<MemberFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MemberFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MemberInput = {
  Bio?: InputMaybe<Scalars["String"]["input"]>;
  BioImage?: InputMaybe<Scalars["ID"]["input"]>;
  Email?: InputMaybe<Scalars["String"]["input"]>;
  LinkedIn?: InputMaybe<Scalars["String"]["input"]>;
  Name?: InputMaybe<Scalars["String"]["input"]>;
  Photo?: InputMaybe<Scalars["ID"]["input"]>;
  SortOrder?: InputMaybe<Scalars["Float"]["input"]>;
  Tags?: InputMaybe<Scalars["JSON"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAnnualReport?: Maybe<AnnualReport>;
  createBlogPost?: Maybe<BlogPost>;
  createDonor?: Maybe<Donor>;
  createFaq?: Maybe<Faq>;
  createMember?: Maybe<Member>;
  createPartner?: Maybe<Partner>;
  createProjectType?: Maybe<ProjectType>;
  createResource?: Maybe<Resource>;
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  createTestimonial?: Maybe<Testimonial>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteAboutContent?: Maybe<DeleteMutationResponse>;
  deleteAnnualReport?: Maybe<DeleteMutationResponse>;
  deleteBlogPost?: Maybe<DeleteMutationResponse>;
  deleteDonateContent?: Maybe<DeleteMutationResponse>;
  deleteDonor?: Maybe<DeleteMutationResponse>;
  deleteDynamicContent?: Maybe<DeleteMutationResponse>;
  deleteFaq?: Maybe<DeleteMutationResponse>;
  deleteHomeContent?: Maybe<DeleteMutationResponse>;
  deleteMember?: Maybe<DeleteMutationResponse>;
  deletePartner?: Maybe<DeleteMutationResponse>;
  deleteProjectType?: Maybe<DeleteMutationResponse>;
  deleteResource?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>;
  deleteTestimonial?: Maybe<DeleteMutationResponse>;
  deleteUploadFile?: Maybe<UploadFile>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVolunteerContent?: Maybe<DeleteMutationResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAboutContent?: Maybe<AboutContent>;
  updateAnnualReport?: Maybe<AnnualReport>;
  updateBlogPost?: Maybe<BlogPost>;
  updateDonateContent?: Maybe<DonateContent>;
  updateDonor?: Maybe<Donor>;
  updateDynamicContent?: Maybe<DynamicContent>;
  updateFaq?: Maybe<Faq>;
  updateHomeContent?: Maybe<HomeContent>;
  updateMember?: Maybe<Member>;
  updatePartner?: Maybe<Partner>;
  updateProjectType?: Maybe<ProjectType>;
  updateResource?: Maybe<Resource>;
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  updateTestimonial?: Maybe<Testimonial>;
  updateUploadFile: UploadFile;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVolunteerContent?: Maybe<VolunteerContent>;
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  passwordConfirmation: Scalars["String"]["input"];
};

export type MutationCreateAnnualReportArgs = {
  data: AnnualReportInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateBlogPostArgs = {
  data: BlogPostInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateDonorArgs = {
  data: DonorInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateFaqArgs = {
  data: FaqInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateMemberArgs = {
  data: MemberInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreatePartnerArgs = {
  data: PartnerInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateProjectTypeArgs = {
  data: ProjectTypeInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateResourceArgs = {
  data: ResourceInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateTestimonialArgs = {
  data: TestimonialInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationDeleteAnnualReportArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteBlogPostArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteDonorArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteFaqArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteMemberArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeletePartnerArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteProjectTypeArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteResourceArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteTestimonialArgs = {
  documentId: Scalars["ID"]["input"];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"]["input"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationResetPasswordArgs = {
  code: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  passwordConfirmation: Scalars["String"]["input"];
};

export type MutationUpdateAboutContentArgs = {
  data: AboutContentInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateAnnualReportArgs = {
  data: AnnualReportInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateBlogPostArgs = {
  data: BlogPostInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateDonateContentArgs = {
  data: DonateContentInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateDonorArgs = {
  data: DonorInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateDynamicContentArgs = {
  data: DynamicContentInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateFaqArgs = {
  data: FaqInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateHomeContentArgs = {
  data: HomeContentInput;
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateMemberArgs = {
  data: MemberInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdatePartnerArgs = {
  data: PartnerInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateProjectTypeArgs = {
  data: ProjectTypeInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateResourceArgs = {
  data: ResourceInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateTestimonialArgs = {
  data: TestimonialInput;
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type MutationUpdateUploadFileArgs = {
  id: Scalars["ID"]["input"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateVolunteerContentArgs = {
  data: VolunteerContentInput;
  status?: InputMaybe<PublicationStatus>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"]["output"];
  pageCount: Scalars["Int"]["output"];
  pageSize: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Partner = {
  __typename?: "Partner";
  Logo: UploadFile;
  Name: Scalars["String"]["output"];
  SortOrder?: Maybe<Scalars["Float"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PartnerEntityResponseCollection = {
  __typename?: "PartnerEntityResponseCollection";
  nodes: Array<Partner>;
  pageInfo: Pagination;
};

export type PartnerFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  SortOrder?: InputMaybe<FloatFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PartnerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PartnerInput = {
  Logo?: InputMaybe<Scalars["ID"]["input"]>;
  Name?: InputMaybe<Scalars["String"]["input"]>;
  SortOrder?: InputMaybe<Scalars["Float"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type ProjectType = {
  __typename?: "ProjectType";
  FeatureImage?: Maybe<UploadFile>;
  HomeSummary?: Maybe<Scalars["String"]["output"]>;
  Icon?: Maybe<UploadFile>;
  Name?: Maybe<Scalars["String"]["output"]>;
  PageContent?: Maybe<Array<Maybe<ProjectTypePageContentDynamicZone>>>;
  PageSummary?: Maybe<Scalars["String"]["output"]>;
  Slug: Scalars["String"]["output"];
  Status?: Maybe<Enum_Projecttype_Status>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ProjectTypeEntityResponseCollection = {
  __typename?: "ProjectTypeEntityResponseCollection";
  nodes: Array<ProjectType>;
  pageInfo: Pagination;
};

export type ProjectTypeFiltersInput = {
  HomeSummary?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  PageSummary?: InputMaybe<StringFilterInput>;
  Slug?: InputMaybe<StringFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ProjectTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ProjectTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProjectTypeFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProjectTypeInput = {
  FeatureImage?: InputMaybe<Scalars["ID"]["input"]>;
  HomeSummary?: InputMaybe<Scalars["String"]["input"]>;
  Icon?: InputMaybe<Scalars["ID"]["input"]>;
  Name?: InputMaybe<Scalars["String"]["input"]>;
  PageContent?: InputMaybe<Array<Scalars["ProjectTypePageContentDynamicZoneInput"]["input"]>>;
  PageSummary?: InputMaybe<Scalars["String"]["input"]>;
  Slug?: InputMaybe<Scalars["String"]["input"]>;
  Status?: InputMaybe<Enum_Projecttype_Status>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type ProjectTypePageContentDynamicZone =
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | Error;

export enum PublicationStatus {
  Draft = "DRAFT",
  Published = "PUBLISHED",
}

export type Query = {
  __typename?: "Query";
  aboutContent?: Maybe<AboutContent>;
  annualReport?: Maybe<AnnualReport>;
  annualReports: Array<Maybe<AnnualReport>>;
  annualReports_connection?: Maybe<AnnualReportEntityResponseCollection>;
  blogPost?: Maybe<BlogPost>;
  blogPosts: Array<Maybe<BlogPost>>;
  blogPosts_connection?: Maybe<BlogPostEntityResponseCollection>;
  donateContent?: Maybe<DonateContent>;
  donor?: Maybe<Donor>;
  donors: Array<Maybe<Donor>>;
  donors_connection?: Maybe<DonorEntityResponseCollection>;
  dynamicContent?: Maybe<DynamicContent>;
  faq?: Maybe<Faq>;
  faqs: Array<Maybe<Faq>>;
  faqs_connection?: Maybe<FaqEntityResponseCollection>;
  homeContent?: Maybe<HomeContent>;
  i18NLocale?: Maybe<I18NLocale>;
  i18NLocales: Array<Maybe<I18NLocale>>;
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  member?: Maybe<Member>;
  members: Array<Maybe<Member>>;
  members_connection?: Maybe<MemberEntityResponseCollection>;
  partner?: Maybe<Partner>;
  partners: Array<Maybe<Partner>>;
  partners_connection?: Maybe<PartnerEntityResponseCollection>;
  projectType?: Maybe<ProjectType>;
  projectTypes: Array<Maybe<ProjectType>>;
  projectTypes_connection?: Maybe<ProjectTypeEntityResponseCollection>;
  resource?: Maybe<Resource>;
  resources: Array<Maybe<Resource>>;
  resources_connection?: Maybe<ResourceEntityResponseCollection>;
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>;
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>;
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>;
  testimonial?: Maybe<Testimonial>;
  testimonials: Array<Maybe<Testimonial>>;
  testimonials_connection?: Maybe<TestimonialEntityResponseCollection>;
  uploadFile?: Maybe<UploadFile>;
  uploadFiles: Array<Maybe<UploadFile>>;
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRole>;
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>;
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUser>;
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>;
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  volunteerContent?: Maybe<VolunteerContent>;
};

export type QueryAboutContentArgs = {
  status?: InputMaybe<PublicationStatus>;
};

export type QueryAnnualReportArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryAnnualReportsArgs = {
  filters?: InputMaybe<AnnualReportFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryAnnualReports_ConnectionArgs = {
  filters?: InputMaybe<AnnualReportFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryBlogPostArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryBlogPosts_ConnectionArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryDonateContentArgs = {
  status?: InputMaybe<PublicationStatus>;
};

export type QueryDonorArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryDonorsArgs = {
  filters?: InputMaybe<DonorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryDonors_ConnectionArgs = {
  filters?: InputMaybe<DonorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryDynamicContentArgs = {
  status?: InputMaybe<PublicationStatus>;
};

export type QueryFaqArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryFaqs_ConnectionArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryHomeContentArgs = {
  status?: InputMaybe<PublicationStatus>;
};

export type QueryI18NLocaleArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryMemberArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryMembersArgs = {
  filters?: InputMaybe<MemberFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryMembers_ConnectionArgs = {
  filters?: InputMaybe<MemberFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPartnerArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPartnersArgs = {
  filters?: InputMaybe<PartnerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryPartners_ConnectionArgs = {
  filters?: InputMaybe<PartnerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryProjectTypeArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryProjectTypesArgs = {
  filters?: InputMaybe<ProjectTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryProjectTypes_ConnectionArgs = {
  filters?: InputMaybe<ProjectTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryResourceArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryResourcesArgs = {
  filters?: InputMaybe<ResourceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryResources_ConnectionArgs = {
  filters?: InputMaybe<ResourceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryTestimonialArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryTestimonialsArgs = {
  filters?: InputMaybe<TestimonialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryTestimonials_ConnectionArgs = {
  filters?: InputMaybe<TestimonialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUploadFileArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars["ID"]["input"];
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type QueryVolunteerContentArgs = {
  status?: InputMaybe<PublicationStatus>;
};

export type Resource = {
  __typename?: "Resource";
  Description?: Maybe<Scalars["String"]["output"]>;
  Image?: Maybe<UploadFile>;
  Links?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Media?: Maybe<UploadFile>;
  Title?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ResourceLinksArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ResourceEntityResponseCollection = {
  __typename?: "ResourceEntityResponseCollection";
  nodes: Array<Resource>;
  pageInfo: Pagination;
};

export type ResourceFiltersInput = {
  Description?: InputMaybe<StringFilterInput>;
  Links?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  Title?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ResourceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ResourceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ResourceFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ResourceInput = {
  Description?: InputMaybe<Scalars["String"]["input"]>;
  Image?: InputMaybe<Scalars["ID"]["input"]>;
  Links?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Media?: InputMaybe<Scalars["ID"]["input"]>;
  Title?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type ReviewWorkflowsWorkflow = {
  __typename?: "ReviewWorkflowsWorkflow";
  contentTypes: Scalars["JSON"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  stageRequiredToPublish?: Maybe<ReviewWorkflowsWorkflowStage>;
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  __typename?: "ReviewWorkflowsWorkflowEntityResponseCollection";
  nodes: Array<ReviewWorkflowsWorkflow>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  contentTypes?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars["JSON"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  stageRequiredToPublish?: InputMaybe<Scalars["ID"]["input"]>;
  stages?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ReviewWorkflowsWorkflowStage = {
  __typename?: "ReviewWorkflowsWorkflowStage";
  color?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  workflow?: Maybe<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  __typename?: "ReviewWorkflowsWorkflowStageEntityResponseCollection";
  nodes: Array<ReviewWorkflowsWorkflowStage>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
};

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  workflow?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  __typename?: "ReviewWorkflowsWorkflowStageRelationResponseCollection";
  nodes: Array<ReviewWorkflowsWorkflowStage>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  containsi?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  eqi?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  nei?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]["input"]>;
  notContainsi?: InputMaybe<Scalars["String"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type Testimonial = {
  __typename?: "Testimonial";
  Bio: Scalars["String"]["output"];
  Content: Scalars["String"]["output"];
  Name: Scalars["String"]["output"];
  Photo: UploadFile;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type TestimonialEntityResponseCollection = {
  __typename?: "TestimonialEntityResponseCollection";
  nodes: Array<Testimonial>;
  pageInfo: Pagination;
};

export type TestimonialFiltersInput = {
  Bio?: InputMaybe<StringFilterInput>;
  Content?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<TestimonialFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TestimonialFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TestimonialFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TestimonialInput = {
  Bio?: InputMaybe<Scalars["String"]["input"]>;
  Content?: InputMaybe<Scalars["String"]["input"]>;
  Name?: InputMaybe<Scalars["String"]["input"]>;
  Photo?: InputMaybe<Scalars["ID"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type TestimonialRelationResponseCollection = {
  __typename?: "TestimonialRelationResponseCollection";
  nodes: Array<Testimonial>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  alternativeText?: Maybe<Scalars["String"]["output"]>;
  caption?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  ext?: Maybe<Scalars["String"]["output"]>;
  formats?: Maybe<Scalars["JSON"]["output"]>;
  hash: Scalars["String"]["output"];
  height?: Maybe<Scalars["Int"]["output"]>;
  mime: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  previewUrl?: Maybe<Scalars["String"]["output"]>;
  provider: Scalars["String"]["output"];
  provider_metadata?: Maybe<Scalars["JSON"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars["Float"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  url: Scalars["String"]["output"];
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: "UploadFileEntityResponseCollection";
  nodes: Array<UploadFile>;
  pageInfo: Pagination;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: "UsersPermissionsCreateRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: "UsersPermissionsDeleteRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  provider?: Scalars["String"]["input"];
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]["output"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  blocked?: Maybe<Scalars["Boolean"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  documentId: Scalars["ID"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars["String"]["output"];
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  type?: Maybe<Scalars["String"]["output"]>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: "UsersPermissionsPasswordPayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  action: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: "UsersPermissionsPermissionRelationResponseCollection";
  nodes: Array<UsersPermissionsPermission>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  documentId: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  permissions: Array<Maybe<UsersPermissionsPermission>>;
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  users: Array<Maybe<UsersPermissionsUser>>;
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: "UsersPermissionsRoleEntityResponseCollection";
  nodes: Array<UsersPermissionsRole>;
  pageInfo: Pagination;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: "UsersPermissionsUpdateRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  blocked?: Maybe<Scalars["Boolean"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  email: Scalars["String"]["output"];
  provider?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  username: Scalars["String"]["output"];
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: "UsersPermissionsUserEntityResponse";
  data?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: "UsersPermissionsUserEntityResponseCollection";
  nodes: Array<UsersPermissionsUser>;
  pageInfo: Pagination;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]["input"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  role?: InputMaybe<Scalars["ID"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: "UsersPermissionsUserRelationResponseCollection";
  nodes: Array<UsersPermissionsUser>;
};

export type VolunteerContent = {
  __typename?: "VolunteerContent";
  Content?: Maybe<Array<Maybe<VolunteerContentContentDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  documentId: Scalars["ID"]["output"];
  faqs: Array<Maybe<Faq>>;
  faqs_connection?: Maybe<FaqRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type VolunteerContentFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VolunteerContentFaqs_ConnectionArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VolunteerContentContentDynamicZone =
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | Error;

export type VolunteerContentInput = {
  Content?: InputMaybe<Array<Scalars["VolunteerContentContentDynamicZoneInput"]["input"]>>;
  faqs?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type AboutContentQueryVariables = Exact<{ [key: string]: never }>;

export type AboutContentQuery = {
  __typename?: "Query";
  aboutContent?: {
    __typename?: "AboutContent";
    Intro?: string | null;
    Testimonials_connection?: {
      __typename?: "TestimonialRelationResponseCollection";
      nodes: Array<{
        __typename?: "Testimonial";
        Bio: string;
        Content: string;
        Name: string;
        Photo: { __typename?: "UploadFile"; name: string; url: string; size: number };
      }>;
    } | null;
  } | null;
};

export type AnnualReportsQueryVariables = Exact<{ [key: string]: never }>;

export type AnnualReportsQuery = {
  __typename?: "Query";
  annualReports_connection?: {
    __typename?: "AnnualReportEntityResponseCollection";
    nodes: Array<{
      __typename?: "AnnualReport";
      documentId: string;
      Year: number;
      File: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number };
      CoverImage: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number };
    }>;
    pageInfo: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
  } | null;
};

export type BlogPostContentQueryVariables = Exact<{
  filters?: InputMaybe<BlogPostFiltersInput>;
}>;

export type BlogPostContentQuery = {
  __typename?: "Query";
  blogPosts_connection?: {
    __typename?: "BlogPostEntityResponseCollection";
    nodes: Array<{
      __typename?: "BlogPost";
      documentId: string;
      Title: string;
      DateWritten?: any | null;
      Slug?: string | null;
      ContentBlocks?: Array<
        | { __typename: "ComponentCommonActionButton"; ClassNames?: string | null; Link: string; Text: string }
        | { __typename: "ComponentCommonHtml"; HTML?: string | null }
        | {
            __typename: "ComponentCommonImage";
            AltText?: string | null;
            Caption?: string | null;
            ClassNames?: string | null;
            Media: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number };
          }
        | { __typename: "ComponentCommonTextBlock"; Text: string }
        | { __typename: "Error" }
        | null
      > | null;
    }>;
  } | null;
};

export type BlogPostsQueryVariables = Exact<{ [key: string]: never }>;

export type BlogPostsQuery = {
  __typename?: "Query";
  blogPosts_connection?: {
    __typename?: "BlogPostEntityResponseCollection";
    nodes: Array<{
      __typename?: "BlogPost";
      documentId: string;
      Title: string;
      Summary?: string | null;
      DateWritten?: any | null;
      Slug?: string | null;
      FeatureImage?: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number } | null;
    }>;
  } | null;
};

export type DonateContentQueryVariables = Exact<{ [key: string]: never }>;

export type DonateContentQuery = {
  __typename?: "Query";
  donateContent?: {
    __typename?: "DonateContent";
    documentId: string;
    DonateStatement?: {
      __typename?: "ComponentHomeMissionStatement";
      id: string;
      Heading?: string | null;
      Text?: string | null;
      Description?: string | null;
      Image?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
      ActionButtons?: Array<{
        __typename?: "ComponentCommonActionButton";
        id: string;
        Text: string;
        Link: string;
      } | null> | null;
    } | null;
  } | null;
};

export type DonorsQueryVariables = Exact<{ [key: string]: never }>;

export type DonorsQuery = {
  __typename?: "Query";
  donors_connection?: {
    __typename?: "DonorEntityResponseCollection";
    nodes: Array<{
      __typename?: "Donor";
      documentId: string;
      Name: string;
      Logo: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number };
    }>;
    pageInfo: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
  } | null;
};

export type FaqsQueryVariables = Exact<{ [key: string]: never }>;

export type FaqsQuery = {
  __typename?: "Query";
  faqs_connection?: {
    __typename?: "FaqEntityResponseCollection";
    nodes: Array<{ __typename?: "Faq"; documentId: string; Question?: string | null; Response?: string | null }>;
    pageInfo: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
  } | null;
};

export type HomeContentQueryVariables = Exact<{ [key: string]: never }>;

export type HomeContentQuery = {
  __typename?: "Query";
  homeContent?: {
    __typename?: "HomeContent";
    documentId: string;
    HeroImages?: Array<{
      __typename?: "ComponentHomeHeroImage";
      id: string;
      Text: string;
      Image: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number };
      ActionButtons?: Array<{
        __typename?: "ComponentCommonActionButton";
        id: string;
        Text: string;
        Link: string;
      } | null> | null;
    } | null> | null;
    MissionStatement?: {
      __typename?: "ComponentHomeMissionStatement";
      id: string;
      Heading?: string | null;
      Text?: string | null;
      Description?: string | null;
      Image?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
      ActionButtons?: Array<{
        __typename?: "ComponentCommonActionButton";
        id: string;
        Text: string;
        Link: string;
      } | null> | null;
    } | null;
    ProjectSummary?: {
      __typename?: "ComponentHomeProjectSummary";
      id: string;
      Title?: string | null;
      Text?: string | null;
      Image?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
      ActionButtons?: Array<{
        __typename?: "ComponentCommonActionButton";
        id: string;
        Text: string;
        Link: string;
      } | null> | null;
    } | null;
    GetInvolved?: {
      __typename?: "ComponentHomeGetInvolved";
      id: string;
      Title?: string | null;
      Text?: string | null;
      Description?: string | null;
      Image?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
      ActionButtons?: Array<{
        __typename?: "ComponentCommonActionButton";
        id: string;
        Text: string;
        Link: string;
      } | null> | null;
    } | null;
    ImpactSection?: {
      __typename?: "ComponentHomeImpactSection";
      id: string;
      Statement?: string | null;
      ImpactNumbers?: Array<{
        __typename?: "ComponentHomeImpactNumbers";
        id: string;
        Number?: string | null;
        Title?: string | null;
      } | null> | null;
    } | null;
  } | null;
  projectTypes_connection?: {
    __typename?: "ProjectTypeEntityResponseCollection";
    nodes: Array<{
      __typename?: "ProjectType";
      documentId: string;
      Name?: string | null;
      HomeSummary?: string | null;
      Icon?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
    }>;
    pageInfo: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
  } | null;
  blogPosts_connection?: {
    __typename?: "BlogPostEntityResponseCollection";
    nodes: Array<{
      __typename?: "BlogPost";
      documentId: string;
      Title: string;
      Summary?: string | null;
      DateWritten?: any | null;
      Slug?: string | null;
      FeatureImage?: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number } | null;
    }>;
  } | null;
};

export type MembersQueryVariables = Exact<{ [key: string]: never }>;

export type MembersQuery = {
  __typename?: "Query";
  members_connection?: {
    __typename?: "MemberEntityResponseCollection";
    nodes: Array<{
      __typename?: "Member";
      documentId: string;
      Name?: string | null;
      Email?: string | null;
      Bio?: string | null;
      LinkedIn?: string | null;
      Tags?: any | null;
      Photo?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
      BioImage?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
    }>;
    pageInfo: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
  } | null;
};

export type PartnersQueryVariables = Exact<{ [key: string]: never }>;

export type PartnersQuery = {
  __typename?: "Query";
  partners_connection?: {
    __typename?: "PartnerEntityResponseCollection";
    nodes: Array<{
      __typename?: "Partner";
      documentId: string;
      Name: string;
      Logo: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number };
    }>;
  } | null;
};

export type ProjectsQueryVariables = Exact<{
  filters?: InputMaybe<ProjectTypeFiltersInput>;
}>;

export type ProjectsQuery = {
  __typename?: "Query";
  projectTypes_connection?: {
    __typename?: "ProjectTypeEntityResponseCollection";
    nodes: Array<{
      __typename?: "ProjectType";
      documentId: string;
      Name?: string | null;
      HomeSummary?: string | null;
      PageSummary?: string | null;
      Slug: string;
      Status?: Enum_Projecttype_Status | null;
      PageContent?: Array<
        | { __typename: "ComponentCommonActionButton"; ClassNames?: string | null; Link: string; Text: string }
        | { __typename: "ComponentCommonHtml"; HTML?: string | null }
        | {
            __typename: "ComponentCommonImage";
            AltText?: string | null;
            Caption?: string | null;
            ClassNames?: string | null;
            Media: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number };
          }
        | { __typename: "ComponentCommonTextBlock"; Text: string }
        | { __typename: "Error" }
        | null
      > | null;
      Icon?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
      FeatureImage?: { __typename?: "UploadFile"; documentId: string; url: string; name: string; size: number } | null;
    }>;
    pageInfo: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
  } | null;
};

export type ResourcesQueryVariables = Exact<{ [key: string]: never }>;

export type ResourcesQuery = {
  __typename?: "Query";
  resources_connection?: {
    __typename?: "ResourceEntityResponseCollection";
    nodes: Array<{
      __typename?: "Resource";
      documentId: string;
      Title?: string | null;
      Description?: string | null;
      Image?: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number } | null;
      Links?: Array<{
        __typename?: "ComponentCommonActionButton";
        id: string;
        Link: string;
        Text: string;
      } | null> | null;
      Media?: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number } | null;
    }>;
    pageInfo: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
  } | null;
};

export type VolunteerContentQueryVariables = Exact<{ [key: string]: never }>;

export type VolunteerContentQuery = {
  __typename?: "Query";
  volunteerContent?: {
    __typename: "VolunteerContent";
    documentId: string;
    Content?: Array<
      | {
          __typename: "ComponentCommonActionButton";
          id: string;
          ClassNames?: string | null;
          Link: string;
          Text: string;
        }
      | { __typename: "ComponentCommonHtml"; id: string; HTML?: string | null }
      | {
          __typename?: "ComponentCommonImage";
          AltText?: string | null;
          Caption?: string | null;
          ClassNames?: string | null;
          Media: { __typename?: "UploadFile"; documentId: string; name: string; url: string; size: number };
        }
      | { __typename: "ComponentCommonTextBlock"; id: string; Text: string }
      | { __typename?: "Error" }
      | null
    > | null;
  } | null;
};

export const AboutContentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "aboutContent" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "aboutContent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "Intro" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "Testimonials_connection" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Bio" } },
                            { kind: "Field", name: { kind: "Name", value: "Content" } },
                            { kind: "Field", name: { kind: "Name", value: "Name" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "Photo" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "url" } },
                                  { kind: "Field", name: { kind: "Name", value: "size" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AboutContentQuery, AboutContentQueryVariables>;
export const AnnualReportsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "annualReports" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "annualReports_connection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: { kind: "StringValue", value: "Year:DESC", block: false },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Year" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "File" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "CoverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                      { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      { kind: "Field", name: { kind: "Name", value: "pageCount" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnnualReportsQuery, AnnualReportsQueryVariables>;
export const BlogPostContentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "blogPostContent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filters" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "BlogPostFiltersInput" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "blogPosts_connection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: { kind: "StringValue", value: "DateWritten:DESC", block: false },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: { kind: "Variable", name: { kind: "Name", value: "filters" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Title" } },
                      { kind: "Field", name: { kind: "Name", value: "DateWritten" } },
                      { kind: "Field", name: { kind: "Name", value: "Slug" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ContentBlocks" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "ComponentCommonHtml" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [{ kind: "Field", name: { kind: "Name", value: "HTML" } }],
                              },
                            },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "ComponentCommonImage" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "AltText" } },
                                  { kind: "Field", name: { kind: "Name", value: "Caption" } },
                                  { kind: "Field", name: { kind: "Name", value: "ClassNames" } },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "Media" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "documentId" } },
                                        { kind: "Field", name: { kind: "Name", value: "name" } },
                                        { kind: "Field", name: { kind: "Name", value: "url" } },
                                        { kind: "Field", name: { kind: "Name", value: "size" } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "ComponentCommonTextBlock" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [{ kind: "Field", name: { kind: "Name", value: "Text" } }],
                              },
                            },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "ComponentCommonActionButton" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "ClassNames" } },
                                  { kind: "Field", name: { kind: "Name", value: "Link" } },
                                  { kind: "Field", name: { kind: "Name", value: "Text" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BlogPostContentQuery, BlogPostContentQueryVariables>;
export const BlogPostsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "blogPosts" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "blogPosts_connection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: { kind: "StringValue", value: "DateWritten:DESC", block: false },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Title" } },
                      { kind: "Field", name: { kind: "Name", value: "Summary" } },
                      { kind: "Field", name: { kind: "Name", value: "DateWritten" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "FeatureImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "Slug" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BlogPostsQuery, BlogPostsQueryVariables>;
export const DonateContentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "donateContent" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "donateContent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "documentId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "DonateStatement" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Image" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "Heading" } },
                      { kind: "Field", name: { kind: "Name", value: "Text" } },
                      { kind: "Field", name: { kind: "Name", value: "Description" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ActionButtons" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "Text" } },
                            { kind: "Field", name: { kind: "Name", value: "Link" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DonateContentQuery, DonateContentQueryVariables>;
export const DonorsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "donors" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "donors_connection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: { kind: "StringValue", value: "SortOrder:ASC", block: false },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Logo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                      { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      { kind: "Field", name: { kind: "Name", value: "pageCount" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DonorsQuery, DonorsQueryVariables>;
export const FaqsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "faqs" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "faqs_connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Question" } },
                      { kind: "Field", name: { kind: "Name", value: "Response" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                      { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      { kind: "Field", name: { kind: "Name", value: "pageCount" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FaqsQuery, FaqsQueryVariables>;
export const HomeContentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "homeContent" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "homeContent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "documentId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "HeroImages" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Image" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "Text" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ActionButtons" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "Text" } },
                            { kind: "Field", name: { kind: "Name", value: "Link" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "MissionStatement" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Image" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "Heading" } },
                      { kind: "Field", name: { kind: "Name", value: "Text" } },
                      { kind: "Field", name: { kind: "Name", value: "Description" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ActionButtons" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "Text" } },
                            { kind: "Field", name: { kind: "Name", value: "Link" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ProjectSummary" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "Title" } },
                      { kind: "Field", name: { kind: "Name", value: "Text" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Image" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ActionButtons" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "Text" } },
                            { kind: "Field", name: { kind: "Name", value: "Link" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "GetInvolved" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "Title" } },
                      { kind: "Field", name: { kind: "Name", value: "Text" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Image" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "Description" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ActionButtons" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "Text" } },
                            { kind: "Field", name: { kind: "Name", value: "Link" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ImpactSection" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "Statement" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ImpactNumbers" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "Number" } },
                            { kind: "Field", name: { kind: "Name", value: "Title" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "projectTypes_connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Name" } },
                      { kind: "Field", name: { kind: "Name", value: "HomeSummary" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Icon" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                      { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      { kind: "Field", name: { kind: "Name", value: "pageCount" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "blogPosts_connection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: { kind: "StringValue", value: "DateWritten:DESC", block: false },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pagination" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: { kind: "IntValue", value: "3" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Title" } },
                      { kind: "Field", name: { kind: "Name", value: "Summary" } },
                      { kind: "Field", name: { kind: "Name", value: "DateWritten" } },
                      { kind: "Field", name: { kind: "Name", value: "Slug" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "FeatureImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HomeContentQuery, HomeContentQueryVariables>;
export const MembersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "members" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "members_connection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: { kind: "StringValue", value: "SortOrder:ASC", block: false },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Name" } },
                      { kind: "Field", name: { kind: "Name", value: "Email" } },
                      { kind: "Field", name: { kind: "Name", value: "Bio" } },
                      { kind: "Field", name: { kind: "Name", value: "LinkedIn" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Photo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "BioImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "Tags" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                      { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      { kind: "Field", name: { kind: "Name", value: "pageCount" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;
export const PartnersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "partners" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "partners_connection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: { kind: "StringValue", value: "SortOrder:ASC", block: false },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Logo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PartnersQuery, PartnersQueryVariables>;
export const ProjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "projects" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filters" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ProjectTypeFiltersInput" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectTypes_connection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: { kind: "Variable", name: { kind: "Name", value: "filters" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Name" } },
                      { kind: "Field", name: { kind: "Name", value: "HomeSummary" } },
                      { kind: "Field", name: { kind: "Name", value: "PageSummary" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "PageContent" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "ComponentCommonHtml" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [{ kind: "Field", name: { kind: "Name", value: "HTML" } }],
                              },
                            },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "ComponentCommonImage" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "AltText" } },
                                  { kind: "Field", name: { kind: "Name", value: "Caption" } },
                                  { kind: "Field", name: { kind: "Name", value: "ClassNames" } },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "Media" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "documentId" } },
                                        { kind: "Field", name: { kind: "Name", value: "name" } },
                                        { kind: "Field", name: { kind: "Name", value: "url" } },
                                        { kind: "Field", name: { kind: "Name", value: "size" } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "ComponentCommonTextBlock" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [{ kind: "Field", name: { kind: "Name", value: "Text" } }],
                              },
                            },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "ComponentCommonActionButton" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "ClassNames" } },
                                  { kind: "Field", name: { kind: "Name", value: "Link" } },
                                  { kind: "Field", name: { kind: "Name", value: "Text" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Icon" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "FeatureImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "Slug" } },
                      { kind: "Field", name: { kind: "Name", value: "Status" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                      { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      { kind: "Field", name: { kind: "Name", value: "pageCount" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const ResourcesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "resources" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resources_connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "documentId" } },
                      { kind: "Field", name: { kind: "Name", value: "Title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Image" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "Description" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Links" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "Link" } },
                            { kind: "Field", name: { kind: "Name", value: "Text" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Media" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "documentId" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "url" } },
                            { kind: "Field", name: { kind: "Name", value: "size" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "page" } },
                      { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      { kind: "Field", name: { kind: "Name", value: "pageCount" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResourcesQuery, ResourcesQueryVariables>;
export const VolunteerContentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "volunteerContent" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "volunteerContent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "documentId" } },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "Content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ComponentCommonHtml" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "HTML" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "ComponentCommonActionButton" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "ClassNames" } },
                            { kind: "Field", name: { kind: "Name", value: "Link" } },
                            { kind: "Field", name: { kind: "Name", value: "Text" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ComponentCommonTextBlock" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "Text" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ComponentCommonImage" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "AltText" } },
                            { kind: "Field", name: { kind: "Name", value: "Caption" } },
                            { kind: "Field", name: { kind: "Name", value: "ClassNames" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "Media" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "documentId" } },
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "url" } },
                                  { kind: "Field", name: { kind: "Name", value: "size" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolunteerContentQuery, VolunteerContentQueryVariables>;
