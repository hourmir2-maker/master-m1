const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'affiliate_bot.db');
const db = new sqlite3.Database(dbPath);

// ฟังก์ชันสร้างตาราง (รันครั้งแรกตอนตั้งค่าระบบ)
function initDatabase() {
  db.serialize(() => {
    // 1. ตารางคิวสินค้า
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_url TEXT UNIQUE,
        name TEXT,
        price REAL,
        status TEXT DEFAULT 'pending', -- pending, posted, failed
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. ตารางประวัติการโพสต์
    db.run(`
      CREATE TABLE IF NOT EXISTS posting_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        caption TEXT,
        affiliate_url TEXT,
        posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        platform TEXT, -- facebook, line, telegram
        FOREIGN KEY(product_id) REFERENCES products(id)
      )
    `);

    // 3. ตารางประวัติข่าวไอทีที่โพสต์ไปแล้ว
    db.run(`
      CREATE TABLE IF NOT EXISTS posted_news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT UNIQUE,
        title TEXT,
        posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Database initialized successfully!");
  });
}

// ฟังก์ชันเพิ่มสินค้าเข้าไปในคิวโพสต์
function addProduct(url, name, price) {
  return new Promise((resolve, reject) => {
    const query = `INSERT OR IGNORE INTO products (original_url, name, price) VALUES (?, ?, ?)`;
    db.run(query, [url, name, price], function(err) {
      if (err) return reject(err);
      resolve(this.changes); // คืนค่าจำนวนแถวที่ถูกเพิ่ม (ถ้าซ้ำจะเป็น 0)
    });
  });
}

// ฟังก์ชันดึงสินค้าถัดไปที่ยังไม่ได้โพสต์
function getNextPendingProduct() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products WHERE status = 'pending' ORDER BY id ASC LIMIT 1`;
    db.get(query, [], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

// ฟังก์ชันอัปเดตสถานะสินค้า
function updateProductStatus(id, status) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE products SET status = ? WHERE id = ?`;
    db.run(query, [status, id], function(err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
}

// ฟังก์ชันบันทึกประวัติการโพสต์
function logPosting(productId, caption, affiliateUrl, platform) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO posting_logs (product_id, caption, affiliate_url, platform)
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [productId, caption, affiliateUrl, platform], function(err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
}

// ตรวจสอบหากรันไฟล์นี้โดยตรงด้วย argument 'init'
if (process.argv[2] === 'init') {
  initDatabase();
  // ลองเพิ่มข้อมูลทดสอบลงใน DB
  addProduct(
    'https://shopee.co.th/product-example-1',
    'เครื่องดูดฝุ่นไร้สาย แรงดูดสูง',
    1290.00
  ).then(() => {
    console.log("Added example product!");
    db.close();
  });
}

// ฟังก์ชันตรวจสอบว่าบทความบล็อกการศึกษานี้เคยโพสต์ไปแล้วหรือยัง
function hasArticleBeenPosted(articleId) {
  return new Promise((resolve, reject) => {
    // สร้างตารางถ้ายังไม่มี
    db.run(`
      CREATE TABLE IF NOT EXISTS posted_edu_articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        article_id TEXT UNIQUE,
        title TEXT,
        posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, () => {
      const query = `SELECT id FROM posted_edu_articles WHERE article_id = ?`;
      db.get(query, [articleId], (err, row) => {
        if (err) return reject(err);
        resolve(!!row);
      });
    });
  });
}

// ฟังก์ชันบันทึกประวัติการโพสต์บทความการศึกษา
function logArticlePosted(articleId, title) {
  return new Promise((resolve, reject) => {
    const query = `INSERT OR REPLACE INTO posted_edu_articles (article_id, title) VALUES (?, ?)`;
    db.run(query, [articleId, title], function(err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
}

// ฟังก์ชันสุ่มสินค้า Shopee สำหรับแนบใต้บทความ
function getRandomAffiliateProduct() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products ORDER BY RANDOM() LIMIT 1`;
    db.get(query, [], (err, row) => {
      if (err) return reject(err);
      resolve(row || {
        name: 'อุปกรณ์การเรียนและเครื่องเขียนคุณภาพดี',
        original_url: 'https://shopee.co.th',
        price: 0
      });
    });
  });
}

// ฟังก์ชันความเข้ากันได้เดิม
function hasNewsBeenPosted(url) {
  return hasArticleBeenPosted(url);
}

function logNewsPosted(url, title) {
  return logArticlePosted(url, title);
}

module.exports = {
  db,
  addProduct,
  getNextPendingProduct,
  updateProductStatus,
  logPosting,
  hasNewsBeenPosted,
  logNewsPosted,
  hasArticleBeenPosted,
  logArticlePosted,
  getRandomAffiliateProduct
};


