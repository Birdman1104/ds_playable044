import Head from '../../models/HeadModel';

export const onFirstClickCommand = (): void => {
  Head.ad?.sound?.turnOn();
};
