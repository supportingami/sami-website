import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import Link from "next/link";
import type { ComponentHomeHeroImage } from "../../graphql/generated";

export const HeroImageComponent: React.FC<{ heroImage: ComponentHomeHeroImage }> = ({ heroImage }) => {
  const { Image: ImageData, Text, ActionButtons } = heroImage;

  /**
   * Generate style code to allow text to have background colour split across lines
   * Adapted from http://jsfiddle.net/9BTYQ/1/
   */
  const getTextStyles = () => {
    // Retrieve primary colour and modify to be slightly darker for use with text
    const primaryColorVar = window.getComputedStyle(document.documentElement).getPropertyValue("--p");
    const [h, s, l] = primaryColorVar.trim().split(" ");
    const bgColor = `hsla(${h} ${s} 40% / 80%)`;
    const boxShadow = `0.5em 0 0 ${bgColor},-0.5em 0 0 ${bgColor}`;
    return { boxShadow, bgColor };
  };

  const getButtonColor = (index: number) => {
    return index % 2 === 0 ? "primary" : "secondary";
  };

  const { bgColor, boxShadow } = getTextStyles();

  return (
    <div className="hero min-h-[75vh] relative">
      <div className="hero-overlay bg-opacity-60"></div>
      <Image src={getStrapiMedia(ImageData)} layout="fill" objectFit="cover" objectPosition="center" alt={Text} />
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-3xl font-bold text-white ">
            <span style={{ lineHeight: "2em", padding: "6px", boxShadow, background: bgColor }}>{Text}</span>
          </h1>
          {ActionButtons &&
            ActionButtons.map(({ id, Link: ButtonLink, Text: ButtonText }, index) => (
              <Link key={id} href={ButtonLink}>
                <button className={`btn btn-${getButtonColor(index)} mx-2`} key={id}>
                  {ButtonText}
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
