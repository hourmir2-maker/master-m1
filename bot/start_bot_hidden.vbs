' ====================================================
' start_bot_hidden.vbs
' เปิด Shopee/Lazada Affiliate Bot แบบซ่อนสนิท
' ไม่โชว์หน้าต่างบนเดสก์ท็อป และไม่โชว์ปุ่มบน Taskbar
' ====================================================

Dim objShell
Set objShell = CreateObject("WScript.Shell")

Dim botDir
botDir = "D:\shopee-affiliate-bot"

' WindowStyle = 0 : ซ่อนหน้าต่างสนิท ไม่โชว์ใน Taskbar และไม่โชว์บนเดสก์ท็อป
objShell.Run "cmd /c """ & botDir & "\run_bot_loop.bat""", 0, False

Set objShell = Nothing
