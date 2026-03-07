import { z } from 'zod';
import { 
  insertUserSchema, users, 
  insertProjectSchema, projects,
  insertSkillSchema, skills,
  insertTestimonialSchema, testimonials,
  insertMessageSchema, messages
} from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  unauthorized: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login' as const,
      input: insertUserSchema,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      }
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout' as const,
      responses: {
        200: z.object({ success: z.boolean() }),
      }
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      }
    }
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: { 200: z.array(z.custom<typeof projects.$inferSelect>()) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/projects' as const,
      input: insertProjectSchema,
      responses: { 201: z.custom<typeof projects.$inferSelect>() }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/projects/:id' as const,
      input: insertProjectSchema.partial(),
      responses: { 200: z.custom<typeof projects.$inferSelect>(), 404: errorSchemas.notFound }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/projects/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound }
    }
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills' as const,
      responses: { 200: z.array(z.custom<typeof skills.$inferSelect>()) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/skills' as const,
      input: insertSkillSchema,
      responses: { 201: z.custom<typeof skills.$inferSelect>() }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/skills/:id' as const,
      input: insertSkillSchema.partial(),
      responses: { 200: z.custom<typeof skills.$inferSelect>(), 404: errorSchemas.notFound }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/skills/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound }
    }
  },
  testimonials: {
    list: {
      method: 'GET' as const,
      path: '/api/testimonials' as const,
      responses: { 200: z.array(z.custom<typeof testimonials.$inferSelect>()) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/testimonials' as const,
      input: insertTestimonialSchema,
      responses: { 201: z.custom<typeof testimonials.$inferSelect>() }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/testimonials/:id' as const,
      input: insertTestimonialSchema.partial(),
      responses: { 200: z.custom<typeof testimonials.$inferSelect>(), 404: errorSchemas.notFound }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/testimonials/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound }
    }
  },
  messages: {
    list: {
      method: 'GET' as const,
      path: '/api/messages' as const,
      responses: { 200: z.array(z.custom<typeof messages.$inferSelect>()) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/messages' as const,
      input: insertMessageSchema,
      responses: { 201: z.custom<typeof messages.$inferSelect>() }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/messages/:id' as const,
      input: z.object({ read: z.boolean() }),
      responses: { 200: z.custom<typeof messages.$inferSelect>(), 404: errorSchemas.notFound }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/messages/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
