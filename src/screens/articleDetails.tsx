import { useRoute } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../App";
import { RootState } from "../store";
import { fetchArticleById } from "../store/articlesSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Article">;

export const ArticleDetailsScreen = ({ route }: Props) => {
  const { id } = route.params;
  const dispatch = useDispatch<any>();
  const article = useSelector((state: RootState) => state.articles.byId[id]);

  useEffect(() => {
    dispatch(
      fetchArticleById({
        id,
      })
    );
  }, [id]);

  return (
    <View style={{}}>
      <Image
        source={{ uri: article?.img_src }}
        style={{ width: "100%", height: 200 }}
      />
      <Text style={{ marginVertical: 20, fontSize: 20 }}>{article?.title}</Text>
      <Text style={{ margin: 4 }}>{article?.content}</Text>
    </View>
  );
};

export const articlesScreenOptions: NativeStackNavigationOptions = {
  title: "Article",
};

export type articlesScreenParams = {
  id: number;
};
