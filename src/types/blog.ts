// Blog page types
export interface BlogPageParams {
  slug: string;
}

export interface BlogPageProps {
  params: BlogPageParams;
  searchParams?: Record<string, string | string[] | undefined>;
}
