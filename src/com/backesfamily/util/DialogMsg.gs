package com.backesfamily.util

uses java.awt.Panel
uses java.awt.Dialog
uses java.awt.TextArea
uses java.awt.Frame
uses java.awt.BorderLayout
uses java.awt.Color

public class DialogMsg extends Dialog  {

  internal var panelBackground : Panel
  internal var textAreaMsg : TextArea

  public construct(parent : Frame, title : String, modal : boolean, message: String) {
    super(parent, modal)
    Layout = new BorderLayout(0, 0)
    Visible = false
    Background = Color.GRAY
    panelBackground = new Panel()
    panelBackground.setLayout(new BorderLayout(0, 0))
    panelBackground.setBackground(Color.white)
    textAreaMsg = new TextArea("", 0, 0, TextArea.SCROLLBARS_VERTICAL_ONLY)
    textAreaMsg.setEditable(false)
    textAreaMsg.setText(message)
    panelBackground.add("Center", textAreaMsg)
    Title = title
    Resizable = false
    InitializeDialog()
  }

  private final function InitializeDialog() {
    var dimension = Toolkit.getDefaultToolkit().getScreenSize()

    setSize(240, 110)
    add("Center", panelBackground)
    setLocation((dimension.width - getSize().width) / 2, (dimension.height - getSize().height) / 2)
    addWindowListener(new WindowManager(this, WindowManager.DISPOSE_ON_CLOSE))
  }
}
