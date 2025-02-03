(function () {
    'use strict';

    var disablePlugin = false, enableProxyApi = true, enableProxyImage = true;

    var tmdb = {
        name: 'TMDB My Proxy',
        version: '1.1.1',
        description: 'Проксирование постеров и API сайта TMDB',
        path_image: Lampa.Utils.protocol() + 'tmdbimg.rootu.top/',
        path_api: Lampa.Utils.protocol() + 'tmdbapi.rootu.top/3/'
    };

    (function() {
        // check connect
        var checkApiUrl = Lampa.Utils.protocol() + 'api.themoviedb.org/3/authentication?api_key=' + Lampa.TMDB.key();
        var images = ["lRI9Ky1SMOehn04OqhYJ5hQfgIK.jpg","7fMtXuVbJMbsFB4U3CsgDdivizP.jpg","9oWdEicbTjfpfiCtvvYuxi0UseU.jpg","yufdzor5RheT4FYx1Ywm4mo2TlG.jpg","5g4V2fKBAI5TGjqfItfsnPjqZN9.jpg","xEqQLDrbtY2TlANNbXwXPG3ZDyK.jpg","8wijnbZLJ8t4TBeP0rog0RbQGtY.jpg","vDJT0nCHrseSXFF9VuDh10fE0BI.jpg","dMeJFcgwzbDzPKtPPeqisABVbV5.jpg","gg8SC7cBPYWzGqjYSJ3qWcpy0vI.jpg","9fZnp4rWvCJS4ZPcDz6QzhtqtxC.jpg","9NTRs4Hkg1HbEXd2zHINobcfwH8.jpg","qaEgtSQU4eTX2fMng7Grc7G2xzq.jpg","5EGNEc8hjNmyNA6bh39czJ0BcGS.jpg","b4rDiRR327jZsuq8NEPNn7letqy.jpg","acwju04aXg3SrDDinblKB5TBlok.jpg","i9gNhtuGtRNuGfLxphaOqUvTGuq.jpg","lxKCH5fUBwf73igBfHnIjbm11Di.jpg","oitnXD4qTRvrTJZ1Lo8vMlH2aT5.jpg","3vY6LCkOECbRgbVLxHMahjXbwaN.jpg","s3s32bjmkC6gsa4S59Nrk4qgn3G.jpg","lRiIxz87P5YhfwargFYYzVV5frb.jpg","tVPZ1OaiplPoc9ODahkIuFp9mcO.jpg","c7TYmYAdPG8B9WG5PnUxs6V5R2U.jpg","f4FxGEcWMoRcBbArEvYCxy7QSk7.jpg","bfM1Hzm6nPoTY8cm4mafA8ycpkf.jpg","yo57wZr0Fx0hyklCf0ykqPIOqVU.jpg","qqEUkwI8daY5pTxMn5ZrPyFtlXt.jpg","5jaWUWlNPikCWyrUVO8wCSNPu90.jpg","5UT6Zuarm1luaIsAVcNkFESi301.jpg","iiqaGctkt114uqhBeAycqUNRbe0.jpg","nTpozerQ8R7zLveFaeHt4EZbSug.jpg","iXBiZQGxvQwTtBSacddJ0lEMTaC.jpg","A5TLcObSezrwH2u5FCfi6mY69Z9.jpg","quWy8SIrXEypQbZO32Gdmw5f0qT.jpg","5F9318EvUe9IbR1NMKGmRR99uPc.jpg","sIDD5DtGAyf8ZGhHz19xvRobnRG.jpg","mFFFMvgtTvPudNY27sHxBnxHEQ2.jpg","9Zkx8EGOSA0uVIC2RzsYePkZQha.jpg","dsfbvZOIb1rdBx8eUGa2QTYyqGE.jpg","7iCxFHAesyHDEM0susMJSCK8w40.jpg","jD3ajxyJEtjDoQFGXs3Pq9nV37K.jpg","pKJDApReiE0EVmmkTYbHNW7d1Yu.jpg","jbJHEyDbCRyD7hnUbmNjCNqWTMT.jpg","rftuT9tTEqVoEDqqJZEQicnXHVH.jpg","bWIt5hnn3pV0p3M8MQcVibT3M6C.jpg"];
        var randImg = images[Math.floor(Math.random() * images.length)];
        var checkImgUrl = Lampa.Utils.protocol() + 'image.tmdb.org/t/p/w92/' + randImg + '?_=' + (new Date().getTime());
        randImg = images = null;
        var network = new Lampa.Reguest();
        network.silent(
            checkApiUrl,
            function(data){
                if (!!data && data.success === true) {
                    enableProxyApi = false;
                    console.log('App', 'API TMDB proxy (from rootu) is disabled as it is not required');
                    checkApiUrl = network = null;
                }
            },
            function () {
                checkApiUrl = network = null;
            }
        );
        var img = new Image(1,1);
        img.onload = function(){
            console.log('App', 'Image TMDB proxy (from rootu) is disabled as it is not required');
            enableProxyImage = false;
            checkImgUrl = img = null;
        };
        img.onerror = function(){
            checkImgUrl = img = null;
        };
        img.src = checkImgUrl;
    })();

    if (!disablePlugin) {
        Lampa.TMDB.image = function (url) {
            var base = Lampa.Utils.protocol() + 'image.tmdb.org/' + url;
            return (enableProxyImage && Lampa.Storage.field('proxy_tmdb')) ? tmdb.path_image + url : base;
        };

        Lampa.TMDB.api = function (url) {
            var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
            return (enableProxyApi && Lampa.Storage.field('proxy_tmdb')) ? tmdb.path_api + url : base;
        };

        Lampa.Settings.listener.follow('open', function (e) {
            if (e.name === 'tmdb') {
                e.body.find('[data-parent="proxy"]').remove();
            }
        });
    } else {
        var pluginsUpdate = false;
        var addCubProxy = true;
        var plugins = Lampa.Storage.get('plugins', '[]');

        for (var i=0; i < plugins.length; i++) {
            if (plugins[i].url.indexOf('://cub.red/plugin/tmdb-proxy') > 0) {
                addCubProxy = false;
                plugins[i].status = 1;
            }
            if (plugins[i].url.indexOf('.rootu.top/tmdb.js') > 0) {
                // Delete proxy plugins
                plugins.splice(i--, 1);
                pluginsUpdate = true;
            }
        }

        if (pluginsUpdate) {
            if (addCubProxy) {
                // Add cub tmdb proxy plugin
                plugins.unshift({
                    'url': Lampa.Utils.protocol() + 'cub.red/plugin/tmdb-proxy',
                    'status': 1,
                    'name': 'TMDB Proxy',
                    'author': '@lampa'
                });
            }
            // Save plugin
            Lampa.Storage.set('plugins', plugins);
        }
    }
})();

/*(function () {
    'use strict';

    var tmdb_proxy = {
      name: 'TMDB Proxy',
      version: '1.0.3',
      description: 'Проксирование постеров и API сайта TMDB',
      path_image: 'imagetmdb.com/',
      path_api: 'apitmdb.' + (Lampa.Manifest && Lampa.Manifest.cub_domain ? Lampa.Manifest.cub_domain : 'cub.red') + '/3/'
    };

    function filter(u) {
      var s = u.slice(0, 8);
      var e = u.slice(8).replace(/\/+/g, '/');
      return s + e;
    }

    function email() {
      return Lampa.Storage.get('account', '{}').email || '';
    }

    Lampa.TMDB.image = function (url) {
      var base = Lampa.Utils.protocol() + 'image.tmdb.org/' + url;
      return Lampa.Utils.addUrlComponent(filter(Lampa.Storage.field('proxy_tmdb') ? Lampa.Utils.protocol() + tmdb_proxy.path_image + url : base), 'email=' + encodeURIComponent(email()));
    };

    Lampa.TMDB.api = function (url) {
      var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
      return Lampa.Utils.addUrlComponent(filter(Lampa.Storage.field('proxy_tmdb') ? Lampa.Utils.protocol() + tmdb_proxy.path_api + url : base), 'email=' + encodeURIComponent(email()));
    };

    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name == 'tmdb') {
        e.body.find('[data-parent="proxy"]').remove();
      }
    });
    console.log('TMDB-Proxy', 'started, enabled:', Lampa.Storage.field('proxy_tmdb'));

})();*/


