
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Database, Github, Zap } from "lucide-react";
import Link from "next/link";
import {Footer} from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useContext } from "react";
import MainContext from "@/lib/main-context";

export default function Landing() {
  const { userDetails } = useContext(MainContext);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="container px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-semibold">CodeGarden</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              {userDetails ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {getInitials(userDetails.firstName + ' ' + userDetails.lastName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/dashboard" className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="w-full">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/auth/logout" className="w-full">Log out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
          Now in public beta
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
          Build in a weekend
          <br />
          <span className="text-primary">Scale to millions</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          The fastest way to build and deploy your code snippets. Start coding
          in seconds, share instantly, and collaborate seamlessly.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/editor">
              Start Building <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> Star on GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Start coding instantly with our optimized development environment.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <Code2 className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
            <p className="text-muted-foreground">
              Support for all major programming languages and frameworks.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <Database className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Scalable Storage</h3>
            <p className="text-muted-foreground">
              Your code is safely stored and easily accessible anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Framework Support */}
      <section className="container px-4 py-16 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Use with any framework
        </h2>
        <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full" />
            React
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full" />
            Vue
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full" />
            Angular
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full" />
            Svelte
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
