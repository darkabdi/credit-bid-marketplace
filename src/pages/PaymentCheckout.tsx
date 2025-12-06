import { ArrowLeft, CreditCard, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/ui/link";

const PaymentCheckout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <Link href="/workspace" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Workspace
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-6">Payment Details</h1>
            
            <Card className="shadow-card border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base">Card Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    className="h-12 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM / YY"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    placeholder="Name on card"
                    className="h-12"
                  />
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Label htmlFor="email">Billing Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-12"
                  />
                </div>

                <Button className="w-full h-12 mt-4 bg-[hsl(var(--moss))] hover:bg-[hsl(var(--moss))]/90 text-base font-medium gap-2">
                  <Lock className="h-4 w-4" />
                  Pay $525.00
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                  <Lock className="h-3 w-3" />
                  <span>Secured by Stripe. Your payment info is encrypted.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Order Summary</h2>
            
            <Card className="shadow-card border-border">
              <CardContent className="p-6 space-y-6">
                {/* Milestone Info */}
                <div className="p-4 bg-[hsl(var(--nordic-grey))] rounded-xl">
                  <p className="text-sm text-muted-foreground">Milestone Payment</p>
                  <h3 className="font-semibold text-foreground mt-1">Project Setup & Architecture</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Web Development Project • Sarah Chen
                  </p>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Milestone Amount</span>
                    <span className="font-medium">$500.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee (5%)</span>
                    <span className="font-medium">$25.00</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">$525.00</span>
                </div>

                {/* Benefits */}
                <div className="bg-[hsl(var(--moss-light))] rounded-xl p-4 space-y-3">
                  <h4 className="font-medium text-sm text-foreground">What's included:</h4>
                  <div className="space-y-2">
                    {[
                      "Funds held securely in escrow",
                      "Released only upon milestone completion",
                      "Full refund if deliverables not met",
                      "24/7 dispute resolution support",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-[hsl(var(--moss))]" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mt-6 text-muted-foreground">
              <div className="flex items-center gap-2 text-xs">
                <Lock className="h-4 w-4" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CreditCard className="h-4 w-4" />
                <span>PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentCheckout;
