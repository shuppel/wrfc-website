import { motion } from 'framer-motion'

export default function MissionStatement() {
  return (
    <section className="py-16 bg-[#FFF5E6] bg-paper">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-nasalization text-[#FFB800] text-center mb-8"
        >
          Mission Statement<sup className="text-[0.6em] font-mono">our purpose</sup>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-900 font-mono space-y-4"
        >
          <p>
            At Nodetus, we do not pretend or pontificate;
            we are authentic and active listeners.
          </p>
          <p>
            Our mission is to engage our Federal clients
            with deep commitments for: clarity, efficacy and ingenuity.
          </p>
          <p>
            We are urgent with our client's causes,
            internalize their mission need
            and, strategically address difficult & complex issues,
            atom by atom, until it is resolved.
          </p>
          <p>
            We turn challenges into achievements—
            we build our successes on our people's successes,
            and salute ideation, grit and passion within our workplace.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

