package com.backesfamily.gosulitaire.util

uses java.awt.image.BufferedImage
uses java.awt.Panel
uses java.awt.Image
uses java.awt.Graphics
uses java.awt.Dimension

uses java.lang.Math

public class ImagePanel extends Panel  {

  private var _isImageLoaded: boolean
  private var _image: Image
  private var _offScreenImage: Image
  private var _offScreenGraphics: Graphics

  public construct() {
  }

  public construct(image : BufferedImage) {
    InitializePanel(image)
  }

  private function InitializePanel(image : Image) {
    Image = image
  }

  override public property get PreferredSize() : Dimension {
    if (_image == null) {
      return (super.getPreferredSize())
    }
    var width = _image.getWidth(this)
    var height = _image.getHeight(this)
    return (new Dimension(width, height))
  }

  override public function setBounds(x : int, y : int, width : int, height : int) : void {
    if (_offScreenImage != null) {
      _offScreenGraphics.dispose()
      _offScreenImage = null
      _offScreenGraphics = null
    }
    super.setBounds(x, y, width, height)
  }

  public property set Image(image : Image) : void {
    _image = image
    _isImageLoaded = false
    repaint()
  }

  override public function update(g : Graphics) : void {
      paint(g)
  }

  override public function paint(g : Graphics) : void {
    super.paint(g)
    if (_image != null) {
      if (!prepareImage(_image, this)) {
        var str = "Loading image..."
        var fontMetrics= getFontMetrics(getFont())
        var dimension= getSize()
        var x= (dimension.width - fontMetrics.stringWidth(str)) / 2
        var y= (dimension.height - fontMetrics.getHeight()) / 2
        g.drawString(str, x, y)
        return
      }
      _isImageLoaded = true
      var dimension= getSize()
      var imageWidth= _image.getWidth(this)
      var imageHeight= _image.getHeight(this)
      var x= Math.max((dimension.width - imageWidth) / 2, 0)
      var y= Math.min((dimension.height - imageHeight) / 2, 0)
      g.drawImage(_image, x, y, this)
    }
  }

  //public function isImageLoaded() : boolean {
   // return (_isImageLoaded)
  //}

//  public function destroy() : void {
//    if (_offScreenGraphics != null) {
//      _offScreenGraphics.dispose()
//    }
//  }
}
