import { Metadata } from "next";

export const metadata= {
  title: "Boran",
  description: "Handles Craft Store in Cambodia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
