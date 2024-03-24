import Image from "next/image";
import type {
  Error,
  DynamicContentContentDynamicZone,
  ComponentCommonActionButton,
  ComponentCommonHtml,
  ComponentCommonTextBlock,
  ComponentCommonImage,
} from "../../graphql/generated";
import { ActionButtonsComponent } from "./actionButtons";
import { HTMLContent } from "./htmlContent";
import { getStrapiMedia } from "lib/media";

/**
 * Author blocks include those defined AuthorBlock content type of
 * in strapi with exclusion of Error block which may also be passed
 **/
type IDynamicComponent = Exclude<DynamicContentContentDynamicZone, Error>;
type IDynamicComponentType = NonNullable<IDynamicComponent["__typename"]>;

// HACK - force tailwind to compile sizes for classnames provided to images dynamically
export const ComponentCommonImageSizes = () => {
  <Image alt="" src="" className="max-w-sm max-w-md max-w-lg max-w-xl max-h-sm max-h-md max-h-lg max-h-xl" />;
};

const ComponentMapping: { [type in IDynamicComponentType]: (block: IDynamicComponent) => JSX.Element } = {
  ComponentCommonActionButton: (block) => {
    const { ClassNames, ...rest } = block as ComponentCommonActionButton;
    return (
      <ActionButtonsComponent key={block.id} actionButtons={[{ ...rest }]} className={`mb-8 ${ClassNames || ""}`} />
    );
  },
  ComponentCommonHtml: (block) => {
    const htmlBlock = block as ComponentCommonHtml;
    return (
      <HTMLContent key={block.id} className="mb-8">
        {htmlBlock.HTML}
      </HTMLContent>
    );
  },
  ComponentCommonTextBlock: (block) => {
    const textBlock = block as ComponentCommonTextBlock;
    return (
      <p key={block.id} className="prose mb-8">
        {textBlock.Text}
      </p>
    );
  },

  ComponentCommonImage: (block) => {
    const { Media, AltText, Caption, ClassNames } = block as ComponentCommonImage;
    // Wrap image with figure/figcaption when caption provided. Simply return image when not
    return Caption ? (
      <figure className={`mb-8 mx-auto ${ClassNames || ""}`}>
        <Image
          src={getStrapiMedia(Media)}
          width={0}
          height={0}
          sizes="100vw"
          className={`object-cover object-center m-auto w-full h-auto`}
          alt={AltText || "image"}
        />
        <figcaption className="prose"> {Caption} </figcaption>
      </figure>
    ) : (
      // HACK - ensure 100vw image available and try to responsively size to fit available width
      // https://youtu.be/IU_qq_c_lKA?si=JUybvi70ikvFAZtN&t=461
      <Image
        src={getStrapiMedia(Media)}
        width={0}
        height={0}
        sizes="100vw"
        className={`object-cover object-center m-auto w-full h-auto ${ClassNames || ""}`}
        alt={AltText || "image"}
      />
    );
  },
};

/** Map author blocks to components */
const generateBlockComponent = (block: IDynamicComponent) => {
  if (block.__typename) {
    return ComponentMapping[block.__typename](block);
  }
};

/** Render a single authored dynamic zone blocks as a component */
export const DynamicComponent = (props: { block: DynamicContentContentDynamicZone }, key?: string | number) => {
  const { block } = props;
  if (block.__typename === "Error") return null;
  const { props: ComponentProps, type: Component } = generateBlockComponent(block as unknown as IDynamicComponent);
  return <Component {...ComponentProps} key={key} />;
};

export const DynamicComponents = (props: { blocks: DynamicContentContentDynamicZone[] }) => {
  const { blocks } = props;
  return (
    <>
      {blocks
        .filter((b) => b.__typename !== "Error")
        .map((block, i) => {
          const { props: ComponentProps, type: Component } = generateBlockComponent(
            block as unknown as IDynamicComponent
          );
          // TODO - would be better to get unique id from block instead of counter
          const key = `${block.__typename}_${i}`;
          return <Component {...ComponentProps} key={key} data-key={key} />;
        })}
    </>
  );
};
