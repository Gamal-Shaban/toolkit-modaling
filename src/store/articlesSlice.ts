import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Article, getAllArticles, getArticle } from "../models/articles";

export interface ArticlesState {
  byId: {
    [key: string]: Article | undefined;
  };
  byCategory: { [key: string]: number[] };
  categories: string[];
}

const initialState: ArticlesState = {
  byId: {},
  byCategory: {},
  categories: [],
};

export const fetchArticles = createAsyncThunk<Article[], { page?: number }>(
  "articles/getAll",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      return await getAllArticles({ page });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchArticleById = createAsyncThunk<Article, { id: number }>(
  "articles/getById",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getArticle(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.byCategory = {};
      state.byId = {};
      state.categories = [];
      action.payload.forEach((article: Article) => {
        state.byId[article.id] = {
          id: article.id,
          title: article.title,
          img_src: article.img_src,
          category: article.category,
          date: article.date,
        };

        if (!state.byCategory[article.category]) {
          state.byCategory[article.category] = [];
          state.categories.push(article.category);
        }

        state.byCategory[article.category].push(article.id);
      });
    });

    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      state.byId[action.payload.id] = {
        ...state.byId[action.payload.id],
        ...action.payload,
      };
    });
  },
});

export default articlesSlice.reducer;
