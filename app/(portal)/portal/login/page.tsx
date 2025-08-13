'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { signIn } from '@/lib/supabase/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, AlertCircle, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof loginSchema>
type FormErrors = Partial<Record<keyof LoginFormData, string>>

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Set<keyof LoginFormData>>(new Set())

  const validateField = (field: keyof LoginFormData, value: string) => {
    // Only validate if the field has been touched
    if (!touchedFields.has(field)) return
    
    try {
      const partialSchema = z.object({ [field]: loginSchema.shape[field] })
      partialSchema.parse({ [field]: value })
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(prev => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    validateField(field, value)
    if (serverError) setServerError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)

    // Validate entire form
    try {
      loginSchema.parse(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            errors[err.path[0] as keyof LoginFormData] = err.message
          }
        })
        setFormErrors(errors)
        return
      }
    }

    setLoading(true)

    try {
      const { data, error } = await signIn(formData.email, formData.password)
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setServerError('Invalid email or password. Please try again.')
        } else {
          setServerError(error.message)
        }
      } else if (data.user) {
        router.push('/portal/dashboard')
      }
    } catch {
      setServerError('An unexpected error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Back to Website Link */}
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center text-sm text-gray-600 hover:text-wrfc-red dark:text-gray-400 dark:hover:text-wrfc-red transition-colors"
          aria-label="Back to WRFC website"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to website
        </Link>

        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white shadow-lg dark:bg-gray-800">
            <Image
              src="/logos/wrfc_logo.png"
              alt="WRFC Logo"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to access your WRFC Player Portal
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {serverError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={() => {
                        setTouchedFields(prev => new Set(prev).add('email'))
                        validateField('email', formData.email)
                      }}
                      required
                      disabled={loading}
                      className={`pl-10 ${formErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
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

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <button
                      type="button"
                      onClick={() => alert('Please contact support@washingtonrugby.org to reset your password.')}
                      className="text-sm text-wrfc-red hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      tabIndex={-1}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onBlur={() => {
                        setTouchedFields(prev => new Set(prev).add('password'))
                        validateField('password', formData.password)
                      }}
                      required
                      disabled={loading}
                      className={`pl-10 pr-10 ${formErrors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                      aria-invalid={!!formErrors.password}
                      aria-describedby={formErrors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p id="password-error" className="text-sm text-red-600 dark:text-red-400">
                      {formErrors.password}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-wrfc-red hover:bg-red-700 text-white font-semibold py-2.5 transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Sign In Securely
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                  New to WRFC?
                </span>
              </div>
            </div>

            <Link href="/portal/register">
              <Button
                variant="outline"
                className="w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                size="lg"
              >
                Create Player Account
              </Button>
            </Link>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>By signing in, you agree to our</p>
            <div className="flex items-center justify-center space-x-1">
              <Link href="/terms" className="text-wrfc-red hover:underline">
                Terms of Service
              </Link>
              <span>and</span>
              <Link href="/privacy" className="text-wrfc-red hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Help Text */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Having trouble signing in?{' '}
          <Link href="/contact" className="text-wrfc-red hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}