"""
MASTER ม.1 — Google Blogger Auto-Publisher Script
สคริปต์โพสต์บทความขึ้น Blogger (blogspot.com) อัตโนมัติใน 1 คลิก ด้วย Google Blogger API v3
"""

import os
import sys
import json
import webbrowser

# ตรวจสอบและติดตั้ง library ที่จำเป็นอัตโนมัติ
try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
except ImportError:
    print("⏳ กำลังติดตั้งแพ็กเกจ Google API Client...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "--upgrade", "google-api-python-client", "google-auth-oauthlib", "google-auth-httplib2"])
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/blogger']
CREDENTIALS_FILE = 'credentials.json'
TOKEN_FILE = 'token.json'

def authenticate_blogger():
    """เข้าสู่ระบบ Google Blogger API แบบ OAuth 2.0"""
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDENTIALS_FILE):
                print("\n" + "="*70)
                print("⚠️  ยังไม่พบไฟล์ credentials.json จาก Google Cloud Console")
                print("="*70)
                print("📌 วิธีรับไฟล์ credentials.json ใน 1 นาที:")
                print("1. เข้าไปที่: https://console.cloud.google.com/apis/credentials")
                print("2. สร้างโปรเจกต์ ➔ เปิดใช้งาน 'Blogger API v3'")
                print("3. ไปที่เมนู Credentials ➔ Create Credentials ➔ OAuth client ID (เลือก Desktop app)")
                print("4. ดาวน์โหลดไฟล์ JSON แล้วนำมาเปลี่ยนชื่อเป็น 'credentials.json' วางไว้ในโฟลเดอร์นี้")
                print("="*70 + "\n")
                return None

            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())

    return build('blogger', 'v3', credentials=creds)

def publish_article(html_file_path, title, labels):
    """อ่านไฟล์ HTML และโพสต์ขึ้น Blogger ทันที"""
    if not os.path.exists(html_file_path):
        print(f"❌ ไม่พบไฟล์บทความ: {html_file_path}")
        return

    with open(html_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    service = authenticate_blogger()
    if not service:
        return

    print("🔍 กำลังค้นหาบล็อกของคุณ...")
    users = service.users()
    blogs = service.blogs().listByUser(userId='self').execute()

    if not blogs or 'items' not in blogs or len(blogs['items']) == 0:
        print("❌ ไม่พบบล็อกในบัญชี Google นี้ กรุณาสร้างบล็อกบน blogger.com ก่อนครับ")
        return

    blog = blogs['items'][0]
    blog_id = blog['id']
    blog_name = blog['name']
    blog_url = blog['url']

    print(f"✅ พบบล็อก: '{blog_name}' (ID: {blog_id})")
    print(f"🚀 กำลังเผยแพร่บทความ: '{title}'...")

    post_body = {
        'kind': 'blogger#post',
        'title': title,
        'content': content,
        'labels': labels
    }

    posts = service.posts()
    result = posts.insert(blogId=blog_id, body=post_body, isDraft=False).execute()

    print("\n" + "="*70)
    print("🎉 เผยแพร่บทความสำเร็จเรียบร้อย 100%!")
    print(f"📌 ลิงก์บทความจริง: {result.get('url')}")
    print("="*70 + "\n")

    # เปิดหน้าบทความบนเบราว์เซอร์อัตโนมัติ
    if result.get('url'):
        webbrowser.open(result.get('url'))

if __name__ == '__main__':
    article_path = os.path.join(os.path.dirname(__file__), '..', 'blog_post_01_onet_2570_blueprint.html')
    # Fallback to local path if running directly
    if not os.path.exists(article_path):
        article_path = 'blog_post_01_onet_2570_blueprint.html'

    post_title = 'เจาะลึกผังข้อสอบ O-NET ป.6 ปี 2570 ครบ 4 วิชา (คณิต-วิทย์-ไทย-อังกฤษ) พร้อมสูตรลัดและแนวข้อสอบ!'
    post_labels = ['O-NET ป.6', 'O-NET 2570', 'แนวข้อสอบ O-NET', 'ข้อสอบเข้า ม.1', 'สูตรลัดคณิตศาสตร์', 'สทศ']

    publish_article(article_path, post_title, post_labels)
