package com.backesfamily.gosulitaire.util

uses java.awt. *
uses java.util. *

public class FrameAbout extends Frame {
  private static final var CARD_ABOUT= "About"
  private static final var CARD_CREDITS= "Credits"

  //private var cardLayout: CardLayout
  private var aboutPanel: Panel
  private var creditsPanel: Panel
  private var versionLabel: Label
  private var picturePanel: ImagePanel
  private var bottomPanel: Panel
  private var showCreditsButton: Button
  private var creditsLabel: Label
  private var creditsText: TextArea
  private var hideCreditsButton: Button
  private var buttonsPanel: Panel
  private var authorPanel: Panel
  private var dateLabel: Label
  private var authorLabel: Label
  private var emailLabel: Label
  private var webSiteLabel: Label
  private var resourceBundle: ResourceBundle

  public construct() {
    Layout = new CardLayout()
    aboutPanel = new Panel(new BorderLayout())
    aboutPanel.setBackground(Color.white)
    picturePanel = new ImagePanel(BufferedImageLoader.getBufferedImageFromRelativePathToClass("logo.png", getClass()))
    bottomPanel = new Panel(new BorderLayout())
    buttonsPanel = new Panel(new BorderLayout())
    showCreditsButton = new Button()
    showCreditsButton.addActionListener(\ evt -> showCredits())
    buttonsPanel.add(showCreditsButton, BorderLayout.SOUTH)
    authorPanel = new Panel(new GridLayout(0, 1))
    versionLabel = new Label("", Label.RIGHT)
    authorLabel = new Label("", Label.RIGHT)
    emailLabel = new Label("", Label.RIGHT)
    webSiteLabel = new Label("", Label.RIGHT)
    dateLabel = new Label("", Label.RIGHT)
    authorPanel.add(versionLabel)
    authorPanel.add(authorLabel)
    authorPanel.add(emailLabel)
    authorPanel.add(webSiteLabel)
    authorPanel.add(dateLabel)
    bottomPanel.add(buttonsPanel, BorderLayout.WEST)
    bottomPanel.add(authorPanel, BorderLayout.EAST)
    aboutPanel.add(picturePanel, BorderLayout.CENTER)
    aboutPanel.add(bottomPanel, BorderLayout.SOUTH)
    creditsPanel = new Panel(new BorderLayout(5, 5))
    creditsPanel.setBackground(Color.white)
    creditsLabel = new Label()
    creditsText = new TextArea()
    hideCreditsButton = new Button()
    hideCreditsButton.addActionListener(\ evt -> hideCredits())
    creditsPanel.add(creditsLabel, BorderLayout.NORTH)
    creditsPanel.add(creditsText, BorderLayout.CENTER)
    creditsPanel.add(hideCreditsButton, BorderLayout.SOUTH)
    hideCredits()
    InitializeFrame()
  }

  private final function InitializeFrame() {
    add(aboutPanel, CARD_ABOUT)
    add(creditsPanel, CARD_CREDITS)
    addWindowListener(new WindowManager(this, WindowManager.HIDE_ON_CLOSE))
    pack()
  }

  override public property get Insets(): Insets {
    var insets= super.getInsets()
    var top= insets.top + 10
    var right= insets.right + 10
    var bottom= insets.bottom + 10
    var left= insets.left + 10
    return (new Insets(top, right, bottom, left))
  }

  override public property set Visible(visible: boolean): void {
    var scrSize= getToolkit().getScreenSize()
    var size= getSize()
    if (visible) {
      setLocation((scrSize.width - size.width) / 2, (scrSize.height - size.height) / 2)
    }
    hideCredits()
    super.Visible = visible
  }

  override public property set Locale(locale: Locale): void {
    super.Locale = locale
    resourceBundle = ResourceBundle.getBundle(getClass().getName() + "Ress", locale)
    showCreditsButton.setLabel(resourceBundle.getString("ShowCredits"))
    hideCreditsButton.setLabel(resourceBundle.getString("HideCredits"))
    creditsLabel.setText(resourceBundle.getString("CreditsTitle"))
    creditsText.setText(resourceBundle.getString("Credits"))
    versionLabel.setText(resourceBundle.getString("Version") + " " + resourceBundle.getString("VersionNumber"))
    authorLabel.setText(resourceBundle.getString("By") + " : " + resourceBundle.getString("Author"))
    dateLabel.setText(resourceBundle.getString("Copyright"))
    emailLabel.setText(resourceBundle.getString("Email"))
    webSiteLabel.setText(resourceBundle.getString("WebSite"))
    Title = resourceBundle.getString("About") + " " + resourceBundle.getString("Solitaire")
  }

  private function showCredits(): void {
    (getLayout() as CardLayout).show(this, CARD_CREDITS)
  }

  private function hideCredits(): void {
    (getLayout() as CardLayout).show(this, CARD_ABOUT)
  }


  public static function main(args : String[]): void {
    var f = new FrameAbout()
    f.Visible = true
  }
}
