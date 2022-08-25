import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../App";
import { Article } from "../models/articles";
import { RootState } from "../store";
import { fetchArticles } from "../store/articlesSlice";

export const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const { categoriesById, categories } = useSelector((state: RootState) => ({
    categoriesById: state.articles.byCategory,
    categories: state.articles.categories,
  }));

  useEffect(() => {
    dispatch(
      fetchArticles({
        page: 1,
      })
    );
  }, []);

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem category={item} />}
      />
    </View>
  );
};

const CategoryItem = ({ category }: { category: string }) => {
  const articles = useSelector(
    (state: RootState) => state.articles.byCategory[category]
  );
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 18 }}>
        {category}
      </Text>
      <FlatList
        data={articles}
        renderItem={({ item }) => <ArticleItem articleId={item} />}
      />
    </View>
  );
};

const ArticleItem = ({ articleId }: { articleId: number }) => {
  const navigation = useNavigation<any>();
  const article = useSelector(
    (state: RootState) => state.articles.byId[articleId]
  );

  const gotoDetails = useCallback(() => {
    navigation.navigate("Article", {
      id: articleId,
    });
  }, [articleId]);

  return (
    <Pressable onPress={gotoDetails}>
      <View style={{ margin: 4, borderWidth: 1, padding: 4 }}>
        <Image
          source={{ uri: article?.img_src }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{article?.title}</Text>
      </View>
    </Pressable>
  );
};

export const homeScreenOptions: NativeStackNavigationOptions = {
  title: "Articles",
};
