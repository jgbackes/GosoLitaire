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

  /**
   * Get the location of the card
   *
   * @return Point Location of the card
   */
  public property get Location() : Point

  /**
   * Set the location of the card
   *
   * @param p Point New location of the card
   */
  public property set Location(p: Point) : void

  /**
   * Get the size of the card as a Dimension
   *
   * @return Dimension Get the dimensions of the card
   */
  public property get Size() : Dimension

  /**
   * Set the dimensions of the card
   *
   * @param d Dimension Set the dimensions of the card
   */
  public property set Size(d: Dimension) : void

  /**
   * Sets the card FaceUp
   */
  public function turnFaceUp() : void

  /**
   * Sets the card FaceDown
   */
  public function turnFaceDown() : void

  /**
   * Return true if the card is FaceDown
   * @return
   */
  public property get FaceDown() : boolean

  /**
   * Returns true if this point is inside the card
   * @param p Point Point to check
   * @return
   */
  public function containsPoint(p : Point) : boolean;

  /**
   * Draws the card
   * @param g Graphics context were drawing will occur
   * @param hint Boolean True if hints (arrows) should be drawns
   */
  public function paint(g : Graphics, hint : boolean) : void
}