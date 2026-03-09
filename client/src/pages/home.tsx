import { PublicLayout } from "@/components/layout/public-layout";
import { useProjects } from "@/hooks/use-projects";
import { useSkills } from "@/hooks/use-skills";
import { useTestimonials } from "@/hooks/use-testimonials";
import { useCreateMessage } from "@/hooks/use-messages";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Github, Send, Layers, Code, Smartphone, ChevronRight, ChevronLeft, MessageSquare, Code2 } from "lucide-react";
import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { insertMessageSchema } from "@shared/schema";



// Fallback Data if backend is empty
const MOCK_PROJECTS = [
  { id: 1, title: "FinTech Dashboard", description: "A comprehensive dashboard for managing cryptocurrency portfolios with real-time charts.", techStack: ["React", "TypeScript", "Tailwind"], imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { id: 2, title: "E-Commerce Store", description: "Modern headless e-commerce solution with Stripe integration and dynamic cart.", techStack: ["Next.js", "Node.js", "PostgreSQL"], imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80" },
  { id: 3, title: "AI Content Generator", description: "SaaS application that generates marketing copy using OpenAI's API.", techStack: ["Vue", "Python", "MongoDB"], imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" }
];

const MOCK_SKILLS = [
  { id: 1, name: "React / Next.js", category: "Frontend" },
  { id: 2, name: "TypeScript", category: "Language" },
  { id: 3, name: "Node.js", category: "Backend" },
  { id: 4, name: "PostgreSQL", category: "Database" },
  { id: 5, name: "Tailwind CSS", category: "Design" },
  { id: 6, name: "AWS / Vercel", category: "DevOps" },
];

export default function Home() {
  const { data: projects = [] } = useProjects();
  const { data: skills = [] } = useSkills();
  const { data: testimonials = [] } = useTestimonials();
  const createMessage = useCreateMessage();
  const { toast } = useToast();

  const displayProjects = projects.length > 0 ? projects : MOCK_PROJECTS;
  const displaySkills = skills.length > 0 ? skills : MOCK_SKILLS;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  
  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi]);
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi]);

  const form = useForm<z.infer<typeof insertMessageSchema>>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (data: z.infer<typeof insertMessageSchema>) => {
    createMessage.mutate(data, {
      onSuccess: () => {
        toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
        form.reset();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to send message. Please try again." });
      }
    });
  };

  return (
    <PublicLayout>
      {/* HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 mix-blend-screen"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h2 className="text-primary font-semibold tracking-wider uppercase mb-4">Hello, Welcome</h2>
              <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-foreground leading-tight mb-6">
                I'm <span className="text-gradient">Piyush Kumar</span>
                <br />
                <span className="relative inline-block mt-2">
                  Full Stack Developer
                  <svg className="absolute w-full h-4 -bottom-1 left-0 text-primary" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00034 6.70275C29.6644 3.73719 104.912 -1.16104 198.001 5.76135" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                I craft high-performance, beautiful web applications. From complex backend architectures to pixel-perfect frontends, I bring ideas to life.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact">
                  <Button  size="lg"  className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-md shadow-[0_0_20px_rgba(244,180,0,0.3)] hover:shadow-[0_0_30px_rgba(244,180,0,0.5)] transition-all">
                  Hire Me
                </Button>
                </a>
              <a href="#portfolio">
                 <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold text-md border-border hover:bg-secondary">
                  View Portfolio
                </Button>
              </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-[500px] h-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full animate-pulse"></div>
                <div className="absolute inset-4 rounded-full border border-white/10 flex items-center justify-center overflow-hidden bg-secondary">
                  {/* hero profile picture developer coder */}
                  {/* <img src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=800&q=80" alt="Developer" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" /> */}

                  <img src="/image.png" alt="hero image" />
                </div>
                
                {/* Floating Tech Badges */}
                <div className="absolute top-12 left-10 glass-card px-4 py-2 rounded-2xl flex items-center gap-2 animate-bounce" style={{animationDuration: '3s'}}>
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="font-medium text-sm">React</span>
                </div>
                <div className="absolute bottom-20 right-4 glass-card px-4 py-2 rounded-2xl flex items-center gap-2 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="font-medium text-sm">Node.js</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES & STATS */}
      <section id="services" className="py-20 bg-secondary/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">What I Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Specialized in building modern, scalable web applications using the latest technologies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">UI/UX Design</h3>
                <p className="text-muted-foreground text-sm">Creating intuitive, user-centric interfaces that look beautiful and convert effectively.</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Web Development</h3>
                <p className="text-muted-foreground text-sm">Robust, scalable front-end and back-end architectures using React, Node, and PostgreSQL.</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-6">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">App Optimization</h3>
                <p className="text-muted-foreground text-sm">Improving performance, SEO, and accessibility for existing web applications.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Technical Arsenal</h2>
              <p className="text-muted-foreground max-w-xl">The tools and technologies I use to bring products to life.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displaySkills.map((skill, i) => (
              <div key={skill.id || i} className="bg-secondary border border-border rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                   <Code2 className="w-6 h-6" />
                </div>
                <span className="font-medium text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Featured Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Some of my recent projects that showcase my skills and problem-solving approach.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project: any) => (
              <Card key={project.id} className="bg-card border-none overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="icon" variant="secondary" className="rounded-full w-12 h-12">
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full w-12 h-12">
                      <Github className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(project.techStack) ? project.techStack.map((tech: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-secondary text-xs rounded-md text-muted-foreground font-medium">
                        {tech}
                      </span>
                    )) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-heading font-bold mb-6">Let's discuss your next project.</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form and I'll get back to you within 24 hours. Let's create something amazing together.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span>hello@piyushkumar.dev</span>
                  </div>
                </div>
              </div>

              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Your Name" className="bg-secondary/50 border-none h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Email Address" type="email" className="bg-secondary/50 border-none h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea placeholder="Project details..." className="bg-secondary/50 border-none min-h-[120px] resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={createMessage.isPending} className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-md">
                      {createMessage.isPending ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
