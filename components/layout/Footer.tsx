import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Club Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-16">
                <Image
                  src="/logos/wrfc_logo.png"
                  alt="WRFC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-nasalization bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-500 dark:to-blue-300 bg-clip-text text-transparent">
                  WRFC
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-100">Est. 1963</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-white font-jetbrains text-sm leading-relaxed">
              Washington Rugby Football Club<br />
              Tradition. Excellence. Community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-nasalization text-gray-900 dark:text-gray-100 border-b-2 border-blue-600 dark:border-blue-400 pb-2 inline-block">
              Quick Links
            </h4>
            <nav>
              <ul className="space-y-3">
                <li><FooterLink href="/about">About Us</FooterLink></li>
                <li><FooterLink href="/membership">Join WRFC</FooterLink></li>
                <li><FooterLink href="/teams/players">Player Roster</FooterLink></li>
                <li><FooterLink href="/schedule/game">Game Schedule</FooterLink></li>
                <li><FooterLink href="/tournaments">Tournaments</FooterLink></li>
                <li><FooterLink href="/faq">FAQ</FooterLink></li>
                <li><FooterLink href="/contact">Contact</FooterLink></li>
              </ul>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-nasalization text-gray-900 dark:text-gray-100 border-b-2 border-blue-600 dark:border-blue-400 pb-2 inline-block">
              Resources
            </h4>
            <nav>
              <ul className="space-y-3">
                <li><FooterLink href="/shop">Team Shop</FooterLink></li>
                <li><FooterLink href="/schedule/practice">Practice Schedule</FooterLink></li>
                <li><FooterLink href="/teams/coaches">Coaching Staff</FooterLink></li>
                <li><FooterLink href="/sponsors">Our Sponsors</FooterLink></li>
                <li><FooterLink href="/alumni">Alumni Network</FooterLink></li>
                <li><FooterLink href="/media">Media Gallery</FooterLink></li>
              </ul>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-nasalization text-gray-900 dark:text-gray-100 border-b-2 border-blue-600 dark:border-blue-400 pb-2 inline-block">
              Connect With Us
            </h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-100">
                Follow us on social media for the latest updates, match highlights, and community events.
              </p>
              <div className="flex space-x-4">
                <SocialLink 
                  href="https://discord.gg/XPkXVEySsh" 
                  aria-label="Discord"
                  icon={<DiscordIcon />}
                />
                <SocialLink 
                  href="https://www.facebook.com/WashingtonRugbyFootballClub/" 
                  aria-label="Facebook"
                  icon={<FacebookIcon />}
                />
                <SocialLink 
                  href="https://x.com/WRFC_DC" 
                  aria-label="X (Twitter)"
                  icon={<TwitterIcon />}
                />
                <SocialLink 
                  href="https://www.instagram.com/wrfc1963/" 
                  aria-label="Instagram"
                  icon={<InstagramIcon />}
                />
                <SocialLink 
                  href="https://en.wikipedia.org/wiki/Washington_Rugby_Football_Club" 
                  aria-label="Wikipedia"
                  icon={<WikipediaIcon />}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
            <div className="flex flex-col items-start space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-100 font-jetbrains">
                © {new Date().getFullYear()} Washington DC Rugby Foundation. All rights reserved.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-jetbrains">
                This website is powered by <a href="https://nodetus.com" target="_blank" rel="noopener noreferrer" className="text-wrfc-red hover:text-wrfc-red/80">Nodetus</a>, your friendly AI Integrators
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-100">
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-jetbrains text-sm transition-colors flex items-center group"
    >
      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">
        {children}
      </span>
    </Link>
  )
}

function SocialLink({ href, icon, ...props }: { 
  href: string; 
  icon: React.ReactNode;
  'aria-label': string;
}) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
      {...props}
    >
      {icon}
    </a>
  )
}

// Social Icons Components
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const WikipediaIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .084-.103.135-.2.157-.74.108-.835.361-.492 1.005.646 1.212 3.636 7.254 4.172 8.286.296-.584 1.637-3.23 1.637-3.23l-.314-.584c-.841-1.552-.816-1.644-1.751-1.759-.138-.023-.264-.084-.264-.167v-.434l.052-.045h4.136l.051.045v.434c0 .084-.026.135-.182.157-.824.064-.697.233-.492.74.27.64.65 1.38 1.056 2.145.79-1.541 1.419-2.788 1.67-3.277.169-.33.183-.538.173-.815-.009-.194-.301-.552-.591-.591-.591-.591-.111-.019-.213-.043-.213-.126v-.434l.052-.045h3.803l.051.045v.434c0 .084-.129.135-.249.157-.802.157-.891.376-1.262 1.107-.219.431-2.009 3.91-2.009 3.91l.187.358c.892 1.69 1.982 3.708 2.722 5.024.716-1.427 2.187-4.437 3.039-6.211.359-.79.426-1.104-.054-1.211-.231-.051-.334-.112-.334-.195v-.434l.051-.045h3.475l.051.045v.434c0 .084-.03.135-.181.157-.623.123-.621.309-1.315 1.541-.47.837-4.434 9.104-4.434 9.104-.264.521-.534.457-.848-.017-.815-1.247-2.738-4.524-3.765-6.101l-.407.79c-.373.771-3.528 7.154-3.528 7.154-.296.554-.566.553-.868.018-.753-1.342-2.775-5.29-3.749-7.254l-.359.72z"/>
  </svg>
)

const DiscordIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .031-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
) 