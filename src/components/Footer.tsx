import {BookOpen, Github, MessageSquare} from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-border p-4">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-editor-lineNumber">
                    © 2024 Remote Compiler. All rights reserved.
                </div>
                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-editor-lineNumber hover:text-foreground transition-colors"
                    >
                        <Github className="w-5 h-5"/>
                    </a>
                    <a
                        href="/docs"
                        className="text-editor-lineNumber hover:text-foreground transition-colors"
                    >
                        <BookOpen className="w-5 h-5"/>
                    </a>
                    <a
                        href="/contact"
                        className="text-editor-lineNumber hover:text-foreground transition-colors"
                    >
                        <MessageSquare className="w-5 h-5"/>
                    </a>
                </div>
            </div>
        </footer>
    );
};
