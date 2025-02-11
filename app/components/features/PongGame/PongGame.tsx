'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Global CSS for theater mode and other styling.
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  @keyframes glow {
    0% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff, 0 0 25px #0ff; }
    50% { text-shadow: 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff, 0 0 25px #0ff, 0 0 30px #0ff; }
    100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff, 0 0 25px #0ff; }
  }
  @keyframes breathe {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .game-container {
    position: relative;
    width: 800px;
    height: 600px;
    margin: 0 auto;
    transition: transform 0.3s ease;
  }
  
  .game-canvas {
    display: block;
    background: black;
    transition: all 0.3s ease;
  }
  
  /* Theater Mode Overlay */
  .theater-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    padding: 2rem;
    transition: all 0.3s ease;
  }
  
  /* Theater canvas styling */
  .theater-canvas {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    transform: scale(1.1);
  }
  
  /* Navigation buttons styling */
  .nav-button {
    position: fixed;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
    font-family: 'Press Start 2P', cursive;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 51;
  }

  .nav-button:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .nav-button:active {
    transform: translateY(0);
  }

  .back-button {
    top: 2rem;
    left: 2rem;
    font-size: 0.8rem;
  }
  
  .exit-button {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 2rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 51;
  }

  .exit-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  /* Icon animations */
  .icon-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

export default function PongGame() {
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

  // Remove the unused state and just use a constant since it's always true
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

  // Keep game objects in a ref so the game loop isn't recreated on state updates.
  const gameRef = useRef({
    canvasWidth: 800,
    canvasHeight: 600,
    player: { x: 50, y: 600 / 2 - 45, width: 15, height: 90 },
    opponent: { x: 800 - 50 - 15, y: 600 / 2 - 45, width: 15, height: 90 },
    ball: { 
      x: 800 / 2 - 7.5, 
      y: 600 / 2 - 7.5, 
      width: 15, 
      height: 15, 
      dx: 3 * (Math.random() > 0.5 ? 1 : -1),
      dy: 3 * (Math.random() > 0.5 ? 1 : -1)
    },
    PADDLE_SPEED: 4,
    BALL_SPEED: 3,
  })

  // Refs for key press states.
  const upPressed = useRef(false)
  const downPressed = useRef(false)

  // Combined serve handling logic in a single useCallback
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
  }, []) // No external dependencies needed since we're using refs

  // --- Key Handlers.
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        upPressed.current = true
      } else if (e.key === 'ArrowDown') {
        downPressed.current = true
      } else if (e.code === 'Space') {
        e.preventDefault()
        if (!isGameStartedRef.current) {
          setIsGameStarted(true)
        } else if (isServingRef.current && servingPlayerRef.current === 'player') {
          // Only handle serve for player, not opponent
          setIsServing(false)
        } else if (!isServingRef.current) {
          setIsPaused(prev => !prev)
        }
      }
    }
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        upPressed.current = false
      } else if (e.key === 'ArrowDown') {
        downPressed.current = false
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

    const handleScore = (scorer: 'player' | 'opponent') => {
      if (opponentServeTimerRef.current) clearTimeout(opponentServeTimerRef.current)
      if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current)
      setScores(prev => ({ ...prev, [scorer]: prev[scorer] + 1 }))
      setIsServing(true)
      setServingPlayer(scorer)
      setIsWaitingForOpponentServe(false)
      resetBall()
    }

    const resetBall = () => {
      ball.x = canvasWidth / 2 - ball.width / 2
      ball.y = canvasHeight / 2 - ball.height / 2
      ball.dx = gameRef.current.BALL_SPEED * (servingPlayerRef.current === 'player' ? 1 : -1)
      ball.dy = gameRef.current.BALL_SPEED * (Math.random() > 0.5 ? 1 : -1)
    }

    // Updated AI Logic for a slightly weaker opponent.
    function updateAI() {
      let targetY: number
      if (ball.dx > 0) {
        targetY = ball.y + (Math.random() - 0.5) * 40
      } else {
        targetY = canvasHeight / 2 - opponent.height / 2
      }
      const aiSpeed = 1.5
      if (opponent.y + opponent.height / 2 < targetY) {
        opponent.y += aiSpeed
      } else if (opponent.y + opponent.height / 2 > targetY) {
        opponent.y -= aiSpeed
      }
      opponent.y = Math.max(0, Math.min(canvasHeight - opponent.height, opponent.y))
    }

    const update = () => {
      if (isPausedRef.current) return

      if (upPressed.current && player.y > 0) player.y -= PADDLE_SPEED
      if (downPressed.current && player.y + player.height < canvasHeight) player.y += PADDLE_SPEED

      updateAI()

      if (isServingRef.current) {
        if (servingPlayerRef.current === 'player') {
          ball.x = player.x + player.width + 5
          ball.y = player.y + player.height / 2 - ball.height / 2
        } else {
          ball.x = opponent.x - ball.width - 5
          ball.y = opponent.y + opponent.height / 2 - ball.height / 2
        }
        return
      }

      // Update ball position
      ball.x += ball.dx
      ball.y += ball.dy

      // Wall collision (top and bottom)
      if (ball.y <= 0) {
        ball.y = 0
        ball.dy = Math.abs(ball.dy) // Force downward
        ball.dy *= 1.1 // Add some randomness to prevent loops
        if (Math.abs(ball.dy) > gameRef.current.BALL_SPEED * 2) {
          ball.dy = gameRef.current.BALL_SPEED * (ball.dy > 0 ? 1 : -1)
        }
      }
      if (ball.y + ball.height >= canvasHeight) {
        ball.y = canvasHeight - ball.height
        ball.dy = -Math.abs(ball.dy) // Force upward
        ball.dy *= 1.1 // Add some randomness to prevent loops
        if (Math.abs(ball.dy) > gameRef.current.BALL_SPEED * 2) {
          ball.dy = gameRef.current.BALL_SPEED * (ball.dy > 0 ? 1 : -1)
        }
      }

      // Paddle collisions with improved angle calculation
      if (checkCollision(ball, player)) {
        ball.x = player.x + player.width // Prevent sticking
        let collidePoint = (ball.y + ball.height / 2) - (player.y + player.height / 2)
        collidePoint = collidePoint / (player.height / 2)
        const angleRad = (Math.PI / 4) * collidePoint
        const direction = Math.abs(ball.dx)
        ball.dx = direction * Math.cos(angleRad)
        ball.dy = direction * Math.sin(angleRad)
        // Ensure minimum horizontal velocity
        if (Math.abs(ball.dx) < gameRef.current.BALL_SPEED / 2) {
          ball.dx = gameRef.current.BALL_SPEED * (ball.dx > 0 ? 1 : -1)
        }
      } else if (checkCollision(ball, opponent)) {
        ball.x = opponent.x - ball.width // Prevent sticking
        let collidePoint = (ball.y + ball.height / 2) - (opponent.y + opponent.height / 2)
        collidePoint = collidePoint / (opponent.height / 2)
        const angleRad = (Math.PI / 4) * collidePoint
        const direction = -Math.abs(ball.dx)
        ball.dx = direction * Math.cos(angleRad)
        ball.dy = direction * Math.sin(angleRad)
        // Ensure minimum horizontal velocity
        if (Math.abs(ball.dx) < gameRef.current.BALL_SPEED / 2) {
          ball.dx = gameRef.current.BALL_SPEED * (ball.dx > 0 ? 1 : -1)
        }
      }

      // Score points
      if (ball.x <= 0) {
        handleScore('opponent')
      } else if (ball.x + ball.width >= canvasWidth) {
        handleScore('player')
      }
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
      ctx.fillText('SPACE TO PAUSE', centerX, centerY + 100)
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
      ctx.fillText('PRESS SPACE TO RESUME', centerX, centerY + 60)
      ctx.restore()
    }

    const drawGame = () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
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
      ctx.fillStyle = 'white'
      ctx.fillRect(player.x, player.y, player.width, player.height)
      ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height)
      ctx.fillRect(ball.x, ball.y, ball.width, ball.height)
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
  }, []) // Run only once on mount

  // Manage body class.
  useEffect(() => {
    if (isGameStarted) {
      document.body.classList.add('game-active')
    }
    return () => {
      document.body.classList.remove('game-active')
    }
  }, [isGameStarted])

  // Prevent default scrolling for arrow keys.
  useEffect(() => {
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', preventArrowScroll)
    return () => window.removeEventListener('keydown', preventArrowScroll)
  }, [])

  // Handle navigation back to menu
  const handleNavigateToMenu = () => {
    if (window.confirm('Are you sure you want to exit the game? Your progress will be lost.')) {
      window.location.href = '/playground'
    }
  }

  // Handle exit: clicking "X" will return to playground
  const handleExit = () => {
    handleNavigateToMenu()
  }

  return (
    <div>
      <style>{globalStyles}</style>
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
