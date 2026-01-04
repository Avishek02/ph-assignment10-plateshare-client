import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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

const Label = ({ children }) => (
  <span className="text-sm font-bold text-[var(--text)]">{children}</span>
);

const Input = (props) => (
  <input
    {...props}
    className={`mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--input-bg)]
   px-4 py-2.5 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[#16a34a66] ${props.className || ""}`}
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className={`mt-2 w-full min-h-[140px] rounded-xl border border-[var(--border)] bg-[var(--input-bg)] px-4 py-2.5 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[#16a34a66] ${props.className || ""}`}
  />
);

export default function Contact() {
  const contactEmail = "avishek2390@gmail.com";
  const whatsapp = "+880 1909912507";
  const addressLine = "Dhaka, Bangladesh";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data) => {
    try {
      const subject = encodeURIComponent(data.subject || "PlateShare Contact");
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}\n`
      );
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      toast.success("Opening your email client...");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

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
            <Badge>Contact</Badge>
            <span className="text-xs sm:text-sm text-[var(--text-soft)]">
              We usually respond within 24–48 hours
            </span>
          </div>

          <Title>Get in touch</Title>
          <Subtitle>
            Have a question about PlateShare, food requests, or safety? Send us a
            message and we will help you as soon as possible.
          </Subtitle>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--primary)] hover:bg-[#16a34a0f] transition"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <Card>
              <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)] tracking-tight">
                Send a message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
                <div>
                  <Label>Your name</Label>
                  <Input
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name?.message && (
                    <p className="mt-2 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label>Your email</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label>Subject</Label>
                  <Input
                    placeholder="What is this about?"
                    {...register("subject", { required: "Subject is required" })}
                  />
                  {errors.subject?.message && (
                    <p className="mt-2 text-xs text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    placeholder="Write your message"
                    {...register("message", {
                      required: "Message is required",
                      minLength: { value: 10, message: "Message is too short" },
                    })}
                  />
                  {errors.message?.message && (
                    <p className="mt-2 text-xs text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                  By sending this message, you agree to communicate respectfully.
                  For account issues, include the email you used to sign in.
                </p>
              </form>
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
              <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)] tracking-tight">
                Contact details
              </h2>

              <div className="mt-4 grid gap-4">
                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">Email</div>
                  <a
                    className="mt-1 block text-sm text-[var(--text-soft)] underline"
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                </InnerCard>

                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">WhatsApp</div>
                  <a
                    className="mt-1 block text-sm text-[var(--text-soft)] underline"
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {whatsapp}
                  </a>
                </InnerCard>

                <InnerCard>
                  <div className="text-sm font-extrabold text-[var(--text)]">Location</div>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">{addressLine}</p>
                </InnerCard>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)] tracking-tight">
                Safety reminder
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-soft)]">
                PlateShare helps connect donors and requesters. Always confirm pickup
                details, meet in a safe location, and avoid sharing sensitive personal
                information publicly.
              </p>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
