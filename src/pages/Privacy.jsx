import React from "react";
import { Link } from "react-router-dom";

const Container = ({ children }) => (
  <div className="mx-auto max-w-5xl px-4 py-10">{children}</div>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur p-6 shadow-sm">
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)] tracking-tight">
    {children}
  </h2>
);

const Paragraph = ({ children }) => (
  <p className="text-sm sm:text-base leading-relaxed text-[var(--text-soft)]">
    {children}
  </p>
);

const BulletList = ({ items }) => (
  <ul className="mt-3 space-y-2 text-sm sm:text-base text-[var(--text-soft)]">
    {items.map((item, idx) => (
      <li key={idx} className="flex gap-2">
        <span className="mt-1 h-2 w-2 rounded-full bg-[#16a34a]" />
        <span className="flex-1">{item}</span>
      </li>
    ))}
  </ul>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[#16a34a1a] px-3 py-1 text-xs font-semibold text-[var(--text)]">
    {children}
  </span>
);

const Divider = () => <div className="h-px w-full bg-[var(--border)]" />;

export default function Privacy() {
  const siteName = "PlateShare";
  const effectiveDate = "January 4, 2026";
  const contactEmail = "avishek2390@gmail.com";

  return (
    <div className="bg-[var(--bg-main-layout)]">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Privacy Policy</Badge>
              <span className="text-xs sm:text-sm text-[var(--text-soft)]">
                Effective: {effectiveDate}
              </span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
              Your privacy matters.
            </h1>
            <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-[var(--text-soft)]">
              This Privacy Policy explains how {siteName} collects, uses, shares,
              and protects your information when you use the platform to donate,
              browse, and request food items.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center justify-center rounded-xl bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 transition"
              >
                Contact Support
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--inner-card)] px-4 py-2 text-sm font-semibold text-[var(--primary)] hover:bg-[#16a34a0f] transition"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Card>
                <div className="text-sm font-extrabold text-[var(--text)]">
                  Quick Overview
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--inner-card)] p-4">
                    <div className="text-sm font-bold text-[var(--text)]">
                      What we collect
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-soft)]">
                      Account details, food listings, and request submissions.
                    </div>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--inner-card)] p-4">
                    <div className="text-sm font-bold text-[var(--text)]">
                      Why we collect it
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-soft)]">
                      To run the service, process requests, and improve safety.
                    </div>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--inner-card)] p-4">
                    <div className="text-sm font-bold text-[var(--text)]">
                      Who can see it
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-soft)]">
                      Other users may see listing and request info when needed.
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <Divider />
                  <p className="mt-4 text-xs text-[var(--text-soft)] leading-relaxed">
                    Tip: Only share information you are comfortable sharing with
                    other community members during the donation and pickup flow.
                  </p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <Card>
                <SectionTitle>1. Information We Collect</SectionTitle>
                <div className="mt-3 space-y-3">
                  <Paragraph>
                    We collect information you provide directly and information
                    generated through your use of the platform.
                  </Paragraph>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--inner-card)] p-5">
                    <div className="text-sm font-bold text-[var(--text)]">
                      Information you provide
                    </div>
                    <BulletList
                      items={[
                        "Account information: name, email address, and profile photo URL when you register or sign in.",
                        "Food listing details: food name, image URL, quantity/serving description, pickup location, expiration date, and additional notes.",
                        "Food request details: write location, why you need food, contact number, and related food item identifier.",
                        "Support messages you send to us.",
                      ]}
                    />
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--inner-card)] p-5">
                    <div className="text-sm font-bold text-[var(--text)]">
                      Information collected automatically
                    </div>
                    <BulletList
                      items={[
                        "Usage data such as pages viewed and actions taken (for example, creating a listing or submitting a request).",
                        "Device and log data such as IP address, browser type, and diagnostic events (standard server logs).",
                      ]}
                    />
                  </div>
                </div>
              </Card>

              <Card>
                <SectionTitle>2. How We Use Your Information</SectionTitle>
                <Paragraph className="mt-3">
                  We use information to operate the service and deliver core
                  features.
                </Paragraph>
                <BulletList
                  items={[
                    "Create and manage your account and authenticate users.",
                    "Publish food listings and enable browsing and requesting.",
                    "Process requests and allow food owners to accept or reject.",
                    "Update statuses (for example, “Available” to “Donated”).",
                    "Provide support and service-related communication.",
                    "Prevent fraud, abuse, and security incidents.",
                    "Comply with legal obligations and enforce policies.",
                  ]}
                />
              </Card>

              <Card>
                <SectionTitle>3. How We Share Your Information</SectionTitle>
                <div className="mt-3 space-y-3">
                  <Paragraph>
                    We do not sell your personal information. We share only what
                    is necessary to provide the service.
                  </Paragraph>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--inner-card)] p-5">
                    <div className="text-sm font-bold text-[var(--text)]">
                      With other users
                    </div>
                    <BulletList
                      items={[
                        "When you create a listing, your name and profile photo may appear with the listing details.",
                        "When you submit a request, the food owner may see your name, profile photo, request message, and contact number you provided.",
                      ]}
                    />
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--inner-card)] p-5">
                    <div className="text-sm font-bold text-[var(--text)]">
                      With service providers
                    </div>
                    <BulletList
                      items={[
                        "Authentication via Firebase Authentication.",
                        "Hosting and infrastructure providers used to run the client and server.",
                        "Image hosting for food images (hosted URLs).",
                        "Database services used to store listings and requests.",
                      ]}
                    />
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--inner-card)] p-5">
                    <div className="text-sm font-bold text-[var(--text)]">
                      Legal and safety
                    </div>
                    <BulletList
                      items={[
                        "To comply with law, legal process, and lawful requests.",
                        "To protect users, prevent misuse, and maintain platform integrity.",
                      ]}
                    />
                  </div>
                </div>
              </Card>

              <Card>
                <SectionTitle>4. Data Retention</SectionTitle>
                <div className="mt-3 space-y-3">
                  <Paragraph>
                    We keep information as long as needed to provide the service
                    and meet security, legal, and operational requirements.
                  </Paragraph>
                  <BulletList
                    items={[
                      "Account information is retained while your account is active and for a limited period afterward when necessary.",
                      "Listings and requests may be retained to support community safety, auditing, and dispute resolution.",
                    ]}
                  />
                </div>
              </Card>

              <Card>
                <SectionTitle>5. Security</SectionTitle>
                <Paragraph className="mt-3">
                  We use reasonable safeguards to protect your information.
                  However, no system is completely secure, and we cannot
                  guarantee absolute security.
                </Paragraph>
              </Card>

              <Card>
                <SectionTitle>6. Your Choices</SectionTitle>
                <div className="mt-3 space-y-3">
                  <Paragraph>
                    You may request access, correction, or deletion of certain
                    information, subject to legal and operational limits.
                  </Paragraph>
                  <Paragraph>
                    To submit a request, email{" "}
                    <a
                      className="underline"
                      href={`mailto:${contactEmail}`}
                    >
                      {contactEmail}
                    </a>
                    .
                  </Paragraph>
                </div>
              </Card>

              <Card>
                <SectionTitle>7. Changes to This Policy</SectionTitle>
                <Paragraph className="mt-3">
                  We may update this policy from time to time. We will post the
                  updated version on this page and revise the effective date.
                </Paragraph>
              </Card>

              <Card>
                <SectionTitle>8. Contact</SectionTitle>
                <Paragraph className="mt-3">
                  Questions about privacy? Contact us at{" "}
                  <a className="underline" href={`mailto:${contactEmail}`}>
                    {contactEmail}
                  </a>
                  .
                </Paragraph>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
