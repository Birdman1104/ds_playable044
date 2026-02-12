import { lego } from '@armathai/lego';
import { AdStatus } from '../../models/AdModel';
import Head from '../../models/HeadModel';

export const initAdModelCommand = (): void => Head.initializeADModel();
export const showCtaCommand = (): void => Head.ad?.cta?.show();

export const setAdToCTACommand = (): void => Head.ad?.setAdStatus(AdStatus.CTA);
const setAdStatusCommand = (status: AdStatus): void => Head.ad?.setAdStatus(status);
const initializeGameModelCommand = (): void => Head.initializeGameModel();
const initializeCtaModelCommand = (): void => Head.ad?.initializeCtaModel();
const initializeSoundModelCommand = (): void => Head.ad?.initializeSoundModel();

export const onMainViewReadyCommand = () => {
  lego.command
    //
    .execute(initAdModelCommand)

    .payload(AdStatus.Game)
    .execute(setAdStatusCommand);
};

export const initializeModelsCommand = (): void => {
  lego.command
    .execute(initializeGameModelCommand)
    .execute(initializeCtaModelCommand)
    .execute(initializeSoundModelCommand);
};
