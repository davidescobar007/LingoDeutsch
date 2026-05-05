'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Headphones, Loader2, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import WaveSurfer from 'wavesurfer.js'

import { AtomButton, AtomText } from '@/components/atoms'
import useScreenSize from '@/hooks/useScreenSize'
import { useAuthState } from '@/providers/AuthProvider'

type PodcastPlayerState = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

type MoleculePodcastPlayerProps = {
   grammarId?: string
   handleGeneratePodcast?: (_args: { text: string }) => Promise<{ audioUrl: string }>
   isGenerating?: boolean
   podcastAudio?: string
   podcastContent?: string
}

export const MoleculePodcastPlayer = ({
   grammarId,
   handleGeneratePodcast,
   isGenerating = false,
   podcastAudio,
   podcastContent
}: MoleculePodcastPlayerProps) => {
   const t = useTranslations('grammar')
   const { isAuthenticated } = useAuthState()
   const { isMobile, isTablet } = useScreenSize()
   const [showAuthOverlay, setShowAuthOverlay] = useState(false)
   const [state, setState] = useState<PodcastPlayerState>('idle')
   const [currentTime, setCurrentTime] = useState('0:00')
   const [duration, setDuration] = useState('0:00')
   const [isMuted, setIsMuted] = useState(false)
   const [playbackRate, setPlaybackRate] = useState<0.75 | 1 | 1.25 | 1.5 | 2>(1)
   const waveformRef = useRef<HTMLDivElement>(null)
   const wavesurferRef = useRef<WaveSurfer | null>(null)

   // Auto-dismiss auth overlay when user authenticates
   useEffect(() => {
      if (isAuthenticated) {
         setShowAuthOverlay(false)
      }
   }, [isAuthenticated])

   const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60)
      const s = Math.floor(seconds % 60)
      return `${m}:${s.toString().padStart(2, '0')}`
   }

   const cleanup = useCallback(() => {
      if (wavesurferRef.current) {
         wavesurferRef.current.destroy()
         wavesurferRef.current = null
      }
   }, [])

   useEffect(() => {
      return () => cleanup()
   }, [cleanup])

   useEffect(() => {
      const ws = wavesurferRef.current
      if (ws) {
         const media = ws.getMediaElement?.() as HTMLMediaElement | undefined
         if (media) media.playbackRate = playbackRate
      }
   }, [playbackRate])

   const createWaveSurfer = useCallback(
      (audioSource: string) => {
         if (!waveformRef.current) {
            setState('error')
            return
         }

         cleanup()

         const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'hsl(var(--p) / 0.3)',
            progressColor: 'hsl(var(--p))',
            cursorColor: 'hsl(var(--p) / 0.6)',
            cursorWidth: 2,
            barWidth: 3,
            barGap: 2,
            barRadius: 3,
            height: 56,
            normalize: true,
            barAlign: 'bottom'
         })

         ws.on('ready', () => {
            setDuration(formatTime(ws.getDuration()))
            setCurrentTime('0:00')
         })
         ws.on('timeupdate', (time: number) => setCurrentTime(formatTime(time)))
         ws.on('play', () => setState('playing'))
         ws.on('pause', () => setState('paused'))
         ws.on('finish', () => {
            setState('idle')
            setCurrentTime('0:00')
         })
         ws.on('error', () => setState('error'))

         wavesurferRef.current = ws
         ws.load(audioSource)

         const media = ws.getMediaElement?.() as HTMLMediaElement | undefined
         if (media) media.playbackRate = playbackRate

         ws.play()
      },
      [cleanup, playbackRate]
   )

   const handleToggle = async () => {
      const ws = wavesurferRef.current

      if (!podcastContent || !grammarId || !handleGeneratePodcast) return

      if (state === 'playing' && ws) {
         ws.pause()
         return
      }
      if (state === 'paused' && ws) {
         ws.play()
         return
      }
      if (isGenerating) return

      // Check authentication before generating podcast
      if (!isAuthenticated) {
         setShowAuthOverlay(true)
         return
      }

      setState('loading')
      try {
         const result = await handleGeneratePodcast({ text: podcastContent })
         createWaveSurfer(result.audioUrl)
      } catch {
         setState('error')
      }
   }

   const handleRestart = () => {
      const ws = wavesurferRef.current
      if (ws) {
         ws.setTime(0)
         ws.play()
      }
   }

   const toggleMute = () => {
      const ws = wavesurferRef.current
      if (!ws) return
      const media = ws.getMediaElement?.() as HTMLMediaElement | undefined
      if (media) {
         media.muted = !media.muted
         setIsMuted(media.muted)
      }
   }

   const cyclePlaybackRate = () => {
      const rates: Array<0.75 | 1 | 1.25 | 1.5 | 2> = [0.75, 1, 1.25, 1.5, 2]
      const currentIndex = rates.indexOf(playbackRate)
      const nextIndex = (currentIndex + 1) % rates.length
      setPlaybackRate(rates[nextIndex])
   }

   const getButtonIcon = () => {
      if (state === 'loading' || isGenerating) return <Loader2 className="animate-spin" size={18} />
      if (state === 'playing') return <Pause size={18} />
      if (state === 'error') return <RotateCcw size={18} />
      return <Play size={18} />
   }

   const getLabel = () => {
      if (state === 'loading' || isGenerating) return t('podcastLoading')
      if (state === 'error') return t('podcastError')
      if (state === 'idle') return t('listenPodcast')
      return null
   }

   const getWaveformSkeleton = () => {
      const allHeights = [
         20, 35, 50, 65, 40, 80, 55, 30, 70, 45, 90, 60, 25, 75, 50, 85, 35, 65, 40, 95, 55, 30, 70, 45, 80, 60,
         20, 50, 75, 40, 65, 35, 85, 55, 30, 70, 45, 90, 60, 25, 75, 50, 85, 35, 65, 40, 95, 55, 30, 70, 45, 80,
         60, 20, 50, 75, 40, 65, 35, 85, 55, 30, 70, 45, 90, 60, 25, 75, 50, 85, 35, 65, 40, 95, 55, 30, 70, 45,
         80, 60, 20, 50, 75, 40, 65, 35, 85, 55, 30, 70, 45, 90, 60, 25, 75, 50, 85, 35, 65, 40, 95, 55, 30, 70,
         45, 80, 60, 20, 50, 75, 40, 65, 35, 85, 55, 30, 70, 45, 90, 60, 25, 75, 50, 85
      ]
      const barCount = isMobile ? 40 : isTablet ? 55 : 115
      const heights = allHeights.slice(0, barCount)

      return (
         <div className="flex h-14 items-end justify-between">
            {heights.map((height, i) => (
               <div
                  className="bg-primary/50 w-[2px] animate-pulse !rounded-lg"
                  key={i}
                  style={{ height: `${height}%` }}
               />
            ))}
         </div>
      )
   }

   const showTime = state === 'playing' || state === 'paused'
   const label = getLabel()

   if (!podcastContent) return null

   return (
      <div className="from-primary/5 via-primary/10 to-primary/5 border-primary/20 relative mb-6 overflow-hidden rounded-2xl border bg-gradient-to-r">
         {/* Player content - with blur when auth overlay is shown */}
         <div className={showAuthOverlay ? 'pointer-events-none select-none blur-[4px]' : ''}>
            <div className="flex items-center gap-3 px-4 pb-2 pt-4">
               <button
                  className="bg-primary hover:bg-primary-focus flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
                  onClick={handleToggle}
                  type="button"
               >
                  {getButtonIcon()}
               </button>

               <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                     <Headphones className="text-primary flex-shrink-0" size={14} />
                     <span className="text-base-content/70 truncate text-sm font-medium">
                        {label || `${currentTime} / ${duration}`}
                     </span>
                  </div>
               </div>

               <div className="flex items-center gap-1">
                  <button
                     className="text-base-content/40 hover:text-base-content/70 rounded-md px-1.5 py-1 text-xs font-semibold transition-colors"
                     onClick={cyclePlaybackRate}
                     type="button"
                  >
                     {playbackRate}x
                  </button>
                  {showTime && (
                     <>
                        <button
                           className="text-base-content/40 hover:text-base-content/70 rounded-md p-1 transition-colors"
                           onClick={toggleMute}
                           type="button"
                        >
                           {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <button
                           className="text-base-content/40 hover:text-base-content/70 rounded-md p-1 transition-colors"
                           onClick={handleRestart}
                           type="button"
                        >
                           <RotateCcw size={14} />
                        </button>
                     </>
                  )}
               </div>
            </div>

            <div className="px-4 pb-3 pt-1">
               <div className="podcast-waveform" ref={waveformRef} />
               {(state === 'loading' || isGenerating) && getWaveformSkeleton()}
            </div>
         </div>

         {/* Auth overlay */}
         {showAuthOverlay && (
            <div className="bg-base-100/80 absolute inset-0 flex items-center justify-center rounded-2xl p-3 backdrop-blur-sm">
               <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex items-center gap-2">
                     <span className="text-base">🔒</span>
                     <AtomText fontSize="small" isBold>
                        {t('podcastLockedTitle')}
                     </AtomText>
                  </div>
                  <AtomButton href="/login" size="xs" type="link" variant="PRIMARY">
                     {t('podcastLockedCTA')}
                  </AtomButton>
               </div>
            </div>
         )}
      </div>
   )
}
