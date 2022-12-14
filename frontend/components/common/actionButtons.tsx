import Link from "next/link";
import type { ComponentCommonActionButton } from "../../graphql/generated";

export const ActionButtonsComponent: React.FC<{ actionButtons: ComponentCommonActionButton[]; className?: string }> = ({
  actionButtons,
  className = "",
}) => {
  const getButtonColor = (index: number) => {
    return index % 2 === 0 ? "primary" : "secondary";
  };

  return (
    <div data-testid="actionButtons" className={`flex gap-2 ${className}`}>
      {actionButtons?.map(({ id, Link: ButtonLink, Text: ButtonText }, index) => (
        <Link key={id} href={ButtonLink}>
          <button className={`btn btn-${getButtonColor(index)}`} key={id}>
            {ButtonText}
          </button>
        </Link>
      ))}
    </div>
  );
};
