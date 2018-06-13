package com.backesfamily.gosulitaire.stack

uses com.backesfamily.gosulitaire.card.Card
uses com.backesfamily.gosulitaire.card.ClassicCard
uses com.backesfamily.gosulitaire.card.Value

uses java.awt.*

class FoundationStack extends DefaultMutableStack {

  public construct(spreadDirection : Directions, spreadDelta : int) {
    super(spreadDirection, spreadDelta)
  }

  override public function isValid(stack : Stack) : boolean {
    var result = (stack.Count == 1 and isValid(stack.Top as ClassicCard))
    return result
  }

  private function isValid(card : ClassicCard) : boolean {
    var result = false
    var cardValue = card.Value
    if (Empty) {
      result = (cardValue == Value.V_ACE)
    } else {
      var topCard = Top as ClassicCard
      result = (card.Suit == topCard.Suit and cardValue.TheValue == topCard.Value.TheValue + 1)
    }
    return result
  }

  override public function paintEmptyStack(g : Graphics) : void {
    var location = StackLocation
    var image = ClassicCard.FoundationCard
    g.drawImage(image
        , location.x
        , location.y
        , Card.CardWidth
        , Card.CardHeight
        , null)
  }
}
