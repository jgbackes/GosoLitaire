package com.backesfamily.gosulitaire.solitaire

uses java.awt.Frame
uses java.awt.Point
uses java.awt.MenuBar
uses java.awt.Menu
uses java.awt.MenuItem
uses java.awt.CheckboxMenuItem
uses java.awt.BorderLayout
uses java.awt.MenuShortcut
uses java.awt.Font
uses java.awt.ScrollPane
uses java.awt.Window

uses java.awt.event.KeyEvent
uses java.awt.event.WindowEvent
uses java.awt.event.ItemListener
uses java.awt.event.ItemEvent

uses java.lang.Integer
uses java.lang.Math

uses java.util.ArrayList
uses java.util.Locale
uses java.util.Random
uses java.util.ResourceBundle

uses com.backesfamily.gosulitaire.card.*
uses com.backesfamily.gosulitaire.util.*
uses com.backesfamily.gosulitaire.solitaire.GameInfo.GameDifficulty
uses com.backesfamily.gosulitaire.stack.*
uses java.lang.RuntimeException

public class Solitaire extends Frame implements StackProvider, GameLevelsProvider {

  public static final var FOUNDATION_STACK_COUNT: int = 4
  public static final var TABLEAU_STACK_COUNT: int = 7
  public static final var FREED_CARDS_CNT: int = 1
  public static final var DECK_POS: Point = new Point(Card.GullySize, Card.GullySize)
  public static final var WASTE_STACK_POSITION: Point = new Point(DECK_POS.x + Card.CardWidth + Card.GullySize, Card.GullySize)
  public static final var FOUNDATION_STACK_POSITION: Point = new Point(WASTE_STACK_POSITION.x + (2 * (Card.CardWidth + Card.GullySize)), DECK_POS.y)
  public static final var TABLEAU_STACK_POSITION: Point = new Point(DECK_POS.x, FOUNDATION_STACK_POSITION.y + Card.CardHeight + Card.GullySize)

  protected static var _resourceBundle: ResourceBundle

  protected var _currentStack: Stack
  protected var _deck: ClassicDeck
  protected var _wasteStack: WasteStack
  protected var _tableauStacks: TableauStack []
  protected var _foundationStacks: FoundationStack []
  protected var _table: Table
  protected var _gameStates: ArrayList<GameState> = new ArrayList<GameState>()
  protected var _legalGameStates: ArrayList<GameState> = new ArrayList<GameState>()
  protected var _hintLocations: ArrayList<Hint> = new ArrayList<Hint>()
  protected var _easyGames: Integer[]
  protected var _normalGames: Integer[]
  protected var _hardGames: Integer[]
  protected var _trickyGames: Integer[]
  protected var _gameInfo: GameInfo = new GameInfo()
  protected var _logLevel : GameState.LogLevel = GameState.LogLevel.NOT_VERBOSE_LOGGING

  private var _menuBar: MenuBar
  private var menuOptions: Menu
  private var menuHelp: Menu
  private var menuItemNewGame: MenuItem
  private var menuItemRestart: MenuItem
  private var menuItemUndo: MenuItem
  private var menuItemLevelRandom: CheckboxMenuItem
  private var menuItemLevelEasy: CheckboxMenuItem
  private var menuItemLevelNormal: CheckboxMenuItem
  private var menuItemLevelHard: CheckboxMenuItem
  private var menuItemLevelTricky: CheckboxMenuItem
  private var menuItemRules: MenuItem
  private var menuItemAbout: MenuItem
  private var menuItemLicense: MenuItem
  private var menuItemHint: CheckboxMenuItem
  private var menuItemEnglish: CheckboxMenuItem
  private var menuItemFrench: CheckboxMenuItem
  private var frameAbout: FrameAbout
  private var frameRules: FrameRules
  private var menuItemEnd: MenuItem
  private var menuItemFelt: CheckboxMenuItem

  public construct() {
    super()
    Layout = new BorderLayout(0, 0)
    Resizable = true
    _menuBar = new MenuBar()
    MenuBar = _menuBar
    menuOptions = new Menu("Options")
    _menuBar.add(menuOptions)
    menuItemNewGame = new MenuItem("NewGame")
    menuItemNewGame.addActionListener(\ evt -> newGame())
    menuItemNewGame.setShortcut(new MenuShortcut(KeyEvent.VK_N, false))
    menuOptions.add(menuItemNewGame)
    menuItemRestart = new MenuItem("Restart")
    menuItemRestart.addActionListener(\ menuEvent -> {
      _gameStates.get(0).restoreGameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, null)
      _gameStates = new ArrayList <GameState>()
      pushGameState(new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, null, null, null, _table))
      var gs = new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, _table)
      _legalGameStates = gs.legalMoves(_hintLocations, NOT_VERBOSE_LOGGING)
      _table.repaint()
    })
    menuItemRestart.setShortcut(new MenuShortcut(KeyEvent.VK_S, false))
    menuOptions.add(menuItemRestart)
    menuItemUndo = new MenuItem("Undo")
    menuItemUndo.addActionListener(\ menuEvent -> {
      if (_gameStates.size() - 2 >= 0) {
        _gameStates.get(_gameStates.size() - 2).restoreGameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, null)
        popGameState()
      }
      var gs = new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, _table)
      _legalGameStates = gs.legalMoves(_hintLocations, _logLevel)
      _table.repaint()
    })
    menuItemUndo.setShortcut(new MenuShortcut(KeyEvent.VK_U, false))
    menuItemUndo.setEnabled(false)
    menuItemLevelRandom = new CheckboxMenuItem( GameDifficulty.RANDOM.Title)
    menuItemLevelRandom.addItemListener(new LevelListener(GameDifficulty.RANDOM))
    menuItemLevelEasy = new CheckboxMenuItem(GameDifficulty.WINNABLE_EASY.Title)
    menuItemLevelEasy.addItemListener(new LevelListener(GameDifficulty.WINNABLE_EASY))
    menuItemLevelNormal = new CheckboxMenuItem(GameDifficulty.WINNABLE_NORMAL.Title)
    menuItemLevelNormal.addItemListener(new LevelListener(GameDifficulty.WINNABLE_NORMAL))
    menuItemLevelHard = new CheckboxMenuItem(GameDifficulty.WINNABLE_HARD.Title)
    menuItemLevelHard.addItemListener(new LevelListener(GameDifficulty.WINNABLE_HARD))
    menuItemLevelTricky = new CheckboxMenuItem(GameDifficulty.WINNABLE_TRICKY.Title)
    menuItemLevelTricky.addItemListener(new LevelListener(GameDifficulty.WINNABLE_TRICKY))
    menuOptions.add(menuItemUndo)
    menuOptions.add(new MenuItem("-"))
    menuOptions.add(menuItemLevelRandom)
    menuOptions.add(menuItemLevelEasy)
    menuOptions.add(menuItemLevelNormal)
    menuOptions.add(menuItemLevelHard)
    menuOptions.add(menuItemLevelTricky)
    menuHelp = new Menu("Help")
    _menuBar.add(menuHelp)
    menuItemRules = new MenuItem("Rules")
    menuItemRules.addActionListener(\ menuEvent -> {
      if (frameRules == null) {
        frameRules = new FrameRules()
      }
      frameRules.Locale = this.getLocale()
      frameRules.Visible = true
    }
    )
    menuItemAbout = new MenuItem("About")
    menuItemAbout.addActionListener(\ menuEvent -> {
          if (frameAbout == null) {
            frameAbout = new FrameAbout()
          }
          frameAbout.Locale = this.getLocale()
          frameAbout.Visible = true
        })
    menuItemLicense = new MenuItem()
    menuItemLicense.addActionListener(\ menuEvent -> {
      var title= _resourceBundle.getString("License")
      var msg= _resourceBundle.getString("LicenseText")
      var licenseWindow = new DialogMsg(null, title, true, msg)
      licenseWindow.setLocation(20, 20)
      licenseWindow.setSize(500, 300)
      licenseWindow.Font = new Font("Arial", java.awt.Font.PLAIN, 14)
      licenseWindow.Resizable = true
      licenseWindow.Visible = true
    })
    menuHelp.add(menuItemRules)
    menuHelp.add(new MenuItem("-"))
    menuHelp.add(menuItemAbout)
    menuHelp.add(menuItemLicense)
    menuHelp.add(new MenuItem("-"))

    menuItemHint = new CheckboxMenuItem("Hint")
    menuItemHint.setShortcut(new MenuShortcut(KeyEvent.VK_H, false))
    menuItemHint.setState(true)
    menuItemHint.addItemListener(\ menuEvent -> {
      if (_table != null) {
        _table.repaint()
      }
    })
    menuHelp.add(menuItemHint)

    menuItemFelt = new CheckboxMenuItem("Felt")
    menuItemFelt.setShortcut(new MenuShortcut(KeyEvent.VK_F, false))
    menuItemFelt.setState(true)
    menuItemFelt.addItemListener(\ menuEvent -> {
      if (_table != null) {
        _table.repaint()
      }
    })
    menuHelp.add(menuItemFelt)

    menuHelp.add(new MenuItem("-"))

    menuItemEnd = new MenuItem("Quick End")
    menuItemEnd.addActionListener(\ menuEvent -> {
      if (_table != null) {
        var gg = new GameGenerator(this)
        gg.generateEndGame()
        _table.repaint()
      }
    })
    menuHelp.add(menuItemEnd)

    menuHelp.add(new MenuItem("-"))

    menuItemEnglish = new CheckboxMenuItem("English")
    menuItemEnglish.addItemListener(new LocaleListener(java.util.Locale.ENGLISH))
    menuItemFrench = new CheckboxMenuItem("French")
    menuItemFrench.addItemListener(new LocaleListener(java.util.Locale.FRENCH))
    menuHelp.add(menuItemEnglish)
    menuHelp.add(menuItemFrench)

    // Now setup the table for drawing cards and messages
    _table = new Table(this, this)
    var mouseManager = new MouseManager(this)
    _table.addMouseListener(mouseManager)
    _table.addMouseMotionListener(mouseManager)
    setupWinnable()
    InitializeFrame()
    Visible = true
  }

  public final function InitializeFrame() {
    GameType = GameDifficulty.RANDOM
    var cardWidthPlusGully = Card.CardWidth + Card.GullySize
    var frameWidth = getInsets().left + 20 + (cardWidthPlusGully * TABLEAU_STACK_COUNT) + 20 + getInsets().right
    var frameHeight = Card.CardHeight * 6
    setSize(Math.min(frameWidth, 1024), Math.min(frameHeight, 768))
    addWindowListener(new SolitaireWindowManager(this))
    var scrollPane = new ScrollPane(ScrollPane.SCROLLBARS_AS_NEEDED)
    scrollPane.add("Center", _table)
    scrollPane.add(new Sparkle())
    add(scrollPane)
    newGame()
  }

  override public property set Locale(locale: Locale) {
    super.Locale = locale
    _resourceBundle = ResourceBundle.getBundle(getClass().getName() + "Ress", locale)
    menuOptions.setLabel(_resourceBundle.getString("Options"))
    menuItemNewGame.setLabel(_resourceBundle.getString("NewGame"))
    menuHelp.setLabel(_resourceBundle.getString("Help"))
    menuItemRules.setLabel(_resourceBundle.getString("Rules"))
    menuItemAbout.setLabel(_resourceBundle.getString("About"))
    menuItemLicense.setLabel(_resourceBundle.getString("License"))
    menuItemEnglish.setLabel(_resourceBundle.getString("English"))
    menuItemFrench.setLabel(_resourceBundle.getString("French"))
    menuItemHint.setLabel(_resourceBundle.getString("Hint"))
    menuItemRestart.setLabel(_resourceBundle.getString("Restart"))
    menuItemUndo.setLabel(_resourceBundle.getString("Undo"))
    menuItemLevelRandom.setLabel(_resourceBundle.getString("LevelRandom"))
    menuItemLevelEasy.setLabel(_resourceBundle.getString("LevelEasy"))
    menuItemLevelNormal.setLabel(_resourceBundle.getString("LevelNormal"))
    menuItemLevelHard.setLabel(_resourceBundle.getString("LevelHard"))
    menuItemLevelTricky.setLabel(_resourceBundle.getString("LevelTricky"))
    menuItemEnglish.setState(java.util.Locale.ENGLISH == locale)
    menuItemFrench.setState(java.util.Locale.FRENCH == locale)
    Title = _resourceBundle.getString("Solitaire")
    if (frameAbout != null) {
      frameAbout.Locale = locale
    }
    if (frameRules != null) {
      frameRules.Locale = locale
    }
    if (_table != null) {
      _table.repaint()
    }
  }

  public property set GameType(gameType: GameDifficulty): void {
      this._gameInfo.Type = gameType
      menuItemLevelRandom.setState(GameDifficulty.RANDOM == gameType)
      menuItemLevelEasy.setState(GameDifficulty.WINNABLE_EASY == gameType)
      menuItemLevelNormal.setState(GameDifficulty.WINNABLE_NORMAL == gameType)
      menuItemLevelHard.setState(GameDifficulty.WINNABLE_HARD == gameType)
      menuItemLevelTricky.setState(GameDifficulty.WINNABLE_TRICKY == gameType)
    }

  private function pushGameState(state: GameState): void {
    _gameStates.add(state)
    menuItemUndo.setEnabled(_gameStates.size() > 1)
  }

  private function popGameState(): void {
    _gameStates.remove(_gameStates.size() - 1)
    menuItemUndo.setEnabled(_gameStates.size() > 1)
  }

  public static function main(args: String[]): void {
    var loc = Locale.ENGLISH
    var sol = new Solitaire()
    sol.Locale = loc
  }

  public function validateAllStacks() : void {
    var cardCount = _deck.Count
    cardCount += _wasteStack.Count
    cardCount += _tableauStacks*.Count.sum()
    cardCount += _foundationStacks*.Count.sum()

    if (cardCount != 52) {
      throw new RuntimeException("Cardcount error count is ${cardCount}")
    }
  }

  public function newGame(): void {
    _gameInfo.Seed=- 1
    var aRandom = new Random()
    if (_gameInfo.Type == GameDifficulty.WINNABLE_EASY) {
      _gameInfo.Seed = _easyGames[aRandom.nextInt(_easyGames.length)]
    } else if (_gameInfo.Type == GameDifficulty.WINNABLE_NORMAL) {
      _gameInfo.Seed = _normalGames[aRandom.nextInt(_normalGames.length)]
    } else if (_gameInfo.Type == GameDifficulty.WINNABLE_HARD) {
      _gameInfo.Seed = _hardGames[aRandom.nextInt(_hardGames.length)]
    } else if (_gameInfo.Type == GameDifficulty.WINNABLE_TRICKY) {
      _gameInfo.Seed = _trickyGames[aRandom.nextInt(_trickyGames.length)]
    }

    if (_gameInfo.Seed == - 1) {
      _gameInfo.Seed = aRandom.nextInt(1000000)
    }
    _deck = new ClassicDeck(Directions.SPREAD_NONE, 0)
    _deck.shuffle(_gameInfo.Seed)
    _deck.StackLocation = new Point(DECK_POS.x, DECK_POS.y)

    _wasteStack = new WasteStack(Directions.SPREAD_NONE, 0)
    _wasteStack.StackLocation = new Point(WASTE_STACK_POSITION.x, WASTE_STACK_POSITION.y)

    _foundationStacks = new FoundationStack [FOUNDATION_STACK_COUNT]
    for (i in 0..|FOUNDATION_STACK_COUNT) {
      _foundationStacks[i] = new FoundationStack(Directions.SPREAD_NONE, 0)
      _foundationStacks[i].StackLocation = new Point(FOUNDATION_STACK_POSITION.x + i * (Card.CardWidth + 5), FOUNDATION_STACK_POSITION.y)
    }

    _tableauStacks = new TableauStack [TABLEAU_STACK_COUNT]
    for (i in 0..|TABLEAU_STACK_COUNT) {
      _tableauStacks[i] = new TableauStack(Directions.SPREAD_SOUTH, Card.VerticalOffset)
      _tableauStacks[i].StackLocation = new Point(TABLEAU_STACK_POSITION.x + i * (Card.CardWidth + 5), TABLEAU_STACK_POSITION.y)
    }

    _currentStack = new DefaultMutableStack(Directions.SPREAD_SOUTH, 20)
    distributeCards()
    if (_table != null) {
      _table.repaint()
    }
  }

  override public function getNewCards(): void {
    if (_deck.Empty) {
      while (!_wasteStack.Empty) {
        var card= (_wasteStack.pop() as ClassicCard)
        card.turnFaceDown()
        _deck.push(card)
      }
    }
    var i = 0
    while (!_deck.Empty and i < FREED_CARDS_CNT) {
      var card= (_deck.pop() as ClassicCard)
      card.turnFaceUp()
      _wasteStack.push(card)
      i++
    }
    pushGameState(new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, null, null, null, _table))
    var gs = new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, _table)
    _legalGameStates = gs.legalMoves(_hintLocations, _logLevel)
    if (_table != null) {
      _table.repaint()
    }
  }

  /**
   * Handle the movement of a sub-stack of cards from one stack to another
   *
   * @param currentStack The sub-stack of cards that will be moved
   * @param sourceStack The stack that held the sub-stack
   * @param destinationStack The stack where the sub-stack will be dropped
  */
  override public function doPlay(currentStack: Stack, sourceStack: Stack, destinationStack: Stack): void {
    if (currentStack != null) {
      currentStack.reverse()
    }
    if (destinationStack != null and destinationStack.isValid(currentStack)) {
      while (!currentStack.Empty) {
        destinationStack.push(currentStack.pop())
      }
      if (!sourceStack.Empty and sourceStack.Top.FaceDown) {
        var topCard= (sourceStack.Top as ClassicCard)
        topCard.turnFaceUp()
      }
      pushGameState(new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, null, null, null, _table))

      if (GameWon) {
        congratulate()
      }
    } else {
      while (!currentStack.Empty) {
        sourceStack.push(currentStack.pop())
      }
    }

    var gameState = new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, _table)
    _legalGameStates = gameState.legalMoves(_hintLocations, _logLevel)

    if (_table != null) {
      _table.repaint()
    }
    validateAllStacks()
  }

  private function distributeCards(): void {
    _tableauStacks.eachWithIndex( \ tableauStack, i -> {
      var card= (_deck.pop() as ClassicCard)
      card.turnFaceUp()
      tableauStack.push(card)
      for(j in i+1..|TABLEAU_STACK_COUNT) {
        _tableauStacks[j].push(_deck.pop())
      }
    })
    pushGameState(new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, null, null, null, _table))
    var gameState = new GameState(_gameInfo, _deck, _wasteStack, _tableauStacks, _foundationStacks, _table)
    _legalGameStates = gameState.legalMoves(_hintLocations, _logLevel)
  }

  public property get GameWon() : boolean {
    var gameWon = this._deck.Empty and this._wasteStack.Empty and _tableauStacks.where(\elt -> !elt.Empty).Count == 0
    return (gameWon)
  }

  private function congratulate(): void {
    var f = new FrameCongratulations()
    f.Visible = true
  }

  private function setupWinnable(): void {
    _easyGames = new Integer[]{6, 17, 18, 37, 52, 79, 142, 202, 225, 300, 442, 450, 462, 494, 558, 629, 634, 642, 657, 664, 685, 766, 781, 822, 860, 870, 873, 888, 913, 920, 930, 987, 1027, 1056, 1063, 1099, 1148, 1164, 1228, 1229, 1251, 1254, 1255, 1334, 1353, 1360, 1378, 1390, 1464, 1502, 1563, 1587, 1627, 1639, 1649, 1735, 1742, 1755, 1780, 1855, 1891, 1920, 1960, 1989, 1993, 2004, 2040, 2090, 2094, 2119, 2180, 2250, 2253, 2272, 2284, 2358, 2364, 2385, 2403, 2409, 2414, 2420, 2463, 2481, 2500, 2511, 2513, 2530, 2533, 2678, 2686, 2689, 2753, 2759, 2789, 2809, 2885, 2914, 2985, 2997}
    _normalGames = new Integer[]{0, 39, 47, 99, 186, 195, 207, 211, 259, 319, 382, 437, 536, 568, 662, 692, 734, 737, 738, 759, 773, 836, 839, 866, 899, 906, 1005, 1014, 1043, 1116, 1196, 1223, 1306, 1321, 1331, 1338, 1409, 1412, 1431, 1453, 1467, 1483, 1486, 1528, 1559, 1601, 1643, 1648, 1670, 1703, 1712, 1713, 1716, 1752, 1785, 1885, 1900, 1935, 1936, 1941, 2018, 2033, 2074, 2075, 2087, 2104, 2112, 2149, 2167, 2174, 2182, 2212, 2227, 2234, 2260, 2287, 2295, 2305, 2311, 2313, 2341, 2354, 2395, 2451, 2482, 2504, 2553, 2603, 2622, 2623, 2625, 2656, 2657, 2675, 2710, 2765, 2812, 2858, 2927, 2946, 2974}
    _hardGames = new Integer[]{23, 58, 86, 106, 126, 134, 140, 169, 236, 260, 290, 320, 452, 458, 501, 502, 534, 561, 636, 676, 696, 729, 762, 806, 815, 861, 862, 869, 880, 932, 958, 1037, 1093, 1098, 1129, 1135, 1142, 1155, 1200, 1224, 1236, 1344, 1364, 1396, 1405, 1455, 1476, 1489, 1497, 1541, 1589, 1614, 1650, 1665, 1676, 1696, 1710, 1719, 1744, 1779, 1838, 1850, 1868, 1906, 1930, 1967, 1994, 1998, 2047, 2057, 2076, 2077, 2144, 2146, 2150, 2193, 2220, 2256, 2322, 2331, 2398, 2399, 2413, 2416, 2422, 2434, 2435, 2488, 2490, 2506, 2520, 2569, 2709, 2743, 2820, 2861, 2886, 2893, 2961, 2983}
    _trickyGames = new Integer[]{1, 7, 14, 40, 50, 65, 67, 123, 157, 184, 185, 194, 328, 372, 408, 447, 484, 498, 509, 548, 559, 571, 581, 613, 660, 661, 680, 782, 852, 855, 903, 910, 915, 961, 965, 1090, 1108, 1131, 1153, 1179, 1188, 1193, 1212, 1214, 1217, 1318, 1325, 1333, 1388, 1403, 1425, 1437, 1473, 1475, 1487, 1507, 1516, 1619, 1624, 1631, 1640, 1654, 1673, 1679, 1688, 1761, 1783, 1853, 1875, 1948, 2011, 2032, 2041, 2043, 2053, 2108, 2139, 2277, 2301, 2400, 2417, 2428, 2474, 2478, 2627, 2646, 2684, 2724, 2760, 2770, 2790, 2848, 2859, 2868, 2884, 2909, 2925, 2934, 2941, 2962}
  }


  // DefaultMutableStack Provider Interface Implementation

  override property get CurrentStack(): Stack {
    return _currentStack
  }

  override property set CurrentStack(stack : Stack) : void {
    _currentStack = stack
  }

  override property get Deck(): ClassicDeck {
    return _deck
  }

  override property get TableauStacks() : TableauStack [] {
    return _tableauStacks
  }

  override property get FoundationStacks() : FoundationStack [] {
    return _foundationStacks
  }

  override property get Table(): Table {
    return _table
  }

  override property get WasteStack(): WasteStack {
    return _wasteStack
  }

  // GameLevelsProvider Interface Implementation

  override property get EasyGames(): Integer[] {
    return _easyGames
  }

  override property get NormalGames(): Integer[] {
    return _normalGames
  }

  override property get HardGames(): Integer[] {
    return _hardGames
  }

  override property get TrickyGames(): Integer[] {
    return _trickyGames
  }

  override property get HintEnabled(): boolean {
    return menuItemHint.State
  }

  override property get FeltEnabled(): boolean {
    return menuItemFelt.State
  }

  override property get ResBundle(): ResourceBundle {
    return _resourceBundle
  }

  override property get GameInfo(): GameInfo {
    return _gameInfo
  }

  override property get HintLocations(): ArrayList<Hint> {
    return _hintLocations
  }

  // #################################### Private Classes

  class SolitaireWindowManager extends WindowManager {
    construct(window: Window) {
      super(window, WindowManager.EXIT_ON_CLOSE)
    }

    override public function windowClosing(e: WindowEvent): void {
      if (frameAbout != null) {
        frameAbout.dispose()
        frameAbout = null
      }
      if (frameRules != null) {
        frameRules.dispose()
        frameRules = null
      }
      super.windowClosing(e)
    }
  }

  class LocaleListener implements ItemListener {
    internal var locale: Locale
    public construct(theLocale: Locale) {
      this.locale = theLocale
    }

    override public function itemStateChanged(e: ItemEvent): void {
      outer.Locale = locale
      var card = new ClassicCard(Value.V_10, Suit.CLUB)
      card.loadCardImages(locale)
    }
  }

  class LevelListener implements ItemListener {
    internal var level: GameDifficulty
    public construct(theLevel: GameDifficulty) {
      this.level = theLevel
    }

    override public function itemStateChanged(e: ItemEvent): void {
      outer.GameType = level
      outer.newGame()
    }
  }
}
