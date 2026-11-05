import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { Mail, Phone, MapPin, Send, CheckCircle, ExternalLink, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BackToTopButton from "../components/BackToTopButton";
import HeroSection from "../components/HeroSection";
import { useScrollAnimation } from "../components/ScrollAnimationObserver";
import { CONTACT_INFO } from "../components/constants";
import SEO from "../components/SEO";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await base44.integrations.Core.SendEmail({
        to: "s.beenishjalil@gmail.com",
        subject: `New Consultation Request from ${formData.name}`,
        body: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service Interest: ${formData.service}

Message:
${formData.message}
        `
      });

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <SEO
        title="Contact Us - KSB Consulting | Book Free Consultation"
        description="Contact KSB Consulting for a free mental health consultation. Call (437) 747-6095 or book online. Virtual services available across Canada."
        keywords="contact therapist, book consultation, mental health appointment, virtual therapy booking" />
      
      <main className="min-h-screen">
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1600&q=80"
          title="Get in Touch"
          subtitle="Start your journey to better mental health today"
          height="50vh" />
        

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-[#f9f4f0] to-[#efe2d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Let's Connect
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Taking care of your mental health takes courage and strength. We're here to support you every step of the way. Contact us today for a free consultation.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                  <CardContent className="p-6 rounded">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E97D53] to-[#9D7438] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email:     s.beenishjalil@gmail.com

                          </h3>
                        

                          
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#7DA6A9] to-[#2D4642] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Call Us 
416-688-0131</h3>
                        <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`} className="text-[#7DA6A9] hover:text-[#9D7438] transition-colors hidden">
                          {CONTACT_INFO.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                  











                    
                </Card>

                <Card className="border-2 border-[#e8ddd0] hover:border-[#C5A069] shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                  

























                    
                </Card>

                <Card className="border-none shadow-xl bg-gradient-to-br from-[#9D7438] to-[#7DA6A9] text-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Office Hours</h3>
                    <div className="space-y-2 text-white/90">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday & Sunday: By Appointment</p>
                      
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-none shadow-2xl bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  <span className="hidden sm:inline">Book Your Free Consultation</span>
                  <span className="sm:hidden">Book Now</span>
                </h3>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-900 font-medium">
                      Full Name *
                    </Label>
                    <Input id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="John Doe"
                      className="mt-2" />
                      
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-medium">
                      Email Address *
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="mt-2" />
                      
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-900 font-medium">
                      Phone Number
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(123) 456-7890"
                        className="mt-2" />
                      
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-gray-900 font-medium">
                      Service Interest *
                    </Label>
                    <Select
                        required
                        value={formData.service}
                        onValueChange={(value) => handleChange("service", value)}>
                        
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual Therapy</SelectItem>
                        <SelectItem value="family">Family Therapy</SelectItem>
                        <SelectItem value="parental">Parental Consultation</SelectItem>
                        <SelectItem value="community">Community Programs</SelectItem>
                        <SelectItem value="organization">Organizational Support</SelectItem>
                        <SelectItem value="not-sure">Not Sure / General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-900 font-medium">
                      Message *
                    </Label>
                    <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tell us a bit about what brings you here today..."
                        className="mt-2 min-h-32" />
                      
                  </div>

                  {submitStatus === "success" &&
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Thank you for reaching out! We'll get back to you within 24 hours.
                      </AlertDescription>
                    </Alert>
                    }

                  {submitStatus === "error" &&
                    <Alert variant="destructive">
                      <AlertDescription>
                        Something went wrong. Please try again or contact us directly.
                      </AlertDescription>
                    </Alert>
                    }

                  <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#9D7438] to-[#7DA6A9] hover:from-[#8d6428] hover:to-[#6d9699] text-white text-lg py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6">
                      
                    {isSubmitting ?
                      "Sending..." :

                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                      }
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and consent to being contacted.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What Happens Next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                step: "1",
                title: "We'll Review Your Request",
                description: "We'll carefully review your message and service needs"
              },
              {
                step: "2",
                title: "Initial Consultation",
                description: "We'll schedule a free consultation to discuss your goals"
              },
              {
                step: "3",
                title: "Begin Your Journey",
                description: "Start working together on your path to wellness"
              }].
              map((item) =>
              <div key={item.step} className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#E97D53] to-[#9D7438] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#9D7438] via-[#E97D53] to-[#7DA6A9] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Taking care of your mental health takes courage and strength. We're here to support you every step of the way. Contact us today for a free consultation.
          </p>
          <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-[#2D4642] hover:bg-gray-100 text-lg px-10 py-6 shadow-2xl hover:shadow-[#2D4642]/50 transform hover:scale-105 transition-all duration-300">
              
            <span className="hidden sm:inline">Book Free Consultation</span>
            <span className="sm:hidden">Book Now</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <BackToTopButton />
      </main>
    </>);

}
