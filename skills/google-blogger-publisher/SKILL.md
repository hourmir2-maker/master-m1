---
name: google-blogger-publisher
description: >-
  Automated Educational Content Marketing Engine for Google Blogger (blogspot.com).
  Uses Google Blogger API v3 with OAuth2 refresh tokens and Vercel midnight cron jobs to
  publish authentic 52-week curriculum-aligned educational articles and cheat sheets for SEO.
---

# 📰 Google Blogger Auto-Publisher & SEO Engine

`google-blogger-publisher` คือ Custom Skill สำหรับระบบเผยแพร่บทความการศึกษาและสรุปสูตรลัดลงสู่บล็อกทางการบน **Google Blogger (blogspot.com)** แบบอัตโนมัติ 100% ขับเคลื่อนด้วย Google Blogger API v3, OAuth 2.0 Refresh Tokens และ Vercel Cloud Cron Job

--------------------------------------------------------------------------------

## 🚀 สถาปัตยกรรมการทำงาน (Architecture)

```text
[คลังบทความ 52 สัปดาห์: bot/edu_articles.json]
                     ↓
[Vercel Serverless Cron: /api/cron/publish-blog (ทุกคืนเวลา 24:00 น.)]
                     ↓
[Blogger API v3 (OAuth2 Token Refresh via Google Cloud)]
                     ↓
[เผยแพร่บทความบน blogspot.com พร้อมลิงก์กลับสู่ MASTER ม.1]
```

--------------------------------------------------------------------------------

## 🔑 การตั้งค่าสิทธิ์และการเชื่อมต่อ (Setup & Authentication)

### 1. ไฟล์ Credentials ที่จำเป็น
* `BLOGGER_CLIENT_ID`: รหัส Client ID จาก Google Cloud Console (OAuth 2.0 Client IDs)
* `BLOGGER_CLIENT_SECRET`: รหัส Client Secret
* `BLOGGER_REFRESH_TOKEN`: รหัส Refresh Token ถาวร (ไม่ต้องล็อกอินซ้ำ)
* `BLOGGER_BLOG_ID`: หมายเลขรหัสบล็อกบน Blogger Dashboard

### 2. รันสคริปต์ทดสอบและสร้าง Token
```bash
python scripts/publish_to_blogger.py
```
*ระบบจะเปิดเบราว์เซอร์เพื่อขอสิทธิ์ OAuth2 เพียงครั้งแรก และบันทึก `token.json` สำหรับใช้ต่อถาวร*

--------------------------------------------------------------------------------

## 📝 คลังเนื้อหาและการกำหนดการ (Content & Scheduling Standard)
* คลังบทความจัดเก็บในรูปแบบ JSON: `bot/edu_articles.json` รวบรวม 52 เรื่องตรงตามหลักสูตร สพฐ. 4 วิชาหลัก
* ระบบจะคำนวณวันของปี หรือเลือกลำดับบทความถัดไปอัตโนมัติ ไม่มีการโพสต์บทความซ้ำซ้อน
* ทุกบทความมีแท็กหมวดหมู่ (Labels/Tags), ภาพประกอบ, หัวข้อแบบ Semantic HTML, และปุ่มลิงก์เชิญชวนทดลองทำข้อสอบบนแพลตฟอร์มฟรี
