export interface SeasonRecord {
  season: string;
  team: string;
  category: "club" | "international";
  matches: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

export const cr7SeasonsData: SeasonRecord[] = [
  { season: "2002-03", team: "Sporting CP", category: "club", matches: 31, goals: 5, assists: 6, yellowCards: 3, redCards: 0 },
  { season: "2003-04", team: "Man United", category: "club", matches: 40, goals: 6, assists: 9, yellowCards: 4, redCards: 1 },
  { season: "2004-05", team: "Man United", category: "club", matches: 50, goals: 9, assists: 10, yellowCards: 5, redCards: 0 },
  { season: "2005-06", team: "Man United", category: "club", matches: 47, goals: 12, assists: 9, yellowCards: 8, redCards: 1 },
  { season: "2006-07", team: "Man United", category: "club", matches: 53, goals: 23, assists: 22, yellowCards: 2, redCards: 0 },
  { season: "2007-08", team: "Man United", category: "club", matches: 49, goals: 42, assists: 8, yellowCards: 7, redCards: 1 },
  { season: "2008-09", team: "Man United", category: "club", matches: 53, goals: 26, assists: 12, yellowCards: 8, redCards: 1 },
  { season: "2009-10", team: "Real Madrid", category: "club", matches: 35, goals: 33, assists: 10, yellowCards: 5, redCards: 2 },
  { season: "2010-11", team: "Real Madrid", category: "club", matches: 54, goals: 53, assists: 18, yellowCards: 4, redCards: 0 },
  { season: "2011-12", team: "Real Madrid", category: "club", matches: 55, goals: 60, assists: 15, yellowCards: 7, redCards: 0 },
  { season: "2012-13", team: "Real Madrid", category: "club", matches: 55, goals: 55, assists: 13, yellowCards: 12, redCards: 1 },
  { season: "2013-14", team: "Real Madrid", category: "club", matches: 47, goals: 51, assists: 17, yellowCards: 5, redCards: 1 },
  { season: "2014-15", team: "Real Madrid", category: "club", matches: 54, goals: 61, assists: 22, yellowCards: 6, redCards: 1 },
  { season: "2015-16", team: "Real Madrid", category: "club", matches: 48, goals: 51, assists: 15, yellowCards: 5, redCards: 0 },
  { season: "2016-17", team: "Real Madrid", category: "club", matches: 46, goals: 42, assists: 12, yellowCards: 2, redCards: 0 },
  { season: "2017-18", team: "Real Madrid", category: "club", matches: 44, goals: 44, assists: 8, yellowCards: 4, redCards: 1 },
  { season: "2018-19", team: "Juventus", category: "club", matches: 43, goals: 28, assists: 11, yellowCards: 4, redCards: 1 },
  { season: "2019-20", team: "Juventus", category: "club", matches: 46, goals: 37, assists: 7, yellowCards: 4, redCards: 0 },
  { season: "2020-21", team: "Juventus", category: "club", matches: 44, goals: 36, assists: 4, yellowCards: 4, redCards: 0 },
  { season: "2021-22", team: "Man United", category: "club", matches: 38, goals: 24, assists: 3, yellowCards: 9, redCards: 0 },
  { season: "2022-23", team: "Man Utd / Al Nassr", category: "club", matches: 35, goals: 17, assists: 4, yellowCards: 6, redCards: 0 },
  { season: "2023-24", team: "Al Nassr", category: "club", matches: 45, goals: 44, assists: 13, yellowCards: 4, redCards: 1 },
  { season: "2024-25", team: "Al Nassr", category: "club", matches: 41, goals: 35, assists: 5, yellowCards: 3, redCards: 0 },
  { season: "2025-26", team: "Al Nassr", category: "club", matches: 27, goals: 25, assists: 4, yellowCards: 2, redCards: 0 },
];
