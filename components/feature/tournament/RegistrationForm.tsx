'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCurrentTournament, getDivisionOptions } from '@/data/cherry-blossom-tournaments';

interface FormData {
  teamName: string;
  division: string;
  city: string;
  state: string;
  contactName: string;
  email: string;
  phone: string;
  playersCount: string;
  notes: string;
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    division: '',
    city: '',
    state: '',
    contactName: '',
    email: '',
    phone: '',
    playersCount: '',
    notes: ''
  });

  const divisions = getDivisionOptions(getCurrentTournament().year);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = (currentStep: number): boolean => {
    setError('');
    
    if (currentStep === 1) {
      if (!formData.teamName.trim()) {
        setError('Team name is required');
        return false;
      }
      if (!formData.division) {
        setError('Please select a division');
        return false;
      }
      if (!formData.city.trim() || !formData.state.trim()) {
        setError('City and state are required');
        return false;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.contactName.trim()) {
        setError('Contact name is required');
        return false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Valid email address is required');
        return false;
      }
      if (!formData.phone.trim()) {
        setError('Phone number is required');
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/cbt-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        // Redirect to confirmation page with registration ID
        window.location.href = `/tournaments/cherry-blossom/register/confirmation?id=${result.registrationId}&status=${result.teamStatus}`;
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to submit registration. Please try again or email cbt@washingtonrugby.org');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step
                    ? 'bg-wrfc-red text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    s < step ? 'bg-wrfc-red' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className={step >= 1 ? 'text-wrfc-red font-semibold' : 'text-gray-500'}>Team Info</span>
          <span className={step >= 2 ? 'text-wrfc-red font-semibold' : 'text-gray-500'}>Contact</span>
          <span className={step >= 3 ? 'text-wrfc-red font-semibold' : 'text-gray-500'}>Review</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      {/* Step 1: Team Information */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-wrfc-navy dark:text-white">Team Information</h2>
          
          <div>
            <Label htmlFor="teamName">Team Name *</Label>
            <Input
              id="teamName"
              value={formData.teamName}
              onChange={(e) => updateField('teamName', e.target.value)}
              placeholder="Enter your team name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="division">Division *</Label>
            <Select value={formData.division} onValueChange={(value) => updateField('division', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((div) => (
                  <SelectItem key={div.value} value={div.value}>
                    {div.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="City"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => updateField('state', e.target.value)}
                placeholder="State"
                className="mt-1"
                maxLength={2}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="playersCount">Expected Number of Players (Optional)</Label>
            <Input
              id="playersCount"
              value={formData.playersCount}
              onChange={(e) => updateField('playersCount', e.target.value)}
              placeholder="e.g., 25"
              type="number"
              className="mt-1"
            />
          </div>

          <Button onClick={handleNext} className="w-full bg-wrfc-red hover:bg-wrfc-red/90">
            Next Step →
          </Button>
        </div>
      )}

      {/* Step 2: Contact Information */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-wrfc-navy dark:text-white">Contact Information</h2>
          
          <div>
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) => updateField('contactName', e.target.value)}
              placeholder="Full name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="email@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes or Questions (Optional)</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Any special requirements, dietary needs, or questions..."
              rows={4}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-wrfc-red outline-none"
            />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleBack} variant="outline" className="flex-1">
              ← Back
            </Button>
            <Button onClick={handleNext} className="flex-1 bg-wrfc-red hover:bg-wrfc-red/90">
              Review →
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review and Submit */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-wrfc-navy dark:text-white">Review Your Registration</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Team Name</h3>
              <p className="text-lg">{formData.teamName}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Division</h3>
              <p className="text-lg">{formData.division}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Location</h3>
                <p>{formData.city}, {formData.state}</p>
              </div>
              {formData.playersCount && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Players</h3>
                  <p>{formData.playersCount}</p>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Contact</h3>
              <p>{formData.contactName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{formData.email}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{formData.phone}</p>
            </div>
            
            {formData.notes && (
              <div>
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Notes</h3>
                <p className="text-sm">{formData.notes}</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Submit your registration</li>
                      <li>You&apos;ll receive a confirmation email immediately</li>
                      <li>Complete payment within 14 days to confirm your spot</li>
                      <li>You&apos;ll receive tournament details once payment is confirmed</li>
            </ol>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleBack} variant="outline" className="flex-1" disabled={loading}>
              ← Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-wrfc-red hover:bg-wrfc-red/90"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Registration'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
