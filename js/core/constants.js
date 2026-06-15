/* ============================================================
   THE LEGEND OF MARIA - Constants & Game Data
   ============================================================ */

const TILE_SIZE = 16;
const CANVAS_W = 480;
const CANVAS_H = 320;

const PLAYER_SPEED = 72; // pixels per second
const PLAYER_RUN_SPEED = 128;
const ATTACK_DURATION = 400; // ms
const ATTACK_RANGE = 30;
const ATTACK_COOLDOWN = 600;

const MEMORY_DATA = [
  {
    id: 1,
    title: "Memoria #1",
    subtitle: "El Día que Nos Conocimos",
    text: "Aún recuerdo el momento\nen que te vi por primera vez.\nAlgo me dijo\nque ibas a cambiarlo\ntodo.",
    icon: "✨",
  },
  {
    id: 2,
    title: "Memoria #2",
    subtitle: "Nuestra Primera Cita",
    text: "Mariposas nerviosas.\nMil sonrisas.\nEl comienzo de\nnuestra historia.",
    icon: "🌸",
  },
  {
    id: 3,
    title: "Memoria #3",
    subtitle: "La Primera Vez que Te Vi Bailar",
    text: "Te observé moverse\ny comprendí\npor qué naciste para esto.\nEras pura magia.",
    icon: "💃",
  },
  {
    id: 4,
    title: "Memoria #4",
    subtitle: "Nuestro Primer Aniversario",
    text: "Un año creciendo juntos.\nAprendiéndonos el uno al otro.\nSabiendo que esto era lo correcto.",
    icon: "🎂",
  },
  {
    id: 5,
    title: "Memoria #5",
    subtitle: "Una de Mis Risas Favoritas",
    text: "Tu risa es uno de\nmis sonidos favoritos\nen todo el mundo.\nLas colecciono.",
    icon: "😄",
  },
  {
    id: 6,
    title: "Memoria #6",
    subtitle: "Un Día Difícil que Superamos",
    text: "Los días difíciles me mostraron\nlo fuerte que eres.\nY lo fuertes\nque somos juntos.",
    icon: "💪",
  },
  {
    id: 7,
    title: "Memoria #7",
    subtitle: "Un Hermoso Viaje Juntos",
    text: "Cada lugar se vuelve\nmás hermoso\ncuando lo veo\na través de tus ojos.",
    icon: "🌍",
  },
  {
    id: 8,
    title: "Memoria #8",
    subtitle: "Un Beso Especial",
    text: "Algunos momentos no necesitan palabras.\nSolo necesitan\nser sentidos.",
    icon: "💋",
  },
  {
    id: 9,
    title: "Memoria #9",
    subtitle: "Un Sueño que Compartimos",
    text: "Los sueños son mejores\ncuando tienes a alguien\ncon quien soñarlos.",
    icon: "🌙",
  },
  {
    id: 10,
    title: "Memoria #10",
    subtitle: "Por Qué Te Elijo Cada Día",
    text: "No porque sea fácil.\nSino porque tú\nmereces cada\ndía que pasa.",
    icon: "❤️",
  },
];

const NPC_DIALOGUES = {
  best_friend: [
    [
      "Tatiana",
      "¡María! ¡Ahí estás!",
      "¡No puedo creer que alguien\nrobara tu traje!",
      "¡Y tu pole de competencia también!",
      "¡Tienes que ir a encontrarlos!",
      "¡Creo en ti!",
      "¡Eres la mejor polerina\nque he visto en mi vida!",
    ],
  ],
  old_lady: [
    [
      "Abuela Rosa",
      "Oh, querida niña...",
      "Todo gran sueño\nes puesto a prueba.",
      "El verdadero campeón\nno es el que\nnunca cae...",
      "...sino el que\nsiempre se levanta.",
      "Ve a encontrar lo que es tuyo.",
    ],
  ],
  young_dancer: [
    [
      "Luna",
      "¡Oh! ¡Eres María!",
      "Te he visto practicar.",
      "Sé que te convertirás\nen campeona.",
      "¡Tu pasión es algo\ncomo nunca\nhe visto!",
      "¡No te rindas!",
    ],
  ],
  kid: [
    [
      "Timmy",
      "¿Eres una heroína?",
      "Mi hermana dice\n¡que eres la mejor polerina!",
      "¿Ganarás\nel campeonato?",
      "¡Te voy a animar!",
    ],
  ],
  cat: [
    [
      "Bigotes",
      "...Miau.",
      "...",
      "Miau miau.",
      "Vi algo\nbrillante cerca del bosque.",
      "Mrrau.",
    ],
  ],
  lake_elder: [
    [
      "Anciano Kai",
      "Bienvenida, valiente.",
      "La cueva más allá del lago\nalberga un gran poder.",
      "Pero también gran peligro.",
      "Solo el más puro de corazón\npuede reclamar el Pole Dorado.",
      "Tu espíritu es fuerte.",
      "Sigue adelante.",
    ],
  ],
  lake_girl: [
    [
      "Lily",
      "La Cueva de Cristal...",
      "He oído que el Gorila de Piedra\nla guarda ferozmente.",
      "Pero se dice\nque respeta a quienes\nnunca se rinden.",
      "¿Quizás puedas\nrazonar con él?",
    ],
  ],
  lake_dancer: [
    [
      "Marco",
      "¿Eres María, verdad?",
      "Las noticias viajan rápido.",
      "¡Dicen que derrotaste\nal Sastre de las Sombras!",
      "¡Eso es increíble!",
      "La cueva está justo adelante.",
      "¡Mantente fuerte!",
    ],
  ],
  arena_guard: [
    [
      "Guard Rex",
      "¡Alto!",
      "Solo quienes hayan\nrecuperado ambos objetos sagrados\npueden entrar al Arena.",
      "¿Posees\nel Traje del Campeonato\ny el Pole Dorado?",
      "...¿Sí? Entonces...",
      "Bienvenida, Campeona.",
      "¡El público te espera!",
    ],
  ],
  arena_announcer: [
    [
      "Presentador",
      "¡DAMAS Y CABALLEROS!",
      "¡Bienvenidos a la\nArena del Campeonato!",
      "¡Hoy somos testigos\nde la historia en el presente!",
      "¡María está aquí\ny está LISTA!",
    ],
  ],
};

const BOSS_DATA = {
  shadow_tailor: {
    name: "Sastre de las Sombras",
    hp: 80,
    maxHp: 80,
    speed: 40,
    attackDamage: 1,
    attackRange: 25,
    attackCooldown: 2000,
    color: "#440088",
    dialoguePre: [
      [
        "Sastre de las Sombras",
        "Así que al fin llegaste.",
        "Te he estado esperando.",
        "Si yo no puedo crear\nel traje ganador...",
        "¡Entonces NADIE puede usarlo!",
        "¡Prepárate!",
      ],
    ],
    dialoguePost: [
      [
        "Sastre de las Sombras",
        "Im...posible...",
        "¿En verdad ganaste?",
        "Yo... lo siento.",
        "Aquí. Toma tu traje de vuelta.",
        "Te lo ganaste.",
        "Verdaderamente mereces\nser campeona.",
      ],
    ],
    reward: "costume",
    rewardText: "¡Recuperaste tu\nTraje del Campeonato!",
  },
  stone_gorilla: {
    name: "Gorila de Piedra",
    hp: 120,
    maxHp: 120,
    speed: 35,
    attackDamage: 1,
    attackRange: 30,
    attackCooldown: 1800,
    color: "#334455",
    dialoguePre: [
      [
        "Gorila de Piedra",
        "¡GRRROOOAARRR!",
        "Solo quienes nunca\nse rinden...",
        "...merecen la fuerza verdadera!",
        "¡Muéstrame tu corazón,\npolerina!",
      ],
    ],
    dialoguePost: [
      [
        "Gorila de Piedra",
        "...*retumba*...",
        "Tú... no caíste.",
        "Eres... digna.",
        "Toma el Pole Dorado.",
        "Baila tu camino\nhacia la gloria.",
        "...*se inclina lentamente*...",
      ],
    ],
    reward: "pole",
    rewardText: "¡Recuperaste el\nPole Dorado de Competencia!",
  },
};

const MAP_TRANSITIONS = {
  sunflower_to_forest: { map: "whispering_forest", spawnX: 5, spawnY: 2 },
  forest_to_sunflower: { map: "sunflower_town", spawnX: 22, spawnY: 10 },
  forest_to_lake: { map: "crystal_lake", spawnX: 2, spawnY: 8 },
  lake_to_forest: { map: "whispering_forest", spawnX: 28, spawnY: 14 },
  lake_to_cave: { map: "crystal_cave", spawnX: 2, spawnY: 8 },
  cave_to_lake: { map: "crystal_lake", spawnX: 22, spawnY: 8 },
  cave_to_arena: { map: "championship_arena", spawnX: 15, spawnY: 16 },
  arena_to_cave: { map: "crystal_cave", spawnX: 24, spawnY: 2 },
};

// Tile type IDs
const TILES = {
  GRASS: 0,
  GRASS2: 1,
  FLOWER_PINK: 2,
  FLOWER_YELL: 3,
  PATH: 4,
  PATH_DARK: 5,
  WALL: 6,
  HOUSE_WALL: 7,
  HOUSE_ROOF: 8,
  WATER: 9,
  SAND: 10,
  TREE_TRUNK: 11,
  TREE_TOP: 12,
  FOREST_DARK: 13,
  CAVE_FLOOR: 14,
  CAVE_WALL: 15,
  CRYSTAL: 16,
  ARENA_FLOOR: 17,
  ARENA_STAGE: 18,
  CROWD: 19,
  FENCE: 20,
  DOOR: 21,
  SIGN: 22,
  CHEST: 23,
  SHOP_FRONT: 24,
  BRIDGE: 25,
  LAKE_WATER: 26,
};

// Which tiles block movement
const SOLID_TILES = new Set([
  TILES.WALL,
  TILES.HOUSE_WALL,
  TILES.HOUSE_ROOF,
  TILES.WATER,
  TILES.TREE_TRUNK,
  TILES.TREE_TOP,
  TILES.CAVE_WALL,
  TILES.FENCE,
  TILES.LAKE_WATER,
  TILES.SHOP_FRONT,
  TILES.CROWD,
]);

const COLORS = {
  lavender: "#c8b4ff",
  softPurple: "#9060d0",
  pink: "#ff80c0",
  white: "#ffffff",
  darkBg: "#0a0020",
  uiBorder: "#9040d0",
  heartRed: "#ff4488",
  gold: "#ffd700",
  crystalBlue: "#80d4ff",
  crystalPurp: "#c080ff",
  forestGreen: "#4a8040",
  grassGreen: "#5ea832",
  skyBlue: "#88ccff",
  sunYellow: "#ffe040",
};
