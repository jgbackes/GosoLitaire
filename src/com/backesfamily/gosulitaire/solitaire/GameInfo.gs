package com.backesfamily.gosulitaire.solitaire

public class GameInfo  {

  public enum GameDifficulty {

    RANDOM("Random", "Random")
    , WINNABLE_EASY("Winnable-Easy", "Easy")
    , WINNABLE_NORMAL("Winnable-Normal", "Normal")
    , WINNABLE_HARD("Winnable-Hard", "Hard")
    , WINNABLE_TRICKY("Winnable-Tricky", "Tricky")

    private var _title : String
    private var _difficulty: String

    private construct(theTitle: String, theDifficulty: String) {
      _title = theTitle
      _difficulty = theDifficulty
    }

    public property get Title() : String {
          return _title
        }

    public property get Diff() : String {
          return _difficulty
        }
  }

  private var _type = GameDifficulty.RANDOM
  private var _seed: int = -1

  public construct() {
  }

  public construct(theType : GameDifficulty, theSeed : int) {
    _type = theType
    _seed = theSeed
  }

  public property get Type() : GameDifficulty {
      return (_type)
    }

  public property set Type(theType : GameDifficulty) : void {
      _type = theType
    }

  public property get Seed() : int {
      return (_seed)
    }

  public property set Seed(theSeed : int) : void {
      this._seed = theSeed
    }

  override public function equals(obj : Object) : boolean {
    if (obj == null or !(obj typeis GameInfo)) {
      return (false)
    }
    var gi = obj as GameInfo
    return ( _type == gi.Type and _seed == gi.Seed)
  }

  override public function hashCode() : int {
    return ((_type + "|" + _seed).hashCode())
  }

  override public function toString() : String {
    return (_type + "|" + _seed)
  }
}
