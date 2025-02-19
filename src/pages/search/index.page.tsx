import DogList from "@/components/DogList";
import Filters from "@/components/Filters";
import SEO from "@/components/SEO";
import { SearchProvider } from "@/contexts/SearchContext";
import { PageNaviation } from "@/hoc/PageNavigation";

export default function Search() {
  return (
    <>
      <SEO pageTitle="Fetch app search" pageDescription="Fetch app search page" />
      <SearchProvider>
        <Filters />
        <PageNaviation>
          <DogList />
        </PageNaviation>
      </SearchProvider>
    </>
  );
}