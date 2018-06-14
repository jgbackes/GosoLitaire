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
    return Card.CardHeight / 4
  }

  /*
   * Getter and setter for the location of the card
   */
  public property get Location() : Point
  public property set Location(p: Point) : void

  public property get Size() : Dimension
  public property set Size(d: Dimension) : void

  /**
   * Methods for handling whether the card is face up
   */
  public function turnFaceUp() : void
  public function turnFaceDown() : void
  public property get FaceDown() : boolean
  public property set FaceDown(b:boolean)

  /**
   * Returns true if this point is inside the card
   * @param p
   * @return
   */
  public function containsPoint(p : Point) : boolean;

  /**
   * Draws the card
   * @param g
   * @param hint
   */
  public function paint(g : Graphics, hint : boolean) : void
}