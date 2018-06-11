package com.backesfamily.gosulitaire.solitaire

uses java.lang. *
uses java.awt. *
uses java.awt.image. *
uses java.io. *
uses javax.imageio. *
uses javax.swing. *

public class Reflect extends JComponent {

  private var _image: BufferedImage

  public construct() {
    try {
      _image = ImageIO.read(new File("C:\\p4\\dev-training\\javasol\\img\\com\\backesfamily\\card\\Back.png"))
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  override public function paintComponent(g: Graphics): void {
    var g2d= g as Graphics2D
    var width= getWidth()
    var height= getHeight()
    var imageWidth= _image.getWidth()
    var imageHeight= _image.getHeight()
    var gap = 20
    var opacity = 0.4f
    var fadeHeight = 0.3f
    g2d.setPaint(new GradientPaint(0, 0, Color.black, 0, height, Color.darkGray))
    g2d.fillRect(0, 0, width, height)
    g2d.translate((width - imageWidth) / 2, height / 2 - imageHeight)
    doDrawing(g2d)
    g2d.translate(0, 2 * imageHeight + gap)
    g2d.scale(1, - 1)
    var reflection = new BufferedImage(imageWidth, imageHeight, BufferedImage.TYPE_INT_ARGB)
    var rg= reflection.createGraphics()
    doDrawing(rg)
    rg.setComposite(AlphaComposite.getInstance(AlphaComposite.DST_IN))
    rg.setPaint(new GradientPaint(0
        , imageHeight * fadeHeight
        , new Color(0.0f, 0.0f, 0.0f, 0.0f)
        , 0
        , imageHeight
        , new Color(0.0f, 0.0f, 0.0f, opacity)))
    rg.fillRect(0, 0, imageWidth, imageHeight)
    rg.dispose()
    g2d.drawRenderedImage(reflection, null)
  }

  private function doDrawing(g2d : Graphics2D) {
    g2d.drawRenderedImage(_image, null)
  }

  public static function main(args: String[]): void {
    var f = new JFrame()
    f.setPreferredSize(new Dimension(500,500))
    var r = new Reflect()
    f.getContentPane().add(r)
    f.pack()
    f.Visible = true
  }
}