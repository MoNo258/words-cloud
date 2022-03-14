interface IApiResponse {
  question: string;
  all_words: string[];
  good_words: string[];
  // good_words: Pick<IApiResponse, "all_words">;
}

interface ICloudItem {
  text: string;
  value: number;
}

type CloudData = ICloudItem[];

interface IUser {
  name: string;
}
