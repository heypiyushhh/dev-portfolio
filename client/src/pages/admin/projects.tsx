import { AdminLayout } from "@/components/layout/admin-layout";
import { useProjects, useCreateProject, useDeleteProject } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema } from "@shared/schema";
import { useState } from "react";
import { z } from "zod";

export default function AdminProjects() {
  const { data: projects = [], isLoading } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const [open, setOpen] = useState(false);

  // Schema expects JSON array, frontend form handles comma separated string
  const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    imageUrl: z.string().url(),
    techStack: z.string(), // We'll split this before submit
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", imageUrl: "", techStack: "", liveUrl: "", githubUrl: "" }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createProject.mutate({
      ...data,
      techStack: data.techStack.split(',').map(s => s.trim()).filter(Boolean),
      liveUrl: data.liveUrl || null,
      githubUrl: data.githubUrl || null,
    }, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="techStack" render={({ field }) => (
                  <FormItem><FormLabel>Tech Stack (comma separated)</FormLabel><FormControl><Input placeholder="React, Node.js, Tailwind" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="liveUrl" render={({ field }) => (
                    <FormItem><FormLabel>Live Demo URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="githubUrl" render={({ field }) => (
                    <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <Button type="submit" disabled={createProject.isPending} className="w-full">Save Project</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card border-none overflow-hidden">
            <div className="h-40 overflow-hidden">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.description}</p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => deleteProject.mutate(project.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-muted-foreground">No projects found. Add one to get started.</div>
        )}
      </div>
    </AdminLayout>
  );
}
