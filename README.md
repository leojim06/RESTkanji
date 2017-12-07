# REST Kanji
## API de sistemas de escritura Japones
Servidor del proyecto de aprendizaje de Japones.

Obtiene información acerca de los sistemas de escritura japonés hiragana, katakana y kanji a través de la RESTful API

- Kanji
- Hiragana
- Katakana

Versión actual 1.0.0

## API ENDPOINTS
A continuación se presentas las rutas de acceso para obtener los recursos de la API

### TODO LA INFORMACIÓN EN LOS RECURSOS
- [Kanas](https://restkanji.herokuapp.com/api/v1/kanas)
- [Hiragana](https://restkanji.herokuapp.com/api/v1/kanas/hiragana)
- [Katakana](https://restkanji.herokuapp.com/api/v1/kanas/katakana)
- [Kanji](https://restkanji.herokuapp.com/api/v1/kanjis)

### BÚSQUEDAS
Se pueden hacer búsquedas con las siguientes referencias. Tenga en cuenta que se pueden hacer convinatorias de los parametros de búsqueda

```
count: Conteo de elementos
Ejm: ?count=4
```
```
letter: Letra por la cual se busca un recurso
Ejm: ?letter=あ
```
```
limit: Limitar cantidad de recursos a recibir
Ejm: ?limit=4
```
```
skip: Saltar los primeros n recursos
Ejm: ?skip=4
```
```
page: Paginación, recupera por defecto 10 elementos por página
Ejm: ?page=1
```
```
Búsqueda: Ejemplo de varios parametros de búsqueda
Ejm: ?page=1&limit=5&skip=5
```
Para ver un ejempo del resultado de busqudas acceder al siguiente link: https://restkanji.herokuapp.com/api/v1/kanas/?page=1&limit=5&skip=5

Además los parametros de busqueda son aplicables a la lista completa de kanas o a los hiraganas y katakanas especificamente

Kanas: https://restkanji.herokuapp.com/api/v1/kanas?page=1&limit=5&skip=5

Hiragana https://restkanji.herokuapp.com/api/v1/kanas/hiragana?page=1&limit=5&skip=5

Katakana https://restkanji.herokuapp.com/api/v1/kanas/katakana?page=1&limit=5&skip=5

Kanji https://restkanji.herokuapp.com/api/v1/kanjis?page=1&limit=1


### ID - Identificador único
Cáda recurso tiene un identificador único para su recuperación

ID del recurso https://restkanji.herokuapp.com/api/v1/kanas/:id

### Ejemplos de respuesta de los recursos
Las respuestas a las peticiones del usuario se presentan en formato JSON modificado para una mejor comprensión para las personas
```JSON
Kana
{
  "_id": "5938af64100bc91b9c47ea9f",
  "symbol": "あ",
  "strokes": 3,
  "shape": "Hiragana"
}
```

```JSON
Kanji
{
  "_id": "593c6003fa529c10785ba92d",
  "kanji": "二",
  "onYomi": {
    "reading": [
      "二"
      ],
    "meaning": [
      "dos"
      ]
  },
  "kunYomi": {
    "reading": [
      "ふた",
      "ふた。つ"
    ],
    "meaning": [
      "2",
      "dos"
    ]
  },
  "KAC": 2,
  "radical": "二",
  "strokes": 2,
  "level": 1,
  "dictionary": [
    {
      "_id": "593ca90c46661f1604ad6579",
      "word": "二月",
      "reading": "にがつ",
      "meaning": [
        "Febrero"
        ],
      "abrev": []
    },
    {
      "_id": "593ca92846661f1604ad657a",
      "word": "二日",
      "reading": "ふつか",
      "meaning": [
        "día 2"
      ],
      "abrev": []
    },
    {
      "_id": "593ca93c46661f1604ad657b",
      "word": "二回",
      "reading": "にかい",
      "meaning": [
        "dos veces"
      ],
      "abrev": []
    },
    {
      "_id": "593ca94d46661f1604ad657c",
      "word": "二元",
      "reading": "にげん",
      "meaning": [
        "dualidad"
      ],
      "abrev": [
        {
          "abrev": "na",
          "meaning": "Nombre adjetival, se forma adjetivo con na (な)"
        },
        {
          "abrev": "tna",
          "meaning": "Se forma adjetivo con teki na (的な)"
        }
      ]
    },
    {
      "_id": "593ca95f46661f1604ad657d",
      "word": "二国間",
      "reading": "にこくかん",
      "meaning": [
        "bilateral"
      ],
      "abrev": [
        {
          "abrev": "no",
          "meaning": "Se forma adjetivo con no (の)"
        }
      ]
    },
    {
      "_id": "593ca96f46661f1604ad657e",
      "word": "二世",
      "reading": "にせい",
      "meaning": [
        "el segundo",
        "seguna generación",
        "el hijo",
        "el joven"
        ],
      "abrev": []
    },
    {
      "_id": "593ca97d46661f1604ad657f",
      "word": "二乗",
      "reading": "にじょう",
      "meaning": [
        "(al) cuadrado",
        "multiplicado por sí mismo"
      ],
      "abrev": []
    },
    {
      "_id": "593ca98d46661f1604ad6580",
      "word": "二価",
      "reading": "にか",
      "meaning": [
        "bivalente"
      ],
      "abrev": []
    }
  ]
}
```