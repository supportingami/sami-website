import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlogPostContentBlocksDynamicZoneInput: any;
  Date: any;
  DateTime: any;
  DynamicContentContentDynamicZoneInput: any;
  JSON: any;
  ProjectTypePageContentDynamicZoneInput: any;
  Upload: any;
  VolunteerContentContentDynamicZoneInput: any;
};

export type AboutContent = {
  __typename?: "AboutContent";
  Intro?: Maybe<Scalars["String"]>;
  Testimonials?: Maybe<TestimonialRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AboutContentTestimonialsArgs = {
  filters?: InputMaybe<TestimonialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AboutContentEntity = {
  __typename?: "AboutContentEntity";
  attributes?: Maybe<AboutContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type AboutContentEntityResponse = {
  __typename?: "AboutContentEntityResponse";
  data?: Maybe<AboutContentEntity>;
};

export type AboutContentInput = {
  Intro?: InputMaybe<Scalars["String"]>;
  Testimonials?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type AnnualReport = {
  __typename?: "AnnualReport";
  CoverImage: UploadFileEntityResponse;
  File: UploadFileEntityResponse;
  Year: Scalars["Int"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AnnualReportEntity = {
  __typename?: "AnnualReportEntity";
  attributes?: Maybe<AnnualReport>;
  id?: Maybe<Scalars["ID"]>;
};

export type AnnualReportEntityResponse = {
  __typename?: "AnnualReportEntityResponse";
  data?: Maybe<AnnualReportEntity>;
};

export type AnnualReportEntityResponseCollection = {
  __typename?: "AnnualReportEntityResponseCollection";
  data: Array<AnnualReportEntity>;
  meta: ResponseCollectionMeta;
};

export type AnnualReportFiltersInput = {
  Year?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<AnnualReportFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AnnualReportFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AnnualReportFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AnnualReportInput = {
  CoverImage?: InputMaybe<Scalars["ID"]>;
  File?: InputMaybe<Scalars["ID"]>;
  Year?: InputMaybe<Scalars["Int"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type BlogPost = {
  __typename?: "BlogPost";
  ContentBlocks?: Maybe<Array<Maybe<BlogPostContentBlocksDynamicZone>>>;
  DateWritten?: Maybe<Scalars["Date"]>;
  FeatureImage?: Maybe<UploadFileEntityResponse>;
  Slug?: Maybe<Scalars["String"]>;
  Summary?: Maybe<Scalars["String"]>;
  Title: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type BlogPostContentBlocksDynamicZone =
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | Error;

export type BlogPostEntity = {
  __typename?: "BlogPostEntity";
  attributes?: Maybe<BlogPost>;
  id?: Maybe<Scalars["ID"]>;
};

export type BlogPostEntityResponse = {
  __typename?: "BlogPostEntityResponse";
  data?: Maybe<BlogPostEntity>;
};

export type BlogPostEntityResponseCollection = {
  __typename?: "BlogPostEntityResponseCollection";
  data: Array<BlogPostEntity>;
  meta: ResponseCollectionMeta;
};

export type BlogPostFiltersInput = {
  DateWritten?: InputMaybe<DateFilterInput>;
  Slug?: InputMaybe<StringFilterInput>;
  Summary?: InputMaybe<StringFilterInput>;
  Title?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<BlogPostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BlogPostInput = {
  ContentBlocks?: InputMaybe<Array<Scalars["BlogPostContentBlocksDynamicZoneInput"]>>;
  DateWritten?: InputMaybe<Scalars["Date"]>;
  FeatureImage?: InputMaybe<Scalars["ID"]>;
  Slug?: InputMaybe<Scalars["String"]>;
  Summary?: InputMaybe<Scalars["String"]>;
  Title?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]>;
  containsi?: InputMaybe<Scalars["Boolean"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]>;
  eq?: InputMaybe<Scalars["Boolean"]>;
  eqi?: InputMaybe<Scalars["Boolean"]>;
  gt?: InputMaybe<Scalars["Boolean"]>;
  gte?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]>;
  lte?: InputMaybe<Scalars["Boolean"]>;
  ne?: InputMaybe<Scalars["Boolean"]>;
  nei?: InputMaybe<Scalars["Boolean"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]>;
};

export type ComponentCommonActionButton = {
  __typename?: "ComponentCommonActionButton";
  ClassNames?: Maybe<Scalars["String"]>;
  Link: Scalars["String"];
  Text: Scalars["String"];
  id: Scalars["ID"];
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
  ClassNames?: InputMaybe<Scalars["String"]>;
  Link?: InputMaybe<Scalars["String"]>;
  Text?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentCommonHtml = {
  __typename?: "ComponentCommonHtml";
  HTML: Scalars["String"];
  id: Scalars["ID"];
};

export type ComponentCommonImage = {
  __typename?: "ComponentCommonImage";
  AltText?: Maybe<Scalars["String"]>;
  Caption?: Maybe<Scalars["String"]>;
  ClassNames?: Maybe<Scalars["String"]>;
  Media: UploadFileEntityResponse;
  id: Scalars["ID"];
};

export type ComponentCommonTextBlock = {
  __typename?: "ComponentCommonTextBlock";
  Text: Scalars["String"];
  id: Scalars["ID"];
};

export type ComponentHomeGetInvolved = {
  __typename?: "ComponentHomeGetInvolved";
  ActionButtons?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Description?: Maybe<Scalars["String"]>;
  Image?: Maybe<UploadFileEntityResponse>;
  Text?: Maybe<Scalars["String"]>;
  Title?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type ComponentHomeGetInvolvedActionButtonsArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentHomeGetInvolvedInput = {
  ActionButtons?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Description?: InputMaybe<Scalars["String"]>;
  Image?: InputMaybe<Scalars["ID"]>;
  Text?: InputMaybe<Scalars["String"]>;
  Title?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentHomeHeroImage = {
  __typename?: "ComponentHomeHeroImage";
  ActionButtons?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Image: UploadFileEntityResponse;
  Text: Scalars["String"];
  id: Scalars["ID"];
};

export type ComponentHomeHeroImageActionButtonsArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  Image?: InputMaybe<Scalars["ID"]>;
  Text?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentHomeImpactNumbers = {
  __typename?: "ComponentHomeImpactNumbers";
  Number?: Maybe<Scalars["String"]>;
  Title?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type ComponentHomeImpactNumbersFiltersInput = {
  Number?: InputMaybe<StringFilterInput>;
  Title?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentHomeImpactNumbersFiltersInput>>>;
  not?: InputMaybe<ComponentHomeImpactNumbersFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomeImpactNumbersFiltersInput>>>;
};

export type ComponentHomeImpactNumbersInput = {
  Number?: InputMaybe<Scalars["String"]>;
  Title?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentHomeImpactSection = {
  __typename?: "ComponentHomeImpactSection";
  ImpactNumbers?: Maybe<Array<Maybe<ComponentHomeImpactNumbers>>>;
  Statement?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type ComponentHomeImpactSectionImpactNumbersArgs = {
  filters?: InputMaybe<ComponentHomeImpactNumbersFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentHomeImpactSectionInput = {
  ImpactNumbers?: InputMaybe<Array<InputMaybe<ComponentHomeImpactNumbersInput>>>;
  Statement?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentHomeMissionStatement = {
  __typename?: "ComponentHomeMissionStatement";
  ActionButtons?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Description?: Maybe<Scalars["String"]>;
  Heading?: Maybe<Scalars["String"]>;
  Image?: Maybe<UploadFileEntityResponse>;
  Text?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type ComponentHomeMissionStatementActionButtonsArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentHomeMissionStatementInput = {
  ActionButtons?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Description?: InputMaybe<Scalars["String"]>;
  Heading?: InputMaybe<Scalars["String"]>;
  Image?: InputMaybe<Scalars["ID"]>;
  Text?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentHomeProjectSummary = {
  __typename?: "ComponentHomeProjectSummary";
  ActionButtons?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Image?: Maybe<UploadFileEntityResponse>;
  Text?: Maybe<Scalars["String"]>;
  Title?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type ComponentHomeProjectSummaryActionButtonsArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentHomeProjectSummaryInput = {
  ActionButtons?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Image?: InputMaybe<Scalars["ID"]>;
  Text?: InputMaybe<Scalars["String"]>;
  Title?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentHomeProjectSummaryItem = {
  __typename?: "ComponentHomeProjectSummaryItem";
  Description?: Maybe<Scalars["String"]>;
  Icon?: Maybe<UploadFileEntityResponse>;
  Title?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type ContentReleasesRelease = {
  __typename?: "ContentReleasesRelease";
  actions?: Maybe<ContentReleasesReleaseActionRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  releasedAt?: Maybe<Scalars["DateTime"]>;
  scheduledAt?: Maybe<Scalars["DateTime"]>;
  timezone?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContentReleasesReleaseActionsArgs = {
  filters?: InputMaybe<ContentReleasesReleaseActionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentReleasesReleaseAction = {
  __typename?: "ContentReleasesReleaseAction";
  contentType: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  entry?: Maybe<GenericMorph>;
  locale?: Maybe<Scalars["String"]>;
  release?: Maybe<ContentReleasesReleaseEntityResponse>;
  type: Enum_Contentreleasesreleaseaction_Type;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContentReleasesReleaseActionEntity = {
  __typename?: "ContentReleasesReleaseActionEntity";
  attributes?: Maybe<ContentReleasesReleaseAction>;
  id?: Maybe<Scalars["ID"]>;
};

export type ContentReleasesReleaseActionEntityResponse = {
  __typename?: "ContentReleasesReleaseActionEntityResponse";
  data?: Maybe<ContentReleasesReleaseActionEntity>;
};

export type ContentReleasesReleaseActionEntityResponseCollection = {
  __typename?: "ContentReleasesReleaseActionEntityResponseCollection";
  data: Array<ContentReleasesReleaseActionEntity>;
  meta: ResponseCollectionMeta;
};

export type ContentReleasesReleaseActionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContentReleasesReleaseActionFiltersInput>>>;
  contentType?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ContentReleasesReleaseActionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContentReleasesReleaseActionFiltersInput>>>;
  release?: InputMaybe<ContentReleasesReleaseFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContentReleasesReleaseActionInput = {
  contentType?: InputMaybe<Scalars["String"]>;
  locale?: InputMaybe<Scalars["String"]>;
  release?: InputMaybe<Scalars["ID"]>;
  type?: InputMaybe<Enum_Contentreleasesreleaseaction_Type>;
};

export type ContentReleasesReleaseActionRelationResponseCollection = {
  __typename?: "ContentReleasesReleaseActionRelationResponseCollection";
  data: Array<ContentReleasesReleaseActionEntity>;
};

export type ContentReleasesReleaseEntity = {
  __typename?: "ContentReleasesReleaseEntity";
  attributes?: Maybe<ContentReleasesRelease>;
  id?: Maybe<Scalars["ID"]>;
};

export type ContentReleasesReleaseEntityResponse = {
  __typename?: "ContentReleasesReleaseEntityResponse";
  data?: Maybe<ContentReleasesReleaseEntity>;
};

export type ContentReleasesReleaseEntityResponseCollection = {
  __typename?: "ContentReleasesReleaseEntityResponseCollection";
  data: Array<ContentReleasesReleaseEntity>;
  meta: ResponseCollectionMeta;
};

export type ContentReleasesReleaseFiltersInput = {
  actions?: InputMaybe<ContentReleasesReleaseActionFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<ContentReleasesReleaseFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ContentReleasesReleaseFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContentReleasesReleaseFiltersInput>>>;
  releasedAt?: InputMaybe<DateTimeFilterInput>;
  scheduledAt?: InputMaybe<DateTimeFilterInput>;
  timezone?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContentReleasesReleaseInput = {
  actions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  releasedAt?: InputMaybe<Scalars["DateTime"]>;
  scheduledAt?: InputMaybe<Scalars["DateTime"]>;
  timezone?: InputMaybe<Scalars["String"]>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  contains?: InputMaybe<Scalars["Date"]>;
  containsi?: InputMaybe<Scalars["Date"]>;
  endsWith?: InputMaybe<Scalars["Date"]>;
  eq?: InputMaybe<Scalars["Date"]>;
  eqi?: InputMaybe<Scalars["Date"]>;
  gt?: InputMaybe<Scalars["Date"]>;
  gte?: InputMaybe<Scalars["Date"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  lt?: InputMaybe<Scalars["Date"]>;
  lte?: InputMaybe<Scalars["Date"]>;
  ne?: InputMaybe<Scalars["Date"]>;
  nei?: InputMaybe<Scalars["Date"]>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars["Date"]>;
  notContainsi?: InputMaybe<Scalars["Date"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  startsWith?: InputMaybe<Scalars["Date"]>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]>;
  containsi?: InputMaybe<Scalars["DateTime"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]>;
  eq?: InputMaybe<Scalars["DateTime"]>;
  eqi?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  ne?: InputMaybe<Scalars["DateTime"]>;
  nei?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]>;
};

export type DonateContent = {
  __typename?: "DonateContent";
  DonateStatement?: Maybe<ComponentHomeMissionStatement>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type DonateContentEntity = {
  __typename?: "DonateContentEntity";
  attributes?: Maybe<DonateContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type DonateContentEntityResponse = {
  __typename?: "DonateContentEntityResponse";
  data?: Maybe<DonateContentEntity>;
};

export type DonateContentInput = {
  DonateStatement?: InputMaybe<ComponentHomeMissionStatementInput>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type Donor = {
  __typename?: "Donor";
  Logo: UploadFileEntityResponse;
  Name: Scalars["String"];
  SortOrder?: Maybe<Scalars["Float"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type DonorEntity = {
  __typename?: "DonorEntity";
  attributes?: Maybe<Donor>;
  id?: Maybe<Scalars["ID"]>;
};

export type DonorEntityResponse = {
  __typename?: "DonorEntityResponse";
  data?: Maybe<DonorEntity>;
};

export type DonorEntityResponseCollection = {
  __typename?: "DonorEntityResponseCollection";
  data: Array<DonorEntity>;
  meta: ResponseCollectionMeta;
};

export type DonorFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  SortOrder?: InputMaybe<FloatFilterInput>;
  and?: InputMaybe<Array<InputMaybe<DonorFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<DonorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DonorFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DonorInput = {
  Logo?: InputMaybe<Scalars["ID"]>;
  Name?: InputMaybe<Scalars["String"]>;
  SortOrder?: InputMaybe<Scalars["Float"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type DynamicContent = {
  __typename?: "DynamicContent";
  Content?: Maybe<Array<Maybe<DynamicContentContentDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type DynamicContentContentDynamicZone =
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | Error;

export type DynamicContentEntity = {
  __typename?: "DynamicContentEntity";
  attributes?: Maybe<DynamicContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type DynamicContentEntityResponse = {
  __typename?: "DynamicContentEntityResponse";
  data?: Maybe<DynamicContentEntity>;
};

export type DynamicContentInput = {
  Content?: InputMaybe<Array<Scalars["DynamicContentContentDynamicZoneInput"]>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export enum Enum_Contentreleasesreleaseaction_Type {
  Publish = "publish",
  Unpublish = "unpublish",
}

export enum Enum_Projecttype_Status {
  Completed = "Completed",
  Ongoing = "Ongoing",
}

export type Error = {
  __typename?: "Error";
  code: Scalars["String"];
  message?: Maybe<Scalars["String"]>;
};

export type Faq = {
  __typename?: "Faq";
  Question?: Maybe<Scalars["String"]>;
  Response?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type FaqEntity = {
  __typename?: "FaqEntity";
  attributes?: Maybe<Faq>;
  id?: Maybe<Scalars["ID"]>;
};

export type FaqEntityResponse = {
  __typename?: "FaqEntityResponse";
  data?: Maybe<FaqEntity>;
};

export type FaqEntityResponseCollection = {
  __typename?: "FaqEntityResponseCollection";
  data: Array<FaqEntity>;
  meta: ResponseCollectionMeta;
};

export type FaqFiltersInput = {
  Question?: InputMaybe<StringFilterInput>;
  Response?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<FaqFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FaqInput = {
  Question?: InputMaybe<Scalars["String"]>;
  Response?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type FaqRelationResponseCollection = {
  __typename?: "FaqRelationResponseCollection";
  data: Array<FaqEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  contains?: InputMaybe<Scalars["Float"]>;
  containsi?: InputMaybe<Scalars["Float"]>;
  endsWith?: InputMaybe<Scalars["Float"]>;
  eq?: InputMaybe<Scalars["Float"]>;
  eqi?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  ne?: InputMaybe<Scalars["Float"]>;
  nei?: InputMaybe<Scalars["Float"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]>;
  notContainsi?: InputMaybe<Scalars["Float"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]>;
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
  | ContentReleasesRelease
  | ContentReleasesReleaseAction
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
  | Testimonial
  | UploadFile
  | UploadFolder
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
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type HomeContentHeroImagesArgs = {
  filters?: InputMaybe<ComponentHomeHeroImageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type HomeContentEntity = {
  __typename?: "HomeContentEntity";
  attributes?: Maybe<HomeContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type HomeContentEntityResponse = {
  __typename?: "HomeContentEntityResponse";
  data?: Maybe<HomeContentEntity>;
};

export type HomeContentInput = {
  GetInvolved?: InputMaybe<ComponentHomeGetInvolvedInput>;
  HeroImages?: InputMaybe<Array<InputMaybe<ComponentHomeHeroImageInput>>>;
  ImpactSection?: InputMaybe<ComponentHomeImpactSectionInput>;
  MissionStatement?: InputMaybe<ComponentHomeMissionStatementInput>;
  ProjectSummary?: InputMaybe<ComponentHomeProjectSummaryInput>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type I18NLocale = {
  __typename?: "I18NLocale";
  code?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type I18NLocaleEntity = {
  __typename?: "I18NLocaleEntity";
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars["ID"]>;
};

export type I18NLocaleEntityResponse = {
  __typename?: "I18NLocaleEntityResponse";
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: "I18NLocaleEntityResponseCollection";
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contains?: InputMaybe<Scalars["ID"]>;
  containsi?: InputMaybe<Scalars["ID"]>;
  endsWith?: InputMaybe<Scalars["ID"]>;
  eq?: InputMaybe<Scalars["ID"]>;
  eqi?: InputMaybe<Scalars["ID"]>;
  gt?: InputMaybe<Scalars["ID"]>;
  gte?: InputMaybe<Scalars["ID"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  lt?: InputMaybe<Scalars["ID"]>;
  lte?: InputMaybe<Scalars["ID"]>;
  ne?: InputMaybe<Scalars["ID"]>;
  nei?: InputMaybe<Scalars["ID"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]>;
  notContainsi?: InputMaybe<Scalars["ID"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  contains?: InputMaybe<Scalars["Int"]>;
  containsi?: InputMaybe<Scalars["Int"]>;
  endsWith?: InputMaybe<Scalars["Int"]>;
  eq?: InputMaybe<Scalars["Int"]>;
  eqi?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  ne?: InputMaybe<Scalars["Int"]>;
  nei?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]>;
  notContainsi?: InputMaybe<Scalars["Int"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  contains?: InputMaybe<Scalars["JSON"]>;
  containsi?: InputMaybe<Scalars["JSON"]>;
  endsWith?: InputMaybe<Scalars["JSON"]>;
  eq?: InputMaybe<Scalars["JSON"]>;
  eqi?: InputMaybe<Scalars["JSON"]>;
  gt?: InputMaybe<Scalars["JSON"]>;
  gte?: InputMaybe<Scalars["JSON"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  lt?: InputMaybe<Scalars["JSON"]>;
  lte?: InputMaybe<Scalars["JSON"]>;
  ne?: InputMaybe<Scalars["JSON"]>;
  nei?: InputMaybe<Scalars["JSON"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]>;
};

export type Member = {
  __typename?: "Member";
  Bio?: Maybe<Scalars["String"]>;
  BioImage?: Maybe<UploadFileEntityResponse>;
  Email?: Maybe<Scalars["String"]>;
  LinkedIn?: Maybe<Scalars["String"]>;
  Name?: Maybe<Scalars["String"]>;
  Photo?: Maybe<UploadFileEntityResponse>;
  SortOrder?: Maybe<Scalars["Float"]>;
  Tags?: Maybe<Scalars["JSON"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type MemberEntity = {
  __typename?: "MemberEntity";
  attributes?: Maybe<Member>;
  id?: Maybe<Scalars["ID"]>;
};

export type MemberEntityResponse = {
  __typename?: "MemberEntityResponse";
  data?: Maybe<MemberEntity>;
};

export type MemberEntityResponseCollection = {
  __typename?: "MemberEntityResponseCollection";
  data: Array<MemberEntity>;
  meta: ResponseCollectionMeta;
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
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<MemberFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MemberFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MemberInput = {
  Bio?: InputMaybe<Scalars["String"]>;
  BioImage?: InputMaybe<Scalars["ID"]>;
  Email?: InputMaybe<Scalars["String"]>;
  LinkedIn?: InputMaybe<Scalars["String"]>;
  Name?: InputMaybe<Scalars["String"]>;
  Photo?: InputMaybe<Scalars["ID"]>;
  SortOrder?: InputMaybe<Scalars["Float"]>;
  Tags?: InputMaybe<Scalars["JSON"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAnnualReport?: Maybe<AnnualReportEntityResponse>;
  createBlogPost?: Maybe<BlogPostEntityResponse>;
  createContentReleasesRelease?: Maybe<ContentReleasesReleaseEntityResponse>;
  createContentReleasesReleaseAction?: Maybe<ContentReleasesReleaseActionEntityResponse>;
  createDonor?: Maybe<DonorEntityResponse>;
  createFaq?: Maybe<FaqEntityResponse>;
  createMember?: Maybe<MemberEntityResponse>;
  createPartner?: Maybe<PartnerEntityResponse>;
  createProjectType?: Maybe<ProjectTypeEntityResponse>;
  createResource?: Maybe<ResourceEntityResponse>;
  createTestimonial?: Maybe<TestimonialEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteAboutContent?: Maybe<AboutContentEntityResponse>;
  deleteAnnualReport?: Maybe<AnnualReportEntityResponse>;
  deleteBlogPost?: Maybe<BlogPostEntityResponse>;
  deleteContentReleasesRelease?: Maybe<ContentReleasesReleaseEntityResponse>;
  deleteContentReleasesReleaseAction?: Maybe<ContentReleasesReleaseActionEntityResponse>;
  deleteDonateContent?: Maybe<DonateContentEntityResponse>;
  deleteDonor?: Maybe<DonorEntityResponse>;
  deleteDynamicContent?: Maybe<DynamicContentEntityResponse>;
  deleteFaq?: Maybe<FaqEntityResponse>;
  deleteHomeContent?: Maybe<HomeContentEntityResponse>;
  deleteMember?: Maybe<MemberEntityResponse>;
  deletePartner?: Maybe<PartnerEntityResponse>;
  deleteProjectType?: Maybe<ProjectTypeEntityResponse>;
  deleteResource?: Maybe<ResourceEntityResponse>;
  deleteTestimonial?: Maybe<TestimonialEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVolunteerContent?: Maybe<VolunteerContentEntityResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAboutContent?: Maybe<AboutContentEntityResponse>;
  updateAnnualReport?: Maybe<AnnualReportEntityResponse>;
  updateBlogPost?: Maybe<BlogPostEntityResponse>;
  updateContentReleasesRelease?: Maybe<ContentReleasesReleaseEntityResponse>;
  updateContentReleasesReleaseAction?: Maybe<ContentReleasesReleaseActionEntityResponse>;
  updateDonateContent?: Maybe<DonateContentEntityResponse>;
  updateDonor?: Maybe<DonorEntityResponse>;
  updateDynamicContent?: Maybe<DynamicContentEntityResponse>;
  updateFaq?: Maybe<FaqEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateHomeContent?: Maybe<HomeContentEntityResponse>;
  updateMember?: Maybe<MemberEntityResponse>;
  updatePartner?: Maybe<PartnerEntityResponse>;
  updateProjectType?: Maybe<ProjectTypeEntityResponse>;
  updateResource?: Maybe<ResourceEntityResponse>;
  updateTestimonial?: Maybe<TestimonialEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVolunteerContent?: Maybe<VolunteerContentEntityResponse>;
  upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars["String"];
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
};

export type MutationCreateAnnualReportArgs = {
  data: AnnualReportInput;
};

export type MutationCreateBlogPostArgs = {
  data: BlogPostInput;
};

export type MutationCreateContentReleasesReleaseArgs = {
  data: ContentReleasesReleaseInput;
};

export type MutationCreateContentReleasesReleaseActionArgs = {
  data: ContentReleasesReleaseActionInput;
};

export type MutationCreateDonorArgs = {
  data: DonorInput;
};

export type MutationCreateFaqArgs = {
  data: FaqInput;
};

export type MutationCreateMemberArgs = {
  data: MemberInput;
};

export type MutationCreatePartnerArgs = {
  data: PartnerInput;
};

export type MutationCreateProjectTypeArgs = {
  data: ProjectTypeInput;
};

export type MutationCreateResourceArgs = {
  data: ResourceInput;
};

export type MutationCreateTestimonialArgs = {
  data: TestimonialInput;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationDeleteAnnualReportArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteBlogPostArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContentReleasesReleaseArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContentReleasesReleaseActionArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDonorArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteFaqArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMemberArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePartnerArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteProjectTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteResourceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTestimonialArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUploadFolderArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars["ID"];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  files: Array<InputMaybe<Scalars["Upload"]>>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
  id: Scalars["ID"];
};

export type MutationResetPasswordArgs = {
  code: Scalars["String"];
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
};

export type MutationUpdateAboutContentArgs = {
  data: AboutContentInput;
};

export type MutationUpdateAnnualReportArgs = {
  data: AnnualReportInput;
  id: Scalars["ID"];
};

export type MutationUpdateBlogPostArgs = {
  data: BlogPostInput;
  id: Scalars["ID"];
};

export type MutationUpdateContentReleasesReleaseArgs = {
  data: ContentReleasesReleaseInput;
  id: Scalars["ID"];
};

export type MutationUpdateContentReleasesReleaseActionArgs = {
  data: ContentReleasesReleaseActionInput;
  id: Scalars["ID"];
};

export type MutationUpdateDonateContentArgs = {
  data: DonateContentInput;
};

export type MutationUpdateDonorArgs = {
  data: DonorInput;
  id: Scalars["ID"];
};

export type MutationUpdateDynamicContentArgs = {
  data: DynamicContentInput;
};

export type MutationUpdateFaqArgs = {
  data: FaqInput;
  id: Scalars["ID"];
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateHomeContentArgs = {
  data: HomeContentInput;
};

export type MutationUpdateMemberArgs = {
  data: MemberInput;
  id: Scalars["ID"];
};

export type MutationUpdatePartnerArgs = {
  data: PartnerInput;
  id: Scalars["ID"];
};

export type MutationUpdateProjectTypeArgs = {
  data: ProjectTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateResourceArgs = {
  data: ResourceInput;
  id: Scalars["ID"];
};

export type MutationUpdateTestimonialArgs = {
  data: TestimonialInput;
  id: Scalars["ID"];
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars["ID"];
};

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars["ID"];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars["ID"];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars["ID"];
};

export type MutationUpdateVolunteerContentArgs = {
  data: VolunteerContentInput;
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  file: Scalars["Upload"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"];
  pageCount: Scalars["Int"];
  pageSize: Scalars["Int"];
  total: Scalars["Int"];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  start?: InputMaybe<Scalars["Int"]>;
};

export type Partner = {
  __typename?: "Partner";
  Logo: UploadFileEntityResponse;
  Name: Scalars["String"];
  SortOrder?: Maybe<Scalars["Float"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type PartnerEntity = {
  __typename?: "PartnerEntity";
  attributes?: Maybe<Partner>;
  id?: Maybe<Scalars["ID"]>;
};

export type PartnerEntityResponse = {
  __typename?: "PartnerEntityResponse";
  data?: Maybe<PartnerEntity>;
};

export type PartnerEntityResponseCollection = {
  __typename?: "PartnerEntityResponseCollection";
  data: Array<PartnerEntity>;
  meta: ResponseCollectionMeta;
};

export type PartnerFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  SortOrder?: InputMaybe<FloatFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PartnerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PartnerInput = {
  Logo?: InputMaybe<Scalars["ID"]>;
  Name?: InputMaybe<Scalars["String"]>;
  SortOrder?: InputMaybe<Scalars["Float"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type ProjectType = {
  __typename?: "ProjectType";
  FeatureImage?: Maybe<UploadFileEntityResponse>;
  HomeSummary?: Maybe<Scalars["String"]>;
  Icon?: Maybe<UploadFileEntityResponse>;
  Name?: Maybe<Scalars["String"]>;
  PageContent?: Maybe<Array<Maybe<ProjectTypePageContentDynamicZone>>>;
  PageSummary?: Maybe<Scalars["String"]>;
  Slug: Scalars["String"];
  Status?: Maybe<Enum_Projecttype_Status>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ProjectTypeEntity = {
  __typename?: "ProjectTypeEntity";
  attributes?: Maybe<ProjectType>;
  id?: Maybe<Scalars["ID"]>;
};

export type ProjectTypeEntityResponse = {
  __typename?: "ProjectTypeEntityResponse";
  data?: Maybe<ProjectTypeEntity>;
};

export type ProjectTypeEntityResponseCollection = {
  __typename?: "ProjectTypeEntityResponseCollection";
  data: Array<ProjectTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type ProjectTypeFiltersInput = {
  HomeSummary?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  PageSummary?: InputMaybe<StringFilterInput>;
  Slug?: InputMaybe<StringFilterInput>;
  Status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ProjectTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ProjectTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProjectTypeFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProjectTypeInput = {
  FeatureImage?: InputMaybe<Scalars["ID"]>;
  HomeSummary?: InputMaybe<Scalars["String"]>;
  Icon?: InputMaybe<Scalars["ID"]>;
  Name?: InputMaybe<Scalars["String"]>;
  PageContent?: InputMaybe<Array<Scalars["ProjectTypePageContentDynamicZoneInput"]>>;
  PageSummary?: InputMaybe<Scalars["String"]>;
  Slug?: InputMaybe<Scalars["String"]>;
  Status?: InputMaybe<Enum_Projecttype_Status>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type ProjectTypePageContentDynamicZone =
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | Error;

export enum PublicationState {
  Live = "LIVE",
  Preview = "PREVIEW",
}

export type Query = {
  __typename?: "Query";
  aboutContent?: Maybe<AboutContentEntityResponse>;
  annualReport?: Maybe<AnnualReportEntityResponse>;
  annualReports?: Maybe<AnnualReportEntityResponseCollection>;
  blogPost?: Maybe<BlogPostEntityResponse>;
  blogPosts?: Maybe<BlogPostEntityResponseCollection>;
  contentReleasesRelease?: Maybe<ContentReleasesReleaseEntityResponse>;
  contentReleasesReleaseAction?: Maybe<ContentReleasesReleaseActionEntityResponse>;
  contentReleasesReleaseActions?: Maybe<ContentReleasesReleaseActionEntityResponseCollection>;
  contentReleasesReleases?: Maybe<ContentReleasesReleaseEntityResponseCollection>;
  donateContent?: Maybe<DonateContentEntityResponse>;
  donor?: Maybe<DonorEntityResponse>;
  donors?: Maybe<DonorEntityResponseCollection>;
  dynamicContent?: Maybe<DynamicContentEntityResponse>;
  faq?: Maybe<FaqEntityResponse>;
  faqs?: Maybe<FaqEntityResponseCollection>;
  homeContent?: Maybe<HomeContentEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  member?: Maybe<MemberEntityResponse>;
  members?: Maybe<MemberEntityResponseCollection>;
  partner?: Maybe<PartnerEntityResponse>;
  partners?: Maybe<PartnerEntityResponseCollection>;
  projectType?: Maybe<ProjectTypeEntityResponse>;
  projectTypes?: Maybe<ProjectTypeEntityResponseCollection>;
  resource?: Maybe<ResourceEntityResponse>;
  resources?: Maybe<ResourceEntityResponseCollection>;
  testimonial?: Maybe<TestimonialEntityResponse>;
  testimonials?: Maybe<TestimonialEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  volunteerContent?: Maybe<VolunteerContentEntityResponse>;
};

export type QueryAboutContentArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryAnnualReportArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAnnualReportsArgs = {
  filters?: InputMaybe<AnnualReportFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryBlogPostArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContentReleasesReleaseArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContentReleasesReleaseActionArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContentReleasesReleaseActionsArgs = {
  filters?: InputMaybe<ContentReleasesReleaseActionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContentReleasesReleasesArgs = {
  filters?: InputMaybe<ContentReleasesReleaseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDonateContentArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryDonorArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryDonorsArgs = {
  filters?: InputMaybe<DonorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDynamicContentArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryFaqArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryHomeContentArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryMemberArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryMembersArgs = {
  filters?: InputMaybe<MemberFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryPartnerArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryPartnersArgs = {
  filters?: InputMaybe<PartnerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryProjectTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryProjectTypesArgs = {
  filters?: InputMaybe<ProjectTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryResourceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryResourcesArgs = {
  filters?: InputMaybe<ResourceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTestimonialArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTestimonialsArgs = {
  filters?: InputMaybe<TestimonialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryVolunteerContentArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type Resource = {
  __typename?: "Resource";
  Description?: Maybe<Scalars["String"]>;
  Image?: Maybe<UploadFileEntityResponse>;
  Links?: Maybe<Array<Maybe<ComponentCommonActionButton>>>;
  Media?: Maybe<UploadFileEntityResponse>;
  Title?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ResourceLinksArgs = {
  filters?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ResourceEntity = {
  __typename?: "ResourceEntity";
  attributes?: Maybe<Resource>;
  id?: Maybe<Scalars["ID"]>;
};

export type ResourceEntityResponse = {
  __typename?: "ResourceEntityResponse";
  data?: Maybe<ResourceEntity>;
};

export type ResourceEntityResponseCollection = {
  __typename?: "ResourceEntityResponseCollection";
  data: Array<ResourceEntity>;
  meta: ResponseCollectionMeta;
};

export type ResourceFiltersInput = {
  Description?: InputMaybe<StringFilterInput>;
  Links?: InputMaybe<ComponentCommonActionButtonFiltersInput>;
  Title?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ResourceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ResourceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ResourceFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ResourceInput = {
  Description?: InputMaybe<Scalars["String"]>;
  Image?: InputMaybe<Scalars["ID"]>;
  Links?: InputMaybe<Array<InputMaybe<ComponentCommonActionButtonInput>>>;
  Media?: InputMaybe<Scalars["ID"]>;
  Title?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type ResponseCollectionMeta = {
  __typename?: "ResponseCollectionMeta";
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  contains?: InputMaybe<Scalars["String"]>;
  containsi?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  eq?: InputMaybe<Scalars["String"]>;
  eqi?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  ne?: InputMaybe<Scalars["String"]>;
  nei?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]>;
  notContainsi?: InputMaybe<Scalars["String"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type Testimonial = {
  __typename?: "Testimonial";
  Bio: Scalars["String"];
  Content: Scalars["String"];
  Name: Scalars["String"];
  Photo: UploadFileEntityResponse;
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TestimonialEntity = {
  __typename?: "TestimonialEntity";
  attributes?: Maybe<Testimonial>;
  id?: Maybe<Scalars["ID"]>;
};

export type TestimonialEntityResponse = {
  __typename?: "TestimonialEntityResponse";
  data?: Maybe<TestimonialEntity>;
};

export type TestimonialEntityResponseCollection = {
  __typename?: "TestimonialEntityResponseCollection";
  data: Array<TestimonialEntity>;
  meta: ResponseCollectionMeta;
};

export type TestimonialFiltersInput = {
  Bio?: InputMaybe<StringFilterInput>;
  Content?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<TestimonialFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TestimonialFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TestimonialFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TestimonialInput = {
  Bio?: InputMaybe<Scalars["String"]>;
  Content?: InputMaybe<Scalars["String"]>;
  Name?: InputMaybe<Scalars["String"]>;
  Photo?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type TestimonialRelationResponseCollection = {
  __typename?: "TestimonialRelationResponseCollection";
  data: Array<TestimonialEntity>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  ext?: Maybe<Scalars["String"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  height?: Maybe<Scalars["Int"]>;
  mime: Scalars["String"];
  name: Scalars["String"];
  previewUrl?: Maybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars["Float"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  url: Scalars["String"];
  width?: Maybe<Scalars["Int"]>;
};

export type UploadFileEntity = {
  __typename?: "UploadFileEntity";
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars["ID"]>;
};

export type UploadFileEntityResponse = {
  __typename?: "UploadFileEntityResponse";
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: "UploadFileEntityResponseCollection";
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  ext?: InputMaybe<Scalars["String"]>;
  folder?: InputMaybe<Scalars["ID"]>;
  folderPath?: InputMaybe<Scalars["String"]>;
  formats?: InputMaybe<Scalars["JSON"]>;
  hash?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["Int"]>;
  mime?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  previewUrl?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]>;
  size?: InputMaybe<Scalars["Float"]>;
  url?: InputMaybe<Scalars["String"]>;
  width?: InputMaybe<Scalars["Int"]>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: "UploadFileRelationResponseCollection";
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: "UploadFolder";
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars["String"];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars["String"];
  pathId: Scalars["Int"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UploadFolderEntity = {
  __typename?: "UploadFolderEntity";
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars["ID"]>;
};

export type UploadFolderEntityResponse = {
  __typename?: "UploadFolderEntityResponse";
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: "UploadFolderEntityResponseCollection";
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  parent?: InputMaybe<Scalars["ID"]>;
  path?: InputMaybe<Scalars["String"]>;
  pathId?: InputMaybe<Scalars["Int"]>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: "UploadFolderRelationResponseCollection";
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: "UsersPermissionsCreateRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: "UsersPermissionsDeleteRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"];
  password: Scalars["String"];
  provider?: Scalars["String"];
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  blocked?: Maybe<Scalars["Boolean"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars["String"];
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  type?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: "UsersPermissionsPasswordPayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  action: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: "UsersPermissionsPermissionEntity";
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: "UsersPermissionsPermissionRelationResponseCollection";
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: "UsersPermissionsRoleEntity";
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: "UsersPermissionsRoleEntityResponse";
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: "UsersPermissionsRoleEntityResponseCollection";
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  type?: InputMaybe<Scalars["String"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: "UsersPermissionsUpdateRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  blocked?: Maybe<Scalars["Boolean"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  username: Scalars["String"];
};

export type UsersPermissionsUserEntity = {
  __typename?: "UsersPermissionsUserEntity";
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: "UsersPermissionsUserEntityResponse";
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: "UsersPermissionsUserEntityResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]>;
  confirmationToken?: InputMaybe<Scalars["String"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]>;
  email?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: "UsersPermissionsUserRelationResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
};

export type VolunteerContent = {
  __typename?: "VolunteerContent";
  Content?: Maybe<Array<Maybe<VolunteerContentContentDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  faqs?: Maybe<FaqRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type VolunteerContentFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type VolunteerContentContentDynamicZone =
  | ComponentCommonActionButton
  | ComponentCommonHtml
  | ComponentCommonImage
  | ComponentCommonTextBlock
  | Error;

export type VolunteerContentEntity = {
  __typename?: "VolunteerContentEntity";
  attributes?: Maybe<VolunteerContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type VolunteerContentEntityResponse = {
  __typename?: "VolunteerContentEntityResponse";
  data?: Maybe<VolunteerContentEntity>;
};

export type VolunteerContentInput = {
  Content?: InputMaybe<Array<Scalars["VolunteerContentContentDynamicZoneInput"]>>;
  faqs?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type AboutContentQueryVariables = Exact<{ [key: string]: never }>;

export type AboutContentQuery = {
  __typename?: "Query";
  aboutContent?: {
    __typename?: "AboutContentEntityResponse";
    data?: {
      __typename?: "AboutContentEntity";
      attributes?: {
        __typename?: "AboutContent";
        Intro?: string | null;
        Testimonials?: {
          __typename?: "TestimonialRelationResponseCollection";
          data: Array<{
            __typename?: "TestimonialEntity";
            attributes?: {
              __typename?: "Testimonial";
              Bio: string;
              Content: string;
              Name: string;
              Photo: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
                } | null;
              };
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type AnnualReportsQueryVariables = Exact<{ [key: string]: never }>;

export type AnnualReportsQuery = {
  __typename?: "Query";
  annualReports?: {
    __typename?: "AnnualReportEntityResponseCollection";
    data: Array<{
      __typename?: "AnnualReportEntity";
      id?: string | null;
      attributes?: {
        __typename?: "AnnualReport";
        Year: number;
        File: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
          } | null;
        };
        CoverImage: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
          } | null;
        };
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
    };
  } | null;
};

export type BlogPostContentQueryVariables = Exact<{
  filters?: InputMaybe<BlogPostFiltersInput>;
}>;

export type BlogPostContentQuery = {
  __typename?: "Query";
  blogPosts?: {
    __typename?: "BlogPostEntityResponseCollection";
    data: Array<{
      __typename?: "BlogPostEntity";
      id?: string | null;
      attributes?: {
        __typename?: "BlogPost";
        Title: string;
        DateWritten?: any | null;
        Slug?: string | null;
        ContentBlocks?: Array<
          | { __typename: "ComponentCommonActionButton"; ClassNames?: string | null; Link: string; Text: string }
          | { __typename: "ComponentCommonHtml"; HTML: string }
          | {
              __typename: "ComponentCommonImage";
              AltText?: string | null;
              Caption?: string | null;
              ClassNames?: string | null;
              Media: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
                } | null;
              };
            }
          | { __typename: "ComponentCommonTextBlock"; Text: string }
          | { __typename: "Error" }
          | null
        > | null;
      } | null;
    }>;
  } | null;
};

export type BlogPostsQueryVariables = Exact<{ [key: string]: never }>;

export type BlogPostsQuery = {
  __typename?: "Query";
  blogPosts?: {
    __typename?: "BlogPostEntityResponseCollection";
    data: Array<{
      __typename?: "BlogPostEntity";
      id?: string | null;
      attributes?: {
        __typename?: "BlogPost";
        Title: string;
        Summary?: string | null;
        DateWritten?: any | null;
        Slug?: string | null;
        FeatureImage?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type DonateContentQueryVariables = Exact<{ [key: string]: never }>;

export type DonateContentQuery = {
  __typename?: "Query";
  donateContent?: {
    __typename?: "DonateContentEntityResponse";
    data?: {
      __typename?: "DonateContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "DonateContent";
        DonateStatement?: {
          __typename?: "ComponentHomeMissionStatement";
          id: string;
          Heading?: string | null;
          Text?: string | null;
          Description?: string | null;
          Image?: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              id?: string | null;
              attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
            } | null;
          } | null;
          ActionButtons?: Array<{
            __typename?: "ComponentCommonActionButton";
            id: string;
            Text: string;
            Link: string;
          } | null> | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type DonorsQueryVariables = Exact<{ [key: string]: never }>;

export type DonorsQuery = {
  __typename?: "Query";
  donors?: {
    __typename?: "DonorEntityResponseCollection";
    data: Array<{
      __typename?: "DonorEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Donor";
        Name: string;
        Logo: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
          } | null;
        };
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
    };
  } | null;
};

export type FaqsQueryVariables = Exact<{ [key: string]: never }>;

export type FaqsQuery = {
  __typename?: "Query";
  faqs?: {
    __typename?: "FaqEntityResponseCollection";
    data: Array<{
      __typename?: "FaqEntity";
      id?: string | null;
      attributes?: { __typename?: "Faq"; Question?: string | null; Response?: string | null } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
    };
  } | null;
};

export type HomeContentQueryVariables = Exact<{ [key: string]: never }>;

export type HomeContentQuery = {
  __typename?: "Query";
  homeContent?: {
    __typename?: "HomeContentEntityResponse";
    data?: {
      __typename?: "HomeContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "HomeContent";
        HeroImages?: Array<{
          __typename?: "ComponentHomeHeroImage";
          id: string;
          Text: string;
          Image: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              id?: string | null;
              attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
            } | null;
          };
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
          Image?: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              id?: string | null;
              attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
            } | null;
          } | null;
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
          Image?: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              id?: string | null;
              attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
            } | null;
          } | null;
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
          Image?: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              id?: string | null;
              attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
            } | null;
          } | null;
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
    } | null;
  } | null;
  projectTypes?: {
    __typename?: "ProjectTypeEntityResponseCollection";
    data: Array<{
      __typename?: "ProjectTypeEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ProjectType";
        Name?: string | null;
        HomeSummary?: string | null;
        Icon?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
          } | null;
        } | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
    };
  } | null;
  blogPosts?: {
    __typename?: "BlogPostEntityResponseCollection";
    data: Array<{
      __typename?: "BlogPostEntity";
      id?: string | null;
      attributes?: {
        __typename?: "BlogPost";
        Title: string;
        Summary?: string | null;
        DateWritten?: any | null;
        Slug?: string | null;
        FeatureImage?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type MembersQueryVariables = Exact<{ [key: string]: never }>;

export type MembersQuery = {
  __typename?: "Query";
  members?: {
    __typename?: "MemberEntityResponseCollection";
    data: Array<{
      __typename?: "MemberEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Member";
        Name?: string | null;
        Email?: string | null;
        Bio?: string | null;
        LinkedIn?: string | null;
        Tags?: any | null;
        Photo?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
          } | null;
        } | null;
        BioImage?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
          } | null;
        } | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
    };
  } | null;
};

export type PartnersQueryVariables = Exact<{ [key: string]: never }>;

export type PartnersQuery = {
  __typename?: "Query";
  partners?: {
    __typename?: "PartnerEntityResponseCollection";
    data: Array<{
      __typename?: "PartnerEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Partner";
        Name: string;
        Logo: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
          } | null;
        };
      } | null;
    }>;
  } | null;
};

export type ProjectsQueryVariables = Exact<{
  filters?: InputMaybe<ProjectTypeFiltersInput>;
}>;

export type ProjectsQuery = {
  __typename?: "Query";
  projectTypes?: {
    __typename?: "ProjectTypeEntityResponseCollection";
    data: Array<{
      __typename?: "ProjectTypeEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ProjectType";
        Name?: string | null;
        HomeSummary?: string | null;
        PageSummary?: string | null;
        Slug: string;
        Status?: Enum_Projecttype_Status | null;
        PageContent?: Array<
          | { __typename: "ComponentCommonActionButton"; ClassNames?: string | null; Link: string; Text: string }
          | { __typename: "ComponentCommonHtml"; HTML: string }
          | {
              __typename: "ComponentCommonImage";
              AltText?: string | null;
              Caption?: string | null;
              ClassNames?: string | null;
              Media: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
                } | null;
              };
            }
          | { __typename: "ComponentCommonTextBlock"; Text: string }
          | { __typename: "Error" }
          | null
        > | null;
        Icon?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
          } | null;
        } | null;
        FeatureImage?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; url: string; name: string; size: number } | null;
          } | null;
        } | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
    };
  } | null;
};

export type ResourcesQueryVariables = Exact<{ [key: string]: never }>;

export type ResourcesQuery = {
  __typename?: "Query";
  resources?: {
    __typename?: "ResourceEntityResponseCollection";
    data: Array<{
      __typename?: "ResourceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Resource";
        Title?: string | null;
        Description?: string | null;
        Image?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
          } | null;
        } | null;
        Links?: Array<{
          __typename?: "ComponentCommonActionButton";
          id: string;
          Link: string;
          Text: string;
        } | null> | null;
        Media?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
          } | null;
        } | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; page: number; pageSize: number; total: number; pageCount: number };
    };
  } | null;
};

export type VolunteerContentQueryVariables = Exact<{ [key: string]: never }>;

export type VolunteerContentQuery = {
  __typename?: "Query";
  volunteerContent?: {
    __typename?: "VolunteerContentEntityResponse";
    data?: {
      __typename: "VolunteerContentEntity";
      id?: string | null;
      attributes?: {
        __typename: "VolunteerContent";
        Content?: Array<
          | {
              __typename: "ComponentCommonActionButton";
              id: string;
              ClassNames?: string | null;
              Link: string;
              Text: string;
            }
          | { __typename: "ComponentCommonHtml"; id: string; HTML: string }
          | {
              __typename?: "ComponentCommonImage";
              AltText?: string | null;
              Caption?: string | null;
              ClassNames?: string | null;
              Media: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: { __typename?: "UploadFile"; name: string; url: string; size: number } | null;
                } | null;
              };
            }
          | { __typename: "ComponentCommonTextBlock"; id: string; Text: string }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Intro" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "Testimonials" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
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
                                                    {
                                                      kind: "Field",
                                                      name: { kind: "Name", value: "data" },
                                                      selectionSet: {
                                                        kind: "SelectionSet",
                                                        selections: [
                                                          {
                                                            kind: "Field",
                                                            name: { kind: "Name", value: "attributes" },
                                                            selectionSet: {
                                                              kind: "SelectionSet",
                                                              selections: [
                                                                {
                                                                  kind: "Field",
                                                                  name: { kind: "Name", value: "name" },
                                                                },
                                                                { kind: "Field", name: { kind: "Name", value: "url" } },
                                                                {
                                                                  kind: "Field",
                                                                  name: { kind: "Name", value: "size" },
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
            name: { kind: "Name", value: "annualReports" },
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
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Year" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "File" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
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
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "CoverImage" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "meta" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagination" },
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
            name: { kind: "Name", value: "blogPosts" },
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
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                                              {
                                                kind: "Field",
                                                name: { kind: "Name", value: "data" },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    { kind: "Field", name: { kind: "Name", value: "id" } },
                                                    {
                                                      kind: "Field",
                                                      name: { kind: "Name", value: "attributes" },
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
            name: { kind: "Name", value: "blogPosts" },
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
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Title" } },
                            { kind: "Field", name: { kind: "Name", value: "Summary" } },
                            { kind: "Field", name: { kind: "Name", value: "DateWritten" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "FeatureImage" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "data" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "id" } },
                                              {
                                                kind: "Field",
                                                name: { kind: "Name", value: "attributes" },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    { kind: "Field", name: { kind: "Name", value: "url" } },
                                                    { kind: "Field", name: { kind: "Name", value: "name" } },
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
            name: { kind: "Name", value: "donors" },
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
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Name" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "Logo" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "url" } },
                                              { kind: "Field", name: { kind: "Name", value: "name" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "meta" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagination" },
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
            name: { kind: "Name", value: "faqs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Question" } },
                            { kind: "Field", name: { kind: "Name", value: "Response" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "meta" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagination" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "data" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "id" } },
                                              {
                                                kind: "Field",
                                                name: { kind: "Name", value: "attributes" },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    { kind: "Field", name: { kind: "Name", value: "url" } },
                                                    { kind: "Field", name: { kind: "Name", value: "name" } },
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
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "data" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "id" } },
                                              {
                                                kind: "Field",
                                                name: { kind: "Name", value: "attributes" },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    { kind: "Field", name: { kind: "Name", value: "url" } },
                                                    { kind: "Field", name: { kind: "Name", value: "name" } },
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
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "data" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "id" } },
                                              {
                                                kind: "Field",
                                                name: { kind: "Name", value: "attributes" },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    { kind: "Field", name: { kind: "Name", value: "url" } },
                                                    { kind: "Field", name: { kind: "Name", value: "name" } },
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
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "data" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "id" } },
                                              {
                                                kind: "Field",
                                                name: { kind: "Name", value: "attributes" },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    { kind: "Field", name: { kind: "Name", value: "url" } },
                                                    { kind: "Field", name: { kind: "Name", value: "name" } },
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
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "projectTypes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Name" } },
                            { kind: "Field", name: { kind: "Name", value: "HomeSummary" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "Icon" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "url" } },
                                              { kind: "Field", name: { kind: "Name", value: "name" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "meta" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagination" },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "blogPosts" },
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
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
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
            name: { kind: "Name", value: "members" },
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
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "url" } },
                                              { kind: "Field", name: { kind: "Name", value: "name" } },
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
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "BioImage" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "url" } },
                                              { kind: "Field", name: { kind: "Name", value: "name" } },
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
                            { kind: "Field", name: { kind: "Name", value: "Tags" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "meta" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagination" },
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
            name: { kind: "Name", value: "partners" },
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
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Name" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "Logo" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
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
            name: { kind: "Name", value: "projectTypes" },
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
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                                              {
                                                kind: "Field",
                                                name: { kind: "Name", value: "data" },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    { kind: "Field", name: { kind: "Name", value: "id" } },
                                                    {
                                                      kind: "Field",
                                                      name: { kind: "Name", value: "attributes" },
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
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "url" } },
                                              { kind: "Field", name: { kind: "Name", value: "name" } },
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
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "FeatureImage" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              { kind: "Field", name: { kind: "Name", value: "url" } },
                                              { kind: "Field", name: { kind: "Name", value: "name" } },
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
                            { kind: "Field", name: { kind: "Name", value: "Slug" } },
                            { kind: "Field", name: { kind: "Name", value: "Status" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "meta" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagination" },
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
            name: { kind: "Name", value: "resources" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "Title" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "Image" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
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
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "attributes" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "meta" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pagination" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "Content" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "InlineFragment",
                                    typeCondition: {
                                      kind: "NamedType",
                                      name: { kind: "Name", value: "ComponentCommonHtml" },
                                    },
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
                                    typeCondition: {
                                      kind: "NamedType",
                                      name: { kind: "Name", value: "ComponentCommonTextBlock" },
                                    },
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
                                              {
                                                kind: "Field",
                                                name: { kind: "Name", value: "data" },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    { kind: "Field", name: { kind: "Name", value: "id" } },
                                                    {
                                                      kind: "Field",
                                                      name: { kind: "Name", value: "attributes" },
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
