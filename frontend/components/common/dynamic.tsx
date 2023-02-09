import type {
  AuthorBlockBlocksDynamicZone,
  ComponentCommonActionButton,
  ComponentCommonHtml,
  ComponentCommonTextBlock,
  Error,
} from "../../graphql/generated";
import { ActionButtonsComponent } from "./actionButtons";
import { HTMLContent } from "./htmlContent";

/**
 * Author blocks include those defined AuthorBlock content type of
 * in strapi with exclusion of Error block which may also be passed
 **/
type IAuthorBlock = Exclude<AuthorBlockBlocksDynamicZone, Error>;

/** Map author blocks to components */
const generateBlockComponent = (block: IAuthorBlock) => {
  switch (block.__typename) {
    case "ComponentCommonActionButton":
      const actionButtonBlock = block as ComponentCommonActionButton;
      return <ActionButtonsComponent key={block.id} actionButtons={[{ ...actionButtonBlock }]} />;
    case "ComponentCommonHtml":
      const htmlBlock = block as ComponentCommonHtml;
      return <HTMLContent key={block.id}>{htmlBlock.HTML}</HTMLContent>;
    case "ComponentCommonTextBlock":
      const textBlock = block as ComponentCommonTextBlock;
      return <p key={block.id}>{textBlock.Text}</p>;
    default:
      // Force typescript to identify an error if any potential blocks are not defined
      // https://basarat.gitbook.io/typescript/type-system/discriminated-unions
      const _exhaustiveCheck: never = block;
      return _exhaustiveCheck;
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
