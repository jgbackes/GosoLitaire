package com.backesfamily.gosulitaire.solitaire


uses com.backesfamily.gosulitaire.util.BufferedImageLoader
uses com.backesfamily.gosulitaire.util.ImagePanel
uses com.backesfamily.gosulitaire.util.Sparkle

uses javax.swing.*
uses java.awt.*
uses java.awt.event.MouseAdapter
uses java.awt.event.MouseEvent

public class FrameCongratulations extends JFrame {

  var _picture = BufferedImageLoader.getBufferedImageFromRelativePathToClass("../util/Congratulations.png", getClass())

  public construct() {
    Layout = new BorderLayout()

    // Add the sparklies
    for (0..3) {
      var allValues = Sparkle.Speed.AllValues.map(\speed -> speed.Name)
      var fireWhen = Sparkle.Speed.valueOf(allValues.get(new Random().nextInt(allValues.Count)))
      var sparkle = new Sparkle(fireWhen)
      sparkle.setBounds(0, 0, _picture.getWidth() + 64, _picture.getHeight() + 64)
      add(sparkle)
    }

    var message = new JLabel(new ImageIcon(_picture))
    add(message)

    this.ContentPane.setBackground(Color.BLACK)

    this.addMouseListener(new MouseAdapter() {
      override function mouseClicked(e : MouseEvent) {
        (e.Source as JFrame).Visible = false
        System.exit(0)
      }
    })
    Undecorated = true    // Hide the title frame of the window
    setSize(_picture.getWidth() + 64, _picture.getHeight() + 64)
    setLocationRelativeTo(null)     // Center on the screen
    repaint()
  }

  public static function main(args : String[]) {
    var f = new FrameCongratulations()
    f.Visible = true

    while (true) {
      f.repaint()
    }
  }
}
