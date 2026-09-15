import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const TOKEN_STYLES = [
  { key: "primary", className: "bg-primary text-primary-foreground" },
  { key: "secondary", className: "bg-secondary text-secondary-foreground" },
  { key: "accent", className: "bg-accent text-accent-foreground" },
  { key: "muted", className: "bg-muted text-muted-foreground" },
  { key: "card", className: "bg-card text-card-foreground border" },
  { key: "destructive", className: "bg-destructive text-white" },
] as const;

type ThemeFoundationProps = {
  dict: Dictionary;
};

export function ThemeFoundation({ dict }: ThemeFoundationProps) {
  const { theme } = dict;

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">{theme.eyebrow}</p>
        <h2 className="text-3xl font-medium tracking-tight">{theme.title}</h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          {theme.description}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {TOKEN_STYLES.map((token) => (
          <div
            key={token.key}
            className={`flex h-24 flex-col justify-between rounded-xl p-4 ${token.className}`}
          >
            <span className="text-xs opacity-80">{theme.tokenLabel}</span>
            <span className="text-sm font-medium">
              {theme.tokens[token.key]}
            </span>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{theme.componentTitle}</CardTitle>
          <CardDescription>{theme.componentDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button>{theme.buttons.primary}</Button>
          <Button variant="secondary">{theme.buttons.secondary}</Button>
          <Button variant="outline">{theme.buttons.outline}</Button>
          <Button variant="ghost">{theme.buttons.ghost}</Button>
          <Badge>{theme.badges.default}</Badge>
          <Badge variant="secondary">{theme.badges.secondary}</Badge>
          <Badge variant="outline">{theme.badges.outline}</Badge>
        </CardContent>
      </Card>
    </section>
  );
}
