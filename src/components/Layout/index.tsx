import { ReactElement, ReactNode } from "react";
import SEO from "../SEO";

interface ILayout {
  children?: ReactNode | ReactElement
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <SEO pageTitle="Fetch App" pageDescription="Fetch App" />
      {children}
    </>
  );
}