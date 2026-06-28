import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
  head: () => ({
    meta: [
      { title: "Mentions légales — HUMA" },
      {
        name: "description",
        content:
          "Mentions légales de HUMA : éditeur, hébergement et propriété intellectuelle de la plateforme.",
      },
      { property: "og:title", content: "Mentions légales — HUMA" },
      {
        property: "og:description",
        content: "Éditeur, hébergement et propriété intellectuelle de HUMA.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/legal" },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.lovable.app/legal" }],
  }),
});

function LegalPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-24 md:px-12">
        <header className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold-dust">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
            Mentions légales
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/50">
            Cette page est maintenue par l'éditeur de HUMA. Les informations ci-dessous précisent
            l'identité du responsable de publication, l'hébergeur et le cadre de propriété
            intellectuelle de la plateforme.
          </p>
        </header>

        <Section title="Éditeur du site">
          <p>
            HUMA — Projet de plateforme numérique conçu en Algérie.
            <br />
            Lieu de conception : Algérie
            <br />
            Contact : shanezdz.kechroud@gmail.com
            <br />
            Responsable de la publication : Shanez Kechroud
          </p>
        </Section>

        <Section title="Hébergement">
          <p>
            La plateforme HUMA est hébergée sur l'infrastructure Lovable (Cloudflare Workers,
            Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA).
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            L'ensemble des contenus présents sur HUMA — textes, visuels, identité graphique, code
            et architecture — est protégé par le droit d'auteur. Toute reproduction,
            représentation ou diffusion, totale ou partielle, sans autorisation préalable est
            interdite.
          </p>
        </Section>

        <Section title="Responsabilité">
          <p>
            L'éditeur s'efforce d'assurer l'exactitude des informations diffusées sur le site
            mais ne saurait être tenu responsable d'omissions, d'inexactitudes ou de carences
            dans la mise à jour, qu'elles soient de son fait ou du fait de tiers partenaires.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Pour toute question relative à ces mentions ou à l'utilisation de la plateforme,
            écrivez à : shanezdz.kechroud@gmail.com.
          </p>
        </Section>

        <p className="mt-16 text-[10px] uppercase tracking-[0.3em] text-ivory/30">
          Dernière mise à jour : 28 juin 2026
        </p>
      </article>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-ivory/10 pt-8">
      <h2 className="font-display text-xl font-light text-ivory">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ivory/60">{children}</div>
    </section>
  );
}
