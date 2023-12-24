const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

// PostgreSQL bağlantı bilgileri
const connectionConfig = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'toortoor', // PostgreSQL şifresi
  port: 5432,
};

// PostgreSQL istemcisini oluştur
const client = new Client(connectionConfig);

// PostgreSQL bağlantısını aç
client.connect()
  .then(() => {
    console.log('PostgreSQL bağlantısı başarılı.');

    // Web sunucu
    const app = express();
    const port = 3000;

    // CORS middleware'ini ekleyin
    app.use(cors());

    // HTML sayfası
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

    // Butona basıldığında çalışacak endpoint
    app.get('/executeQuery', (req, res) => {
      // PostgreSQL sorgusu
      const query = 'SELECT datname, datdba, datcollate FROM pg_database';

      // Sorguyu çalıştır
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });



    app.get('/tablolar', (req, res) => {
      // PostgreSQL sorgusu
      const query = 'SELECT relname, seq_scan FROM pg_stat_all_tables ORDER BY seq_scan DESC LIMIT 10';

      // En Çok Kullanılan Tablolar:
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });



    app.get('/indexler', (req, res) => {
      // en Çok Kullanılan İndeksler:
      const query = 'SELECT indexrelname, idx_scan FROM pg_stat_all_indexes ORDER BY idx_scan DESC LIMIT 10';

      // Sorguyu çalıştır
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });


    app.get('/sorgular', (req, res) => {
      // En Çok Tüketen Sorgular:
      const query = 'SELECT query, total_time FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10';

      // Sorguyu çalıştır
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });

    app.get('/patroni', (req, res) => {
      // Patroni Küme Durumu:
      const query = 'SELECT * FROM pg_stat_get_wal_senders()';

      // Sorguyu çalıştır
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });

    app.get('/patroni1', (req, res) => {
      // Patroni Yapılandırma Bilgisi:
      const query = 'SELECT * FROM pg_settings';

      // Patroni Yapılandırma Bilgisi:
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });


    app.get('/patroni2', (req, res) => {
      // Patroni Bağlantı Durumu:
      const query = 'SELECT * FROM patroni.replication_connections';

      // PPatroni Bağlantı Durumu:
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });

    app.get('/patroni3', (req, res) => {
      // Patroni Replication İstatistikleri:
      const query = 'SELECT * FROM patroni.replication_statistics';

      // Patroni Replication İstatistikleri:
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });


    app.get('/patroni4', (req, res) => {
      // Patroni Timeline Bilgisi:
      const query = 'SELECT * FROM patroni.timelines';

      // Patroni Timeline Bilgisi:
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });

    app.get('/patroni5', (req, res) => {
      // PPatroni Restore Durumu:
      const query = 'SELECT * FROM patroni.restore';

      // Patroni Restore Durumu:
      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });


    app.get('/patroni6', (req, res) => {
      // Patroni Watchdog Bilgisi:
      const query = 'SELECT * FROM patroni.watchdog';

      // Patroni Watchdog Bilgisi:

      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });


    app.get('/blok', (req, res) => {
      // Veritabanı Blok İstatistikleri:
      const query = 'SELECT * FROM pg_stat_database';

      // Veritabanı Blok İstatistikleri:

      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });

    app.get('/blok1', (req, res) => {
      // Veritabanı İstatistikleri:
      const query = 'SELECT * FROM pg_stat_bgwriter';

      //Veritabanı İstatistikleri:

      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });

    app.get('/blok3', (req, res) => {
      // Aktif Bağlantılar:
      const query = 'SELECT * FROM pg_stat_activity';

      //Aktif Bağlantılar:

      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });

    app.get('/blok4', (req, res) => {
      // Patroni Yedekleme Durumu:
      const query = 'SELECT * FROM patroni.backup';

      //Patroni Yedekleme Durumu:

      client.query(query, (err, result) => {
        if (err) {
          console.error('Sorgu hatası:', err);
          res.send('Sorgu hatası');
        } else {
          // Sorgu sonucunu göster
          console.log('Sorgu sonucu:', result.rows);
          res.send('Sorgu sonucu: ' + JSON.stringify(result.rows));
        }
      });
    });








    // Web sunucusunu başlat
    app.listen(port, () => {
      console.log(`Web sunucusu http://localhost:${port} üzerinde çalışıyor.`);
    });
  })
  .catch((err) => console.error('PostgreSQL bağlantı hatası:', err));

// Uygulama kapatıldığında PostgreSQL bağlantısını kapat
process.on('SIGINT', () => {
  client.end();
  process.exit();
});

