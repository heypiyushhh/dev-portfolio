import { AdminLayout } from "@/components/layout/admin-layout";
import { useMessages, useUpdateMessageStatus, useDeleteMessage } from "@/hooks/use-messages";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, Trash2, Mail } from "lucide-react";

export default function AdminMessages() {
  const { data: messages = [] } = useMessages();
  const updateStatus = useUpdateMessageStatus();
  const deleteMessage = useDeleteMessage();

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold">Messages</h1>
        <p className="text-muted-foreground">Inbox from your portfolio contact form.</p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-6 flex flex-col md:flex-row gap-4 justify-between transition-colors ${msg.read ? 'opacity-70 bg-background/50' : 'bg-card'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-lg">{msg.name}</h4>
                  <span className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3"/> {msg.email}</span>
                  {!msg.read && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold">New</span>}
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-4">{msg.createdAt ? format(new Date(msg.createdAt), 'PPpp') : ''}</p>
              </div>
              <div className="flex md:flex-col gap-2 justify-start md:justify-center">
                {!msg.read && (
                  <Button variant="outline" size="sm" onClick={() => updateStatus.mutate({ id: msg.id, read: true })}>
                    <Check className="w-4 h-4 mr-2" /> Mark Read
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => deleteMessage.mutate(msg.id)}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
              <Mail className="w-12 h-12 mb-4 opacity-20" />
              <p>Inbox is empty.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
