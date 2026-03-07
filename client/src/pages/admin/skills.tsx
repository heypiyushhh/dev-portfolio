import { AdminLayout } from "@/components/layout/admin-layout";
import { useSkills, useCreateSkill, useDeleteSkill } from "@/hooks/use-skills";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSkillSchema } from "@shared/schema";
import { useState } from "react";
import { z } from "zod";

export default function AdminSkills() {
  const { data: skills = [] } = useSkills();
  const createSkill = useCreateSkill();
  const deleteSkill = useDeleteSkill();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof insertSkillSchema>>({
    resolver: zodResolver(insertSkillSchema),
    defaultValues: { name: "", icon: "Code2", category: "Frontend" }
  });

  const onSubmit = (data: z.infer<typeof insertSkillSchema>) => {
    createSkill.mutate(data, {
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
          <h1 className="text-3xl font-heading font-bold">Skills</h1>
          <p className="text-muted-foreground">Manage your tech stack display.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add Skill</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle>Add New Skill</DialogTitle></DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Skill Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Category</FormLabel><FormControl><Input placeholder="Frontend, Backend, etc." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="icon" render={({ field }) => (
                  <FormItem><FormLabel>Icon (Lucide name)</FormLabel><FormControl><Input placeholder="Code2" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={createSkill.isPending} className="w-full">Save Skill</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {skills.map((skill) => (
            <div key={skill.id} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div>
                <h4 className="font-bold">{skill.name}</h4>
                <p className="text-xs text-muted-foreground">{skill.category}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteSkill.mutate(skill.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {skills.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No skills added yet.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
