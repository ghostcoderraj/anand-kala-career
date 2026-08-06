import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "image" | "date" | "select" | "boolean";
  options?: string[];
  required?: boolean;
  imageFolder?: string;
}

interface Props {
  table: "leadership" | "faculty" | "gallery_items" | "awards" | "news_articles";
  title: string;
  fields: FieldDef[];
  imageField?: string;
  titleField: string;
  subtitleField?: string;
  imagePreviewMode?: "default" | "gallery";
}

function previewClass(mode: Props["imagePreviewMode"], item: any) {
  if (mode === "gallery" && item?.category === "newspaper") {
    return "w-full h-auto max-h-64 object-contain mx-auto bg-[#f8f4ec]";
  }
  return "w-full h-full object-cover";
}

function previewContainerClass(mode: Props["imagePreviewMode"], item: any) {
  if (mode === "gallery" && item?.category === "newspaper") {
    return "bg-[#ede8df] p-3 overflow-hidden min-h-[180px] flex items-center justify-center";
  }
  return "aspect-video bg-muted overflow-hidden";
}

export default function ResourceManager({ table, title, fields, imageField, titleField, subtitleField, imagePreviewMode = "default" }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [table]);

  const openNew = () => { setEditing(null); setForm({}); setOpen(true); };
  const openEdit = (it: any) => { setEditing(it); setForm({ ...it }); setOpen(true); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = {};
      for (const f of fields) {
        let v = form[f.name];
        if (f.type === "number" && v !== undefined && v !== "") v = Number(v);
        if (f.type === "boolean") v = !!v;
        payload[f.name] = v ?? null;
      }
      if (editing) {
        const { error } = await supabase.from(table).update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Updated");
      } else {
        const { error } = await supabase.from(table).insert(payload);
        if (error) throw error;
        toast.success("Created");
      }
      setOpen(false);
      load();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  const handleImage = async (field: FieldDef, file: File) => {
    const url = await uploadImage(file, field.imageFolder ?? table);
    if (url) setForm((p: any) => ({ ...p, [field.name]: url }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-secondary">{title}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> Add New</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} {title}</DialogTitle></DialogHeader>
            <form onSubmit={save} className="space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <Label htmlFor={f.name}>{f.label}{f.required && " *"}</Label>
                  {f.type === "textarea" ? (
                    <Textarea id={f.name} value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} required={f.required} />
                  ) : f.type === "select" ? (
                    <select id={f.name} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} required={f.required}>
                      <option value="">Select...</option>
                      {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === "boolean" ? (
                    <div className="flex items-center gap-2 mt-2">
                      <input id={f.name} type="checkbox" checked={!!form[f.name]} onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })} className="w-4 h-4" />
                      <span className="text-sm text-muted-foreground">Enabled</span>
                    </div>
                  ) : f.type === "image" ? (
                    <div className="space-y-2">
                      {form[f.name] && (
                        <div className={form.category === "newspaper" ? "bg-[#ede8df] p-3 rounded-md" : ""}>
                          <img
                            src={form[f.name]}
                            alt=""
                            className={
                              form.category === "newspaper"
                                ? "w-full max-h-72 object-contain mx-auto rounded-md bg-white shadow-sm"
                                : "w-32 h-32 object-cover rounded-md"
                            }
                          />
                        </div>
                      )}
                      <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImage(f, e.target.files[0])} />
                      <Input placeholder="Or paste image URL" value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />
                      {form.category === "newspaper" && (
                        <p className="text-xs text-muted-foreground">
                          Tip: Upload a clear photo of the full newspaper clipping. Portrait images display best on the website.
                        </p>
                      )}
                    </div>
                  ) : (
                    <Input id={f.name} type={f.type} value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} required={f.required} />
                  )}
                </div>
              ))}
              <Button type="submit" variant="hero" className="w-full" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid place-items-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : items.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">No items yet. Click "Add New" to get started.</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <Card key={it.id} className="overflow-hidden">
              {imageField && it[imageField] && (
                <div className={previewContainerClass(imagePreviewMode, it)}>
                  <img src={it[imageField]} alt={it[titleField]} className={previewClass(imagePreviewMode, it)} />
                </div>
              )}
              <div className="p-4">
                <div className="font-semibold text-secondary">{it[titleField]}</div>
                {subtitleField && it[subtitleField] && (
                  <div className="text-sm text-muted-foreground capitalize">{it[subtitleField]}</div>
                )}
                {it.category === "newspaper" && it.newspaper_name && (
                  <div className="text-xs text-primary mt-1">{it.newspaper_name}</div>
                )}
                {it.category === "newspaper" && it.published_date && (
                  <div className="text-xs text-muted-foreground">{new Date(it.published_date).toLocaleDateString("en-IN")}</div>
                )}
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => openEdit(it)}><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => del(it.id)}><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
