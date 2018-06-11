package com.backesfamily.gosulitaire.solitaire


uses com.backesfamily.gosulitaire.util.WindowManager

uses java.awt.BorderLayout
uses java.awt.Color

uses javax.swing.JFrame
uses javax.swing.JLabel
uses javax.imageio.ImageIO
uses javax.swing.ImageIcon

public class FrameCongratulations extends JFrame  {


  internal var _congratulations: JLabel = new JLabel()

  public construct() {
    Layout = new BorderLayout(0,0)
    Visible = false

    var cImage = ImageIO.read(getClass().getResource("../util/Congratulations.png"));
    var wide = cImage.Width + 64
    var high = cImage.Height + 64
    this.ContentPane.setBackground(Color.BLACK)
    _congratulations.setIcon(new ImageIcon(cImage))
    _congratulations.setHorizontalAlignment(JLabel.CENTER)
    _congratulations.setVerticalAlignment(JLabel.CENTER)
    _congratulations.setEnabled(true)
    _congratulations.setBounds(0, 0, wide, high)
    InitializeFrame(wide, high);
  }

  private final function InitializeFrame(wide : int, high: int) {
    Undecorated = true
    setSize(wide, high)
    add(BorderLayout.CENTER, _congratulations)
    addWindowListener(new WindowManager(this, WindowManager.HIDE_ON_CLOSE))
    for (i in 0..3) {
      var sparkle = new Sparkle()
      sparkle.setBounds(0,0,wide,high)
      add(sparkle)
    }
  }

  override public property set Visible(b : boolean) {
    var scrSize = getToolkit().getScreenSize()
    var size = getSize()
    if (b) {
      setLocation((scrSize.width - size.width) / 2, (scrSize.height - size.height) / 2)
    }
    super.Visible = b
  }

  public static function main(args:String[]) {
    var f = new FrameCongratulations()
    f.Visible = true
  }
}
