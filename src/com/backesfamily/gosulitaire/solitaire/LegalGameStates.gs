package com.backesfamily.gosulitaire.solitaire

public class LegalGameStates {

  internal var _gameStateIndex : int = 0
  private var _gameStates = new ArrayList<GameState>()

  public construct(theGameStates : ArrayList<GameState>) {
    _gameStates = theGameStates
    _gameStateIndex = 0
  }

  public construct() {
  }

  public function addGameStates(gameState : GameState) : void {
    _gameStates.add(gameState)
  }

  public property get GameStates() : ArrayList<GameState> {
    return _gameStates
  }

  public property set GameStates(gameStates : ArrayList<GameState>) : void {
    _gameStates = gameStates
  }

  public property get GameStateIndex() : int {
    return _gameStateIndex
  }

  public property set GameStateIndex(index : int) : void {
    _gameStateIndex = index
  }
}
