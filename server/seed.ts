import { db } from "./db";
import { users, projects, skills, testimonials } from "../shared/schema";

async function seed() {
  const existingUsers = await db.select().from(users);
  if (existingUsers.length === 0) {
    await db.insert(users).values({ email: 'admin@example.com', password: 'password123' });
    
    await db.insert(projects).values([
      {
        title: 'Student Notes Portal',
        description: 'A platform for students to share and discover study materials.',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000',
        techStack: ['React', 'Node.js', 'MongoDB'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        order: 1
      },
      {
        title: 'Admin Dashboard System',
        description: 'A comprehensive dashboard for managing business metrics and users.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
        techStack: ['Next.js', 'TypeScript', 'Tailwind'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        order: 2
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates.',
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fd36f?auto=format&fit=crop&q=80&w=1000',
        techStack: ['Vue', 'Express', 'PostgreSQL'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        order: 3
      }
    ]);

    await db.insert(skills).values([
      { name: 'React', icon: 'Code', category: 'Frontend' },
      { name: 'JavaScript', icon: 'FileCode2', category: 'Frontend' },
      { name: 'Node.js', icon: 'Server', category: 'Backend' },
      { name: 'Tailwind CSS', icon: 'Palette', category: 'Frontend' },
      { name: 'PostgreSQL', icon: 'Database', category: 'Database' }
    ]);

    await db.insert(testimonials).values([
      {
        clientName: 'Sarah Jenkins',
        company: 'TechStart Inc.',
        review: 'Piyush delivered an outstanding product ahead of schedule. The code quality and attention to detail were exceptional.',
        avatarUrl: 'https://i.pravatar.cc/150?u=1'
      },
      {
        clientName: 'Michael Chen',
        company: 'Global Solutions',
        review: 'Working with Piyush was a great experience. He understood our requirements perfectly and built a highly scalable solution.',
        avatarUrl: 'https://i.pravatar.cc/150?u=2'
      }
    ]);
    
    console.log('Seed data inserted successfully.');
  } else {
    console.log('Database already seeded.');
  }
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
