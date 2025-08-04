import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Incerto Technologies Private Limited",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg text-center">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Company Info */}
        <div className="mb-8 p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Incerto Technologies Private Limited
          </h2>
          <p className="text-muted-foreground mb-4">
            We (<strong>Incerto Technologies Private Limited</strong>, or &quot;
            <strong>Incerto</strong>&quot;) are deeply concerned about your
            privacy and take this responsibility very seriously. This Privacy
            Policy (&quot;Privacy Policy&quot;) outlines how we collect,
            process, use, and disclose your data when you use our product
            (&quot;Incerto&quot;). The term &quot;Tool&quot; refers to our
            product offering and all associated services.
          </p>
          <p className="text-muted-foreground mb-4">
            References to &quot;we&quot;, &quot;our&quot; or &quot;us&quot;
            refer to the Tool and/or{" "}
            <strong>Incerto Technologies Private Limited</strong>, which has its
            registered office at:
          </p>
          <div className="bg-background p-4 rounded border">
            <p className="text-foreground font-medium">
              #164, 1st Cross, 1st Main,
              <br />
              RMV II Stage, Sanjaynagar,
              <br />
              Bengaluru - 560094, Karnataka, India
            </p>
          </div>
        </div>

        {/* Section 1: Tool and Functionality */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            1. THE TOOL AND ITS FUNCTIONALITY
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Incerto is an AI Copilot for databases. It enables users to
              complete a certain task or solve a specific problem on a database
              using AI Agents.
            </p>
            <p>
              The product is powered by{" "}
              <strong>Large Language Models (LLMs)</strong> from
              <strong>Anthropic (Claude)</strong> and{" "}
              <strong>Google DeepMind (Gemini)</strong>, which assist users to
              complete a task based on contextual input provided by the user.
            </p>
          </div>
        </section>

        {/* Section 2: Eligibility */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            2. ELIGIBILITY
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              By using this Tool, you confirm that you are at least 18 years of
              age and competent to contract as per the Indian Contract Act,
              1872. If you are between 13 and 18 years, you must obtain consent
              from your legal guardian or parent, who agrees to our Terms and
              Privacy Policy on your behalf.
            </p>
          </div>
        </section>

        {/* Section 3: Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            3. INFORMATION WE COLLECT
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-3">
                A. Information You Provide:
              </h3>
              <p className="text-muted-foreground mb-3">
                Upon signing up or using the Tool, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Password</li>
                <li>LinkedIn Profile (optional)</li>
                <li>Company or Role (optional)</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                We also facilitate integrations with AWS, GitHub, and external
                APIs via secure OAuth or token-based authentication. Any
                metadata collected (e.g., query logs, system configurations) is
                pseudonymized and encrypted.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-foreground mb-3">
                B. Usage Data:
              </h3>
              <p className="text-muted-foreground mb-3">
                We store only the following:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Number of AI prompts initiated</li>
                <li>Tokens consumed via Claude and Gemini</li>
                <li>Email address</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Prompts submitted through our AI integrations are routed
                directly to
                <strong>Anthropic (Claude)</strong> and{" "}
                <strong>Google (Gemini)</strong> APIs for processing. These
                prompts are <strong>not stored by us</strong>. You can review
                their privacy practices at:
              </p>
              <div className="mt-3 space-y-2">
                <p className="text-muted-foreground">
                  • <strong>Anthropic (Claude)</strong>:{" "}
                  <a
                    href="https://www.anthropic.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://www.anthropic.com/legal/privacy
                  </a>
                </p>
                <p className="text-muted-foreground">
                  • <strong>Google Gemini</strong>:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://policies.google.com/privacy
                  </a>
                </p>
              </div>
              <p className="text-muted-foreground mt-3">
                No other user-generated data is retained by our systems unless
                explicitly submitted for feedback or support.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            4. HOW WE USE YOUR INFORMATION
          </h2>
          <p className="text-muted-foreground mb-3">We use your data to:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Personalize and optimize your experience on the Tool</li>
            <li>Improve our services and develop new features</li>
            <li>Provide support and respond to inquiries</li>
            <li>Send important account-related communications</li>
            <li>
              Monitor usage patterns for fraud detection and performance
              analysis
            </li>
            <li>Fulfill legal and compliance obligations</li>
          </ul>
        </section>

        {/* Section 5: Data Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            5. DATA SHARING
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We do <strong>not sell</strong> your data. We share it only under
              the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                With our AI processing partners <strong>Anthropic</strong> and{" "}
                <strong>Google</strong>, for prompt handling and analysis
              </li>
              <li>
                With infrastructure providers (e.g., secure cloud and analytics
                platforms)
              </li>
              <li>If required by law or regulatory authorities</li>
              <li>
                During business transfer scenarios such as mergers,
                acquisitions, or insolvency
              </li>
            </ul>
            <p>
              Any data shared with third parties is pseudonymized and used
              solely for operational purposes.
            </p>
          </div>
        </section>

        {/* Section 6: Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            6. DATA SECURITY
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We don&apos;t keep any of your data on our servers. Our tool is
              completely on-prem.
            </p>
            <p>
              While we strive to protect your data, no online service is
              completely immune to risk. If you believe your account is
              compromised, contact us immediately.
            </p>
          </div>
        </section>

        {/* Section 7: Data Retention */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            7. DATA RETENTION
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>We retain your personal information only as long as:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You have an active account with us</li>
              <li>It is necessary to provide services to you</li>
              <li>Legal or regulatory obligations require us to retain data</li>
            </ul>
            <p>
              Once your account is deleted or deactivated, your personal
              information is purged from our servers, except as required by
              applicable law.
            </p>
          </div>
        </section>

        {/* Section 8: Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            8. CHANGES TO THIS POLICY
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We may update this Privacy Policy periodically. Significant
              changes will be posted on our website and notified via email.
              Continued use of the Tool after updates constitutes acceptance of
              the changes.
            </p>
          </div>
        </section>

        {/* Section 9: Contacting Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            9. CONTACTING US
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              For questions or service-related announcements, we may contact you
              via email or WhatsApp. These communications are important for
              platform operation and do not contain promotional content.
            </p>
          </div>
        </section>

        {/* Section 10: Grievance Officer */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            10. GRIEVANCE OFFICER
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              As per the Information Technology Act, 2000 and rules made
              thereunder, the contact details of our Grievance Officer are:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg border">
              <p className="text-foreground font-medium mb-2">
                <strong>Shiva Pundir</strong>
              </p>
              <p className="text-foreground mb-2">Grievance Officer</p>
              <p className="text-foreground mb-2">
                <strong>Incerto Technologies Private Limited</strong>
              </p>
              <p className="text-foreground mb-2">
                #164, 1st Cross, 1st Main, RMV II Stage, Sanjaynagar, Bengaluru
                - 560094
              </p>
              <p className="text-foreground">
                Email:{" "}
                <a
                  href="mailto:shiva@incerto.in"
                  className="text-primary hover:underline"
                >
                  shiva@incerto.in
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            This Privacy Policy is effective as of the date listed above and
            will remain in effect except with respect to any changes in its
            provisions in the future, which will be in effect immediately after
            being posted on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
