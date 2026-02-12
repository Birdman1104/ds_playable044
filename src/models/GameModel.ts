import { ObservableModel } from './ObservableModel';

export enum GameState {
  Unknown = 'Unknown',
  Intro = 'Intro',
}

export class GameModel extends ObservableModel {
  private _state: GameState;

  constructor() {
    super('GameModel');

    this._state = GameState.Unknown;
    this.makeObservable();
  }

  get state(): GameState {
    return this._state;
  }

  set state(value: GameState) {
    this._state = value;
  }

  public setState(state: GameState): void {
    this._state = state;
  }

  public initialize(): void {
    this._state = GameState.Intro;
  }
}
