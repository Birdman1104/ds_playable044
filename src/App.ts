import { lego, legoLogger } from '@armathai/lego';
import { Application } from '@pixi/app';
import { Assets } from '@pixi/assets';
import { Spritesheet } from '@pixi/spritesheet';
import SoundController from 'components/SoundController';
import PixiStage from 'MainStage';
import Stats from 'stats.js';
import { ATLASES } from './assetsInfo/atlases';
import { IMAGES } from './assetsInfo/images';
import { SPRITESHEET } from './assetsInfo/spriteSheets';
import { ScreenSizeConfig } from './configs/ScreenSizeConfig';
import { mapCommands } from './lego/EventCommandPairs';
import { MainGameEvents, WindowEvent } from './lego/events/MainEvents';
import { fitDimension } from './utils/Utils';

class App extends Application {
  public stage: PixiStage = new PixiStage();

  public constructor() {
    super({
      backgroundColor: 0xe2e2e2,
      powerPreference: 'high-performance',
      antialias: true,
      resolution: Math.max(window.devicePixelRatio || 1, 2),
      sharedTicker: true,
    });
  }

  public async init(): Promise<void> {
    // @ts-ignore
    this.view.classList.add('app');
    // @ts-ignore
    document.body.appendChild(this.view);

    if (process.env.NODE_ENV !== 'production') {
      this.initStats();
      // this.initLego();
    }

    await this.loadAssets();
    this.appResize();

    this.onLoadComplete();
  }

  public onFocusChange(focus: boolean): void {
    lego.event.emit(WindowEvent.FocusChange, focus);
    this.muteSound(!focus);
  }

  public onVisibilityChange(): void {
    this.muteSound(document.visibilityState !== 'visible');
  }

  public muteSound(value: boolean): void {
    lego.event.emit(MainGameEvents.MuteUpdate, value);
  }

  private async loadAssets(): Promise<void> {
    SoundController.loadSounds();

    const totalFilesToLoad = IMAGES.length + ATLASES.length;
    let loadedFiles = 0;

    const onProgress = (): void => {
      loadedFiles += 1;
      this.stage.updatePreloadProgress(loadedFiles / totalFilesToLoad);
    };

    for (const image of IMAGES) {
      const { name, path } = image;
      await Assets.load({ alias: name, src: path }, () => onProgress());
    }

    for (const atlas of ATLASES) {
      const { name, json, img } = atlas;

      const sheetTexture = await Assets.load({ alias: `${name}.png`, src: img }, () =>
        onProgress(),
      );
      SPRITESHEET[name] = new Spritesheet(sheetTexture, json);
      await SPRITESHEET[name].parse();
    }
  }

  private onLoadComplete(): void {
    this.appResize();
    this.stage.start();
    lego.command.execute(mapCommands);
    lego.event.emit(MainGameEvents.MainViewReady);
  }

  public appResize(): void {
    const { clientWidth: w, clientHeight: h } = document.body;
    if (w === 0 || h === 0) return;

    const { min, max } = ScreenSizeConfig.size.ratio;
    const { width, height } = fitDimension({ width: w, height: h }, min, max);

    this.resizeCanvas(width, height);
    this.resizeRenderer(width, height);

    this.stage.resize();

    lego.event.emit(MainGameEvents.Resize);
  }

  public onResize(width: number, height: number): void {
    //
  }

  public onVolumeChange(volume: number): void {
    SoundController.setVolume(volume);
  }

  private resizeCanvas(width: number, height: number): void {
    const { style } = this.renderer.view;
    if (!style) return;
    style.width = `${width}px`;
    style.height = `${height}px`;
  }

  private resizeRenderer(width: number, height: number): void {
    this.renderer.resize(width, height);
  }

  private initLego(): void {
    legoLogger.start(lego, Object.freeze({}));
  }

  private initStats(): void {
    const stats = Stats();
    document.body.appendChild(stats.dom);
    stats.begin();
    this.ticker.add(() => {
      stats.update();
    });
  }
}

export default App;
