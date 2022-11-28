curl \
-H 'Authorization: Bearer b2b36202b46a5273ef6c2a6bf936826d17f7f00d' \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "long_url": "https://timermachine.com/single?t=%7B%22schedule%22%3A%7B%22hasScheduleAnnounce%22%3Afalse%2C%22scheduleAnnounce%22%3A%22wake%20up%22%2C%22h%22%3A%2214%22%2C%22m%22%3A%2216%22%2C%22s%22%3A%22%22%7D%2C%22timer%22%3A%7B%22name%22%3A%22Timer%20X%22%2C%22h%22%3A%22%22%2C%22m%22%3A%22%22%2C%22s%22%3A%225%22%2C%22hasAlert%22%3Afalse%2C%22alert%22%3A%221%22%2C%22hasAnnounce%22%3Afalse%2C%22announce%22%3A%22timer%20done%22%2C%22hasStartAlert%22%3Atrue%2C%22startAlert%22%3A%229%22%2C%22hasStartAnnounce%22%3Afalse%2C%22startAnnounce%22%3A%22k%22%2C%22hasEndPlaylist%22%3Atrue%2C%22endPlaylist%22%3A%222%22%2C%22hasStartPlaylist%22%3Atrue%2C%22startPlaylist%22%3A%229%22%2C%22hasPlayDuringUrl%22%3Afalse%2C%22playDuringUrl%22%3A%22https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNrUIJY_Xu2s%22%2C%22hasEndPlayUrl%22%3Afalse%2C%22endPlayUrl%22%3A%22https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A%22%2C%22hasStartPlayUrl%22%3Afalse%2C%22startPlayUrl%22%3A%22%22%7D%2C%22interval%22%3A%7B%22name%22%3A%22interval%22%2C%22h%22%3A%22%22%2C%22m%22%3A%22%22%2C%22s%22%3A%22%22%2C%22hasAlert%22%3Afalse%2C%22alert%22%3A1%2C%22hasAnnounce%22%3Afalse%2C%22announce%22%3A%22%22%7D%2C%22chaining%22%3A%7B%22onend%22%3A%7B%22chainEnabled%22%3Afalse%2C%22chainId%22%3A%22%22%7D%7D%2C%22direction%22%3A-1%7D",
  "domain": "bit.ly",
  "group_guid": "Be5icAH2zoC"
}' \
https://api-ssl.bitly.com/v4/shorten