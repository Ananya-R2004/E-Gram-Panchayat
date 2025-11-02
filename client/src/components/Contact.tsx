import { useState } from "react";
import { Card } from "@/components/ui/card";
// Removed: Button, Input, Textarea, Label, Select (as we don't need the form)
// Removed: MapPin, Phone, Mail, Clock (as we replace them with custom email list)
import { Mail } from "lucide-react"; // Keeping Mail for email icon
import { useToast } from "@/hooks/use-toast";

const teamEmails = [
    "abhiniprojects7@gmail.com",
    "ananyarajesh2112@gmail.com",
    "akshayshivaramu@gmail.com",
    "alokkumar29042005@gmail.com",
];

// Removed state and handleSubmit since the form is gone.
// Keeping the component functional and simplified.

export default function Contact() {
  // const { toast } = useToast(); // No longer needed if toast is only for form submission

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          {/* Updated text to reflect email-only contact */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Reach out to our team directly via email.
          </p>
        </div>

        {/* MODIFICATION: Change grid structure to center the new contact info */}
        <div className="grid md:grid-cols-5 gap-8 justify-center">
          {/* The form div (md:col-span-3) is completely removed. 
              The new content will take up the full space or be centered. 
              We'll use one centered card for simplicity.
          */}
          <div className="md:col-start-2 md:col-span-3">
            <Card className="p-8 text-center">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                📧 Team Contact Emails
              </h3>
              <div className="space-y-4">
                {teamEmails.map((email) => (
                    <div key={email} className="flex items-center justify-center gap-3">
                        <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                        <p className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                            <a href={`mailto:${email}`}>{email}</a>
                        </p>
                    </div>
                ))}
              </div>
            </Card>
          </div>

          {/* *** DELETED THE SECOND COLUMN WITH ADDRESS/PHONE/HOURS ***
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              ... (Contact Information block)
            </Card>
          </div>
          */}
        </div>
      </div>
    </section>
  );
}