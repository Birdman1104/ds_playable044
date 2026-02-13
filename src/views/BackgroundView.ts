import { Sprite } from '@pixi/sprite';
import { PixiGrid } from 'libs/grid';
import { getBackgroundGridConfig } from '../configs/gridConfigs/BackgroundViewGC';

export class BackgroundView extends PixiGrid {
  constructor() {
    super();
    this.build();
  }

  public getGridConfig(): ICellConfig {
    return getBackgroundGridConfig();
  }

  public rebuild(config?: ICellConfig | undefined): void {
    super.rebuild(this.getGridConfig());
  }

  private build(): void {
    const bkg = Sprite.from(window.GAME_ASSETS.bkgTexture);
    setTimeout(() => {
      this.attach('bkg', bkg);
    }, 100);
  }
}
