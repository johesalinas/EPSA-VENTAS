'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "f01a83c0f3f22c45a0342b432179c157",
"assets/AssetManifest.bin.json": "13ba543ebb81232554dd4a6c2b09f952",
"assets/AssetManifest.json": "bca285a76d8a1f3fd5f5d78902b9cd94",
"assets/assets/branding/docs_icon.svg": "110bb0caeafb99c9e0b3cda4028232e3",
"assets/assets/branding/epsa_logo.svg": "18a36547fe5fdde497473aacd34362ea",
"assets/assets/pdfs/DataSheets/CHO/CBE-DS.pdf": "08944e20399b247c2c6a4b83e5c7f987",
"assets/assets/pdfs/DataSheets/CVT/5049_03%2520EP%2520Worksheet%2520Round%2520DC.pdf": "2d3e44c5e305dd216d369a39b1915be5",
"assets/assets/pdfs/DataSheets/CVT/5050_03%2520EP%2520Worksheet%2520Rect%2520DC.pdf": "773480122bcc045135f86a1197db84d4",
"assets/assets/pdfs/DataSheets/CVT/5066_03%2520EP%2520Worksheet%2520Bucket%2520Elevator.pdf": "f45070928e0727d178b25e73c2b3ece0",
"assets/assets/pdfs/DataSheets/CVT/5067_03%2520EP%2520Worksheet%2520Round%2520Bin-Silo.pdf": "1124df10d858902464cb89700ef390b3",
"assets/assets/pdfs/DataSheets/CVT/5093_02%2520EP%2520Worksheet%2520Rect%2520Bin-Silo.pdf": "c4a6d81b406a03ddcc3a3cabf0da4473",
"assets/assets/pdfs/DataSheets/CVT/5094_02%2520EP%2520Worksheet%2520Cyclone.pdf": "333b690ac9f4feb02f99e7848174521e",
"assets/assets/pdfs/DataSheets/CVT/5095_02%2520EP%2520Worksheet%2520Spray%2520Dryer.pdf": "37df8c22fc6b7ffacb768c4d6965ba0e",
"assets/assets/pdfs/DataSheets/CVT/Worksheet_Bucket_Elevator.pdf": "f45070928e0727d178b25e73c2b3ece0",
"assets/assets/pdfs/DataSheets/CVT/Worksheet_Cartridge_DC.pdf": "602d2ede2de9b90c6f65519de0e0ece2",
"assets/assets/pdfs/DataSheets/CVT/Worksheet_Cyclone.pdf": "333b690ac9f4feb02f99e7848174521e",
"assets/assets/pdfs/DataSheets/CVT/Worksheet_Rect_Bin-Silo.pdf": "c4a6d81b406a03ddcc3a3cabf0da4473",
"assets/assets/pdfs/DataSheets/CVT/Worksheet_Rect_DC.pdf": "773480122bcc045135f86a1197db84d4",
"assets/assets/pdfs/DataSheets/CVT/Worksheet_Round_Bin-Silo.pdf": "1124df10d858902464cb89700ef390b3",
"assets/assets/pdfs/DataSheets/CVT/Worksheet_Round_DC.pdf": "2d3e44c5e305dd216d369a39b1915be5",
"assets/assets/pdfs/DataSheets/CVT/Worksheet_Spray_Dryer.pdf": "37df8c22fc6b7ffacb768c4d6965ba0e",
"assets/assets/pdfs/DataSheets/CYA/CYA-DS.pdf": "7082732d5bdd9498003e0403fe0ef7e7",
"assets/assets/pdfs/DataSheets/DCL/DCL-LOADING%2520SPOUTS-DS.pdf": "201eaee6fce2fe11b152fb77cc2f25d1",
"assets/assets/pdfs/DataSheets/DCL/DCL-LOADING-SPOUTS-DS.pdf": "201eaee6fce2fe11b152fb77cc2f25d1",
"assets/assets/pdfs/DataSheets/DCL/DCL-SLIDE%2520GATE-DS.pdf": "a103f7d5f758caa2c6ae752d2f478e86",
"assets/assets/pdfs/DataSheets/DCL/DCL-SLIDE-GATE-DS.pdf": "a103f7d5f758caa2c6ae752d2f478e86",
"assets/assets/pdfs/DataSheets/DCL/DS-Aeration.pdf": "4317fddeb96669c8a9637a428087f109",
"assets/assets/pdfs/DataSheets/LCP/LCP-SLIDE%2520GATE-DS.pdf": "7a3b467fb58941267ecc8400b1edd871",
"assets/assets/pdfs/DataSheets/LCP/LCP-SLIDE-GATE-DS.pdf": "7a3b467fb58941267ecc8400b1edd871",
"assets/assets/pdfs/DataSheets/MPE/DS-Grinder.pdf": "a3cd053bd48fe6bdc6625ba229faf4e7",
"assets/assets/pdfs/DataSheets/MPE/MPE-Chain%2520Vey-DS.pdf": "ec7c606fb6aa5c3b7a4198cbf2e88b12",
"assets/assets/pdfs/DataSheets/MPE/MPE-Chain-Vey-DS.pdf": "ec7c606fb6aa5c3b7a4198cbf2e88b12",
"assets/assets/pdfs/DataSheets/NBE/BBF%2520Application%2520DataSheet.pdf": "7f46152eb6608425015aa6ed94034561",
"assets/assets/pdfs/DataSheets/NBE/BBF-Application-DataSheet.pdf": "7f46152eb6608425015aa6ed94034561",
"assets/assets/pdfs/DataSheets/NBE/BBU%2520Application%2520DataSheet.pdf": "3eddec63dff3396d9d0a316f6e5771a5",
"assets/assets/pdfs/DataSheets/NBE/BBU-Application-DataSheet.pdf": "3eddec63dff3396d9d0a316f6e5771a5",
"assets/assets/pdfs/DataSheets/NBE/Container-Discharge-Application-DataSheet.pdf": "13c47a8901680a8ee47186746970a2da",
"assets/assets/pdfs/DataSheets/NBE/Cotainer%2520Discharge%2520Application%2520DataSheet.pdf": "13c47a8901680a8ee47186746970a2da",
"assets/assets/pdfs/DataSheets/NBE/DS-Product-Saver.pdf": "7f7775460c7e429a9acd541cbee5f910",
"assets/assets/pdfs/DataSheets/NBE/DS-Screw-Conveyor.pdf": "126ad59a94f43d94690021923a7cb113",
"assets/assets/pdfs/DataSheets/PII/DS-Mill%2520and%2520Sifter.xlsx": "7309e15c15d26aff82d9573093f609a7",
"assets/assets/pdfs/DataSheets/PII/DS-Rotatorias.xlsx": "3730ec24cc2e0901462be813d4629805",
"assets/assets/pdfs/DataSheets/PII/PII-Application%2520Data%2520Sheet-DS.xlsx": "7309e15c15d26aff82d9573093f609a7",
"assets/assets/pdfs/DataSheets/RLW/DS-Bascula-Camionera.pdf": "a868503f9bd7bcc064841141bf2e544a",
"assets/assets/pdfs/DataSheets/RLW/DS-Bulkslide.pdf": "cadca1994f9fdd090c27a09cea766acc",
"assets/assets/pdfs/DataSheets/RLW/DS-Ferrocarrilera-PL-modular.pdf": "1c38a1253fa6f62eb2a563bbe56546be",
"assets/assets/pdfs/DataSheets/RLW/DS-Ferrocarrilera-Survivor-RT-Pit.pdf": "dafccae027e0acb05146760deeb6422d",
"assets/assets/pdfs/DataSheets/RLW/DS-Kiosko-Camionera.pdf": "088713163816f60899c1558dd68239cb",
"assets/assets/pdfs/DataSheets/RLW/DS-Railboss.pdf": "df9d54ee85de8c0c7212b07ee3145ea5",
"assets/assets/pdfs/DataSheets/RLW/DS-Screw-Weighers.pdf": "e858f396ba906fe88150e26b5786e4c6",
"assets/assets/pdfs/DataSheets/RLW/DS-Sistemas-de-Pesaje.pdf": "3afcaf45a60b156b89e4ce451542849b",
"assets/assets/pdfs/DataSheets/TWI/Belt%2520Scale%2520Data%2520Sheet%25201.4.pdf": "6279f14e6d76ffcdc4f4f021e0d5f56b",
"assets/assets/pdfs/DataSheets/TWI/Belt-Scale-Data-Sheet-1.4.pdf": "6279f14e6d76ffcdc4f4f021e0d5f56b",
"assets/assets/pdfs/DataSheets/TWI/New%2520Bulk%2520Bag%2520Unloader%25201.3.pdf": "c9b09427862a97777ab38836731b5b55",
"assets/assets/pdfs/DataSheets/TWI/New-Bulk-Bag-Unloader-1.3.pdf": "c9b09427862a97777ab38836731b5b55",
"assets/assets/pdfs/DataSheets/TWI/NewGravimetric%25201.4.pdf": "3ac81e44e7425c48b9f8e6c943b5b8ae",
"assets/assets/pdfs/DataSheets/TWI/NewGravimetric-1.4.pdf": "3ac81e44e7425c48b9f8e6c943b5b8ae",
"assets/assets/pdfs/DataSheets/TWI/NewVolumetric%25201.3.pdf": "535b4b21a945a02ddacf975d230e3d36",
"assets/assets/pdfs/DataSheets/TWI/NewVolumetric-1.3.pdf": "535b4b21a945a02ddacf975d230e3d36",
"assets/assets/pdfs/DataSheets/TWI/Weigh%2520Belt%2520Feeder%25201.5.pdf": "bbdf1b02914419f63375666806f81362",
"assets/assets/pdfs/DataSheets/TWI/Weigh%2520Belt%2520Feeder-1.5.pdf": "bbdf1b02914419f63375666806f81362",
"assets/assets/pdfs/Planos/CVT/INTERCEPTOR-LT-24X36.PDF": "553955c58076c1b0508bf1142dd914d4",
"assets/assets/pdfs/Planos/CVT/INTERCEPTOR_FV_5IN.pdf": "81116e7f166f259c2dae0c2bfe8031c2",
"assets/assets/pdfs/Planos/CVT/RUPTURE_PANEL_24X36IN.pdf": "400ef181615bec23e00b2e53c3675cf1",
"assets/assets/pdfs/Planos/LCP/2-3-way-slideflex-diverter-valves.pdf": "a617caa40672e289d4da042caaa2381c",
"assets/assets/pdfs/Planos/LCP/2-way-diverter-valves-series-d.pdf": "ac309f4a805f4650b2f3cda9e887cfdb",
"assets/assets/pdfs/Planos/LCP/2-way-sealed-gravity-diverters.pdf": "eb4642dd1856c73af2b354b26128d3bb",
"assets/assets/pdfs/Planos/LCP/3-4-way-diverter-valves.pdf": "3e0f391b5a8ee0e5b5c41b00f3a3baa3",
"assets/assets/pdfs/Planos/LCP/aggregate-control-gate.pdf": "b00caa5ecc5ab5a534bf36299679fad8",
"assets/assets/pdfs/Planos/LCP/discharge-valves.pdf": "1073659356d3a93a6038e86c22d06e53",
"assets/assets/pdfs/Planos/LCP/gravity-dual-control-gate.pdf": "4e55193f7888dbab0414c7b60f7e588c",
"assets/assets/pdfs/Planos/LCP/maintenance-gates-square.pdf": "fcb4a6645dcd1c7529736362f7dd5530",
"assets/assets/pdfs/Planos/LCP/roller-gates.pdf": "e29367924395149c26575b9cc3ab807c",
"assets/assets/pdfs/Planos/LCP/slide-gates-tps-lsp.pdf": "97e131710425235f6b9020b0d5f83b01",
"assets/assets/pdfs/Planos/NBE/NBE-BBF-DWG-4POST-03.pdf": "245b4c02584611044621445af300219f",
"assets/assets/pdfs/Planos/NBE/NBE-BBU-HALF%2520FRAME-DWG_24-Apr-14_1.PDF": "892c29ddcf9e721bda0288236fdb90ea",
"assets/assets/pdfs/Planos/NBE/NBE-BBU-HOIST-UNTIE-DWG_24-Apr-14_1.pdf": "ac0d5191ccbb0f44890a9983fd78f2f3",
"assets/assets/pdfs/Planos/NBE/NBE-BBU-with-Screw-Conveyor-DWG.pdf": "a4a058959c6821436d31c65a0b942194",
"assets/assets/pdfs/Planos/NBE/NBE-Bulk-Bag-Filling-DWG-03.pdf": "fcf56b885d8c2b40982c2cb74db1f0c2",
"assets/assets/pdfs/Planos/NBE/NBE-Bulk-Bag-Filling-DWG-04.pdf": "8f7c03b3e6bb6c6b78998cdc76fd79d6",
"assets/assets/pdfs/Planos/NBE/NBE-CRUMBLER-EXPANDED-DWG.pdf": "3efe52a210f658f64ac66158d2d14dc3",
"assets/assets/pdfs/Planos/TWI/TDS_GF28.pdf": "36c93d4d11678ce863f47e3a71e18339",
"assets/assets/pdfs/Planos/TWI/TDS_TT20.pdf": "4ad7a4fbc21445b750602da032e0ca53",
"assets/assets/pdfs/Planos/TWI/TDS_VF05.pdf": "279217c9d72781683555cc932f012620",
"assets/assets/pdfs/Planos/TWI/TDS_WF10,14,16.pdf": "72a31afc498c3d60107beccb1abc9dab",
"assets/assets/pdfs/Planos/TWI/TWI-VOLUMETRIC-FEEDER-05-DWG.pdf": "0698a50cb12dae4b1423a18f0261ebfb",
"assets/assets/pdfs/Planos/TWI/TWI-VOLUMETRIC-FEEDER-12-DWG.pdf": "612dd3f2cb0df4b2ca3fa1f8da5c8249",
"assets/assets/pdfs/Planos/TWI/TWI-VOLUMETRIC-FEEDER-28-DWG.pdf": "75682fb9130494555ccd9c0c68976e63",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "7e109888b02ed95e985a5b063e9fd78b",
"assets/NOTICES": "c8368c03a6ed7355efe1d6637bae47aa",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"favicon.png": "130baa4207187bdf908dc59af212d5b8",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "c8ff4702d40347d6c39ca618e075ac75",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "5ac98ad370b164f6456c9019475dd7ed",
"/": "5ac98ad370b164f6456c9019475dd7ed",
"main.dart.js": "d862945e02e91a627ddcab53304adc72",
"manifest.json": "133298a4b553d9060df6f5ddff2edbca",
"version.json": "1590cbe16a9298b1ece499fd7ce5d3de"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
