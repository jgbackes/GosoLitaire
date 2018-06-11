package com.backesfamily.stack

uses com.backesfamily.card.ClassicCard
uses java.awt.Graphics
uses com.backesfamily.card.Card
uses com.backesfamily.card.Directions

class WasteStack extends DefaultMutableStack {

  public construct(spreadDirection : Directions, spreadDelta: int) {
    super(spreadDirection, spreadDelta)
  }

  override public function paintEmptyStack(g: Graphics) {
    var location= StackLocation
    var wasteImage = ClassicCard.WasteCard
    g.drawImage(wasteImage
        , location.x
        , location.y
        , Card.CardWidth
        , Card.CardHeight
        , null)
  }
}