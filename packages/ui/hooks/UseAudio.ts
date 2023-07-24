import React from "react";

export type PLAYER_ACTION =
  | {
      type: "toggle-play-pause";
    }
  | {
      type: "set-progress";
      payload: number;
    }
  | {
      type: "set-volume";
      payload: number;
    };

export type PlayerState = {
  isPlaying: boolean;
  progress: number;
  volume: number;
};

const playerReducer = (
  state: PlayerState,
  action: PLAYER_ACTION
): PlayerState => {
  switch (action.type) {
    case "toggle-play-pause": {
      return { ...state, isPlaying: !state.isPlaying };
    }
    case "set-progress": {
      return { ...state, progress: action.payload };
    }
    case "set-volume": {
      return { ...state, volume: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export type AudioContextValue<InjectedProps extends unknown = unknown> =
  InjectedProps & {
    playerState: PlayerState;
    playerDispatcher: React.Dispatch<PLAYER_ACTION>;
    audioDomRef: React.RefObject<HTMLAudioElement>;
  };

export const AudioContext = React.createContext<AudioContextValue | null>(null);

export const useAudioContext = <InjectedProps extends unknown = unknown>() => {
  const context = React.useContext(
    AudioContext as unknown as React.Context<AudioContextValue<InjectedProps>>
  );

  if (!context)
    throw new Error(
      "Could not find the AudioContext. Make sure you have a AudioContext.Provider defined above the current component."
    );

  return context;
};

export const _defaultPlayerState = {
  isPlaying: false,
  progress: 0,
  volume: 100,
} satisfies PlayerState;

export type UseAudioProps = {
  defaultPlayerState?: PlayerState;
};

export const useAudio = <InjectedProps extends unknown = unknown>({
  defaultPlayerState = _defaultPlayerState,
  ...injectedProps
}: UseAudioProps): AudioContextValue<InjectedProps> => {
  const [playerState, playerDispatcher] = React.useReducer(
    playerReducer,
    defaultPlayerState
  );

  const audioDomRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (playerState.isPlaying) {
      audioDomRef.current?.play();
    } else {
      audioDomRef.current?.pause();
    }
  }, [playerState.isPlaying]);

  React.useEffect(() => {
    if (audioDomRef.current) {
      audioDomRef.current.volume = playerState.volume / 100;
    }
  }, [playerState.volume]);

  React.useEffect(() => {
    const onTimeUpdate = () => {
      playerDispatcher({
        type: "set-progress",
        payload:
          ((audioDomRef.current?.currentTime ?? 0) /
            (audioDomRef.current?.duration ?? 1)) *
          100,
      });
    };
    audioDomRef.current?.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audioDomRef.current?.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audioDomRef.current]);

  return {
    audioDomRef,
    playerState,
    playerDispatcher,
    ...injectedProps,
  } as AudioContextValue<InjectedProps>;
};
