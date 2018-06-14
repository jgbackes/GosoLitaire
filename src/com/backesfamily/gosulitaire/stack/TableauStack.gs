package com.backesfamily.gosulitaire.stack

uses com.backesfamily.gosulitaire.card.*

uses java.awt.*

/**
 * The tableau is at the bottom of the table, it consists of seven stacks of cards
 * only the top card of the stack is displayed
 */

class TableauStack extends DefaultMutableStack {

  public construct(spreadDirection : Directions, spreadDelta : int) {
    super(spreadDirection, spreadDelta)
  }

  /**
   * isValid will return true if a king is going onto an empty stack
   * or the top card on this stack is a different color and is one
   * greater than this card
   */
  public function isValid(card : ClassicCard) : boolean {
    var result = false
    if (Empty) {
      result = (card.Value == Pips.V_KING)
    } else {
      result = (card.Color != (Top as ClassicCard).Color
          and card.Value.TheValue == (Top as ClassicCard).Value.TheValue - 1)
    }
    return result
  }

  override public function isValid(stack : Stack) : boolean {
    return (isValid((stack.Top as ClassicCard)))
  }

  override public function paintEmptyStack(g : Graphics) {
    var location = StackLocation
    var foundationImage = ClassicCard.TableauCard
    g.drawImage(foundationImage
        , location.x
        , location.y
        , Card.CardWidth
        , Card.CardHeight
        , null)
  }
}
