import "@/index.css";
import Providers from "@/components/providers";

export const metadata = {
  title: "Code Garden",
  description: "Your coding playground",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
