package com.backesfamily.util

uses java.lang.*
uses java.awt.*
uses java.awt.event.*

public class WindowManager extends WindowAdapter  {

  public static final var HIDE_ON_CLOSE : int = 0
  public static final var DISPOSE_ON_CLOSE : int = 1
  public static final var EXIT_ON_CLOSE : int = 2

  private var _action: int
  private var _window: Window

  public construct(window : Window, action : int) {
    super()
    _window = window
    _action = action
  }

  override public function windowClosing(e : WindowEvent) : void {
    switch (_action) {
      case HIDE_ON_CLOSE:
          _window.setVisible(false)
          break

      case DISPOSE_ON_CLOSE:
          _window.dispose()
          break

      case EXIT_ON_CLOSE:
          _window.dispose()
          System.exit(0)
          break
    }
  }
}
