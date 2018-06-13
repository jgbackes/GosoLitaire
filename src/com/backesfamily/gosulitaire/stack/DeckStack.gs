package com.backesfamily.gosulitaire.stack

uses com.backesfamily.gosulitaire.card.Card
uses com.backesfamily.gosulitaire.card.ClassicCard
uses com.backesfamily.gosulitaire.card.ClassicDeck

uses java.awt.*

class DeckStack extends ClassicDeck {

  public construct(spreadDirection : Directions, spreadDelta : int) {
    super(spreadDirection, spreadDelta)
  }

  override public function paintEmptyStack(g : Graphics) : void {
    var location = StackLocation
    var foundationImage = ClassicCard.DeckCard
    g.drawImage(foundationImage
        , location.x
        , location.y
        , Card.CardWidth
        , Card.CardHeight
        , null)
  }
}