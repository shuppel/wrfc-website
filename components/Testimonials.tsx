import { motion } from 'framer-motion'

const testimonials = [
  {
    content: "Nodetus transformed our IT infrastructure, significantly improving our efficiency and security.",
    author: "Jane Doe",
    role: "CTO, Tech Innovators Inc."
  },
  {
    content: "The custom software solution provided by Nodetus has been a game-changer for our business operations.",
    author: "John Smith",
    role: "CEO, Global Solutions Ltd."
  },
  {
    content: "Nodetus's cloud services have given us the scalability and flexibility we needed to grow our startup.",
    author: "Emily Brown",
    role: "Founder, NextGen Startups"
  }
]

export default function Testimonials() {
  return (
    <section className="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-8"
            src="/nodetus-logo.png"
            alt="Nodetus"
          />
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
              <p>
                &ldquo;Nodetus has been instrumental in our digital transformation journey. Their expertise and dedication have helped us achieve our technology goals.&rdquo;
              </p>
            </div>
            <footer className="mt-8">
              <div className="md:flex md:items-center md:justify-center">
                <div className="md:flex-shrink-0">
                  <img
                    className="mx-auto h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                  <div className="text-base font-medium text-gray-900">Sarah Johnson</div>
                  <svg className="hidden md:block mx-1 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 0h3L9 20H6l5-20z" />
                  </svg>
                  <div className="text-base font-medium text-gray-500">CEO, TechForward Solutions</div>
                </div>
              </div>
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}

