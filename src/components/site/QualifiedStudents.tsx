import { useEffect, useMemo, useRef, useState } from "react";
import { Trophy, Search, Award, Users, MapPin, Sparkles, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Student = { name: string; address: string; marks: number };

const STUDENTS: Student[] = [
  { name: "Rajesh Kumar", address: "Barai", marks: 121 },
  { name: "Suraj Kumar", address: "Haspura", marks: 117 },
  { name: "Ravi Kumar", address: "Haspura", marks: 117 },
  { name: "Avinash Kumar", address: "Chauri", marks: 116 },
  { name: "Manoj Kumar Yadav", address: "Haspura", marks: 114 },
  { name: "Satish Kumar", address: "Haspura", marks: 114 },
  { name: "Munna Kumar", address: "Atrauli", marks: 108 },
  { name: "Vishal Kumar", address: "Daudnagar", marks: 107 },
  { name: "Anshu Kumari", address: "Uchit Bigha", marks: 106 },
  { name: "Raju Kumar", address: "Chauri", marks: 106 },
  { name: "Sudhir Kumar", address: "Babu Amauna", marks: 105 },
  { name: "Sonu Kumar", address: "Ahiyapur", marks: 103 },
  { name: "Suman Kumari", address: "Fateganj", marks: 102 },
  { name: "Sanny Kumar", address: "Gaya", marks: 102 },
  { name: "Prakash Kumar", address: "Arai", marks: 99 },
  { name: "Sonu Kumar", address: "Ahiyapur", marks: 99 },
  { name: "Amit Kumar", address: "Haspura", marks: 96 },
  { name: "Satish Kumar", address: "Haspura", marks: 96 },
  { name: "Arman Khan", address: "Chauri", marks: 95 },
  { name: "Kavita Kumari", address: "Haspura", marks: 95 },
  { name: "Shambhu Kumar", address: "Tankupi (Sonpi)", marks: 94 },
  { name: "Rahul Kumar", address: "Aurangabad", marks: 94 },
  { name: "Ravi Kumar", address: "Haspura", marks: 94 },
  { name: "Niketa Kumari", address: "Babu Amauna", marks: 92 },
  { name: "Suraj Kumar", address: "Haspura (Tankupi)", marks: 92 },
  { name: "Raju Kumar", address: "Chauri", marks: 92 },
  { name: "Niraj Kumar", address: "Sipudihari", marks: 90 },
  { name: "Sunita Kumari", address: "Haspura", marks: 89 },
  { name: "Suman Kumari", address: "Fateganj", marks: 88 },
  { name: "Soniya Kumari", address: "Bangali Bigha", marks: 87 },
  { name: "Shahid Hussain", address: "Amjhar Sharif", marks: 86 },
  { name: "Madhur Chanchal", address: "Haspura", marks: 86 },
  { name: "Adarsh Kumar", address: "Sansa", marks: 84 },
  { name: "Khushbu Kumari", address: "Bangali Bigha", marks: 82 },
  { name: "Niraj Kumar", address: "Sansa", marks: 82 },
  { name: "Ravikant Kumar", address: "Jamhor", marks: 82 },
  { name: "Khushbu Kumari", address: "Bangali Bigha", marks: 81 },
  { name: "Shambhu Kumar", address: "Sonpi (Haspura)", marks: 81 },
  { name: "Madhu Kumari", address: "Bangali Bigha", marks: 80 },
  { name: "Gayan Ranjan Kumar", address: "Ahiyapur", marks: 80 },
  { name: "Amit Kumar", address: "Haspura", marks: 80 },
  { name: "Attaullah Ansari", address: "Amjhar Sharif", marks: 80 },
  { name: "Hamid Raja", address: "Amjhar Sharif", marks: 80 },
  { name: "Rohit Kumar", address: "Chauri", marks: 80 },
  { name: "Rina Kumari", address: "Chauri", marks: 79 },
  { name: "Shahid Hussain", address: "Amjhar Sharif", marks: 79 },
  { name: "Pratima Kumari", address: "Chauri", marks: 78 },
  { name: "Rachna Kumari", address: "Sihari", marks: 78 },
  { name: "Kavita Kumari", address: "Haspura", marks: 75 },
  { name: "Sushil Kumar", address: "Bangali Bigha", marks: 74 },
  { name: "Chandani Kumari", address: "Fateganj", marks: 74 },
  { name: "Khushbu Kumari", address: "Deohara", marks: 70 },
  { name: "Mantu Sharma", address: "Atrauli", marks: 70 },
  { name: "Hamid Raja", address: "Amjhar Sharif", marks: 64 },
  { name: "Ranju Kumari", address: "Itwan", marks: 63 },
  { name: "Sapna Kumari", address: "Haspura", marks: 62 },
  { name: "Kusum Kumari", address: "Fateganj", marks: 61 },
  { name: "Nibha Kumari", address: "Bangali Bigha", marks: 60 },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

type CarouselProps = { students: Student[]; sorted: Student[] };

const StudentCarousel = ({ students, sorted }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setIndex(0);
  }, [students]);

  useEffect(() => {
    if (paused || students.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % students.length);
    }, 3000);
    return () => clearInterval(id);
  }, [paused, students.length]);

  if (students.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % students.length);
  const prev = () => setIndex((i) => (i - 1 + students.length) % students.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) (diff < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const s = students[index];
  const rank =
    sorted.findIndex(
      (x) => x.name === s.name && x.address === s.address && x.marks === s.marks
    ) + 1;

  return (
    <div
      className="max-w-xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative bg-card border rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden">
        {/* decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        <div className="relative flex items-center gap-4 md:gap-6">
          <div className="relative shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-2xl md:text-3xl shadow-lg">
              {initials(s.name)}
            </div>
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-md ring-2 ring-background">
              #{rank}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-lg md:text-2xl truncate">
              {s.name}
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5" /> {s.address}
            </div>
            <div className="mt-2 inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              <Trophy className="w-3.5 h-3.5" /> {s.marks} marks
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="relative flex items-center justify-between mt-6">
          <Button variant="outline" size="icon" onClick={prev} className="rounded-full h-10 w-10">
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground tabular-nums">
              {index + 1} / {students.length}
            </span>
            <button
              onClick={() => setPaused((p) => !p)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={paused ? "Play" : "Pause"}
            >
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

          <Button variant="outline" size="icon" onClick={next} className="rounded-full h-10 w-10">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="relative mt-4 h-1 bg-muted rounded-full overflow-hidden">
          <div
            key={index}
            className="h-full bg-gradient-to-r from-primary to-secondary"
            style={{
              width: "100%",
              animation: paused ? "none" : "shrinkBar 3s linear forwards",
            }}
          />
        </div>
        <style>{`@keyframes shrinkBar { from { width: 0% } to { width: 100% } }`}</style>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        ← Swipe or use arrows to browse all {students.length} qualified students →
      </p>
    </div>
  );
};

const QualifiedStudents = () => {
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () => [...STUDENTS].sort((a, b) => b.marks - a.marks),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
    );
  }, [sorted, query]);

  const toppers = sorted.slice(0, 3);
  const rest = filtered.filter((s) => !toppers.includes(s) || query);

  const totalQualified = STUDENTS.length;
  const highestMarks = sorted[0]?.marks ?? 0;
  const uniqueAreas = new Set(STUDENTS.map((s) => s.address)).size;

  const podiumOrder = [toppers[1], toppers[0], toppers[2]].filter(Boolean);
  const podiumStyles = [
    { h: "h-32", grad: "from-slate-300 to-slate-500", rank: 2, ring: "ring-slate-300" },
    { h: "h-44", grad: "from-yellow-300 to-amber-500", rank: 1, ring: "ring-amber-400" },
    { h: "h-24", grad: "from-orange-300 to-orange-500", rank: 3, ring: "ring-orange-400" },
  ];

  return (
    <section id="qualified-students" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" /> Bihar STET 2024 Result
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            🏆 Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Qualified Stars</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Proud moment! Our hardworking students have qualified Bihar STET 2024.
            Join the legacy of success at Anand Sangeet Mahavidyalaya.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto mb-12">
          {[
            { icon: Users, label: "Qualified", value: `${totalQualified}+` },
            { icon: Trophy, label: "Top Score", value: highestMarks },
            { icon: MapPin, label: "Areas", value: uniqueAreas },
          ].map((s, i) => (
            <div key={i} className="bg-card border rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <s.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-primary" />
              <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Podium - Top 3 */}
        <div className="mb-12">
          <h3 className="text-center font-display text-2xl font-bold mb-8 flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-amber-500" /> Top Performers
          </h3>
          <div className="flex items-end justify-center gap-3 md:gap-6 max-w-2xl mx-auto">
            {podiumOrder.map((s, i) => {
              const style = podiumStyles[i];
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${style.grad} flex items-center justify-center text-white font-bold text-lg md:text-xl ring-4 ${style.ring} ring-offset-2 ring-offset-background mb-2 shadow-lg`}>
                    {initials(s.name)}
                  </div>
                  <div className="text-center mb-2 px-1">
                    <div className="font-semibold text-sm md:text-base leading-tight">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.address}</div>
                    <div className="text-primary font-bold text-sm mt-1">{s.marks} marks</div>
                  </div>
                  <div className={`w-full ${style.h} bg-gradient-to-t ${style.grad} rounded-t-xl flex items-start justify-center pt-2 shadow-inner`}>
                    <span className="text-white font-display font-bold text-2xl md:text-3xl drop-shadow">#{style.rank}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or village..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-full bg-card shadow-sm"
          />
        </div>

        {/* One-at-a-time Carousel */}
        <StudentCarousel students={query ? filtered : sorted.slice(3)} sorted={sorted} />

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No students found matching "{query}"
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 text-center">
          <div className="inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl px-8 py-6 shadow-xl">
            <p className="font-display text-xl md:text-2xl font-bold mb-1">
              Aap bhi banein agla STET Topper! 🎯
            </p>
            <p className="text-sm md:text-base opacity-90">
              Admissions open — Join Anand Sangeet Mahavidyalaya today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualifiedStudents;
