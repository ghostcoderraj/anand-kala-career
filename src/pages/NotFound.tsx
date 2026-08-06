import { useLocation } from "react-router-dom";
import { useSEO } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-config";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbSchema } from "@/lib/schema";

const NotFound = () => {
  const location = useLocation();

  useSEO({ ...PAGE_SEO.notFound, path: location.pathname });

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Page Not Found", path: location.pathname },
        ])}
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
