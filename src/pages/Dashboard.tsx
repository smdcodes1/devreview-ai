import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Upload, LogOut, History } from "lucide-react";
import { User, Session } from "@supabase/supabase-js";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<"free" | "paid">("free");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchUserLimits();
    }
  }, [user]);

  const fetchUserLimits = async () => {
    try {
      const { data, error } = await supabase
        .from("user_limits")
        .select("review_count, payment_status")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setReviewCount(data.review_count);
        setPaymentStatus(data.payment_status);
      }
    } catch (error: any) {
      console.error("Error fetching user limits:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleUpload = () => {
    if (reviewCount >= 2 && paymentStatus === "free") {
      toast({
        variant: "destructive",
        title: "Review limit reached",
        description: "You've used your 2 free reviews. Upgrade to continue!",
      });
      // TODO: Navigate to payment page
      return;
    }
    
    toast({
      title: "Coming soon!",
      description: "Resume upload functionality will be available soon.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const remainingReviews = paymentStatus === "paid" ? "Unlimited" : Math.max(0, 2 - reviewCount);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <nav className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">DevResume AI</h1>
          </div>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Welcome back!</h2>
            <p className="text-muted-foreground">Upload your resume for AI-powered feedback</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Reviews Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{remainingReviews}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {paymentStatus === "paid" ? "Premium account" : "Free tier"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Total Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{reviewCount}</div>
                <p className="text-sm text-muted-foreground mt-1">Completed</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Account Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {paymentStatus === "paid" ? "Pro" : "Free"}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Current plan</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Upload Resume</CardTitle>
              <CardDescription>
                Upload your resume in PDF, DOC, or DOCX format for instant AI feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-smooth cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your resume here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOC, DOCX (max 10MB)
                </p>
              </div>
              <Button 
                onClick={handleUpload}
                className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
                size="lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Resume
              </Button>
            </CardContent>
          </Card>

          {paymentStatus === "paid" && (
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Review History</CardTitle>
                <CardDescription>View your past resume reviews and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">No reviews yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your review history will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {reviewCount >= 2 && paymentStatus === "free" && (
            <Card className="border-primary/50 bg-primary/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock unlimited resume reviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Unlimited AI-powered resume reviews
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Access to review history
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Advanced ATS optimization tips
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary hover:opacity-90 transition-smooth" size="lg">
                  Upgrade Now - ₹99
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;