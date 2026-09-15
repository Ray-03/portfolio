import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tokens = [
  { name: "Primary", className: "bg-primary text-primary-foreground" },
  { name: "Secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "Accent", className: "bg-accent text-accent-foreground" },
  { name: "Muted", className: "bg-muted text-muted-foreground" },
  { name: "Card", className: "bg-card text-card-foreground border" },
  { name: "Destructive", className: "bg-destructive text-white" },
] as const;

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Theme foundation</p>
          <h1 className="text-3xl font-medium tracking-tight">
            Primary · Secondary · Light / Dark
          </h1>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Teal primary and amber secondary, wired through shadcn CSS variables.
            Toggle the mode to preview both themes.
          </p>
        </div>
        <ModeToggle />
      </header>

      <section className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {tokens.map((token) => (
          <div
            key={token.name}
            className={`flex h-24 flex-col justify-between rounded-xl p-4 ${token.className}`}
          >
            <span className="text-xs opacity-80">Token</span>
            <span className="text-sm font-medium">{token.name}</span>
          </div>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Component check</CardTitle>
          <CardDescription>
            Buttons and badges using primary and secondary variants.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </CardContent>
      </Card>
    </main>
  );
}
