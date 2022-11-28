
  /**
   * Sample JavaScript code for youtube.search.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { // console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { // console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "q": "stone roses fools gold"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                // console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });
// </script>
// <button onclick="authenticate().then(loadClient)">authorize and load</button>
// <button onclick="execute()">execute</button>



response:

{
    "kind": "youtube#searchListResponse",
    "etag": "TxyjJkMCkh8qxGH4ZvuJCffQjd0",
    "nextPageToken": "CAUQAA",
    "regionCode": "GB",
    "pageInfo": {
      "totalResults": 309084,
      "resultsPerPage": 5
    },
    "items": [
      {
        "kind": "youtube#searchResult",
        "etag": "LftkMClPOly6HdVTguZcMBN_Pr8",
        "id": {
          "kind": "youtube#video",
          "videoId": "NSD11dnphg0"
        },
        "snippet": {
          "publishedAt": "2011-01-16T08:18:25Z",
          "channelId": "UC5HlVQ64L25lubnxJaSTriA",
          "title": "The Stone Roses - Fools Gold (Official Video)",
          "description": "The Stone Roses' official music video for 'Fools Gold'. Click to listen to The Stone Roses on Spotify: http://smarturl.it/StoneRSpotify ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/NSD11dnphg0/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/NSD11dnphg0/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/NSD11dnphg0/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "StoneRosesVEVO",
          "liveBroadcastContent": "none",
          "publishTime": "2011-01-16T08:18:25Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "wKZIyLUcE3zk9EeSBuCrolwSojc",
        "id": {
          "kind": "youtube#video",
          "videoId": "BBsazIACpYM"
        },
        "snippet": {
          "publishedAt": "2011-04-14T13:46:33Z",
          "channelId": "UCqMpoLmnJj6dnEixaFxK6bg",
          "title": "Stone Roses - Fools Gold(Full Version)",
          "description": "Stone Roses - Fools Gold the full version of it.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/BBsazIACpYM/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/BBsazIACpYM/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/BBsazIACpYM/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "Dougie Dewdney",
          "liveBroadcastContent": "none",
          "publishTime": "2011-04-14T13:46:33Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "EzfLhxAQmvaTU10Gg_cKvrEFKpY",
        "id": {
          "kind": "youtube#video",
          "videoId": "jRswxxT3HQ8"
        },
        "snippet": {
          "publishedAt": "2013-10-26T21:07:38Z",
          "channelId": "UCTrpkIkT8uYW45JGOjH_o6w",
          "title": "The Stone Roses, Fools Gold Live at Heaton Park. Made of Stone DVD.",
          "description": "Thirteen minutes of musical brilliance taken from the Stone Roses DVD \"Made of Stone\". Fools Gold live at Heaton Park, ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/jRswxxT3HQ8/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/jRswxxT3HQ8/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/jRswxxT3HQ8/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "Jamie Hosey",
          "liveBroadcastContent": "none",
          "publishTime": "2013-10-26T21:07:38Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "blvgC6Ddn_pzRfNyjSQ0ByTbq3U",
        "id": {
          "kind": "youtube#video",
          "videoId": "LnVTJJ3wcEo"
        },
        "snippet": {
          "publishedAt": "2015-05-05T12:37:10Z",
          "channelId": "UCccFm9vNZz5u1deqhWhN2Yw",
          "title": "Fools Gold (Remastered Edit)",
          "description": "Provided to YouTube by Sony Music Entertainment Fools Gold (Remastered Edit) · The Stone Roses Fools Gold ℗ 2009 ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/LnVTJJ3wcEo/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/LnVTJJ3wcEo/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/LnVTJJ3wcEo/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "The Stone Roses - Topic",
          "liveBroadcastContent": "none",
          "publishTime": "2015-05-05T12:37:10Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "Xkt_l_nx7qcpkhC69YV35hIL9-M",
        "id": {
          "kind": "youtube#video",
          "videoId": "k4H4ztXsPrc"
        },
        "snippet": {
          "publishedAt": "2016-06-09T07:00:02Z",
          "channelId": "UC5HlVQ64L25lubnxJaSTriA",
          "title": "The Stone Roses - Fools Gold (Top Of The Pops)",
          "description": "The Stone Roses - Fools Gold (Top Of The Pops) Listen on Spotify: http://smarturl.it/SRBestOf_Spotify iTunes: ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/k4H4ztXsPrc/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/k4H4ztXsPrc/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/k4H4ztXsPrc/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "StoneRosesVEVO",
          "liveBroadcastContent": "none",
          "publishTime": "2016-06-09T07:00:02Z"
        }
      }
    ]
  }
  