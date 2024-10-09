enum Genre {
  Action = 'Action',
  Adventure = 'Adventure',
  Cars = 'Cars',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Fantasy = 'Fantasy',
  Horror = 'Horror',
  MahouShoujo = 'Mahou Shoujo',
  Mecha = 'Mecha',
  Music = 'Music',
  Mystery = 'Mystery',
  Psychological = 'Psychological',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
  SliceOfLife = 'Slice of Life',
  Sports = 'Sports',
  Supernatural = 'Supernatural',
  Thriller = 'Thriller',
}

enum Season {
  Winter = 'WINTER',
  Spring = 'SPRING',
  Summer = 'SUMMER',
  Fall = 'FALL',
}

enum Format {
  TV = 'TV',
  TVShort = 'TV_SHORT',
  OVA = 'OVA',
  ONA = 'ONA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Music = 'MUSIC',
}

enum Status {
  Releasing = 'RELEASING',
  NotYetReleased = 'NOT_YET_RELEASED',
  Finished = 'FINISHED',
  Cancelled = 'CANCELLED',
  Hiatus = 'HIATUS',
}

enum Sort {
  PopularityDesc = 'POPULARITY_DESC',
  Popularity = 'POPULARITY',
  TrendingDesc = 'TRENDING_DESC',
  Trending = 'TRENDING',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UpdatedAt = 'UPDATED_AT',
  StartDateDesc = 'START_DATE_DESC',
  StartDate = 'START_DATE',
  EndDateDesc = 'END_DATE_DESC',
  EndDate = 'END_DATE',
  FavouritesDesc = 'FAVOURITES_DESC',
  Favourites = 'FAVOURITES',
  ScoreDesc = 'SCORE_DESC',
  Score = 'SCORE',
  TitleRomajiDesc = 'TITLE_ROMAJI_DESC',
  TitleRomaji = 'TITLE_ROMAJI',
  TitleEnglishDesc = 'TITLE_ENGLISH_DESC',
  TitleEnglish = 'TITLE_ENGLISH',
  TitleNativeDesc = 'TITLE_NATIVE_DESC',
  TitleNative = 'TITLE_NATIVE',
  EpisodesDesc = 'EPISODES_DESC',
  Episodes = 'EPISODES',
  Id = 'ID',
  IdDesc = 'ID_DESC',
}

export { Genre, Season, Format, Status, Sort }
