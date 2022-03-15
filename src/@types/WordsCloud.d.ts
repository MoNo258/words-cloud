interface IApiResponse {
  question: string;
  all_words: string[];
  good_words: string[];
}

interface ICloudItem {
  text: string;
  value: number;
}

type CloudData = ICloudItem[];

interface IUser {
  name: string;
}
