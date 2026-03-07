import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertTestimonial, UpdateTestimonialRequest } from "@shared/schema";

export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials.list.path],
    queryFn: async () => {
      const res = await fetch(api.testimonials.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return api.testimonials.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      const res = await fetch(api.testimonials.create.path, {
        method: api.testimonials.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create testimonial");
      return api.testimonials.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.testimonials.list.path] });
    },
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateTestimonialRequest }) => {
      const url = buildUrl(api.testimonials.update.path, { id });
      const res = await fetch(url, {
        method: api.testimonials.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update testimonial");
      return api.testimonials.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.testimonials.list.path] });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.testimonials.delete.path, { id });
      const res = await fetch(url, {
        method: api.testimonials.delete.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.testimonials.list.path] });
    },
  });
}
