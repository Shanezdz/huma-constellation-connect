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
      { property: "og:url", content: "https://huma-constellation-connect.vercel.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://huma-constellation-connect.vercel.app/privacy" }],
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
            Cette page décrit la manière dont les informations partagées sur HUMA sont traitées.
            La plateforme est au stade de prototype : les formulaires d'offre et de besoin
            n'enregistrent aujourd'hui aucune donnée.
          </p>
          <p className="mt-4 rounded-xl border border-gold-dust/25 px-5 py-4 text-xs leading-relaxed text-ivory/50">
            Avertissement — ce document n'a pas été validé par un conseil juridique et ne constitue
            pas une attestation de conformité. Il doit être revu par un professionnel du droit
            avant tout lancement public impliquant un traitement réel de données personnelles.
          </p>
        </header>

        <Section title="Responsable du traitement">
          <p>
            Responsable de la publication : Shanez Kechroud — contact :
            shanezdz.kechroud@gmail.com.
          </p>
          <p className="text-ivory/40">
            [À compléter] Entité juridique responsable du traitement, adresse postale, et le cas
            échéant délégué à la protection des données, dès qu'une structure porte officiellement
            le projet.
          </p>
        </Section>

        <Section title="Catégories de données">
          <p>
            Lorsque les formulaires seront actifs : données déclarées volontairement (type de
            geste offert ou recherché, catégorie, rythme ou échéance, territoire, message libre, et
            un moyen de contact si l'utilisateur en fournit un). Données techniques : journaux de
            connexion strictement nécessaires à la sécurité et à la disponibilité du service.
            Aucune donnée sensible n'est demandée.
          </p>
        </Section>

        <Section title="Finalités et bases légales">
          <p>
            Afficher les contributions sur la constellation et permettre la mise en relation
            (exécution du service demandé / consentement de l'utilisateur) ; mesurer l'usage de
            manière agrégée et assurer la sécurité de la plateforme (intérêt légitime). Aucune
            donnée n'est vendue, louée ou utilisée à des fins publicitaires.
          </p>
        </Section>

        <Section title="Hébergement et sous-traitants">
          <p>
            La plateforme est développée avec Lovable et peut être servie depuis plusieurs
            environnements de déploiement. L'infrastructure exacte associée à une adresse donnée
            dépend du déploiement consulté et peut évoluer ; elle n'est donc pas affirmée ici.
          </p>
          <p className="text-ivory/40">
            [À compléter] Liste nominative des hébergeurs et sous-traitants retenus pour la version
            publique, avec leur rôle et leur localisation.
          </p>
        </Section>

        <Section title="Transferts hors Union européenne">
          <p>
            Selon l'hébergement finalement retenu, des données pourraient être traitées en dehors
            de l'Union européenne. Tant que cette configuration n'est pas arrêtée, aucun transfert
            n'est affirmé ni exclu.
          </p>
          <p className="text-ivory/40">
            [À compléter] Pays de traitement et garanties appliquées (clauses contractuelles types
            ou décision d'adéquation).
          </p>
        </Section>

        <Section title="Durée de conservation">
          <p>
            Les contributions seront conservées tant qu'elles restent pertinentes pour la mise en
            relation, et supprimées sur demande de leur auteur. Les journaux techniques sont
            conservés pour une durée maximale de 12 mois.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            HUMA n'utilise pas de cookies publicitaires ni de traceurs tiers. Seuls les
            cookies ou stockages locaux strictement nécessaires au fonctionnement du site — dont
            la mémorisation de la langue choisie et le cache des traductions — peuvent être
            utilisés.
          </p>
        </Section>

        <Section title="Vos droits">
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
            d'effacement, de limitation, d'opposition et de portabilité, ainsi que du droit
            d'introduire une réclamation auprès d'une autorité de contrôle. Pour exercer ces
            droits, contactez : shanezdz.kechroud@gmail.com.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Pour toute question relative à la confidentialité, écrivez à : shanezdz.kechroud@gmail.com.
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
