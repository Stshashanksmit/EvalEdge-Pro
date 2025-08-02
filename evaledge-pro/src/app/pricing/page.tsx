'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "General",
    items: [
      {
        question: "What is EvalEdge Pro?",
        answer: "EvalEdge Pro is an AI-powered SaaS tool designed to simplify job evaluations for HR leaders and organizations. It uses data-driven frameworks and AI to objectively assess positions, align compensation, identify salary bands, and provide insights for talent decisions—helping you evaluate roles faster and more confidently while reducing bias."
      },
      {
        question: "Who is EvalEdge Pro for?",
        answer: "It's ideal for HR professionals, small to mid-sized organizations (50-5,000 headcount), and consultants in industries like Tech, Professional Services, Manufacturing, and more. It's suitable for anyone needing rapid, objective job grading without complex enterprise tools."
      },
      {
        question: "How does EvalEdge Pro work?",
        answer: "It's as easy as 1-2-3: Start by setting up your organization details and uploading positions; Evaluate using built-in factors or AI auto-scoring from JDs; Generate results with banding suggestions, market salary benchmarks, and insights. All powered by secure AI models for accurate, bias-free outputs."
      },
      {
        question: "What industries and organization sizes does EvalEdge Pro support?",
        answer: "EvalEdge Pro supports a wide range of industries via a dropdown (e.g., Tech/SaaS, Manufacturing, Healthcare) and scales for organizations from startups (<$5M revenue) to global players (>$1B). It auto-calculates scores based on revenue, headcount, and operations for tailored evaluations."
      },
      {
        question: "Can I try EvalEdge Pro before purchasing?",
        answer: "Yes, all plans include a 14-day free trial with Pro Lite features. Sign up directly on the landing page—no credit card required. Post-trial, it auto-downgrades to a limited free mode (10 evaluations/month)."
      }
    ]
  },
  {
    title: "Plans & Pricing",
    items: [
      {
        question: "What are the differences between the Pro Lite, Pro +, and Pro Super plans?",
        answer: "Pro Lite offers basic evaluations (up to 100/month) with unlimited users and setup support. Pro + adds unlimited evaluations, AI auto-scoring, and more consultant calls. Pro Super includes everything plus dynamic market insights, on-demand consultations, and advanced features like custom banding. All plans scale with your needs, from startups to enterprises."
      },
      {
        question: "What's included in the free tier?",
        answer: "The free tier allows up to 10 evaluations/month, 1 user, basic factor scoring (no AI), and email support. It's perfect for individuals or small teams testing the tool, but upgrades are needed for unlimited access and premium AI features."
      },
      {
        question: "How can I upgrade or downgrade my plan?",
        answer: "Upgrade anytime via the Admin & Settings page—changes are prorated. Downgrades take effect at the end of your billing cycle. Annual plans offer a 20% discount; toggle between monthly/annual in billing settings."
      },
      {
        question: "Do you offer discounts for non-profits, education, or large organizations?",
        answer: "Yes, verified non-profits and educational institutions get 20% off any plan. For orgs >500 headcount, contact sales for custom enterprise pricing. Open-source HR projects or startups may qualify for free access—apply via the Request Demo form."
      },
      {
        question: "What happens if I exceed my evaluation quota?",
        answer: "You'll receive a warning at 80% usage. Over-quota evaluations are blocked until the next month or upgrade. Pro + and Pro Super offer unlimited evaluations to avoid this."
      },
      {
        question: "How is billing handled, and what payment methods do you accept?",
        answer: "Billing is monthly or annual via Stripe (credit cards, ACH). Invoices are available in Settings. For Razorpay (India), contact support. No hidden fees—pricing is transparent."
      }
    ]
  },
  {
    title: "Privacy",
    items: [
      {
        question: "What personal data does EvalEdge Pro process?",
        answer: "We process organization details (e.g., company name, revenue, headcount), position data (e.g., titles, JDs, salaries), user engagement metrics (e.g., interactions, logs), and feedback. No sensitive personal data like employee names is required unless uploaded in JDs, which we anonymize before AI processing."
      },
      {
        question: "How does EvalEdge Pro use my data?",
        answer: "Data is used to deliver evaluations, generate insights, troubleshoot issues, and improve the service (e.g., aggregated analytics for planning). We comply with GDPR via a Data Protection Agreement (DPA). Customer data is never used for training AI models without explicit consent."
      },
      {
        question: "How long does EvalEdge Pro retain my data?",
        answer: "Organization and position data is retained as long as your account is active. Inactive data (e.g., unused JDs) is deleted after 90 days. Logs and metrics are kept for 2 years for compliance. You can request deletion via Settings (30-day purge)."
      },
      {
        question: "Is my data secure and compliant with regulations?",
        answer: "Yes, we use AES-256 encryption at-rest and TLS 1.3 in-transit. Compliant with GDPR, SOC2, and data protection laws—sign a DPA for GDPR. PII is filtered/anonymized; access is RBAC-controlled. In case of breaches, we notify within 72 hours."
      },
      {
        question: "Does EvalEdge Pro share or sell my data?",
        answer: "No, data is not shared, sold, or used for third-party training. It's stored securely in Google Cloud with zero-retention AI models. Exports are user-initiated only."
      },
      {
        question: "How can I access, correct, or delete my data?",
        answer: "Use the Admin & Settings page for exports/deletions. Requests under GDPR (e.g., right to be forgotten) are handled within 30 days—email support@evaledge.com with details."
      }
    ]
  },
  {
    title: "Responsible AI",
    items: [
      {
        question: "How does EvalEdge Pro mitigate bias in evaluations?",
        answer: "We use objective, data-driven factors and append prompts like 'Evaluate objectively; ignore demographics or irrelevant JD details.' AI models are tested for bias; users can override scores. Premium plans include bias audits in reports."
      },
      {
        question: "What data is EvalEdge Pro's AI trained on?",
        answer: "Trained on publicly available job data, salary benchmarks (e.g., Glassdoor aggregates), and anonymized frameworks—no customer data is used. Models like Vertex AI PaLM 2 ensure ethical sourcing."
      },
      {
        question: "Does EvalEdge Pro generate potentially harmful or inaccurate outputs?",
        answer: "Filters block biased, offensive, or insecure suggestions. If invalid JD input, it falls back to manual review. We continuously improve via user feedback—report issues to support for safeguards."
      },
      {
        question: "What are the intellectual property considerations for EvalEdge Pro outputs?",
        answer: "Outputs (e.g., scores, insights) are generated probabilistically and owned by you—not us. We don't claim IP; suggestions may resemble public data, so review for compliance. No direct copying from sources."
      },
      {
        question: "Is EvalEdge Pro intended to replace HR professionals?",
        answer: "No, it's a tool to enhance efficiency, not automate fully. Use it with human oversight, like reviewing AI scores against company policies. It's 'Copilot' for HR, not autopilot."
      },
      {
        question: "How does EvalEdge Pro ensure ethical AI use?",
        answer: "Zero-retention models prevent data storage; PII filters anonymize inputs. We comply with responsible AI guidelines, avoiding training on sensitive data and providing transparency in prompts/factors."
      }
    ]
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>(['General']);
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-eval border-b border-eval-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval"></div>
                <span className="text-xl font-bold text-gray-900">EvalEdge Pro</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <a href="/#features" className="text-gray-600 hover:text-neon-green transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-neon-green transition-colors">Pricing</a>
                <a href="#faq" className="text-gray-600 hover:text-neon-green transition-colors">FAQs</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-neon-green font-medium">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-eval-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-heading-lg text-gray-900 mb-6">
            Choose the perfect plan for your team
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Start with a 14-day free trial, no credit card required. Scale as you grow.
          </p>
          
          {/* Annual Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 ${
                isAnnual ? 'bg-neon-green' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual <span className="text-neon-green text-sm">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Pro Lite */}
            <div className="card-feature">
              <div className="text-center mb-8">
                <h3 className="text-heading-sm text-gray-900 mb-2">Pro Lite</h3>
                <p className="text-gray-600 mb-4">A fast way to get started with Job Evaluations</p>
                <div className="text-3xl font-bold text-gray-900">
                  ${isAnnual ? '79' : '99'}<span className="text-lg font-normal text-gray-500">/month</span>
                </div>
                {isAnnual && <p className="text-sm text-neon-green">Save $240/year</p>}
              </div>
              <button className="btn-primary w-full mb-8">Buy Plan</button>
              <div className="space-y-4">
                <p className="font-semibold text-gray-900">What's included:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Up to 100 Job Evaluations (100 Positions) per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Access to unlimited users in the team</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">1 consultant call for set-up and tool usage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Unlimited tool support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro + */}
            <div className="card-feature border-2 border-neon-green relative scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-green text-gray-900 text-sm font-semibold px-6 py-2 rounded-full">
                Most Popular
              </div>
              <div className="text-center mb-8">
                <h3 className="text-heading-sm text-gray-900 mb-2">Pro +</h3>
                <p className="text-gray-600 mb-4">Unlimited Job Evaluations using AI</p>
                <div className="text-3xl font-bold text-gray-900">
                  ${isAnnual ? '159' : '199'}<span className="text-lg font-normal text-gray-500">/month</span>
                </div>
                {isAnnual && <p className="text-sm text-neon-green">Save $480/year</p>}
              </div>
              <button className="btn-primary w-full mb-8">Buy Plan</button>
              <div className="space-y-4">
                <p className="font-semibold text-gray-900">Everything in Pro Lite and:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Unlimited Job Evaluations per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Access to captive AI for auto-completions of Job Evaluations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">4 consultant calls per month for set-up, tool usage and evaluations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Super */}
            <div className="card-feature">
              <div className="text-center mb-8">
                <h3 className="text-heading-sm text-gray-900 mb-2">Pro Super</h3>
                <p className="text-gray-600 mb-4">Maximum flexibility with access to dynamic market insights</p>
                <div className="text-3xl font-bold text-gray-900">
                  ${isAnnual ? '319' : '399'}<span className="text-lg font-normal text-gray-500">/month</span>
                </div>
                {isAnnual && <p className="text-sm text-neon-green">Save $960/year</p>}
              </div>
              <button className="btn-primary w-full mb-8">Buy Plan</button>
              <div className="space-y-4">
                <p className="font-semibold text-gray-900">Everything in Pro + and:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Access to dynamic position-specific market salary intelligence</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">On-demand consultant calls per month for consultation on grading and banding insights</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">SSO Support (Google/Microsoft)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Priority Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-eval-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-md text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about EvalEdge Pro
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((category) => (
              <div key={category.title} className="bg-white rounded-eval border border-eval-gray-200">
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-eval-gray-50 transition-colors rounded-eval"
                >
                  <h3 className="text-xl font-bold text-neon-green">{category.title}</h3>
                  {openCategories.includes(category.title) ? (
                    <ChevronUpIcon className="w-5 h-5 text-neon-green" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-neon-green" />
                  )}
                </button>
                
                {openCategories.includes(category.title) && (
                  <div className="px-6 pb-4">
                    {category.items.map((item, index) => (
                      <div key={index} className="border-t border-eval-gray-200 pt-4 mt-4">
                        <button
                          onClick={() => toggleQuestion(`${category.title}-${index}`)}
                          className="w-full text-left flex items-center justify-between py-2 hover:text-neon-green transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900 pr-4">{item.question}</h4>
                          {openQuestions.includes(`${category.title}-${index}`) ? (
                            <ChevronUpIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {openQuestions.includes(`${category.title}-${index}`) && (
                          <div className="mt-3 text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-heading-md text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
            </Link>
            <Link href="/request-demo" className="btn-secondary text-lg px-8 py-4">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval"></div>
                <span className="text-xl font-bold">EvalEdge Pro</span>
              </Link>
              <p className="text-gray-400">Making job evaluation your competitive edge.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/#features" className="hover:text-neon-green">Features</a></li>
                <li><a href="/pricing" className="hover:text-neon-green">Pricing</a></li>
                <li><a href="/request-demo" className="hover:text-neon-green">Request Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-neon-green">About</a></li>
                <li><a href="#" className="hover:text-neon-green">Contact</a></li>
                <li><a href="#" className="hover:text-neon-green">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-neon-green">Terms of Service</button></li>
                <li><button className="hover:text-neon-green">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EvalEdge Pro. All rights reserved.</p>
            <p className="mt-2 text-sm">Committed to WCAG 2.1 AA accessibility standards</p>
          </div>
        </div>
      </footer>
    </div>
  );
}