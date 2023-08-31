import Link from "next/link";
import type { ComponentCommonActionButton } from "../../graphql/generated";
import { ExternalLink } from "./externalLink";

export const ActionButtonsComponent: React.FC<{ actionButtons: ComponentCommonActionButton[]; className?: string }> = ({
  actionButtons,
  className = "",
}) => {
  const getButtonColor = (index: number) => {
    return index % 2 === 0 ? "primary" : "secondary";
  };

  return (
    <div data-testid="actionButtons" className={`flex gap-2 ${className}`}>
      {actionButtons?.map(({ id, Link: ButtonLink, Text: ButtonText }, index) => {
        const isExternalLink = ButtonLink.startsWith("http");
        return isExternalLink ? (
          <ExternalLink key={id} href={ButtonLink}>
            <button className={`btn btn-${getButtonColor(index)}`} key={id}>
              {ButtonText}
            </button>
          </ExternalLink>
        ) : (
          <Link key={id} href={ButtonLink}>
            <button className={`btn btn-${getButtonColor(index)}`} key={id}>
              {ButtonText}
            </button>
          </Link>
        );
      })}
    </div>
  );
};
