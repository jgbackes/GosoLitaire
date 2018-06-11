package com.backesfamily.gosulitaire.solitaire

uses com.backesfamily.gosulitaire.card.Hint

uses java.lang.Integer
uses java.util.ArrayList
uses java.util.ResourceBundle

interface GameLevelsProvider {
  public property get EasyGames() : Integer[]
  public property get NormalGames() : Integer[]
  public property get HardGames() : Integer[]
  public property get TrickyGames() : Integer[]

  public property get HintEnabled() : boolean
  public property get FeltEnabled() : boolean
  public property get ResBundle(): ResourceBundle
  public property get GameInfo() : GameInfo
  public property get HintLocations() : ArrayList<Hint>
}
