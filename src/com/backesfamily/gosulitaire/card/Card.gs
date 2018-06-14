package com.backesfamily.gosulitaire.card

uses java.awt.*

/**
 * Created by jbackes on 6/13/18
 */
interface Card {
  static property get CardHeight() : int {
    return 164
  }

  static property get CardWidth() : int {
    return 118
  }

  static property get BorderArc() : int {
    return 18
  }

  static property get GullySize() : int {
    return 5
  }

  static property get VerticalOffset() : int {
    return DefaultMutableCard.CardHeight / 4
  }

  public property get Location() : Point

  public property set Location(p: Point) : void

  public property get FaceDown() : boolean

  public property set FaceDown(d: boolean) : void

  public function paint(g : Graphics, hint : boolean) : void

  public function turnFaceUp() : void;

  public function turnFaceDown() : void;

  public function containsPoint(p : Point) : boolean;
}