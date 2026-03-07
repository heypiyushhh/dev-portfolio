import { AdminLayout } from "@/components/layout/admin-layout";
import { useProjects } from "@/hooks/use-projects";
import { useMessages } from "@/hooks/use-messages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MessageSquare, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: projects = [] } = useProjects();
  const { data: messages = [] } = useMessages();
  
  const unreadMessages = messages.filter(m => !m.read).length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold">Overview</h1>
        <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            <Briefcase className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Messages</CardTitle>
            <MessageSquare className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unread Messages</CardTitle>
            <Eye className="w-4 h-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{unreadMessages}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profile Views</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
            <p className="text-xs text-green-400 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
