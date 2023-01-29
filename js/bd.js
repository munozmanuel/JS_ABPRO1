
//El atributo oferta puede ser ajustado como true o false y esto desencadenará algunos cambios en el documento y en la interacción del objeto en el main.js

const productDB = [
    {
        "id": "0",
        "nombre": "Atari 800XL",
        "codigo": "A123",
        "precio": 90000,
        "poferta": 81000,
        "dscto":"10%",
        "oferta": true,
        "img": "assets/img/01_atari.jpg",
        "cantidad": 1,
        "otros": {
            "año": "1980",
        }
    },

    {
        "id": "1",
        "nombre": "Brick Game Tetris",
        "codigo": "T567",
        "precio": 5000,
        "poferta": 4500,
        "dscto":"10%",
        "oferta": false,
        "img": "assets/img/12_tetris_game.jpg",
        "cantidad": 1,
        "otros": {
            "año": "1990",
            "categoria": "puzzle"
        }
    },

    {
        "id": "2",
        "nombre": "Xbox Classic",
        "codigo": "XBX0",
        "precio": 300000,
        "poferta": 255000,
        "dscto":"15%",
        "oferta": true,
        "img": "assets/img/10_xbox.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Microsoft",
            "año": "2001"
        }
    },

    {
        "id": "3",
        "nombre": "Consola Sega Genesis",
        "codigo": "S456",
        "precio": 165000,
        "poferta": 148500,
        "dscto":"10%",
        "oferta": false,
        "img": "assets/img/08_sega.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Sega",
            "generación": "4ta"
        }
    },

    {
        "id": "5",
        "nombre": "Consola Portátil Game Boy",
        "codigo": "GB02",
        "precio": 90000,
        "poferta": 81000,
        "dscto":"10%",
        "oferta": true,
        "img": "assets/img/04_gameboy.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Nintendo",
            "generación": "8va"
        }
    },

    {
        "id": "6",
        "nombre": "Consola Virtual Boy",
        "codigo": "VBOY",
        "precio": 350000,
        "poferta": 315000,
        "dscto":"10%",
        "oferta": false,
        "img": "assets/img/06_virtualboy.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Nintendo",
            "generación": "1era"
        }
    },

    {
        "id": "7",
        "nombre": "Cartucho Juego Tetris NES",
        "codigo": "SN08",
        "precio": 30000,
        "poferta": 24000,
        "dscto":"20%",
        "oferta": true,
        "img": "assets/img/05_tetris.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Atari",
            "generación": "2da"
        }
    },

    {
        "id": "8",
        "nombre": "Consola NES",
        "codigo": "NES0",
        "precio": 230000,
        "poferta": 197500,
        "dscto":"10%",
        "oferta": false,
        "img": "assets/img/09_nes.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Nintendo",
            "generación": "3ra"
        }
    },

    {
        "id": "9",
        "nombre": "Consola SNES",
        "codigo": "SNE5",
        "precio": 220000,
        "poferta": 187000,
        "dscto":"10%",
        "oferta": false,
        "img": "assets/img/07_snes.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Nintendo",
            "generación": "4ta"
        }
    },

    {
        "id": "10",
        "nombre": "Sony Walkman",
        "codigo": "W123",
        "precio": 40000,
        "poferta": 34000,
        "dscto":"15%",
        "oferta": true,
        "img": "assets/img/03_walkman.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Sony",
            "generación": "1era"
        }
    },

    {
        "id": "11",
        "nombre": "Apple Macintosh 1984",
        "codigo": "MA84",
        "precio": 300000,
        "poferta": 255000,
        "dscto":"10%",
        "oferta": false,
        "img": "assets/img/02_mac_.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Apple",
            "generación": "1era",
        }
    },

    {
        "id": "12",
        "nombre": "Chrono Trigger SNES",
        "codigo": "SN14",
        "precio": 250000,
        "poferta": 175000,
        "dscto":"30%",
        "oferta": true,
        "img": "assets/img/11_chrono.jpg",
        "cantidad": 1,
        "otros": {
            "fabricante": "Apple",
            "generación": "1era"
        }
    },
];