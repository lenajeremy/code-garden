import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Mail, MessageSquare, Twitter, MessageCircle, Copy, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSending(true);
    try {
      // Here you would typically make an API call to send the email
      console.log("Sharing via email to:", values.email);
      toast({
        title: "Share link sent!",
        description: `An email has been sent to ${values.email}`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send share link. Please try again.",
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Share via email</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="email@example.com"
                          {...field}
                        />
                        <Button type="submit" disabled={isSending}>
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
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
                  // Here you would typically handle email sharing
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