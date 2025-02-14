'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import './PongGame.css'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

// Move the initial game state to a constant
const INITIAL_GAME_STATE = {
  player: {
    x: 50,
    y: 600 / 2 - 45,
    width: 15,
    height: 90,
    angle: 0
  },
  opponent: {
    x: 800 - 50 - 15,
    y: 600 / 2 - 45,
    width: 15,
    height: 90,
    angle: 0
  },
  ball: { 
    x: 800 / 2 - 7.5, 
    y: 600 / 2 - 7.5, 
    width: 15, 
    height: 15, 
    dx: 2,
    dy: 0,
    spin: 0
  },
  PADDLE_SPEED: 4,
  BALL_SPEED: 3,
  canvasWidth: 800,
  canvasHeight: 600
}

export default function PongGame() {
  // Initialize gameRef with the initial state
  const gameRef = useRef(INITIAL_GAME_STATE)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const opponentServeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const failsafeTimerRef = useRef<NodeJS.Timeout | null>(null)

  // React state for overlays, score, and serve.
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [scores, setScores] = useState({ player: 0, opponent: 0 })
  const [isServing, setIsServing] = useState(true)
  const [servingPlayer, setServingPlayer] = useState<'player' | 'opponent'>('player')
  const [isWaitingForOpponentServe, setIsWaitingForOpponentServe] = useState(false)

  // Constant value for theater mode.
  const isTheaterMode = true

  // Mirror state into refs for use in our continuous game loop.
  const isGameStartedRef = useRef(isGameStarted)
  const isPausedRef = useRef(isPaused)
  const isServingRef = useRef(isServing)
  const servingPlayerRef = useRef(servingPlayer)
  const isWaitingForOpponentServeRef = useRef(isWaitingForOpponentServe)
  const scoresRef = useRef(scores)

  useEffect(() => { isGameStartedRef.current = isGameStarted }, [isGameStarted])
  useEffect(() => { isPausedRef.current = isPaused }, [isPaused])
  useEffect(() => { isServingRef.current = isServing }, [isServing])
  useEffect(() => { servingPlayerRef.current = servingPlayer }, [servingPlayer])
  useEffect(() => { isWaitingForOpponentServeRef.current = isWaitingForOpponentServe }, [isWaitingForOpponentServe])
  useEffect(() => { scoresRef.current = scores }, [scores])

  // Refs for key press states.
  const upPressed = useRef(false)
  const downPressed = useRef(false)
  const leftPressed = useRef(false)
  const rightPressed = useRef(false)
  const horizLeftPressed = useRef(false)
  const horizRightPressed = useRef(false)

  // Particle system for sparks and dust.
  const particlesRef = useRef<{
    sparks: Particle[]
    dust: Particle[]
  }>({ sparks: [], dust: [] })

  // --- Particle System Functions

  // Update each particle's position and decrease its life.
  const updateParticles = () => {
    // Update spark particles.
    for (let i = particlesRef.current.sparks.length - 1; i >= 0; i--) {
      const p = particlesRef.current.sparks[i]
      p.x += p.vx
      p.y += p.vy
      p.life -= 1
      if (p.life <= 0) {
        particlesRef.current.sparks.splice(i, 1)
      }
    }
    // Update dust particles.
    for (let i = particlesRef.current.dust.length - 1; i >= 0; i--) {
      const p = particlesRef.current.dust[i]
      p.x += p.vx
      p.y += p.vy
      p.life -= 1
      if (p.life <= 0) {
        particlesRef.current.dust.splice(i, 1)
      }
    }
  }

  // Spawn several spark particles at the given position.
  const spawnSpark = (x: number, y: number) => {
    const numSparks = 5
    for (let i = 0; i < numSparks; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 2 + 1
      particlesRef.current.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 20,
        maxLife: 20,
        color: 'rgba(255,215,0,1)' // golden spark
      })
    }
  }

  // --- Serve Handling.
  const handleOpponentServe = useCallback(() => {
    const executeServe = () => {
      if (isServingRef.current && !isPausedRef.current && servingPlayerRef.current === 'opponent') {
        setIsServing(false)
        setIsWaitingForOpponentServe(false)
        if (opponentServeTimerRef.current) clearTimeout(opponentServeTimerRef.current)
        if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current)
      }
    }

    if (opponentServeTimerRef.current) clearTimeout(opponentServeTimerRef.current)
    if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current)
    setIsWaitingForOpponentServe(true)
    const randomDelay = Math.random() * 1800 + 200
    opponentServeTimerRef.current = setTimeout(executeServe, randomDelay)
    failsafeTimerRef.current = setTimeout(executeServe, 2000)
  }, [])

  // --- Key Handlers.
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        upPressed.current = true
      } else if (e.key === 'ArrowDown') {
        downPressed.current = true
      } else if (e.key === 'ArrowLeft') {
        horizLeftPressed.current = true  // Horizontal move left
      } else if (e.key === 'ArrowRight') {
        horizRightPressed.current = true // Horizontal move right
      } else if (e.key.toLowerCase() === 'a') {
        leftPressed.current = true  // Tilt left
      } else if (e.key.toLowerCase() === 'd') {
        rightPressed.current = true // Tilt right
      } else if (e.code === 'Enter') {
        if (!isServingRef.current) {
          setIsPaused(prev => !prev)
        }
      } else if (e.code === 'Space') {
        e.preventDefault()
        if (!isGameStartedRef.current) {
          setIsGameStarted(true)
        } else if (isServingRef.current && servingPlayerRef.current === 'player') {
          const angle = gameRef.current.player.angle
          const speed = gameRef.current.BALL_SPEED
          gameRef.current.ball.dx = speed * Math.cos(angle)
          gameRef.current.ball.dy = speed * Math.sin(angle)
          setIsServing(false)
        }
      }
    }

    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        upPressed.current = false
      } else if (e.key === 'ArrowDown') {
        downPressed.current = false
      } else if (e.key === 'ArrowLeft') {
        horizLeftPressed.current = false
      } else if (e.key === 'ArrowRight') {
        horizRightPressed.current = false
      } else if (e.key.toLowerCase() === 'a') {
        leftPressed.current = false
      } else if (e.key.toLowerCase() === 'd') {
        rightPressed.current = false
      }
    }

    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  // Auto-trigger opponent serve if needed.
  useEffect(() => {
    if (servingPlayer === 'opponent' && isServing && !isPaused && !isWaitingForOpponentServe) {
      handleOpponentServe()
    }
  }, [servingPlayer, isServing, isPaused, isWaitingForOpponentServe, handleOpponentServe])

  // --- Main Game Loop.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { player, opponent, ball, PADDLE_SPEED, canvasWidth, canvasHeight } = gameRef.current

    const checkCollision = (
      ballObj: typeof gameRef.current.ball,
      paddle: typeof gameRef.current.player
    ) => {
      return (
        ballObj.x < paddle.x + paddle.width &&
        ballObj.x + ballObj.width > paddle.x &&
        ballObj.y < paddle.y + paddle.height &&
        ballObj.y + ballObj.height > paddle.y
      )
    }

    // When a point is scored, reset the ball.
    const resetBall = () => {
      ball.x = canvasWidth / 2 - ball.width / 2
      ball.y = canvasHeight / 2 - ball.height / 2
      ball.dx = gameRef.current.BALL_SPEED * (servingPlayerRef.current === 'player' ? 1 : -1)
      ball.dy = servingPlayerRef.current === 'player' ? 0 : gameRef.current.BALL_SPEED * (Math.random() > 0.5 ? 1 : -1)
    }

    const handleScore = (scorer: 'player' | 'opponent') => {
      if (opponentServeTimerRef.current) clearTimeout(opponentServeTimerRef.current)
      if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current)
      setScores(prev => ({ ...prev, [scorer]: prev[scorer] + 1 }))
      setIsServing(true)
      setServingPlayer(scorer)
      setIsWaitingForOpponentServe(false)
      resetBall()
    }

    // Updated AI for the opponent.
    function updateAI() {
      // --- Vertical Movement: Track ball's Y position with some noise
      let targetY: number
      if (ball.dx > 0) { 
        // When ball is coming toward opponent, follow its vertical position
        targetY = ball.y + (Math.random() - 0.5) * 20
      } else {
        // Otherwise, aim for vertical center
        targetY = canvasHeight / 2 - opponent.height / 2
      }
      const aiVerticalSpeed = 1.5
      if (opponent.y + opponent.height / 2 < targetY) {
        opponent.y += aiVerticalSpeed
      } else if (opponent.y + opponent.height / 2 > targetY) {
        opponent.y -= aiVerticalSpeed
      }
      opponent.y = Math.max(0, Math.min(canvasHeight - opponent.height, opponent.y))

      // --- Horizontal Movement: Move within allowed range on opponent's side
      const minOpponentX = canvasWidth / 2 + 10
      const maxOpponentX = canvasWidth - opponent.width - 10
      let targetX: number
      if (ball.dx > 0) {
        // When ball is approaching, get as close to the net as possible
        targetX = minOpponentX
      } else {
        // Otherwise, stay in the middle of the allowed range
        targetX = (minOpponentX + maxOpponentX) / 2
      }
      const aiHorizontalSpeed = 1.5
      if (opponent.x < targetX) {
        opponent.x += aiHorizontalSpeed
      } else if (opponent.x > targetX) {
        opponent.x -= aiHorizontalSpeed
      }
      opponent.x = Math.max(minOpponentX, Math.min(maxOpponentX, opponent.x))

      // --- Paddle Tilt: Use tilt to intercept and even simulate a fulcrum hit
      // Compute the basic desired angle based on vertical offset
      let desiredAngle = ((ball.y + ball.height/2) - (opponent.y + opponent.height/2)) / (opponent.height/2) * (Math.PI / 8)
      
      // If the ball is nearly centered on the paddle and is approaching, sometimes add extra tilt
      if (Math.abs((ball.y + ball.height/2) - (opponent.y + opponent.height/2)) < opponent.height * 0.1 && ball.dx > 0) {
        if (Math.random() < 0.5) { // 50% chance to "commit" to a fulcrum tilt
          desiredAngle += (Math.random() - 0.5) * 0.2 // Add a random tilt offset between -0.1 and 0.1 radians
        }
      }
      
      // Smoothly adjust the AI paddle's angle toward desiredAngle
      const tiltSpeed = 0.05
      if (opponent.angle < desiredAngle) {
        opponent.angle = Math.min(desiredAngle, opponent.angle + tiltSpeed)
      } else if (opponent.angle > desiredAngle) {
        opponent.angle = Math.max(desiredAngle, opponent.angle - tiltSpeed)
      }
    }

    const update = () => {
      if (isPausedRef.current) return

      // Add horizontal movement constraints and handling
      const PLAYER_HORIZONTAL_SPEED = 2
      const minPlayerX = 10
      const maxPlayerX = canvasWidth / 2 - player.width - 10
      if (horizLeftPressed.current && player.x > minPlayerX) {
        player.x -= PLAYER_HORIZONTAL_SPEED
      }
      if (horizRightPressed.current && player.x < maxPlayerX) {
        player.x += PLAYER_HORIZONTAL_SPEED
      }

      // Update vertical movement.
      if (upPressed.current && player.y > 0) player.y -= PADDLE_SPEED
      if (downPressed.current && player.y + player.height < canvasHeight) player.y += PADDLE_SPEED

      // --- Update paddle rotation (tilt) based on left/right input.
      const MAX_PADDLE_ANGLE = 0.2618  // ~15° in radians.
      const PADDLE_TURN_SPEED = 0.05   // Radians per frame.
      if (leftPressed.current) {
        gameRef.current.player.angle = Math.max(gameRef.current.player.angle - PADDLE_TURN_SPEED, -MAX_PADDLE_ANGLE)
      } else if (rightPressed.current) {
        gameRef.current.player.angle = Math.min(gameRef.current.player.angle + PADDLE_TURN_SPEED, MAX_PADDLE_ANGLE)
      } else {
        // Gradually return to neutral.
        if (gameRef.current.player.angle > 0) {
          gameRef.current.player.angle = Math.max(gameRef.current.player.angle - PADDLE_TURN_SPEED, 0)
        } else if (gameRef.current.player.angle < 0) {
          gameRef.current.player.angle = Math.min(gameRef.current.player.angle + PADDLE_TURN_SPEED, 0)
        }
      }

      updateAI()

      // --- Serve Mode: position the ball at the serving paddle.
      if (isServingRef.current) {
        if (servingPlayerRef.current === 'player') {
          ball.x = player.x + player.width + 5
          ball.y = player.y + player.height / 2 - ball.height / 2
        } else {
          ball.x = opponent.x - ball.width - 5
          ball.y = opponent.y + opponent.height / 2 - ball.height / 2
        }
        // Even in serve mode, update particles.
        updateParticles()
        return
      }

      // Update ball position
      ball.x += ball.dx
      ball.y += ball.dy

      // --- Apply Magnus Effect based on ball.spin ---
      const magnusCoefficient = 0.01  // Adjust to taste for "curve" effect
      const speed = Math.hypot(ball.dx, ball.dy)
      if (speed > 0) {
        // Compute the unit vector perpendicular to the ball's velocity.
        const perpX = -ball.dy / speed
        const perpY = ball.dx / speed
        ball.dx += perpX * ball.spin * magnusCoefficient
        ball.dy += perpY * ball.spin * magnusCoefficient
      }
      // Decay spin over time so it doesn't accumulate forever.
      ball.spin *= 0.99

      // Add dust particles based on ball speed
      const DUST_SPEED_THRESHOLD = 3
      if (speed > DUST_SPEED_THRESHOLD) {
        particlesRef.current.dust.push({
          x: ball.x + ball.width / 2,
          y: ball.y + ball.height / 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 30,
          maxLife: 30,
          color: 'rgba(255,255,255,0.5)'
        })
        if (particlesRef.current.dust.length > 50) {
          particlesRef.current.dust.splice(0, 1)
        }
      }

      // Wall collision (top and bottom).
      if (ball.y <= 0) {
        ball.y = 0
        ball.dy = Math.abs(ball.dy)
      }
      if (ball.y + ball.height >= canvasHeight) {
        ball.y = canvasHeight - ball.height
        ball.dy = -Math.abs(ball.dy)
      }

      // --- Player Paddle Collision with refined physics
      if (checkCollision(ball, player)) {
        // Prevent sticking
        ball.x = player.x + player.width
        
        // Calculate the collision point
        const collidePoint = (ball.y + ball.height / 2) - (player.y + player.height / 2)
        const normalizedCollide = collidePoint / (player.height / 2)
        const bounceAngle = normalizedCollide * (Math.PI / 4) + player.angle
        
        // Fulcrum effect: if paddle is turning and hit is near the center
        let multiplier = 1
        const fulcrumThreshold = 0.2
        if ((leftPressed.current || rightPressed.current) && Math.abs(normalizedCollide) < fulcrumThreshold) {
          multiplier = 1.3
          spawnSpark(ball.x + ball.width / 2, ball.y + ball.height / 2)
        }
        
        // Horizontal boost based on paddle proximity to the net
        const boostFactor = 1 + (player.x / maxPlayerX) * 0.05
        
        // Impart spin based on tilt keys
        if (leftPressed.current) {
          ball.spin += 0.5
        } else if (rightPressed.current) {
          ball.spin -= 0.5
        }
        
        const currentSpeed = Math.hypot(ball.dx, ball.dy) || gameRef.current.BALL_SPEED
        let newDx = multiplier * currentSpeed * Math.cos(bounceAngle) * boostFactor
        if (newDx < 0) newDx = -newDx
        ball.dx = newDx
        ball.dy = multiplier * currentSpeed * Math.sin(bounceAngle) * boostFactor
      } 
      // --- Opponent Paddle Collision
      else if (checkCollision(ball, opponent)) {
        // Prevent ball from sticking
        ball.x = opponent.x - ball.width
        
        // Compute collision point relative to paddle center
        const collidePoint = (ball.y + ball.height / 2) - (opponent.y + opponent.height / 2)
        const normalizedCollide = collidePoint / (opponent.height / 2)
        const bounceAngle = normalizedCollide * (Math.PI / 4) + opponent.angle
        
        // Horizontal boost: The closer the opponent is to the net, the larger the boost
        const minOpponentX = canvasWidth / 2 + 10
        const maxOpponentX = canvasWidth - opponent.width - 10
        const boostFactor = 1 + ((maxOpponentX - opponent.x) / (maxOpponentX - minOpponentX)) * 0.05
        
        const currentSpeed = Math.hypot(ball.dx, ball.dy) || gameRef.current.BALL_SPEED
        ball.dx = -Math.abs(currentSpeed * Math.cos(bounceAngle) * boostFactor)
        ball.dy = currentSpeed * Math.sin(bounceAngle) * boostFactor
      }

      // Score points.
      if (ball.x <= 0) {
        handleScore('opponent')
      } else if (ball.x + ball.width >= canvasWidth) {
        handleScore('player')
      }

      // Update all particles.
      updateParticles()
    }

    const drawStartScreen = () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      ctx.save()
      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2
      const scale = 1 + Math.sin(Date.now() / 500) * 0.1
      ctx.translate(centerX, centerY)
      ctx.scale(scale, scale)
      ctx.translate(-centerX, -centerY)
      ctx.fillStyle = '#fff'
      ctx.font = '24px "Press Start 2P"'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const colors = ['#0ff', '#0ff', '#fff']
      const blurLevels = [20, 10, 0]
      colors.forEach((color, i) => {
        ctx.shadowColor = color
        ctx.shadowBlur = blurLevels[i]
        ctx.fillText('PONG', centerX, centerY - 60)
      })
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.font = '12px "Press Start 2P"'
      ctx.fillText('PRESS SPACE TO START', centerX, centerY + 20)
      ctx.fillText('↑ AND ↓ TO MOVE', centerX, centerY + 60)
      ctx.fillText('PRESS RETURN TO PAUSE', centerX, centerY + 100)
      ctx.restore()
    }

    const drawPauseScreen = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      ctx.save()
      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2
      const scale = 1 + Math.sin(Date.now() / 500) * 0.1
      ctx.translate(centerX, centerY)
      ctx.scale(scale, scale)
      ctx.translate(-centerX, -centerY)
      ctx.fillStyle = '#fff'
      ctx.font = '24px "Press Start 2P"'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const colors = ['#0ff', '#0ff', '#fff']
      const blurLevels = [20, 10, 0]
      colors.forEach((color, i) => {
        ctx.shadowColor = color
        ctx.shadowBlur = blurLevels[i]
        ctx.fillText('PAUSED', centerX, centerY)
      })
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.font = '12px "Press Start 2P"'
      ctx.fillText('PRESS RETURN TO RESUME', centerX, centerY + 60)
      ctx.restore()
    }

    const drawGame = () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // Draw version and controls when game hasn't started
      if (!isGameStartedRef.current) {
        ctx.fillStyle = 'white'
        ctx.font = '24px "Press Start 2P"'
        ctx.textAlign = 'center'
        ctx.fillText('PONG v2.0', canvasWidth / 2, 100)
        
        ctx.font = '16px "Press Start 2P"'
        ctx.fillText('Controls:', canvasWidth / 2, 200)
        ctx.fillText('↑/↓ - Move Up/Down', canvasWidth / 2, 240)
        ctx.fillText('←/→ - Move Left/Right', canvasWidth / 2, 270)
        ctx.fillText('A/D - Tilt Paddle', canvasWidth / 2, 300)
        ctx.fillText('SPACE - Serve Ball', canvasWidth / 2, 330)
        ctx.fillText('ENTER - Pause Game', canvasWidth / 2, 360)
        
        ctx.font = '20px "Press Start 2P"'
        ctx.fillText('Press SPACE to Start', canvasWidth / 2, 450)
        return
      }

      // Draw dust particles first
      particlesRef.current.dust.forEach(p => {
        const alpha = p.life / p.maxLife
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Updated ball color computation with improved interpolation
      const ballSpeed = Math.hypot(ball.dx, ball.dy)
      const maxBallSpeed = 10 // Must match the cap used elsewhere
      const ratio = Math.min(ballSpeed / maxBallSpeed, 1)

      // Define key color stops:
      // 0.0: white, 0.25: yellow, 0.5: orange, 0.75: red, 1.0: violet
      const colorStops = [
        { t: 0.0, color: [255, 255, 255] },    // white at rest
        { t: 0.25, color: [255, 255, 0] },     // yellow
        { t: 0.5, color: [255, 165, 0] },      // orange
        { t: 0.75, color: [255, 0, 0] },       // red
        { t: 1.0, color: [238, 130, 238] }     // violet at max speed
      ]

      // Find the two color stops to interpolate between
      let lowerStop = colorStops[0],
          upperStop = colorStops[colorStops.length - 1]
      for (let i = 0; i < colorStops.length - 1; i++) {
        if (ratio >= colorStops[i].t && ratio <= colorStops[i + 1].t) {
          lowerStop = colorStops[i]
          upperStop = colorStops[i + 1]
          break
        }
      }
      
      // Compute local interpolation factor between the two stops
      const localT = (ratio - lowerStop.t) / (upperStop.t - lowerStop.t)
      
      // Interpolate each RGB channel
      const interpolate = (a: number, b: number, t: number) => Math.round(a + (b - a) * t)
      const r = interpolate(lowerStop.color[0], upperStop.color[0], localT)
      const g = interpolate(lowerStop.color[1], upperStop.color[1], localT)
      const bVal = interpolate(lowerStop.color[2], upperStop.color[2], localT)
      const ballColor = `rgb(${r}, ${g}, ${bVal})`

      ctx.fillStyle = ballColor
      ctx.fillRect(ball.x, ball.y, ball.width, ball.height)

      // Draw score and center line
      ctx.fillStyle = 'white'
      ctx.font = '24px "Press Start 2P"'
      ctx.textAlign = 'center'
      ctx.fillText(`${scoresRef.current.player} - ${scoresRef.current.opponent}`, canvasWidth / 2, 50)
      ctx.beginPath()
      ctx.setLineDash([5, 15])
      ctx.moveTo(canvasWidth / 2, 0)
      ctx.lineTo(canvasWidth / 2, canvasHeight)
      ctx.strokeStyle = 'white'
      ctx.stroke()

      // Draw the player's paddle
      ctx.save()
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2)
      ctx.rotate(player.angle)
      ctx.fillStyle = 'white'
      ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height)
      ctx.restore()

      // Draw the opponent paddle
      ctx.fillStyle = 'white'
      ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height)

      // --- Draw spark particles on top.
      particlesRef.current.sparks.forEach(p => {
        const alpha = p.life / p.maxLife
        ctx.fillStyle = `rgba(255,215,0,${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Display serve instructions.
      if (isServingRef.current && !isPausedRef.current) {
        ctx.font = '12px "Press Start 2P"'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        if (servingPlayerRef.current === 'player') {
          ctx.fillText('PRESS SPACE TO SERVE', canvasWidth / 2, canvasHeight - 50)
        } else if (servingPlayerRef.current === 'opponent') {
          if (!isWaitingForOpponentServeRef.current) {
            ctx.fillText('PRESS SPACE FOR OPPONENT SERVE', canvasWidth / 2, canvasHeight - 50)
          } else {
            ctx.fillText('OPPONENT SERVING...', canvasWidth / 2, canvasHeight - 50)
          }
        }
      }
      if (isPausedRef.current) {
        drawPauseScreen()
      }
    }

    const gameLoop = () => {
      if (!isGameStartedRef.current) {
        drawStartScreen()
      } else {
        update()
        drawGame()
      }
      requestAnimationFrame(gameLoop)
    }
    gameLoop()

    return () => {
      if (opponentServeTimerRef.current) clearTimeout(opponentServeTimerRef.current)
      if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current)
    }
  }, []) // Run once on mount

  // Manage body class.
  useEffect(() => {
    if (isGameStarted) {
      document.body.classList.add('game-active')
    }
    return () => {
      document.body.classList.remove('game-active')
    }
  }, [isGameStarted])

  // Prevent default scrolling for gameplay keys.
  useEffect(() => {
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', preventArrowScroll)
    return () => window.removeEventListener('keydown', preventArrowScroll)
  }, [])

  // Handle navigation back to menu.
  const handleNavigateToMenu = () => {
    if (window.confirm('Are you sure you want to exit the game? Your progress will be lost.')) {
      window.location.href = '/playground'
    }
  }

  // Handle exit.
  const handleExit = () => {
    handleNavigateToMenu()
  }

  return (
    <div>
      <div className={isTheaterMode ? "theater-overlay" : ""}>
        <button 
          className="nav-button back-button" 
          onClick={handleNavigateToMenu}
          aria-label="Back to menu"
        >
          ← Back to Menu
        </button>
        {isTheaterMode && (
          <button 
            className="exit-button" 
            onClick={handleExit}
            aria-label="Exit theater mode"
          >
            ×
          </button>
        )}
        <div className="game-container">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className={`game-canvas ${isTheaterMode ? 'theater-canvas' : ''} border-2 border-gray-300 dark:border-gray-700 rounded-lg`}
          />
        </div>
      </div>
    </div>
  )
}
