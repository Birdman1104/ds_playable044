import { PixiGrid } from 'libs/grid';
import { getBackgroundGridConfig } from '../configs/gridConfigs/BackgroundViewGC';
import { makeSprite } from '../utils/Utils';
import { getBackgroundSpriteConfig } from '../configs/SpriteConfig';

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
    const bkg = makeSprite(getBackgroundSpriteConfig());
    this.attach('bkg', bkg);
  }
}
