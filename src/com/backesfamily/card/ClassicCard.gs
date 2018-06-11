package com.backesfamily.card

uses com.backesfamily.util.BufferedImageLoader

uses java.awt.Color
uses java.awt.Image
uses java.awt.Graphics
uses java.awt.geom.RoundRectangle2D
uses java.lang.InterruptedException
uses java.lang.StringBuffer
uses java.util.Hashtable
uses com.backesfamily.util.SpriteSheetInfo
uses com.backesfamily.util.SpriteSheet
uses java.util.Locale

public class ClassicCard extends Card {
  public static final var STRING_HIDDEN: String = "X"
  public static final var CARD_COLOR: Color = Color.blue

  private static var _images : Hashtable <String, Image>

  private var _suit: Suit
  private var _value: Value
  private var _imageName: String
  private var _isLegal: boolean
  private var _image: Image

  public construct(card: ClassicCard) {
    super()
    this._image = card._image
    this._imageName = card._imageName
    this._suit = card._suit
    this._value = card._value
    InitializeClassicCard(card)
  }

  public construct(theValue: Value, theSuit: Suit) {
    super()
    this._suit = theSuit
    this._value = theValue
    this._imageName = "${theSuit.toString()}/${theValue.toString()}"
    this._isLegal = false
    turnFaceDown()
  }

  private final function InitializeClassicCard(card: ClassicCard) {
    if (_images == null) {
      loadCardImages(java.util.Locale.ENGLISH)
    }
    this.Location = card.Location
    if (card.FaceDown) {
      this.turnFaceDown()
    } else {
      this.turnFaceUp()
    }
  }

  public property get Legal(): boolean {
    return _isLegal
  }

  public property set Legal(isLegal: boolean): void {
    this._isLegal = isLegal
  }

  public property get Color(): Color {
    return (_suit == com.backesfamily.card.Suit.SPADE or _suit == com.backesfamily.card.Suit.CLUB)
        ? java.awt.Color.BLACK
        : java.awt.Color.RED
  }

  public property get Value(): Value {
    return _value
  }

  public property get Suit(): Suit {
    return _suit
  }

  override public function equals(obj: Object): boolean {
    if (!(obj typeis ClassicCard)) {
      return false
    }
    var card = obj as ClassicCard
    return FaceDown == card.FaceDown and _suit == card._suit and _value == card._value
  }

  override public function toString(): String {
    var strBufTemp = new StringBuffer()
    if (FaceDown) {
      strBufTemp.append(STRING_HIDDEN)
    }
    strBufTemp.append(_value.toString())
    strBufTemp.append(_suit.toString())
    if (FaceDown) {
      strBufTemp.append(STRING_HIDDEN)
    }

    strBufTemp.append(" ")
    strBufTemp.append(Location)
    return strBufTemp.toString()
  }

  override public function paint(g: Graphics, hint: boolean): void {
    var location= Location
    var border= new RoundRectangle2D.Double(
          location.x - 1
        , location.y - 1
        , Size.width + 1
        , Size.height + 1
        , BorderArc
        , BorderArc)
    var oldClip = g.getClipBounds()
    g.setClip(border)
    g.setColor(java.awt.Color.white)
    g.fillRect(location.x
        , location.y
        , Size.width - 1
        , Size.height - 1)
    if (FaceDown) {
      var cardBack = _images.get("Back")
      if (cardBack != null) {
        g.drawImage(cardBack
            , location.x
            , location.y
            , Size.width
            , Size.height
            , null)
      }
    } else {
      var cardFront= _images.get(_imageName)
      if (cardFront != null) {
        g.drawImage(cardFront
            , location.x
            , location.y
            , Size.width
            , Size.height
            , null)
      }
      if (hint) {
        if (this._isLegal) {
          cardFront = _images.get("Legal")
          if (cardFront != null) {
            g.drawImage(cardFront
                , location.x + 1
                , location.y + 1
                , null)
          }
        }
      }
    }
    g.setClip(oldClip)
    g.setColor(java.awt.Color.BLACK)
    g.drawRoundRect(location.x
        , location.y
        , Size.width - 1
        , Size.height - 1
        , BorderArc
        , BorderArc)
  }

  public final function loadCardImages(locale: Locale) {
    _images = new Hashtable<String, Image>()
    var spriteSheetFileName = locale.toString()+"_Cards.png"
    loadCardImages(spriteSheetFileName)
  }

  private function loadAnImage(imageName: String) {
    var theImage = BufferedImageLoader.getBufferedImageFromRelativePathToClass(imageName + ".png", ClassicCard)
    _images.put(imageName, theImage)
  }

  private function loadCardImages(sprintSheetFileName: String) {
    var spriteSheetInfo = new SpriteSheetInfo(13, 5, Card.CardWidth, Card.CardHeight)
    var spriteSheet = new SpriteSheet(sprintSheetFileName, spriteSheetInfo,  true)

    for (i in 0..|Value.values().length) {
      for (j in 0..|Suit.values().Count) {
        var imageName= "${Suit.values()[j].toString()}/${Value.values()[i].toString()}"
        var image = spriteSheet.getCachedSprite(i, j)

        _images.put(imageName, image)
      }
    }
    loadAnImage("Legal")
    loadAnImage("Back")
    loadAnImage("Foundation")
    loadAnImage("Deck")
    loadAnImage("Tableau")
    loadAnImage("Table")
    loadAnImage("Waste")
    try {
    } catch (e: InterruptedException) {
    }
  }

  public static property get FoundationCard(): Image {
    return _images.get("Foundation")
  }

  public static property get DeckCard(): Image {
    return _images.get("Deck")
  }

  public static property get TableauCard(): Image {
    return _images.get("Tableau")
  }

  public static property get TableImage(): Image {
    return _images.get("Table")
  }

  public static property get WasteCard() : Image {
    return _images.get("Waste")
  }
}
