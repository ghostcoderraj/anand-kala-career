import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LogOut, Loader2, ShieldAlert } from "lucide-react";
import ResourceManager, { FieldDef } from "@/components/admin/ResourceManager";
import { toast } from "sonner";
import { useSEO } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-config";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbSchema } from "@/lib/schema";

const leadershipFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "select", options: ["Director", "Principal", "Administrator"], required: true },
  { name: "qualifications", label: "Qualifications", type: "text" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "photo_url", label: "Photo", type: "image", imageFolder: "leadership" },
  { name: "display_order", label: "Display Order", type: "number" },
];
const facultyFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "subject", label: "Subject", type: "text", required: true },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "photo_url", label: "Photo", type: "image", imageFolder: "faculty" },
  { name: "display_order", label: "Display Order", type: "number" },
];
const galleryFields: FieldDef[] = [
  { name: "title", label: "Headline / Title", type: "text", required: true },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["newspaper", "classes", "music", "dance", "art", "yoga", "awards", "events"],
    required: true,
  },
  { name: "newspaper_name", label: "Newspaper Name (for press clippings)", type: "text" },
  { name: "published_date", label: "Publication Date", type: "date" },
  { name: "description", label: "Short Description / Keywords", type: "textarea" },
  { name: "image_url", label: "Photo / Clipping Image", type: "image", imageFolder: "gallery", required: true },
  { name: "display_order", label: "Display Order (lower = first)", type: "number" },
];
const awardsFields: FieldDef[] = [
  { name: "title", label: "Award Title", type: "text", required: true },
  { name: "recipient", label: "Recipient", type: "text" },
  { name: "year", label: "Year", type: "number" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_url", label: "Image", type: "image", imageFolder: "awards" },
  { name: "display_order", label: "Display Order", type: "number" },
];
const announcementsFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "message", label: "Message / Notice", type: "textarea" },
  { name: "link_url", label: "Link URL (optional)", type: "text" },
  { name: "is_important", label: "Mark as Important", type: "boolean" },
  { name: "is_active", label: "Active (visible on site)", type: "boolean" },
  { name: "display_order", label: "Display Order", type: "number" },
];
const newsFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "category", label: "Category", type: "select", options: ["news", "magazine", "announcement"], required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "content", label: "Full Content", type: "textarea" },
  { name: "cover_image_url", label: "Cover Image", type: "image", imageFolder: "news" },
  { name: "external_url", label: "External Link (optional)", type: "text" },
  { name: "published_date", label: "Published Date", type: "date" },
  { name: "is_published", label: "Published", type: "boolean" },
];

const Admin = () => {
  const nav = useNavigate();
  const { session, isAdmin, loading } = useAdmin();

  useSEO(PAGE_SEO.admin);

  useEffect(() => {
    if (!loading && !session) nav("/auth");
  }, [loading, session, nav]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    nav("/auth");
  };

  if (loading) {
    return <div className="min-h-screen grid place-items-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!session) return null;

  if (!isAdmin) {
    return (
      <main className="min-h-screen grid place-items-center bg-gradient-soft p-4">
        <Card className="max-w-md p-8 text-center">
          <ShieldAlert className="w-12 h-12 mx-auto text-destructive mb-3" />
          <h1 className="font-display text-xl font-bold text-secondary">Admin Access Required</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Your account ({session.user.email}) does not have admin privileges. Please ask the site owner to grant you the admin role.
          </p>
          <p className="text-xs text-muted-foreground mt-4 font-mono break-all">User ID: {session.user.id}</p>
          <Button variant="outline" className="mt-6" onClick={signOut}><LogOut className="w-4 h-4 mr-1" /> Sign Out</Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-soft">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Admin Dashboard", path: "/admin" },
        ])}
      />
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div>
            <h1 className="font-display text-lg font-bold text-secondary">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild><a href="/">View Site</a></Button>
            <Button variant="outline" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-1" /> Sign Out</Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <Tabs defaultValue="leadership">
          <TabsList className="flex flex-wrap h-auto justify-start mb-6">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
            <TabsTrigger value="news">News & Magazines</TabsTrigger>
          </TabsList>
          <TabsContent value="announcements">
            <ResourceManager table={"announcements" as any} title="Announcements / Notices" fields={announcementsFields} titleField="title" subtitleField="message" />
          </TabsContent>
          <TabsContent value="leadership">
            <ResourceManager table="leadership" title="Leadership" fields={leadershipFields} imageField="photo_url" titleField="name" subtitleField="role" />
          </TabsContent>
          <TabsContent value="faculty">
            <ResourceManager table="faculty" title="Faculty Members" fields={facultyFields} imageField="photo_url" titleField="name" subtitleField="subject" />
          </TabsContent>
          <TabsContent value="gallery">
            <ResourceManager table="gallery_items" title="Gallery Items" fields={galleryFields} imageField="image_url" titleField="title" subtitleField="category" imagePreviewMode="gallery" />
          </TabsContent>
          <TabsContent value="awards">
            <ResourceManager table="awards" title="Awards & Achievements" fields={awardsFields} imageField="image_url" titleField="title" subtitleField="recipient" />
          </TabsContent>
          <TabsContent value="news">
            <ResourceManager table="news_articles" title="News & Magazines" fields={newsFields} imageField="cover_image_url" titleField="title" subtitleField="category" />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
