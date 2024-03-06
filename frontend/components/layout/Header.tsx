interface IBackgroundImageProps {
  /** name of image to display as defined in `tailwind.config.ts` */
  imageName: string;
  /** css backgroundSize to stretch image to (will repeat if smaller) */
  size?: string;
  /** css backgroundPosition used to offset or center */
  position?: string;
}

/** Render a div with background image and nested child content */
export const SectionHeader = ({
  background,
  children,
  className = "",
}: {
  children: JSX.Element | JSX.Element[];
  background: IBackgroundImageProps;
  className?: string;
}) => (
  <div
    data-testid="sectionHeader"
    className={`relative text-white text-center font-bold w-100 bg-primary ${className}`}
  >
    <BackgroundImage {...background} />
    <div className="z-10 relative flex flex-col h-full">{children}</div>
  </div>
);

/** Render a stretched div with background image  */
const BackgroundImage = ({ imageName = "bg-tiling-1", size = "200px", position = "0px 0px" }) => (
  <div
    data-cy="background-image"
    className={`${imageName} absolute left-0 top-0 w-full h-full z-0 opacity-40`}
    style={{
      backgroundSize: size,
      backgroundPosition: position,
    }}
  ></div>
);
