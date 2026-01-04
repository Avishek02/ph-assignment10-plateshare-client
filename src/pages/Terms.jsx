import { Link } from "react-router-dom";

const Container = ({ children }) => (
  <div className="mx-auto max-w-5xl px-4 py-10">{children}</div>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)]">
    {children}
  </h2>
);

const Paragraph = ({ children }) => (
  <p className="text-sm sm:text-base leading-relaxed text-[var(--text-soft)]">
    {children}
  </p>
);

const List = ({ items }) => (
  <ul className="mt-3 space-y-2 text-sm sm:text-base text-[var(--text-soft)] list-disc pl-5">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export default function Terms() {
  const siteName = "PlateShare";
  const effectiveDate = "January 4, 2026";
  const contactEmail = "avishek2390@gmail.com";

  return (
    <div className="bg-[var(--bg-main-layout)]">
      <Container>
        <div className="flex flex-col gap-6">
          <Card>
            <span className="text-xs text-[var(--text-soft)]">
              Effective Date: {effectiveDate}
            </span>

            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[var(--text)]">
              Terms & Conditions
            </h1>

            <Paragraph className="mt-4">
              These Terms and Conditions govern your use of {siteName}. By
              accessing or using the platform, you agree to be bound by these
              terms. If you do not agree, you must not use the service.
            </Paragraph>

            <div className="mt-6 flex gap-3 flex-wrap">
              <Link
                to="/"
                className="rounded-xl bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white"
              >
                Back to Home
              </Link>
            </div>
          </Card>

          <Card>
            <SectionTitle>1. Eligibility</SectionTitle>
            <Paragraph className="mt-3">
              You must be at least 13 years old to use the platform. By using the
              service, you confirm that you meet this requirement.
            </Paragraph>
          </Card>

          <Card>
            <SectionTitle>2. User Accounts</SectionTitle>
            <List
              items={[
                "You are responsible for maintaining the confidentiality of your account.",
                "You must provide accurate and complete information.",
                "You are responsible for all activities under your account.",
              ]}
            />
          </Card>

          <Card>
            <SectionTitle>3. Food Listings and Requests</SectionTitle>
            <List
              items={[
                "Food listings must be accurate and lawful.",
                "Food donors are responsible for the safety and quality of shared food.",
                "Requesters must provide truthful information when submitting requests.",
                "The platform is not responsible for food quality, delivery, or pickup.",
              ]}
            />
          </Card>

          <Card>
            <SectionTitle>4. Prohibited Activities</SectionTitle>
            <List
              items={[
                "Posting false, misleading, or harmful content.",
                "Using the platform for illegal activities.",
                "Harassing, abusing, or harming other users.",
                "Attempting to access unauthorized areas of the system.",
              ]}
            />
          </Card>

          <Card>
            <SectionTitle>5. Account Suspension or Termination</SectionTitle>
            <Paragraph className="mt-3">
              We reserve the right to suspend or terminate accounts that violate
              these terms, misuse the platform, or pose a risk to the community.
            </Paragraph>
          </Card>

          <Card>
            <SectionTitle>6. Limitation of Liability</SectionTitle>
            <Paragraph className="mt-3">
              {siteName} is provided on an “as is” basis. We are not liable for
              any damages, losses, or disputes arising from the use of the
              platform, including food quality or user interactions.
            </Paragraph>
          </Card>

          <Card>
            <SectionTitle>7. Changes to Terms</SectionTitle>
            <Paragraph className="mt-3">
              We may update these terms at any time. Continued use of the
              platform after changes means you accept the updated terms.
            </Paragraph>
          </Card>

          <Card>
            <SectionTitle>8. Contact</SectionTitle>
            <Paragraph className="mt-3">
              For questions about these terms, contact us at{" "}
              <a className="underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </Paragraph>
          </Card>
        </div>
      </Container>
    </div>
  );
}
