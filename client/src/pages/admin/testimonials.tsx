import { AdminLayout } from "@/components/layout/admin-layout";
import { useTestimonials, useCreateTestimonial, useDeleteTestimonial } from "@/hooks/use-testimonials";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTestimonialSchema } from "@shared/schema";
import { useState } from "react";
import { z } from "zod";

export default function AdminTestimonials() {
  const { data: testimonials = [] } = useTestimonials();
  const createTestimonial = useCreateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof insertTestimonialSchema>>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: { clientName: "", company: "", review: "", avatarUrl: "" }
  });

  const onSubmit = (data: z.infer<typeof insertTestimonialSchema>) => {
    createTestimonial.mutate(data, {
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
          <h1 className="text-3xl font-heading font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Manage client reviews.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add Review</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle>Add Testimonial</DialogTitle></DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="clientName" render={({ field }) => (
                  <FormItem><FormLabel>Client Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem><FormLabel>Company / Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="review" render={({ field }) => (
                  <FormItem><FormLabel>Review</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={createTestimonial.isPending} className="w-full">Save Testimonial</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((test) => (
          <div key={test.id} className="bg-card rounded-xl border border-border p-6 relative group">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-opacity" onClick={() => deleteTestimonial.mutate(test.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <p className="italic text-muted-foreground mb-4">"{test.review}"</p>
            <div>
              <p className="font-bold">{test.clientName}</p>
              <p className="text-sm text-primary">{test.company}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
