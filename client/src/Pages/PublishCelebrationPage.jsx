import { useState } from "react";
import ReactPlayer from "react-player";

function PublishCelebrationPage() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showPlayBtn, setShowPlayBtn] = useState(true);
  const [showRePlayBtn, setShowRePlayBtn] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoMute, setIsVideoMute] = useState(false);
  const [subtitleOn, setSubtitleOn] = useState(false);

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <div className="h-full w-1/2 react-player-container relative">
        <a
          href="/"
          className="absolute top-9 left-12 flex logo gap-1 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-9 h-9 -rotate-90 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </a>
        <ReactPlayer
          url={
            // "http://localhost:3000/videos/aRvUnNwsZ4XCcjkXwSXwP1jcO7oZcLszmCZjN7pbG200.m3u8"
            "https://stream.media.muscache.com/aRvUnNwsZ4XCcjkXwSXwP1jcO7oZcLszmCZjN7pbG200.m3u8"
          }
          width={"100%"}
          height={"100%"}
          playsinline
          playing={videoPlaying}
          muted={isVideoMute}
          progressInterval={200}
          onProgress={({ played }) => {
            setVideoProgress((prev) => {
              const val = played * 100;
              return val === 100 ? 0 : val;
            });
          }}
          onEnded={() => {
            setShowRePlayBtn(true);
            setVideoPlaying(false);
            setShowVideoControls(false);
          }}
        />
        {showPlayBtn && (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <PlayButton
              setVideoPlaying={setVideoPlaying}
              setShowPlayBtn={setShowPlayBtn}
              setShowVideoControls={setShowVideoControls}
            />
          </div>
        )}
        {showRePlayBtn && (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <RePlayButton
              setShowRePlayBtn={setShowRePlayBtn}
              setVideoPlaying={setVideoPlaying}
              setShowVideoControls={setShowVideoControls}
            />
          </div>
        )}
        {showVideoControls && (
          <div className="absolute left-0 bottom-0 right-0 flex items-center justify-center">
            <VideoControls
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoProgress={videoProgress}
              isVideoMute={isVideoMute}
              setIsVideoMute={setIsVideoMute}
              subtitleOn={subtitleOn}
              setSubtitleOn={setSubtitleOn}
            />
          </div>
        )}
      </div>
      <div className="w-1/2 h-full bg-black"></div>
    </div>
  );
}

function PlayButton({ setShowPlayBtn, setVideoPlaying, setShowVideoControls }) {
  return (
    <button
      aria-label="Play again"
      type="button"
      className="video-play-btn rounded-full w-24 h-24 btn-click-shrink"
      onClick={() => {
        setShowPlayBtn(false);
        setVideoPlaying(true);
        setShowVideoControls(true);
      }}
    >
      <span className="w-full h-full flex items-center justify-center text-white hover:text-neutral-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 48,
            width: 48,
            fill: "currentcolor",
          }}
        >
          <path d="M4.5 1a1 1 0 0 0-1.3.26 1 1 0 0 0-.2.61v12.26a1 1 0 0 0 1.5.86l10.51-6.13a1 1 0 0 0 0-1.72z" />
        </svg>
      </span>
    </button>
  );
}

function RePlayButton({
  setShowRePlayBtn,
  setVideoPlaying,
  setShowVideoControls,
}) {
  return (
    <button
      aria-label="Play again"
      type="button"
      className="video-play-btn rounded-full w-20 h-20 btn-click-shrink"
      onClick={() => {
        setShowRePlayBtn(false);
        setVideoPlaying(true);
        setShowVideoControls(true);
      }}
    >
      <span className="w-full h-full flex items-center justify-center text-white hover:text-neutral-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 32,
            width: 32,
            fill: "currentcolor",
          }}
        >
          <path d="M17 11h6.98A9.98 9.98 0 0 0 6 17a10.01 10.01 0 0 0 19.8 2h4.04A14 14 0 0 1 16 31C8.28 31 2 24.72 2 17S8.28 3 16 3a13.94 13.94 0 0 1 10 4.22V2h4v10a3 3 0 0 1-3 3H17v-4z" />
        </svg>
      </span>
    </button>
  );
}

function VideoControls({
  videoPlaying,
  setVideoPlaying,
  videoProgress,
  isVideoMute,
  setIsVideoMute,
  subtitleOn,
  setSubtitleOn,
}) {
  return (
    <div className="flex items-start mr-auto">
      <div className="m-2 w-8 h-8">
        <PlayPauseButton
          videoPlaying={videoPlaying}
          setVideoPlaying={setVideoPlaying}
          videoProgress={videoProgress}
        />
      </div>
      <div className="m-2 w-8 h-8">
        <MuteUnmuteButton
          isVideoMute={isVideoMute}
          setIsVideoMute={setIsVideoMute}
        />
      </div>
      <div className="m-2 w-8 h-8">
        <SubtitleButton subtitleOn={subtitleOn} setSubtitleOn={setSubtitleOn} />
      </div>
    </div>
  );
}

function PlayPauseButton({ videoPlaying, setVideoPlaying, videoProgress }) {
  function getOffset(videoProgress) {
    const val = (100 - videoProgress) * (87.96459430051421 / 100);
    return val;
  }

  return (
    <button
      onClick={() => setVideoPlaying(!videoPlaying)}
      className="video-control-btn  relative w-8 h-8 text-white rounded-full btn-click-shrink"
    >
      <div
        className="-rotate-90 video-progress-circle"
        style={{
          strokeDashoffset: getOffset(videoProgress),
          stroke: "white",
          strokeWidth: "2px",
        }}
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle
            r={14}
            cx={16}
            cy={16}
            fill="transparent"
            strokeDasharray="87.96459430051421"
            strokeLinecap="round"
            strokeWidth={"2px"}
            color="white"
          />
        </svg>
      </div>
      <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
        {videoPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: 16,
              width: 16,
              fill: "currentcolor",
            }}
          >
            <path d="M13 1v14H9V1zM7 1v14H3V1z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: 16,
              width: 16,
              fill: "currentcolor",
            }}
          >
            <path d="M4.5 1a1 1 0 0 0-1.3.26 1 1 0 0 0-.2.61v12.26a1 1 0 0 0 1.5.86l10.51-6.13a1 1 0 0 0 0-1.72z" />
          </svg>
        )}
      </div>
    </button>
  );
}

function MuteUnmuteButton({ isVideoMute, setIsVideoMute }) {
  return (
    <button
      onClick={() => setIsVideoMute(!isVideoMute)}
      className="video-control-btn w-8 h-8 text-white rounded-full btn-click-shrink"
    >
      <div className="w-full h-full top-0 left-0 flex items-center justify-center">
        {isVideoMute ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: 16,
              width: 16,
              fill: "currentcolor",
            }}
          >
            <path d="M5.76 10 16 20.24V29a1 1 0 0 1-.51.87l-.1.05a1 1 0 0 1-1-.13l-.1-.08L6.6 22H3a2 2 0 0 1-2-1.85V12a2 2 0 0 1 1.85-2H5.76zM22.2 26.46l1.93 1.92a14.22 14.22 0 0 1-4.14 1.6V27.3a11.66 11.66 0 0 0 2.21-.84zM3.71 2.29l26 26-1.42 1.42-26-26 1.42-1.42zM20 2.02A14.32 14.32 0 0 1 31.3 16a14.21 14.21 0 0 1-2.7 8.35l-1.87-1.87A11.6 11.6 0 0 0 28.7 16c0-5.41-3.7-9.97-8.7-11.3V2.02zm0 6.25A8.3 8.3 0 0 1 25.3 16a8.23 8.23 0 0 1-1.04 4.01l-1.95-1.94c.25-.64.39-1.34.39-2.07a5.7 5.7 0 0 0-2.5-4.7l-.2-.14V8.27zm-4.62-6.2a1 1 0 0 1 .61.81L16 3v8.76l-5.59-5.59 3.88-3.88a1 1 0 0 1 1.1-.22z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: 16,
              width: 16,
              fill: "currentcolor",
            }}
          >
            <path d="M15.65 8c0 3.43-2.43 6.3-5.65 6.99v-1.34a5.86 5.86 0 0 0 0-11.3V1.01A7.16 7.16 0 0 1 15.65 8zm-3 0c0-1.76-1.1-3.26-2.65-3.86v1.44a2.85 2.85 0 0 1 0 4.84v1.45A4.15 4.15 0 0 0 12.65 8zM7.69 1.04a.5.5 0 0 0-.54.1L3.29 5H1.5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1.8l3.85 3.85A.5.5 0 0 0 8 14.5v-13a.5.5 0 0 0-.3-.46z" />
          </svg>
        )}
      </div>
    </button>
  );
}

function SubtitleButton({ subtitleOn, setSubtitleOn }) {
  return (
    <button
      onClick={() => setSubtitleOn(!subtitleOn)}
      className="video-control-btn w-8 h-8 text-white rounded-full btn-click-shrink"
    >
      <div className="w-full h-full top-0 left-0 flex items-center justify-center">
        {subtitleOn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: 16,
              width: 16,
              fill: "currentcolor",
            }}
          >
            <path d="M14 1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.5L8 16l-2.5-3H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm-1.5 6.75h-10v1.5h10zm-3.5-3H2.5v1.5H9zm4.5 0H10v1.5h3.5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: 16,
              width: 16,
              fill: "currentcolor",
            }}
          >
            <path d="M14 1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.5L8 16l-2.5-3H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1.5H2a.5.5 0 0 0-.5.42V11a.5.5 0 0 0 .42.5H6.2L8 13.66l1.8-2.16H14a.5.5 0 0 0 .5-.42V3a.5.5 0 0 0-.42-.5zm-2 5.25v1.5H3v-1.5zm-3-3v1.5H3v-1.5zm4 0v1.5h-3v-1.5z" />
          </svg>
        )}
      </div>
    </button>
  );
}

export default PublishCelebrationPage;
