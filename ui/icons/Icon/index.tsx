import { Mail } from "lucide-react";
import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  strokeWidth?: number | string;
};

const IconBase = ({
  children,
  size = 24,
  strokeWidth = 1.75,
  viewBox = "0 0 24 24",
  className,
  ...props
}: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={size}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    viewBox={viewBox}
    width={size}
    {...props}
  >
    {children}
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18M3 12h18M3 7h18" />
  </IconBase>
);

export const FacebookIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path
      fill="currentColor"
      stroke="none"
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
    />
  </IconBase>
);

export const InstagramIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path
      fill="currentColor"
      stroke="none"
      d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
    />
  </IconBase>
);

export const WeddingIcon = (props: IconProps) => (
  <IconBase {...props}>
    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5">
      <circle cx="8.5" cy="16.5" r="5.5" strokeLinecap="round" />
      <circle cx="15.5" cy="16.5" r="5.5" strokeLinecap="round" />
      <path d="M12 9s4-1.853 4-4.861C16 2.958 15.158 2 14 2c-.947 0-1.579.412-2 1.235C11.579 2.412 10.947 2 10 2c-1.158 0-2 .958-2 2.139C8 7.147 12 9 12 9Z" />
    </g>
  </IconBase>
);

export const PartyIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path
      fill="none"
      stroke="#002147"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m4.187 14.31l1.47-3.308c1.12-2.517 1.68-3.776 2.758-3.976s2.053.773 4 2.721l1.839 1.838c1.947 1.948 2.921 2.922 2.721 4.001S15.516 17.224 13 18.343l-3.309 1.47c-4.174 1.856-6.26 2.783-7.273 1.77s-.085-3.099 1.77-7.272M6.5 10.5l7 7m-9-2l4 4M16 8l3-3m2.876 1h-.125M22 6a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m-1.124 7.25h-.125m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m-2.875-11H18m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m-7.124 1H11m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0M14.198 2c.4.667.718 2.4-1.197 4M22 9.803c-.666-.4-2.4-.719-4 1.197"
    />
  </IconBase>
);

export const PopupIcon = (props: IconProps) => (
  <IconBase {...props} viewBox="0 0 48 48">
    <g fill="none" stroke="#002147" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      <path d="M27.986 12.133c2.91.046 5.71.108 8.174.19c.884.029 1.758.241 2.496.728c3.488 2.3 5.806 6.116 6.797 7.994c.382.724.549 1.539.542 2.358a132 132 0 0 1-.54 11.068c-.215 2.293-2.066 4.02-4.366 4.137q-.54.028-1.152.056m-10.912.305a407 407 0 0 1-10.05 0m-10.912-.305q-.792-.037-1.465-.072c-2.151-.112-3.917-1.645-4.164-3.785C2.208 32.848 2 30.104 2 26.636V25" />
      <path d="M40.038 22.527c-.93-1.729-2.52-4.111-4.702-5.348A1.45 1.45 0 0 0 34.62 17A1.62 1.62 0 0 0 33 18.62v4.377c0 .927.638 1.728 1.558 1.842c1.06.13 2.562.235 4.202.093c1.2-.103 1.849-1.345 1.278-2.406M28 25H2V14c0-2.986.103-5.277.224-6.945c.155-2.123 1.809-3.706 3.934-3.83C8.166 3.107 11.075 3 15 3s6.834.107 8.842.225c2.125.124 3.779 1.707 3.934 3.83C27.897 8.723 28 11.014 28 14zm1 14.5a5.5 5.5 0 1 0 11 0a5.5 5.5 0 0 0-11 0m-21 0a5.5 5.5 0 1 0 11 0a5.5 5.5 0 0 0-11 0" />
      <path d="M2 11c0 2.21 1.94 4 4.333 4s4.334-1.79 4.334-4c0 2.21 1.94 4 4.333 4s4.333-1.79 4.333-4c0 2.21 1.94 4 4.334 4S28 13.21 28 11m-17.333 0V3.5m8.667 7.5V3.5" />
    </g>
  </IconBase>
);

export const CorporateIcon = (props: IconProps) => (
  <IconBase {...props}>
    <g fill="none" stroke="#002147" strokeLinecap="round" strokeWidth="1.5">
      <path
        strokeLinejoin="round"
        d="M18.482 6.5c1.422 0 2.133 0 2.642.346c.209.141.389.321.53.53c.346.509.346 1.22.346 2.644c0 1.03 0 1.546-.214 1.97a2 2 0 0 1-.338.48c-.328.344-.813.518-1.784.864l-4.012 1.433c-.325.116-.488.174-.657.204s-.342.029-.688.029H9.693c-.346 0-.519 0-.688-.03c-.17-.029-.332-.087-.657-.203l-4.012-1.433c-.97-.346-1.456-.52-1.784-.864a2 2 0 0 1-.338-.48C2 11.566 2 11.05 2 10.02c0-1.424 0-2.135.346-2.644a2 2 0 0 1 .53-.53C3.385 6.5 4.096 6.5 5.518 6.5zM15.5 6c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C13.898 3 13.432 3 12.5 3h-1c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C8.5 4.602 8.5 5.068 8.5 6"
      />
      <path
        strokeLinejoin="round"
        d="M21 13v2c0 2.828 0 4.243-.879 5.121C19.243 21 17.828 21 15 21H9c-2.828 0-4.243 0-5.121-.879C3 19.243 3 17.828 3 15v-2"
      />
      <path d="M12 15v2" />
    </g>
  </IconBase>
);

export const OtherIcon = (props: IconProps) => (
  <IconBase {...props}>
    <g fill="none" stroke="#002147" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M12.25 12H12m.5 0a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0m4.75 0H17m.5 0a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0M7.25 12H7m.5 0a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0" />
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10" />
    </g>
  </IconBase>
);

export const ExtrasIcon = (props: IconProps) => (
  <IconBase {...props}>
    <g fill="none" stroke="#002147" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M12 19h7.909a1.091 1.091 0 0 0 .823-1.808L7.808 2.354A1.03 1.03 0 0 0 6 3.03V13c0 2.828 0 4.243.879 5.121C7.757 19 9.172 19 12 19" />
      <path d="M6 6.722L4.808 5.354A1.03 1.03 0 0 0 3 6.03V16c0 2.828 0 4.243.879 5.121C4.757 22 6.172 22 9 22h7.909a1.091 1.091 0 0 0 .823-1.808L16.694 19" />
      <path d="M9 4v12h10.5" />
    </g>
  </IconBase>
);

export const MailIcon = () => <Mail />;

export const iconComponents = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  menu: MenuIcon,
  wedding: WeddingIcon,
  corporate: CorporateIcon,
  other: OtherIcon,
  party: PartyIcon,
  popup: PopupIcon,
  extras: ExtrasIcon,
  mail: MailIcon,
} as const;

export type IconName = keyof typeof iconComponents;

export const getIcon = (name: IconName) => iconComponents[name];

export type NamedIconProps = IconProps & {
  name: IconName;
};

export const Icon = ({ name, ...props }: NamedIconProps) => {
  const IconComponent = getIcon(name);

  return <IconComponent {...props} />;
};
