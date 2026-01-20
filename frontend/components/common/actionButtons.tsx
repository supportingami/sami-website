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
    <div data-test-id="actionButtons" className={`flex gap-2 ${className}`}>
      {actionButtons?.map(({ id, Link: ButtonLink, Text: ButtonText }, index) => {
        // Open external links or file uploads in new tab
        const isExternalLink = ButtonLink.startsWith("http") || ButtonLink.startsWith("/uploads");
        const key = `actionButton_${id}`;
        return isExternalLink ? (
          <ExternalLink key={key} href={ButtonLink}>
            <button className={`btn btn-${getButtonColor(index)}`} key={id}>
              {ButtonText}
            </button>
          </ExternalLink>
        ) : (
          <Link key={key} href={ButtonLink}>
            <button className={`btn btn-${getButtonColor(index)}`} key={id}>
              {ButtonText}
            </button>
          </Link>
        );
      })}
    </div>
  );
};
