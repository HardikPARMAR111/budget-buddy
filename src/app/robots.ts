import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/categories", "/transactions", "/reports"],
      },
    ],
    sitemap: "https://budget-buddy-fawn-theta.vercel.app/sitemap.xml",
  };
}
