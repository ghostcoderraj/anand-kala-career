import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function uploadImage(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("cms").upload(path, file, { upsert: false });
  if (error) {
    toast.error(error.message);
    return null;
  }
  const { data } = supabase.storage.from("cms").getPublicUrl(path);
  return data.publicUrl;
}
