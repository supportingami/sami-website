import type {
  Error,
  AuthorBlockBlocksDynamicZone,
  ComponentCommonActionButton,
  ComponentCommonHtml,
  ComponentCommonTextBlock,
} from "../../graphql/generated";
import { ActionButtonsComponent } from "./actionButtons";
import { HTMLContent } from "./htmlContent";

/**
 * Author blocks include those defined AuthorBlock content type of
 * in strapi with exclusion of Error block which may also be passed
 **/
type IAuthorBlock = Exclude<AuthorBlockBlocksDynamicZone, Error>;
type IAuthorBlockType = NonNullable<IAuthorBlock["__typename"]>;

const ComponentMapping: { [type in IAuthorBlockType]: (block: IAuthorBlock) => JSX.Element } = {
  ComponentCommonActionButton: (block) => {
    const actionButtonBlock = block as ComponentCommonActionButton;
    return <ActionButtonsComponent key={block.id} actionButtons={[{ ...actionButtonBlock }]} />;
  },
  ComponentCommonHtml: (block) => {
    const htmlBlock = block as ComponentCommonHtml;
    return <HTMLContent key={block.id}>{htmlBlock.HTML}</HTMLContent>;
  },
  ComponentCommonTextBlock: (block) => {
    const textBlock = block as ComponentCommonTextBlock;
    return <p key={block.id}>{textBlock.Text}</p>;
  },
};

/** Map author blocks to components */
const generateBlockComponent = (block: IAuthorBlock) => {
  if (block.__typename) {
    return ComponentMapping[block.__typename](block);
  }
};

/** Render authored dynamic zone blocks into components */
export const DynamicComponents = (props: { blocks: AuthorBlockBlocksDynamicZone[] }) => {
  return (
    <>
      {props.blocks
        // Exclude any "Error" block that could have been passed
        .filter((block) => block.__typename !== "Error")
        .map((block) => generateBlockComponent(block as IAuthorBlock))}
    </>
  );
};
