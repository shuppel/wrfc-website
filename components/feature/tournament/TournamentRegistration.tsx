import { useForm } from 'react-hook-form';
import { useForm as useFormspree } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from "@/lib/utils";
import * as Select from "@radix-ui/react-select";
import Link from 'next/link';
import { DialogClose } from '@/components/ui/dialog';
import PaymentButton from '../payment/PaymentButton';

interface TournamentRegistrationProps {
  divisions: {
    name: string;
    fee: number;
  }[];
}

interface FormData {
  teamName: string;
  division: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string;
}

const FORMSPREE_FORM_ID = 'mwplerlp';

export default function TournamentRegistration({ divisions }: TournamentRegistrationProps) {
  const [selectedDivision, setSelectedDivision] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const [formspreeState, sendToFormspree] = useFormspree(FORMSPREE_FORM_ID);

  const onSubmit = async (data: FormData) => {
    const formData = {
      ...data,
      division: selectedDivision
    };
    await sendToFormspree(formData);
    if (formspreeState.succeeded) {
      reset();
      setSelectedDivision('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red via-wrfc-navy to-wrfc-red rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
          <Button 
            className="relative w-full bg-wrfc-red hover:bg-wrfc-red/90 text-white py-6 text-lg font-bold tracking-wide shadow-lg group-hover:shadow-xl transition-all duration-200 overflow-hidden"
            aria-label="Register your team for the Cherry Blossom Tournament"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy to-wrfc-red opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-nasalization text-wrfc-navy dark:text-white">Team Registration</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Register your team for the Cherry Blossom Tournament. You'll receive confirmation and payment details via email.
          </DialogDescription>
        </DialogHeader>

        {formspreeState.succeeded ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold text-green-600 mb-2">Registration Submitted!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for registering. Please proceed to the payment page to complete your registration.
            </p>
            <div className="space-y-4">
              <PaymentButton />
              <DialogClose asChild>
                <Button variant="outline" className="w-full">Close</Button>
              </DialogClose>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-gray-900 dark:text-white">
            <div className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  {...register("teamName", { required: "Team name is required" })}
                  placeholder="Enter your team name"
                  className={errors.teamName ? "border-red-500" : ""}
                />
                {errors.teamName && (
                  <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="division">Division</Label>
                <Select.Root value={selectedDivision} onValueChange={setSelectedDivision}>
                  <Select.Trigger id="division" className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                    !selectedDivision && "border-red-500"
                  )}>
                    <Select.Value placeholder="Select division" />
                    <Select.Icon>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg animate-in fade-in-0 zoom-in-95">
                      <Select.Viewport className="p-2">
                        {divisions.map((division) => (
                          <Select.Item
                            key={division.name}
                            value={division.name}
                            className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-4 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 transition-colors"
                          >
                            <Select.ItemText>{division.name} - ${division.fee}</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                              <Check className="h-4 w-4 text-wrfc-red" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
                {!selectedDivision && (
                  <p className="text-red-500 text-sm mt-1">Please select a division</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  {...register("contactName", { required: "Contact name is required" })}
                  placeholder="Enter contact person's name"
                  className={errors.contactName ? "border-red-500" : ""}
                />
                {errors.contactName && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Enter contact email"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
                      message: "Invalid phone number format"
                    }
                  })}
                  placeholder="Enter contact phone number"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Additional Information</Label>
                <textarea
                  id="message"
                  {...register("message")}
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-ring-ring focus-ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Any additional information or special requests"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-wrfc-red hover:bg-wrfc-red/90 text-white"
              disabled={formspreeState.submitting || !selectedDivision}
            >
              {formspreeState.submitting ? 'Submitting...' : 'Submit Registration'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
} 