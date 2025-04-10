import { ArrowLineRightSVG } from "@readup/icons";

type LinkComponentType = React.ComponentType<{ children: React.ReactNode; href: string }>;

interface SettingsItem {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface SettingsListProps {
  title?: string;
  lists: SettingsItem[];
  linkComponent?: LinkComponentType;
}

function SettingsList({ title, lists, linkComponent: LinkComponent }: SettingsListProps) {
  return (
    <div className="w-full flex flex-col text-white">
      {title && <h2 className="typo-title2 mb-2">{title}</h2>}
      {lists.map((item, index) => {
        const content = (
          <div
            className={`flex flex-row p-4 items-center justify-between cursor-pointer hover:bg-white/10 transition-colors ${
              item.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={item.onClick}
          >
            <p className="typo-body">{item.label}</p>
            <ArrowLineRightSVG size="md" color="white" />
          </div>
        );

        if (item.disabled) return <div key={index}>{content}</div>;

        if (item.href && LinkComponent) {
          return (
            <LinkComponent key={index} href={item.href}>
              {content}
            </LinkComponent>
          );
        }

        return <div key={index}>{content}</div>;
      })}
    </div>
  );
}

export { SettingsList };
export type { SettingsListProps, SettingsItem };
