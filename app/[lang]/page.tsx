import { LocaleSwitcher } from "@/components/locale-switcher";
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
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  const tokens = [
    {
      name: dict.theme.tokens.primary,
      className: "bg-primary text-primary-foreground",
    },
    {
      name: dict.theme.tokens.secondary,
      className: "bg-secondary text-secondary-foreground",
    },
    {
      name: dict.theme.tokens.accent,
      className: "bg-accent text-accent-foreground",
    },
    {
      name: dict.theme.tokens.muted,
      className: "bg-muted text-muted-foreground",
    },
    {
      name: dict.theme.tokens.card,
      className: "bg-card text-card-foreground border",
    },
    {
      name: dict.theme.tokens.destructive,
      className: "bg-destructive text-white",
    },
  ] as const;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{dict.theme.eyebrow}</p>
          <h1 className="text-3xl font-medium tracking-tight">
            {dict.theme.title}
          </h1>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {dict.theme.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitcher />
          <ModeToggle />
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {tokens.map((token) => (
          <div
            key={token.name}
            className={`flex h-24 flex-col justify-between rounded-xl p-4 ${token.className}`}
          >
            <span className="text-xs opacity-80">{dict.theme.tokenLabel}</span>
            <span className="text-sm font-medium">{token.name}</span>
          </div>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{dict.theme.componentTitle}</CardTitle>
          <CardDescription>{dict.theme.componentDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button>{dict.theme.buttons.primary}</Button>
          <Button variant="secondary">{dict.theme.buttons.secondary}</Button>
          <Button variant="outline">{dict.theme.buttons.outline}</Button>
          <Button variant="ghost">{dict.theme.buttons.ghost}</Button>
          <Badge>{dict.theme.badges.default}</Badge>
          <Badge variant="secondary">{dict.theme.badges.secondary}</Badge>
          <Badge variant="outline">{dict.theme.badges.outline}</Badge>
        </CardContent>
      </Card>
    </main>
  );
}
