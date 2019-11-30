class Platform {
  PLATFORM_MAP = {
    computer: "PC/Mac",
    switch: "Nintendo Switch",
    ps4: "Playstation 4",
    "3ds": "Nintendo 3DS",
    ds: "Nintendo DS",
    wiiu: "Nintendo WiiU",
    wii: "Nintendo Wii",
    x360: "Xbox 360",
    ps2: "Playstation 2",
    gcn: "Nintendo Gamecube",
    psp: "Playstation Portable",
    psv: "Playstation Vita"
  };

  getPlatformName(platform) {
    return this.PLATFORM_MAP[platform];
  }
}

export default new Platform();
