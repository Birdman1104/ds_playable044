import { lego } from '@armathai/lego';
import Head from 'models/HeadModel';
import { AdStatus } from '../../models/AdModel';
import { unMapCommands } from '../EventCommandPairs';
import { initializeModelsCommand, showCtaCommand } from './MainCommands';

export const onAdStatusUpdateCommand = (status: AdStatus): void => {
  switch (status) {
    case AdStatus.Game:
      lego.command.execute(initializeModelsCommand);
      break;
    case AdStatus.PreCTA:
      lego.command.execute(unMapCommands);
      break;
    case AdStatus.CTA:
      lego.command.execute(showCtaCommand);
      break;
    default:
      break;
  }
};

export const onSoundToggleCommand = (): void => {
  Head.ad?.sound?.toggle();
};

export const onSoundMuteCommand = (): void => {
  Head.ad?.sound?.mute();
};

export const onSoundUnmuteCommand = (): void => {
  Head.ad?.sound?.unmute();
};

export const onFocusChangeCommand = (focus: boolean): void => {
  Head.ad?.sound?.focusChange(focus);
};

export const takeToStoreCommand = (): void => {
  try {
    // @ts-ignore
    window.installCTA();
  } catch (error) {
    alert('takes to store');
  }
};
