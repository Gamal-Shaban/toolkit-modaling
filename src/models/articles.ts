const API = "https://example-data.draftbit.com/articles";
const ITEM_PER_PAGE = 100;

export type Article = {
  id: number;
  title: string;
  category: string;
  content?: string;
  date: string;
  img_src: string;
};

export const getAllArticles = async ({ page }: { page: number }) => {
  const response = await fetch(API + `?_page=${page}&_limit=${ITEM_PER_PAGE}`);
  return response.json();
};

export const getArticle = async (id: number) => {
  const response = await fetch(API + `/${id}`);
  return response.json();
};
