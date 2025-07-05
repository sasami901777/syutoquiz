// sw.js
const CACHE_NAME = 'world-heritage-quiz-v1'; // キャッシュの名前とバージョン
const ASSETS = [
    '/', // ルートパス (index.html)
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    // アイコン画像もキャッシュ対象に含める
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png'
];

// インストールイベント: Service Worker がインストールされたときにキャッシュを初期化
self.addEventListener('install', (event) => {
    console.log('Service Worker: インストール中...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: キャッシュにアセットを追加中...');
                return cache.addAll(ASSETS);
            })
            .catch((error) => {
                console.error('Service Worker: キャッシュの追加に失敗しました', error);
            })
    );
});

// アクティベートイベント: 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    console.log('Service Worker: アクティベート中...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: 古いキャッシュを削除中:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// フェッチイベント: ネットワークリクエストをインターセプトし、キャッシュから提供
self.addEventListener('fetch', (event) => {
    // 画像は外部URLなので、キャッシュせずネットワークから取得を試みる
    // オフライン時は画像が表示されない可能性がある
    if (event.request.url.startsWith('https://upload.wikimedia.org/')) {
        return; // Wikimedia Commons の画像はキャッシュしない
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // キャッシュにレスポンスがあればそれを返す
                if (response) {
                    console.log('Service Worker: キャッシュから取得:', event.request.url);
                    return response;
                }
                // キャッシュになければネットワークから取得し、キャッシュに追加
                console.log('Service Worker: ネットワークから取得:', event.request.url);
                return fetch(event.request).then((networkResponse) => {
                    // レスポンスが有効かチェック
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }
                    // レスポンスをキャッシュにコピーして返す
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    return networkResponse;
                });
            })
            .catch((error) => {
                console.error('Service Worker: フェッチエラー:', error);
                // オフライン時にキャッシュにもない場合、オフラインページなどを返すことも可能
                // return caches.match('/offline.html'); // 例: オフラインページ
            })
    );
});
