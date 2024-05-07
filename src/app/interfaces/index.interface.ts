export interface IPathConfig {
  [key: string]: {
    mainText: string;
    highlightText: string;
    subText?: string;
  };
}

export interface IMenuItem {
  text: string;
  icon: JSX.Element;
  href: string[];
}
