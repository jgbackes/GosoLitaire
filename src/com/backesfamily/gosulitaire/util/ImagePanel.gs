package com.backesfamily.gosulitaire.util

uses javax.swing.*
uses java.awt.*
uses java.awt.image.BufferedImage

public class ImagePanel extends JPanel {

  private var _image : Image

  public construct() {
  }

  public construct(image : BufferedImage) {
    InitializePanel(image)
  }

  private function InitializePanel(image : Image) {
    _image = image
  }

  override public property get PreferredSize() : Dimension {
    if (_image == null) {
      return (super.getPreferredSize())
    }
    var width = _image.getWidth(this)
    var height = _image.getHeight(this)
    return (new Dimension(width, height))
  }

  override public function paint(g : Graphics) : void {
    super.paint(g)
    var dimension = getSize()
    var imageWidth = _image.getWidth(this)
    var imageHeight = _image.getHeight(this)
    var x = Math.max((dimension.width - imageWidth) / 2, 0)
    var y = Math.min((dimension.height - imageHeight) / 2, 0)
    g.drawImage(_image, x, y, null)
  }
}
