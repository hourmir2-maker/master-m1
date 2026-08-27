@echo off
chcp 65001 > nul
title Shopee/Lazada Affiliate Bot
cd /d "%~dp0"

echo ==================================================
echo      🤖 Affiliate Bot & Tech News Poster Loop 🤖
echo           ระบบโพสต์สลับอัตโนมัติเริ่มต้นแล้ว!
echo        (ควบคุมช่วงเวลาทำงานอัจฉริยะโดย AI)
echo ==================================================
echo.

REM เรียกใช้ตัวจัดตารางเวลาอัจฉริยะ
node scheduler.js

pause
