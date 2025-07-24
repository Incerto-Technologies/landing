import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Shield, Brain, Database, Search, Code, BarChart3, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Features - Database AI Co-Pilot",
  description: "Discover the powerful features of our database AI Co-Pilot. From intelligent query optimization to automated problem detection and resolution.",
};

const heroFeature = {
  title: "Detect 100+ known production problems",
  description: "We check for 100+ most commonly occurring production problems across databases and each individual instance. We have verified pseudo solutions that can be run with AI or manually.",
  icon: Zap,
  gradient: "from-orange-500 via-yellow-500 to-purple-500",
  image: "/problems_firing.png"
};

const heroFeature2 = {
  title: "Database Context Engine",
  description: "Failing queries. Firing problems. Slow queries. Heavy Operations. Logs. Tables and SQL queries. Performance metrics. Custom context -- we fetch everything from across different DBMS. Transforming and correlating it so that Agents can do operations across multiple DBMSes",
  icon: Brain,
  gradient: "from-blue-500 via-cyan-500 to-teal-500",
  image: "/operations.png"
};

const heroFeature3 = {
  title: "AI Agency",
  description: "We have made AI Agents capable of \"getting things done\" through various tools and integrations. Different SQL queries across DBMSes, MCP Integrations, Terminal commands, Kubernetes commands, parallel tools calls, agentic workflows and more.",
  icon: Code,
  gradient: "from-green-500 via-emerald-500 to-teal-500",
  image: "/agency.png"
};

const featureTiles = [
  {
    title: "Birds Eye View",
    description: "You can spot database instances which need attention at a glance.",
    icon: Code,
    gradient: "from-blue-500 to-purple-500",
    image: "/bird_eye.png"
  },
  {
    title: "Click and solve",
    description: "You can run fixes manually or with AI.",
    icon: Brain,
    gradient: "from-green-500 to-teal-500",
    image: "/manual.png"
  },
  {
    title: "Production Ready",
    description: "All important real time context attached at a click, to solve production problems. Specialized agents are used to solve production issues, because normal peaceful solutions don't work!",
    icon: ArrowRight,
    gradient: "from-purple-500 to-pink-500",
    image: "/produciton.png"
  }
];

const featureTiles2 = [
  {
    title: "Context on fingertips",
    description: "Just type '@' and search for what you want, for custom tasks",
    icon: Code,
    gradient: "from-indigo-500 to-blue-500",
    image: "/context.png"
  },
  {
    title: "Templates",
    description: "Complex tasks and important business context can be stored to be applied manually or automatically",
    icon: Brain,
    gradient: "from-emerald-500 to-green-500",
    image: "/template.png"
  },
  {
    title: "Multi-DBMS",
    description: "Get work done across DBMSes with single text box, with smart context suggestion. Tasks never felt this effortless",
    icon: ArrowRight,
    gradient: "from-rose-500 to-pink-500",
    image: "/smart_context.png"
  }
];

const featureTiles3 = [ 
  {
    title: "Parallel Queries",
    description: "Run same query over multiple instances of same DBMS, in single LLM iteration. Saving time and money",
    icon: Code,
    gradient: "from-indigo-500 to-blue-500",
    image: "/parallel_call.png"
  },  
  {
    title: "Multiple Calls",
    description: "Run different types of tool calls in same LLM iteration. You can run same task across different DBMSes",
    icon: Brain,
    gradient: "from-emerald-500 to-green-500",
    image: "/multi_call.png"
  },  
  {
    title: "Non DB agency",
    description: "Server on which DBMS are deployed need configuration, we have MCP integration for Cloud and Terminal command for On-Prem",
    icon: ArrowRight,
    gradient: "from-rose-500 to-pink-500",
    image: "/terminal.png"
  }
];


export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Features
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Build databases faster with our AI-powered co-pilot
            </p>
          </div>
        </div>
      </section>

      {/* Hero Feature Section - Smaller and more compact */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="relative">
            {/* Large gradient background card */}
            <div className="relative bg-gradient-to-r from-orange-500 via-yellow-500 to-purple-500 rounded-xl p-6 lg:p-8 shadow-xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    {heroFeature.title}
                  </h2>
                  <p className="text-base text-white/90 mb-6 leading-relaxed">
                    {heroFeature.description}
                  </p>
                </div>
                
                <div className="relative">
                  <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <Image
                      src={heroFeature.image}
                      alt="AI Co-Pilot Interface"
                      width={850}
                      height={550}
                      className="w-full h-auto rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tiles Section - Smaller gaps, more compact */}
      <section className="pt-2.5 pb-12 lg:pb-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureTiles.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-card border border-border rounded-lg p-5 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                  <div className="space-y-4">
                    {/* Image above description */}
                    <div className="bg-muted/30 rounded-lg p-3">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={300}
                        height={200}
                        className="w-full h-auto rounded"
                      />
                    </div>
                    
                    {/* Title and description below */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Hero Feature Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="relative">
            {/* Large gradient background card */}
            <div className="relative bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl p-6 lg:p-8 shadow-xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    {heroFeature2.title}
                  </h2>
                  <p className="text-base text-white/90 mb-6 leading-relaxed">
                    {heroFeature2.description}
                  </p>
                </div>
                
                <div className="relative">
                  <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <Image
                      src={heroFeature2.image}
                      alt="AI Query Optimization Interface"
                      width={850}
                      height={550}
                      className="w-full h-auto rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Feature Tiles Section */}
      <section className="pt-2.5 pb-12 lg:pb-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureTiles2.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-card border border-border rounded-lg p-5 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                  <div className="space-y-4">
                    {/* Image above description */}
                    <div className="bg-muted/30 rounded-lg p-3">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={300}
                        height={200}
                        className="w-full h-auto rounded"
                      />
                    </div>
                    
                    {/* Title and description below */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Hero Feature Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="relative">
            {/* Large gradient background card */}
            <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl p-6 lg:p-8 shadow-xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    {heroFeature3.title}
                  </h2>
                  <p className="text-base text-white/90 mb-6 leading-relaxed">
                    {heroFeature3.description}
                  </p>
                </div>
                
                <div className="relative">
                  <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <Image
                      src={heroFeature3.image}
                      alt="Natural Language to SQL Interface"
                      width={850}
                      height={550}
                      className="w-full h-auto rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Feature Tiles Section */}
      <section className="pt-2.5 pb-12 lg:pb-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureTiles3.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-card border border-border rounded-lg p-5 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                  <div className="space-y-4">
                    {/* Image above description */}
                    <div className="bg-muted/30 rounded-lg p-3">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={300}
                        height={200}
                        className="w-full h-auto rounded"
                      />
                    </div>
                    
                    {/* Title and description below */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to transform your database experience?
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            Join thousands of developers who are already using our AI co-pilot to build better databases faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/download">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 