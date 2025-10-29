'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';
import {Turnstile} from 'next-turnstile';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Invalid email address').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

type FormData = z.infer<typeof formSchema>;

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: FormData) => {
    if (!captchaToken) {
      setSubmitError('Please complete the security check');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitContactForm(
        { ...data, captchaToken },
        'unknown'
      );

      if (result.success) {
        setSubmitSuccess(true);
        reset();
        setCaptchaToken(null);
        
        setTimeout(() => {
          setSubmitSuccess(false);
          onOpenChange(false);
        }, 2500);
      } else {
        setSubmitError(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.log("Error:", error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSubmitError(null);
      setSubmitSuccess(false);
      setCaptchaLoading(true);
      reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg data-[state=open]:dialog-spring-in data-[state=closed]:dialog-spring-out sm:rounded-lg",
)}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Contact Us</DialogTitle>
          <DialogDescription>
            Send us a message and we&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="py-8 text-center animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-green-600 text-xl font-semibold mb-2">
              Message sent successfully!
            </div>
            <p className="text-sm text-neutral-600">
              We&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="John Doe"
                disabled={isSubmitting}
                className="mt-1.5"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1.5">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@example.com"
                disabled={isSubmitting}
                className="mt-1.5"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                {...register('message')}
                placeholder="How can we help you?"
                rows={5}
                maxLength={2000}
                disabled={isSubmitting}
                className="mt-1.5 resize-none"
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1.5">{errors.message.message}</p>
              )}
            </div>

            <div className="pt-2">
              <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} onLoad={() => setCaptchaLoading(false)} onVerify={setCaptchaToken} theme="light" />
              {captchaLoading && (
                <p className="text-xs text-neutral-500 mt-2">
                  Loading security check...
                </p>
              )}
            </div>

            {submitError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg animate-in fade-in-0 slide-in-from-top-1 duration-200">
                {submitError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 text-base font-medium"
              disabled={isSubmitting || !captchaToken}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>

            {!captchaToken && !captchaLoading && (
              <p className="text-xs text-center text-neutral-500">
                Complete the security check to enable the submit button
              </p>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}