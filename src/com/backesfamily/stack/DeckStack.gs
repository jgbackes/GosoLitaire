package com.backesfamily.stack

uses java.awt.Graphics
uses com.backesfamily.card.ClassicCard
uses com.backesfamily.card.Card
uses com.backesfamily.card.ClassicDeck
uses com.backesfamily.card.Directions

class DeckStack extends ClassicDeck {

  public construct(spreadDirection : Directions, spreadDelta: int) {
    super(spreadDirection, spreadDelta)
  }

  override public function paintEmptyStack(g: Graphics): void {
    var location= StackLocation
    var foundationImage = ClassicCard.DeckCard
    g.drawImage(foundationImage
        , location.x
        , location.y
        , Card.CardWidth
        , Card.CardHeight
        , null)
  }
}