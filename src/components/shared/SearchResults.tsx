import { Models } from "appwrite";

type SearchResultsProps = {
  searchedPosts: Models.Document[];
  isSearchFetching: boolean;
};

export default function SearchResults({ searchedPosts, isSearchFetching }: SearchResultsProps) {
  return <div>SearchResults</div>;
}
