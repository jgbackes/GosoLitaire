package com.backesfamily.gosulitaire.card

public enum Value {

  V_ACE(1, "A"), V_2(2, "2"), V_3(3, "3"), V_4(4, "4"), V_5(5, "5"), V_6(6, "6"), V_7(7, "7"), V_8(8, "8"), V_9(9, "9"), V_10(10, "10"), V_JACK(11, "J"), V_QUEEN(12, "Q"), V_KING(13, "K")

  internal var _value : int as TheValue
  internal var _code : String as TheCode

  private construct(value : int, code : String) {
    _value = value
    _code = code
  }

  override public function toString() : String {
    return _code
  }
}
