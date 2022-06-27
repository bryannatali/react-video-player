import styled from "styled-components"

export const VideoPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
`

export const VideoBox = styled.div`
  background: black;

  position: relative;

  video {
    width: 100% !important;
    height: 100% !important;

    &::-webkit-media-controls-enclosure {
      display: none !important;
    }
  }
`

export const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  /* z-index: 2147483647; */

  width: 100%;

  flex-direction: column;
  /* align-items: center;
  justify-content: space-between; */

  /* background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem; */
`

export const VideoTimeTooltipContainer = styled.div`
  position: absolute;
  top: -30px;

  background: #ccc;
  padding: 4px;
  border-radius: 4px;
  color: #333;

  width: 60px;

  text-align: center;

  display: none;
`

export const VideoTimeSliderBox = styled.div`
  height: 10px;
  width: 100%;
  position: relative;

  &:hover ${VideoTimeTooltipContainer} {
    display: block;
  }
`

export const VideoControlsBottomBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.675rem;
  background: rgba(0, 0, 0, 0.6);

  .start, .end {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`