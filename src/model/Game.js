class Game {
  constructor(otherInfo) {
    this.initDefaults(otherInfo);
  }

  initWithIgdb(igdbGameResults) {
    if (igdbGameResults) {
      this.title = igdbGameResults.name;
      this.cover =
        igdbGameResults.cover && igdbGameResults.cover.url
          ? igdbGameResults.cover.url
          : this.cover;
      this.release_date = new Date(1000 * igdbGameResults.first_release_date);
      this.igdb_id = igdbGameResults.id + "";
      this.description = igdbGameResults.description;
    }
  }

  getData() {
    return {
      completed: this.completed,
      completed_date: this.getDateTime("completed"),
      cover: this.cover,
      created_date: this.getDateTime("created"),
      updated_date: this.getDateTime("updated"),
      description: this.description,
      notes: this.notes,
      owned: this.owned,
      played: this.played,
      rating: this.rating,
      release_date: this.getDateTime("release"),
      title: this.title,
      platform: this.platform,
      igdb_id: this.igdb_id
    };
  }

  initDefaults(otherInfo = {}) {
    const defaults = {
      completed: false,
      completed_date: false,
      cover: "http://via.placeholder.com/500",
      created_date: new Date(),
      updated_date: new Date(),
      description: "",
      notes: "",
      owned: true,
      played: false,
      rating: -1,
      release_date: new Date(),
      title: "",
      platform: ""
    };

    Object.keys(defaults).forEach(key => {
      if (otherInfo[key]) {
        this[key] = otherInfo[key];
      } else {
        this[key] = defaults[key];
      }
    });
  }

  displayReleaseDate() {
    return this.getDate("release").getFullYear();
  }

  getDate(key) {
    const date = this[`${key}_date`];
    if (date instanceof Date) {
      return date;
    } else if (!isNaN(date)) {
      return new Date(date);
    }
    return null;
  }

  displayDate(key) {
    const date = this.getDate(key);
    if (date) return date.toUTCString();
    return "Invalid Date.";
  }

  getDateTime(key) {
    const date = this[`${key}_date`];
    if (date instanceof Date) {
      return date.getTime();
    }
    return date || 0;
  }
}

export default Game;
