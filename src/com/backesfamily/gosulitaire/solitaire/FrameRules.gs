package com.backesfamily.gosulitaire.solitaire

uses com.backesfamily.gosulitaire.util.WindowManager

uses java.awt.*

public class FrameRules extends Frame {

  internal var _textAreaHelp : TextArea = new TextArea("", 0, 0, TextArea.SCROLLBARS_VERTICAL_ONLY)
  private var _resBundle : ResourceBundle

  public construct() {
    Layout = new BorderLayout(0, 0)
    Visible = false
    _textAreaHelp.setEditable(false)
    _textAreaHelp.setBounds(0, 0, 500, 600)
    Title = "Rules"
    _textAreaHelp.setFont(new Font("Courier", java.awt.Font.PLAIN, 14))
    _textAreaHelp.append("Rules01")
    InitializeFrame()
  }


  private function InitializeFrame() {
    setSize(500, 600)
    add("Center", _textAreaHelp)
    setLocation(50, 50)
    addWindowListener(new WindowManager(this, WindowManager.HIDE_ON_CLOSE))
  }

  override public property set Locale(locale : Locale) : void {
    super.Locale = locale
    _resBundle = ResourceBundle.getBundle(getClass().getName() + "Ress", locale)
    _textAreaHelp.setText(_resBundle.getString("Rules01"))
    Title = _resBundle.getString("Rules")
  }
}
