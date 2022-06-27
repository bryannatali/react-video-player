import { MouseEventHandler, ChangeEventHandler, useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { FiMaximize, FiMinimize, FiPause, FiPlay, FiSettings, FiVolume2, FiVolumeX } from 'react-icons/fi'

import { secondsToTimeString } from './utils/getVideoTimerString'

import { IconButton } from '../IconButton'
import { InputRange } from '../InputRange'

import './styles.css'
import { VideoBox, VideoControls, VideoControlsBottomBox, VideoPlayerContainer, VideoTimeSliderBox, VideoTimeTooltipContainer } from './styles'

export function VideoPlayer() {
  const [showControls, setShowControls] = useState(false)
  const [showControlsTimeout, setShowControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVideoSeconds, setCurrentVideoSeconds] = useState(0)
  const [videoDurationSeconds, setVideoDurationSeconds] = useState(0)
  const [isFullscreenMode, setIsFullscreenMode] = useState(false)

  const mediaRef = useRef<HTMLVideoElement>(null)
  const timeTooltipRef = useRef<HTMLDivElement>(null)

  const currentVideoTime = useMemo(() => {
    let videoTime = '00:00'

    if (currentVideoSeconds > 0) {
      videoTime = secondsToTimeString(currentVideoSeconds)
    }

    return videoTime
  }, [currentVideoSeconds])

  const videoDuration = useMemo(() => {
    let videoTime = '00:00'

    if (videoDurationSeconds > 0) {
      videoTime = secondsToTimeString(videoDurationSeconds)
    }

    return videoTime
  }, [videoDurationSeconds])

  const videoProgress = useMemo(() => {
    if (!videoDurationSeconds) {
      return 0
    }

    return Math.floor(currentVideoSeconds / videoDurationSeconds * 100)
  }, [videoDurationSeconds, currentVideoSeconds])

  const handleMouseMove = useCallback(() => {
    if (showControlsTimeout) {
      clearTimeout(showControlsTimeout)
    }

    const timeout = setTimeout(() => setShowControls(false), 2000)

    setShowControls(true)
    setShowControlsTimeout(timeout)
  }, [showControlsTimeout])

  const handleLoadedData = useCallback(() => {
    if (!mediaRef.current) {
      return
    }

    setVideoDurationSeconds(mediaRef.current.duration)
  }, [mediaRef])

  const handleTimeUpdate = useCallback(() => {
    if (!mediaRef.current) {
      return
    }

    setCurrentVideoSeconds(mediaRef.current.currentTime)
  }, [mediaRef])

  const onVideoEnded = useCallback(() => {
    if (!mediaRef.current) {
      return
    }

    mediaRef.current.pause()
    // mediaRef.current.currentTime = 0

    setIsPlaying(false)
  }, [mediaRef])

  const togglePlay = useCallback(() => {
    if (!mediaRef.current) {
      return
    }

    const _isPlaying = mediaRef.current.paused // cause when play or pause the media state change before react set the state

    setIsPlaying(_isPlaying)

    if (mediaRef.current.paused) {
      mediaRef.current.play()
    } else {
      mediaRef.current.pause()
    }
  }, [mediaRef])

  const handleVideoClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (e.target !== mediaRef.current) {
      return
    }

    togglePlay()
  }, [mediaRef, togglePlay])

  const toggleFullScreen = useCallback(() => {
    if (!mediaRef.current) {
      return
    }

    const parentDiv = mediaRef.current.parentElement

    if (!parentDiv) {
      return
    }

    if (isFullscreenMode) {
      document.exitFullscreen()
      return
    }

    if (parentDiv.msRequestFullscreen) {
      parentDiv.msRequestFullscreen()
      return
    }

    if (parentDiv.mozRequestFullScreen) {
      parentDiv.mozRequestFullScreen()
      return
    }

    if (parentDiv.webkitRequestFullscreen) {
      parentDiv.webkitRequestFullscreen()
      return
    }

    parentDiv.requestFullscreen()
  }, [mediaRef, isFullscreenMode])

  const onFullscreenChange = useCallback(() => {
    setIsFullscreenMode(oldState => !oldState)
  }, [])

  const handleTimeSliderMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (!timeTooltipRef.current) {
      return
    }

    const target = event.target as unknown as { clientWidth: number, getBoundingClientRect: () => { left: number } }

    const { left } = target.getBoundingClientRect()
    const tooltipLeft = Math.round(event.clientX - left)

    const timeProgress = Math.round(tooltipLeft * 100 / target.clientWidth)
    const currentTime = Math.floor(timeProgress * videoDurationSeconds / 100)

    const timeString = secondsToTimeString(currentTime)

    timeTooltipRef.current.style.left = `${tooltipLeft}px`
    timeTooltipRef.current.innerText = timeString
  }, [timeTooltipRef, videoDurationSeconds])

  const handleSkipAhead: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!mediaRef.current) {
      return
    }

    const skipToPercentage = Number(e.target.value)

    const seconds = Math.round(skipToPercentage * videoDurationSeconds / 100)

    mediaRef.current.currentTime = seconds
  }, [mediaRef, videoDurationSeconds])

  useEffect(() => {
    if (!mediaRef.current) {
      return
    }

    const parentDiv = mediaRef.current.parentElement

    if (!parentDiv) {
      return
    }

    parentDiv.addEventListener('webkitfullscreenchange', onFullscreenChange)
    parentDiv.addEventListener('mozfullscreenchange', onFullscreenChange)
    parentDiv.addEventListener('msfullscreenchange', onFullscreenChange)

    return () => {
      parentDiv.removeEventListener('webkitfullscreenchange', onFullscreenChange)
      parentDiv.removeEventListener('mozfullscreenchange', onFullscreenChange)
      parentDiv.removeEventListener('msfullscreenchange', onFullscreenChange)
    }
  }, [mediaRef, onFullscreenChange])

  return (
    <VideoPlayerContainer>
      <VideoBox
        onMouseMove={handleMouseMove}
        onClick={handleVideoClick}
        style={{
          width: 600,
          height: 400,
          // width: isFullscreenMode ? '100vw' : 'unset',
          // height: isFullscreenMode ? '100vh' : 'unset',
        }}
      >
        <video
          ref={mediaRef}
          onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate}
          onEnded={onVideoEnded}
        >
          <source
            src="https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile_id=175&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>

        <VideoControls style={{ display: showControls ? 'flex' : 'none' }}>
          <VideoTimeSliderBox onMouseMove={handleTimeSliderMouseMove}>
            <InputRange
              percentage={videoProgress}
              onChange={handleSkipAhead}
            />

            <VideoTimeTooltipContainer ref={timeTooltipRef}>
              00:00
            </VideoTimeTooltipContainer>
          </VideoTimeSliderBox>

          <VideoControlsBottomBox>
            <div className="start">
              <IconButton type="button" onClick={togglePlay}>
                {isPlaying ? (
                  <FiPause size={24} color="#fff" />
                ) : (
                  <FiPlay size={24} color="#fff" />
                )}
              </IconButton>

              <IconButton type="button" style={{ marginLeft: '0.5rem' }}>
                <FiVolume2 size={24} color="#fff" />
              </IconButton>

              <span className="video-time">{currentVideoTime} / {videoDuration}</span>
            </div>

            <div className="end">
              <IconButton type="button" style={{ marginRight: '0.5rem' }}>
                <FiSettings size={24} color="#fff" />
              </IconButton>

              <IconButton type="button" onClick={toggleFullScreen}>
                {isFullscreenMode ? (
                  <FiMinimize size={24} color="#fff" />
                ) : (
                  <FiMaximize size={24} color="#fff" />
                )}
              </IconButton>
            </div>
          </VideoControlsBottomBox>


          <div className="video-time-box">
            {/* <div
              className="video-time-indicator-container"
              onMouseMove={handleTimeSliderMouseMove}
            >
              <InputRange
                percentage={videoProgress}
                onChange={handleSkipAhead}
              />

              <span id="tooltip" className="video-time-tooltip">00:00</span>
            </div> */}


          </div>


        </VideoControls>
      </VideoBox>
    </VideoPlayerContainer>
  )
}

//563492ad6f917000010000012a3f5114c385443690c6a20ef6fe24ad