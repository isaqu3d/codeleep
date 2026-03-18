import axios from "axios";
import type {
  CreatePostPayload,
  PaginatedResponse,
  Post,
  UpdatePostPayload,
} from "../types";

const api = axios.create({
  baseURL: "https://dev.codeleap.co.uk/careers/",
});

export async function fetchPosts(
  nextUrl?: string,
): Promise<PaginatedResponse<Post>> {
  const url = nextUrl ? new URL(nextUrl).search : "";
  const { data } = await api.get<PaginatedResponse<Post>>(url);
  return data;
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const { data } = await api.post<Post>("", payload);
  return data;
}

export async function updatePost(
  id: number,
  payload: UpdatePostPayload,
): Promise<Post> {
  const { data } = await api.patch<Post>(`${id}/`, payload);
  return data;
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`${id}/`);
}
