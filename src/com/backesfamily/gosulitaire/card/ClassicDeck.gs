package com.backesfamily.gosulitaire.card

uses com.backesfamily.gosulitaire.stack.Directions

uses java.awt.*

public class ClassicDeck extends Deck {

  public construct(spreadDirection : Directions, spreadDelta : int) {
    super(spreadDirection, spreadDelta)

    Suit.values().each(\suit -> Pips.values().each(\value -> {
      var card = new ClassicCard(value, suit)
      push(card)
    }))
  }

  override public function paintEmptyStack(g : Graphics) : void {

    var location = StackLocation
    var image = ClassicCard.DeckCard
    g.drawImage(image
        , location.x
        , location.y
        , Card.CardWidth
        , Card.CardHeight
        , null)
  }
}
