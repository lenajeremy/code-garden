import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Mail, MessageSquare, Twitter, MessageCircle, Copy, Send, X } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string(),
});

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The URL has been copied to your clipboard.",
    });
  };

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this code!");
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    if (platform in shareUrls) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const email = input.value.trim();

    if ((event.key === ' ' || event.key === 'Enter') && email) {
      event.preventDefault();
      
      if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        if (!emails.includes(email)) {
          setEmails([...emails, email]);
          form.setValue('email', '');
        }
      } else {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const onSubmit = async () => {
    if (emails.length === 0) {
      toast({
        title: "No emails added",
        description: "Please add at least one email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      // Here you would typically make an API call to send the emails
      console.log("Sharing via email to:", emails);
      toast({
        title: "Share links sent!",
        description: `Emails have been sent to ${emails.length} recipient${emails.length > 1 ? 's' : ''}.`,
      });
      setEmails([]);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send share links. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Form {...form}>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Share via email</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-wrap gap-2 p-2 bg-background border rounded-md min-h-10">
                          {emails.map((email, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-sm"
                            >
                              <span>{email}</span>
                              <button
                                type="button"
                                onClick={() => removeEmail(email)}
                                className="hover:bg-primary/30 rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          <Input
                            placeholder="Type email and press space or enter"
                            {...field}
                            onKeyDown={handleKeyDown}
                            className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1 min-w-[200px]"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button type="submit" disabled={isSending}>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="flex flex-col space-y-2">
            <div className="text-sm font-medium">Share on social media</div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSocialShare('facebook')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSocialShare('twitter')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSocialShare('whatsapp')}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  // Here you would typically handle opening the native message app
                  console.log("Opening messages app");
                }}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  window.location.href = `mailto:?subject=Check out this code!&body=${encodeURIComponent(window.location.href)}`;
                }}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={window.location.href}
              className="flex-1"
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};