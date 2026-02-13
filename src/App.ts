import { lego, legoLogger } from '@armathai/lego';
import { Application } from '@pixi/app';
import { Texture } from '@pixi/core';
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

    // for (const image of IMAGES) {
    //   const { name, path } = image;
    //   await Assets.load({ alias: name, src: path }, () => onProgress());
    // }

    const jsons: any = {
      game: {
        frames: {
          'stack_bkg.png': {
            frame: {
              x: 3,
              y: 3,
              w: 1564,
              h: 367,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 1564,
              h: 367,
            },
            sourceSize: {
              w: 1564,
              h: 367,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'button.png': {
            frame: {
              x: 3,
              y: 376,
              w: 609,
              h: 211,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 609,
              h: 211,
            },
            sourceSize: {
              w: 609,
              h: 211,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'logo_1.png': {
            frame: {
              x: 3,
              y: 593,
              w: 468,
              h: 265,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 468,
              h: 265,
            },
            sourceSize: {
              w: 468,
              h: 265,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'logo_2.png': {
            frame: {
              x: 477,
              y: 593,
              w: 468,
              h: 265,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 468,
              h: 265,
            },
            sourceSize: {
              w: 468,
              h: 265,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'hand.png': {
            frame: {
              x: 951,
              y: 376,
              w: 360,
              h: 445,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 360,
              h: 445,
            },
            sourceSize: {
              w: 360,
              h: 445,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'perfect.png': {
            frame: {
              x: 1317,
              y: 376,
              w: 399,
              h: 163,
            },
            rotated: true,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 399,
              h: 163,
            },
            sourceSize: {
              w: 399,
              h: 163,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'good.png': {
            frame: {
              x: 3,
              y: 864,
              w: 398,
              h: 172,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 398,
              h: 172,
            },
            sourceSize: {
              w: 398,
              h: 172,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'goodJob.png': {
            frame: {
              x: 3,
              y: 1042,
              w: 387,
              h: 287,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 387,
              h: 287,
            },
            sourceSize: {
              w: 387,
              h: 287,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'great.png': {
            frame: {
              x: 1317,
              y: 781,
              w: 378,
              h: 171,
            },
            rotated: true,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 378,
              h: 171,
            },
            sourceSize: {
              w: 378,
              h: 171,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'sound_on.png': {
            frame: {
              x: 1494,
              y: 376,
              w: 47,
              h: 41,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 47,
              h: 41,
            },
            sourceSize: {
              w: 55,
              h: 46,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'sound_off.png': {
            frame: {
              x: 1494,
              y: 423,
              w: 41,
              h: 41,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 3,
              y: 4,
              w: 41,
              h: 41,
            },
            sourceSize: {
              w: 55,
              h: 46,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
        },
        meta: {
          app: 'http://github.com/odrick/free-tex-packer-core',
          version: '0.3.4',
          image: 'game.png',
          format: 'RGBA8888',
          size: {
            w: 1570,
            h: 1332,
          },
          scale: 1,
        },
      },
      gems: {
        frames: {
          'empty_black.png': {
            frame: {
              x: 3,
              y: 3,
              w: 134,
              h: 134,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 134,
              h: 134,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'empty_brown_light.png': {
            frame: {
              x: 143,
              y: 3,
              w: 134,
              h: 134,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 134,
              h: 134,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'empty_grey.png': {
            frame: {
              x: 3,
              y: 143,
              w: 134,
              h: 134,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 134,
              h: 134,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'empty_light_grey.png': {
            frame: {
              x: 143,
              y: 143,
              w: 134,
              h: 134,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 134,
              h: 134,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'empty_orange.png': {
            frame: {
              x: 283,
              y: 3,
              w: 134,
              h: 134,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 134,
              h: 134,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'empty_white.png': {
            frame: {
              x: 283,
              y: 143,
              w: 134,
              h: 134,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 134,
              h: 134,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'empty_yellow.png': {
            frame: {
              x: 3,
              y: 283,
              w: 134,
              h: 134,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 134,
              h: 134,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'empty_yellow_light.png': {
            frame: {
              x: 143,
              y: 283,
              w: 134,
              h: 134,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
              x: 0,
              y: 0,
              w: 134,
              h: 134,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_black_wrong.png': {
            frame: {
              x: 283,
              y: 283,
              w: 120,
              h: 121,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 120,
              h: 121,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_brown_light_wrong.png': {
            frame: {
              x: 423,
              y: 3,
              w: 120,
              h: 121,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 120,
              h: 121,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_grey_wrong.png': {
            frame: {
              x: 423,
              y: 130,
              w: 120,
              h: 121,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 120,
              h: 121,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_light_grey_wrong.png': {
            frame: {
              x: 423,
              y: 257,
              w: 120,
              h: 121,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 120,
              h: 121,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_orange_wrong.png': {
            frame: {
              x: 3,
              y: 423,
              w: 120,
              h: 121,
            },
            rotated: true,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 120,
              h: 121,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_white_wrong.png': {
            frame: {
              x: 130,
              y: 423,
              w: 120,
              h: 121,
            },
            rotated: true,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 120,
              h: 121,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_yellow_light_wrong.png': {
            frame: {
              x: 257,
              y: 423,
              w: 120,
              h: 121,
            },
            rotated: true,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 120,
              h: 121,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_yellow_wrong.png': {
            frame: {
              x: 384,
              y: 410,
              w: 120,
              h: 121,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 5,
              y: 4,
              w: 120,
              h: 121,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_black.png': {
            frame: {
              x: 549,
              y: 3,
              w: 118,
              h: 118,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 8,
              y: 8,
              w: 118,
              h: 118,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_brown_light.png': {
            frame: {
              x: 549,
              y: 127,
              w: 118,
              h: 118,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 8,
              y: 8,
              w: 118,
              h: 118,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_grey.png': {
            frame: {
              x: 549,
              y: 251,
              w: 118,
              h: 118,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 8,
              y: 8,
              w: 118,
              h: 118,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_light_grey.png': {
            frame: {
              x: 549,
              y: 375,
              w: 118,
              h: 118,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 8,
              y: 8,
              w: 118,
              h: 118,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_orange.png': {
            frame: {
              x: 3,
              y: 549,
              w: 118,
              h: 118,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 8,
              y: 8,
              w: 118,
              h: 118,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_white.png': {
            frame: {
              x: 127,
              y: 549,
              w: 118,
              h: 118,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 8,
              y: 8,
              w: 118,
              h: 118,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_yellow.png': {
            frame: {
              x: 251,
              y: 549,
              w: 118,
              h: 118,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 8,
              y: 8,
              w: 118,
              h: 118,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
          'gem_yellow_light.png': {
            frame: {
              x: 375,
              y: 549,
              w: 118,
              h: 118,
            },
            rotated: false,
            trimmed: true,
            spriteSourceSize: {
              x: 8,
              y: 8,
              w: 118,
              h: 118,
            },
            sourceSize: {
              w: 134,
              h: 134,
            },
            pivot: {
              x: 0.5,
              y: 0.5,
            },
          },
        },
        meta: {
          app: 'http://github.com/odrick/free-tex-packer-core',
          version: '0.3.4',
          image: 'gems.png',
          format: 'RGBA8888',
          size: {
            w: 670,
            h: 670,
          },
          scale: 1,
        },
      },
    };

    window.GAME_ASSETS.bkgTexture = Texture.from(window.GAME_ASSETS.bkg);

    for (const name of ['game', 'gems']) {
      // const sheetTexture = await Assets.load({ alias: `${name}.png`, src: img }, () =>
      //   onProgress(),
      // );
      SPRITESHEET[name] = new Spritesheet(Texture.from(window.GAME_ASSETS[name]), jsons[name]);
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
