import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Database, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Build in a weekend
          <br />
          <span className="text-primary">Scale to millions</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          The fastest way to build and deploy your code snippets. Start coding in seconds, 
          share instantly, and collaborate seamlessly.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/signup">
              Start Building <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/login">Sign In</Link>
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
      <footer className="border-t border-border mt-24">
        <div className="container px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Community</li>
                <li>Contact</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>License</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Code Garden Explorer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}