import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const InnerCard = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-[var(--border)] bg-[var(--inner-card)] p-5 sm:p-6 ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[#16a34a1a] px-3 py-1 text-xs font-extrabold text-[var(--text)]">
    {children}
  </span>
);

const Title = ({ children }) => (
  <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
    {children}
  </h1>
);

const Subtitle = ({ children }) => (
  <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-[var(--text-soft)]">
    {children}
  </p>
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

const Stat = ({ label, value }) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--inner-card)] p-5 sm:p-6">
    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
      {value}
    </div>
    <div className="mt-1 text-sm text-[var(--text-soft)]">{label}</div>
  </div>
);

const Icon = ({ children }) => (
  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[var(--border)] bg-[#16a34a1a] text-[var(--text)]">
    {children}
  </div>
);

export default function About() {
  const siteName = "PlateShare";

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-[var(--bg-main-layout)]">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10 shadow-sm"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge>About</Badge>
            <span className="text-xs sm:text-sm text-[var(--text-soft)]">
              Community Food Sharing
            </span>
          </div>

          <Title>Turning surplus into support.</Title>

          <Subtitle>
            {siteName} helps neighbors share extra food safely and responsibly.
            Donors post what they can share, and requesters find nearby options
            with clear pickup details. Our goal is to reduce food waste while
            strengthening local community care.
          </Subtitle>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/foods"
              className="inline-flex items-center justify-center rounded-xl bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 transition"
            >
              Browse Available Foods
            </Link>
            <Link
              to="/add-food"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--primary)] hover:bg-[#16a34a0f] transition"
            >
              Donate Food
            </Link>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-7 space-y-6"
          >
            <Card>
              <SectionTitle>Our Mission</SectionTitle>
              <div className="mt-3 space-y-3">
                <Paragraph>
                  We aim to make food sharing simple: post surplus food, let
                  people request it, and coordinate pickup with transparency.
                  This reduces waste and helps households access support without
                  friction.
                </Paragraph>
                <InnerCard>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Icon>
                          <span className="text-sm font-extrabold">1</span>
                        </Icon>
                        <div className="text-sm font-extrabold text-[var(--text)]">
                          Post Food
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-soft)]">
                        Add item details, quantity, pickup location, and expiry.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Icon>
                          <span className="text-sm font-extrabold">2</span>
                        </Icon>
                        <div className="text-sm font-extrabold text-[var(--text)]">
                          Find Food
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-soft)]">
                        Browse listings and request what you need.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Icon>
                          <span className="text-sm font-extrabold">3</span>
                        </Icon>
                        <div className="text-sm font-extrabold text-[var(--text)]">
                          Collect Food
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-soft)]">
                        Donor accepts and coordinates request-based pickup.
                      </p>
                    </div>
                  </div>
                </InnerCard>
              </div>
            </Card>

            <Card>
              <SectionTitle>What We Stand For</SectionTitle>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">
                    Respect and safety
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Clear details, honest communication, and responsible sharing
                    for everyone involved.
                  </p>
                </InnerCard>

                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">
                    Less waste, more value
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Share surplus food before it expires, and reduce needless
                    disposal.
                  </p>
                </InnerCard>

                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">
                    Community-first
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Neighbors helping neighbors with simple, request-based
                    coordination.
                  </p>
                </InnerCard>

                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">
                    Transparency
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Status-driven flow: available, requested, accepted, donated.
                  </p>
                </InnerCard>
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <Card>
              <SectionTitle>Community Snapshot</SectionTitle>
              <p className="mt-2 text-sm text-[var(--text-soft)]">
                Real numbers can be connected later from your database.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Stat label="Food listings shared" value="1,200+" />
                <Stat label="Requests completed" value="900+" />
                <Stat label="Estimated meals saved" value="3,500+" />
              </div>
            </Card>

            <Card>
              <SectionTitle>How to Use PlateShare</SectionTitle>
              <div className="mt-3 space-y-3">
                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">
                    Donors
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Post accurate item details and keep pickup information clear.
                    Accept requests only when you can hand over safely.
                  </p>
                </InnerCard>

                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">
                    Requesters
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Request respectfully, share correct contact details, and
                    arrive on time for pickup.
                  </p>
                </InnerCard>

                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">
                    Everyone
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Communicate clearly and prioritize safety in every exchange.
                  </p>
                </InnerCard>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="mt-6">
          <Card className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm font-extrabold text-[var(--text)]">
                Ready to share or request?
              </div>
              <p className="mt-1 text-sm text-[var(--text-soft)]">
                Browse available foods or post a donation in minutes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/foods"
                className="inline-flex items-center justify-center rounded-xl bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 transition"
              >
                View Foods
              </Link>
              <Link
                to="/add-food"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--primary)] hover:bg-[#16a34a0f] transition"
              >
                Add Food
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
