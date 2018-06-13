package com.backesfamily.gosulitaire.card

public enum Suit {

  HEART("H"), SPADE("S"), DIAMOND("D"), CLUB("C")

  var _id : String

  private construct(id : String) {
    _id = id
  }

  override public function toString() : String {
    return _id
  }
}
