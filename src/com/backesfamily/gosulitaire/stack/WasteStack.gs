package com.backesfamily.gosulitaire.stack

uses com.backesfamily.gosulitaire.card.*

uses java.awt.*

class WasteStack extends DefaultMutableStack {

  public construct(spreadDirection : Directions, spreadDelta : int) {
    super(spreadDirection, spreadDelta)
  }

  override public function paintEmptyStack(g : Graphics) {
    var location = StackLocation
    var wasteImage = ClassicCard.WasteCard
    g.drawImage(wasteImage
        , location.x
        , location.y
        , CardI.CardWidth
        , CardI.CardHeight
        , null)
  }
}