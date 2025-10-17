'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { signUp } from '@/lib/supabase/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ArrowRight,
  Shield,
  Trophy,
  Users,
  Calendar,
  CheckCircle2,
  Info
} from 'lucide-react'
import Image from 'next/image'

// Zod schemas for each step
const personalInfoSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
})

const accountSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don&apos;t match",
  path: ["confirmPassword"],
})

const consentSchema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }),
  privacyAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy policy'
  }),
  marketingConsent: z.boolean().optional()
})

type PersonalInfo = z.infer<typeof personalInfoSchema>
type AccountInfo = z.infer<typeof accountSchema>
type ConsentInfo = z.infer<typeof consentSchema>
type FormData = PersonalInfo & AccountInfo & ConsentInfo

type FormErrors = Partial<Record<keyof FormData, string>>

const TOTAL_STEPS = 3

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyAccepted: false,
    marketingConsent: false
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateStep = (step: number): boolean => {
    let schema: z.ZodSchema<PersonalInfo | AccountInfo | ConsentInfo>
    let dataToValidate: PersonalInfo | AccountInfo | ConsentInfo

    switch (step) {
      case 1:
        schema = personalInfoSchema
        dataToValidate = {
          firstName: formData.firstName,
          lastName: formData.lastName
        }
        break
      case 2:
        schema = accountSchema
        dataToValidate = {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }
        break
      case 3:
        schema = consentSchema
        dataToValidate = {
          termsAccepted: formData.termsAccepted,
          privacyAccepted: formData.privacyAccepted,
          marketingConsent: formData.marketingConsent
        }
        break
      default:
        return false
    }

    try {
      schema.parse(dataToValidate)
      // Clear errors for this step
      const stepFields = Object.keys(dataToValidate)
      const newErrors = { ...formErrors }
      stepFields.forEach(field => {
        delete newErrors[field as keyof FormData]
      })
      setFormErrors(newErrors)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            errors[err.path[0] as keyof FormData] = err.message
          }
        })
        setFormErrors(prev => ({ ...prev, ...errors }))
        return false
      }
      return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
    if (serverError) setServerError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Validate all steps
    let isValid = true
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      if (!validateStep(i)) {
        isValid = false
        setCurrentStep(i) // Go to first invalid step
        break
      }
    }

    if (!isValid) return

    setLoading(true)

    try {
      const { data, error } = await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName
      })
      
      if (error) {
        // Check for specific error types
        if (error.message.includes('authentication service') || error.message.includes('configuration')) {
          setServerError('The authentication service is currently unavailable. Please try again later or contact support at admin@wrfc.org')
        } else if (error.message.includes('already registered')) {
          setServerError('This email is already registered. Please sign in or use a different email.')
        } else {
          setServerError(error.message)
        }
      } else if (data?.user) {
        router.push('/portal/register/success')
      } else {
        setServerError('Registration failed. Please try again.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setServerError('Unable to complete registration. Please check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { score: 33, label: 'Weak', color: 'bg-red-500' }
    if (score <= 4) return { score: 66, label: 'Medium', color: 'bg-yellow-500' }
    return { score: 100, label: 'Strong', color: 'bg-green-500' }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative flex min-h-screen">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-wrfc-red to-red-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <Image
                src="/logos/wrfc_logo.png"
                alt="WRFC Logo"
                width={120}
                height={120}
                className="bg-white rounded-full p-2"
              />
            </div>
            <h1 className="text-5xl font-bold mb-4">Join the Legacy</h1>
            <p className="text-xl mb-8 opacity-90">
              Become part of Washington&apos;s premier rugby club, established in 1963.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Championship Heritage</h3>
                  <p className="opacity-80">Multiple division champions and tournament winners</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Strong Community</h3>
                  <p className="opacity-80">Join 100+ active players and alumni</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Year-Round Activity</h3>
                  <p className="opacity-80">Training, matches, and social events throughout the year</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mb-48"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-wrfc-red dark:text-gray-400 dark:hover:text-wrfc-red transition-colors mb-8"
              aria-label="Back to WRFC website"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to website
            </Link>

            <Card className="shadow-2xl border-0">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
                <CardDescription className="text-base">
                  Step {currentStep} of {TOTAL_STEPS} - {
                    currentStep === 1 ? 'Personal Information' :
                    currentStep === 2 ? 'Account Details' :
                    'Terms & Consent'
                  }
                </CardDescription>
              </CardHeader>

              {/* Progress Bar */}
              <div className="px-6 pb-2">
                <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
              </div>

              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {serverError && (
                    <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{serverError}</AlertDescription>
                    </Alert>
                  )}

                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className={`pl-10 ${formErrors.firstName ? 'border-red-500' : ''}`}
                              aria-invalid={!!formErrors.firstName}
                              aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
                            />
                          </div>
                          {formErrors.firstName && (
                            <p id="firstName-error" className="text-sm text-red-600 dark:text-red-400">
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className={`pl-10 ${formErrors.lastName ? 'border-red-500' : ''}`}
                              aria-invalid={!!formErrors.lastName}
                              aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
                            />
                          </div>
                          {formErrors.lastName && (
                            <p id="lastName-error" className="text-sm text-red-600 dark:text-red-400">
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex gap-3">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 dark:text-blue-300">
                          <p className="font-semibold mb-1">Why we need this information:</p>
                          <p>Your name helps us personalize your experience and is displayed on your player profile.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Account Details */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                            aria-invalid={!!formErrors.email}
                            aria-describedby={formErrors.email ? 'email-error' : undefined}
                          />
                        </div>
                        {formErrors.email && (
                          <p id="email-error" className="text-sm text-red-600 dark:text-red-400">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className={`pl-10 pr-10 ${formErrors.password ? 'border-red-500' : ''}`}
                            aria-invalid={!!formErrors.password}
                            aria-describedby={formErrors.password ? 'password-error' : undefined}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        
                        {/* Password Strength Indicator */}
                        {formData.password && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
                              <span className={`font-medium ${
                                passwordStrength.label === 'Weak' ? 'text-red-600' :
                                passwordStrength.label === 'Medium' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                style={{ width: `${passwordStrength.score}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        {formErrors.password && (
                          <p id="password-error" className="text-sm text-red-600 dark:text-red-400">
                            {formErrors.password}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`pl-10 pr-10 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                            aria-invalid={!!formErrors.confirmPassword}
                            aria-describedby={formErrors.confirmPassword ? 'confirmPassword-error' : undefined}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {formErrors.confirmPassword && (
                          <p id="confirmPassword-error" className="text-sm text-red-600 dark:text-red-400">
                            {formErrors.confirmPassword}
                          </p>
                        )}
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium mb-2">
                          Password Requirements:
                        </p>
                        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className={`h-4 w-4 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`} />
                            At least 8 characters
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className={`h-4 w-4 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
                            One uppercase letter
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className={`h-4 w-4 ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
                            One lowercase letter
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className={`h-4 w-4 ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
                            One number
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className={`h-4 w-4 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
                            One special character
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Terms & Consent */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms"
                            checked={formData.termsAccepted}
                            onCheckedChange={(checked: boolean) => handleInputChange('termsAccepted', checked)}
                            aria-describedby={formErrors.termsAccepted ? 'terms-error' : undefined}
                          />
                          <div className="space-y-1">
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              I accept the Terms and Conditions
                            </label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              By creating an account, you agree to our{' '}
                              <Link href="/terms" className="text-wrfc-red hover:underline" target="_blank">
                                Terms of Service
                              </Link>
                            </p>
                            {formErrors.termsAccepted && (
                              <p id="terms-error" className="text-sm text-red-600 dark:text-red-400">
                                {formErrors.termsAccepted}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="privacy"
                            checked={formData.privacyAccepted}
                            onCheckedChange={(checked: boolean) => handleInputChange('privacyAccepted', checked)}
                            aria-describedby={formErrors.privacyAccepted ? 'privacy-error' : undefined}
                          />
                          <div className="space-y-1">
                            <label
                              htmlFor="privacy"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              I accept the Privacy Policy
                            </label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              I understand how WRFC collects and uses my data as outlined in the{' '}
                              <Link href="/privacy" className="text-wrfc-red hover:underline" target="_blank">
                                Privacy Policy
                              </Link>
                            </p>
                            {formErrors.privacyAccepted && (
                              <p id="privacy-error" className="text-sm text-red-600 dark:text-red-400">
                                {formErrors.privacyAccepted}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="marketing"
                            checked={formData.marketingConsent}
                            onCheckedChange={(checked: boolean) => handleInputChange('marketingConsent', checked)}
                          />
                          <div className="space-y-1">
                            <label
                              htmlFor="marketing"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              Send me updates and newsletters (optional)
                            </label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Get the latest news about matches, events, and club updates
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex gap-3">
                        <Shield className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-green-800 dark:text-green-300">
                          <p className="font-semibold mb-1">Your data is secure</p>
                          <p>We use industry-standard encryption to protect your information and never share your data with third parties without your consent.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={loading}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                    ) : (
                      <Link href="/portal/login">
                        <Button variant="ghost" type="button">
                          Already have an account?
                        </Button>
                      </Link>
                    )}

                    {currentStep < TOTAL_STEPS ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="bg-wrfc-red hover:bg-red-700"
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-wrfc-red hover:bg-red-700"
                        disabled={loading || !formData.termsAccepted || !formData.privacyAccepted}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Complete Registration
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Sign In Link */}
            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/portal/login" className="text-wrfc-red hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}