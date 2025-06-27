import { getAccessToken } from "@/utils/cookies";
import { useDebounce } from "@/utils/debounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useGet = ({
  url,
  params,
  enabled,
  staleTime = 60000,
}: {
  url: string;
  params: any;
  enabled?: boolean;
  staleTime?: number;
}) => {
  const debouncedKeyword = useDebounce(params.search, 1000);
  return useQuery({
    queryKey: [url, { ...params, search: debouncedKeyword }],
    staleTime: staleTime,
    queryFn: async () => {
      const response = await axios({
        method: "GET",
        url,
        headers: { Authorization: `Bearer ${getAccessToken}` },
        params,
      });
      return response.data;
    },
    enabled,
  });
};

export const useOption = async ({ url, inputValue }: any) => {
  const response = await axios({
    method: "GET",
    url,
    headers: { Authorization: `Bearer ${getAccessToken}` },
    params: {
      page: 1,
      page_size: 10,
      keyword: inputValue,
    },
  });
  return response?.data?.data;
};

export const useDelete = ({
  url,
  onSuccess,
  method = "DELETE",
}: {
  url: string;
  onSuccess?: (res: any) => void;
  method?: string;
}) => {
  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await axios({
        method: method,
        url: `${url}/${id}`,
        headers: { Authorization: `Bearer ${getAccessToken}` },
      });
      return response;
    },
    onSuccess,
    onError: (err: any) => {
      const msg = err.response.data.error
        ? err.response.data.error
        : err.response.data.message || err.response.data;
      toast.error(msg || "Terjadi kesalahan");
    },
  });
};

export const usePost = ({ onSuccess, url, method }: usePostType) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await axios({
        method,
        url,
        headers: { Authorization: `Bearer ${getAccessToken}` },
        data: body,
      });
      return response;
    },
    onSuccess,
    onError: (err: any) => {
      const msg = err.response.data.error
        ? err.response.data.error
        : err.response.data.message || err.response.data;
      toast.error(msg || "Terjadi kesalahan");
    },
  });
};

export const useExport = ({ url, method, filter, name }: any) => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios({
        method,
        url,
        responseType: "blob",
        headers: { Authorization: `Bearer ${getAccessToken}` },
        params: filter,
      });
      const urlExport = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlExport;
      link.setAttribute("download", `${name}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onError: (err: any) => {
      const msg = err.response.data.error
        ? err.response.data.error
        : err.response.data.message || err.response.data;
      toast.error(msg || "Terjadi kesalahan");
    },
  });
};

export const useUploadFile = ({ onSuccess, url, method }: usePostType) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await axios({
        method: method,
        url,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccessToken}`,
        },
        data: body,
      });
      return response;
    },
    onSuccess,
    onError: (err: any) => {
      const msg = err.response.data.error
        ? err.response.data.error
        : err.response.data.message || err.response.data;
      toast.error(msg || "Terjadi kesalahan");
    },
  });
};

export const usePrint = ({ url }: { url: string }) => {
  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await axios({
        method: "GET",
        url: `${url}/${id}`,
        headers: { Authorization: `Bearer ${getAccessToken}` },
        responseType: "blob",
      });
      const blobUrl = window.URL.createObjectURL(response.data);
      const printWindow = window.open(blobUrl, "_blank");
      if (!printWindow) {
        throw new Error("Popup blocked! Please allow popups and try again.");
      }

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000);
    },
    onError: (err: any) => {
      const msg = err.response.data.error
        ? err.response.data.error
        : err.response.data.message || err.response.data;
      toast.error(msg || "Terjadi kesalahan");
    },
  });
};
