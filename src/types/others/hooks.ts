type usePostType = {
  onSuccess?: (res: any) => void;
  url: string;
  method: "POST" | "PUT" | "PATCH" | "GET";
};
