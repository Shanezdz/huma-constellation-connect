import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Confidentialité — HUMA" },
      {
        name: "description",
        content:
          "Politique de confidentialité de HUMA : données collectées, finalités, durée de conservation et droits des utilisateurs.",
      },
      { property: "og:title", content: "Confidentialité — HUMA" },
      {
        property: "og:description",
        content:
          "Comment HUMA traite les données personnelles : finalités, conservation et droits.",
      },
      { property: "og:url", content: "https://huma-constellation-connect.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.lovable.app/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-24 md:px-12">
        <header className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold-dust">Privacy</p>
          <h1 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/50">
            Cette page est maintenue par l'éditeur de HUMA et décrit la manière dont les
            informations partagées sur la plateforme sont traitées. Elle complète les
            obligations légales applicables aux services numériques européens.
          </p>
        </header>

        <Section title="Données collectées">
          <p>
            HUMA collecte uniquement les informations nécessaires au fonctionnement de la
            plateforme : éléments saisis volontairement dans le formulaire de contribution
            (nom, pays, type de geste proposé, message) et données techniques de navigation
            indispensables à la sécurité et à la performance du service.
          </p>
        </Section>

        <Section title="Finalités du traitement">
          <p>
            Les données sont utilisées pour : afficher les contributions sur la constellation,
            permettre la mise en relation entre membres, mesurer l'audience de manière
            agrégée, et assurer la sécurité de la plateforme. Aucune donnée n'est revendue à
            des tiers.
          </p>
        </Section>

        <Section title="Hébergement et sous-traitants">
          <p>
            Les données sont hébergées sur l'infrastructure Lovable (Cloudflare Workers).
            Aucun autre sous-traitant n'intervient sans information préalable des
            utilisateurs.
          </p>
        </Section>

        <Section title="Durée de conservation">
          <p>
            Les contributions sont conservées tant qu'elles restent pertinentes pour la
            mission de la plateforme. Les données techniques de journalisation sont conservées
            pour une durée maximale de 12 mois.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            HUMA n'utilise pas de cookies publicitaires ni de traceurs tiers. Seuls les
            cookies strictement nécessaires au bon fonctionnement du site peuvent être
            déposés.
          </p>
        </Section>

        <Section title="Vos droits">
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
            d'effacement, de limitation et d'opposition au traitement de vos données. Pour
            exercer ces droits, contactez l'éditeur à : [email de contact].
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Pour toute question relative à la confidentialité, écrivez à : [email de contact].
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
