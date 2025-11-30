import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText, Sparkles, Target, Zap, CheckCircle2, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your resume for technical skills, projects, and ATS optimization"
    },
    {
      icon: Target,
      title: "Instant Feedback",
      description: "Get detailed improvement suggestions within seconds of uploading"
    },
    {
      icon: Zap,
      title: "Developer-Focused",
      description: "Tailored specifically for software developers with industry-standard insights"
    }
  ];

  const benefits = [
    "ATS compatibility check",
    "Technical skills optimization",
    "Project description enhancement",
    "Keyword optimization",
    "Formatting corrections",
    "Job-role alignment tips"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">DevResume AI</span>
          </div>
          <Button 
            onClick={() => navigate("/auth")}
            className="bg-gradient-primary hover:opacity-90 transition-smooth"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Resume Reviews
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Get Your Resume
            <span className="block text-primary mt-2">Reviewed by AI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instant, professional feedback tailored for software developers. 
            Optimize your resume for ATS and stand out to recruiters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow text-lg px-8 py-6"
            >
              Start Free Review
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">2 free reviews • No credit card required</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">Free Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">&lt;30s</div>
              <div className="text-sm text-muted-foreground">Analysis Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">₹99</div>
              <div className="text-sm text-muted-foreground">For Unlimited</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why DevResume AI?
            </h2>
            <p className="text-muted-foreground text-lg">
              Built specifically for software developers who want to land their dream job
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">What You'll Get</CardTitle>
              <CardDescription>Comprehensive analysis covering all aspects of your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Start with 2 free reviews, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Free Tier</CardTitle>
                <CardDescription>Perfect for trying out the service</CardDescription>
                <div className="text-4xl font-bold text-foreground pt-4">₹0</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    2 resume reviews
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    AI-powered feedback
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Basic analysis
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/auth")}
                >
                  Start Free
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5 backdrop-blur-sm shadow-glow">
              <CardHeader>
                <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-2 w-fit">
                  RECOMMENDED
                </div>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>For serious job seekers</CardDescription>
                <div className="text-4xl font-bold text-foreground pt-4">₹99</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Unlimited resume reviews
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Review history access
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Advanced insights
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
                  onClick={() => navigate("/auth")}
                >
                  Get Pro Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-3xl mx-auto border-border bg-card/50 backdrop-blur-sm text-center">
          <CardContent className="pt-12 pb-12 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Level Up Your Resume?
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of developers who've improved their resumes with AI
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 DevResume AI. Built for developers, by developers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;