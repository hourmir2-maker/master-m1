import json
import os
import subprocess
import shutil

MEDIA_DIR = "C:/Users/bkky9/master_m1_media"
DESKTOP_DIR = "C:/Users/bkky9/OneDrive/Desktop/คลิปสำหรับลง_YouTube"

def format_ass_time(time_str):
    # time_str is MM:SS.xx or M:SS.xx
    parts = time_str.split(':')
    minutes = int(parts[0])
    sec_parts = parts[1].split('.')
    seconds = int(sec_parts[0])
    cs = int(sec_parts[1][:2].ljust(2, '0'))
    
    hours = minutes // 60
    minutes = minutes % 60
    return f"{hours}:{minutes:02d}:{seconds:02d}.{cs:02d}"

def generate_ass(json_path, ass_path, highlight_word=None):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    header = """[Script Info]
Title: MASTER M.1 Karaoke Subtitles
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: None
PlayResX: 1280
PlayResY: 720

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: KaraokeLyric,Tahoma,34,&H00FFFFFF,&H0000FFFF,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,4,2,2,40,40,65,1
Style: TopicBadge,Tahoma,20,&H0000FFFF,&H00000000,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,3,1,8,40,40,30,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    events = []
    for item in data:
        start = format_ass_time(item['start'])
        end = format_ass_time(item['end'])
        text = item['text']
        
        # Color formulas or keywords in gold &H002BF7FF&
        if highlight_word and highlight_word in text:
            text = text.replace(highlight_word, f"{{\\c&H002BF7FF&}}{highlight_word}{{\\c&H00FFFFFF&}}")
            
        events.append(f"Dialogue: 0,{start},{end},KaraokeLyric,,0,0,0,,{text}")
        
    with open(ass_path, 'w', encoding='utf-8') as f:
        f.write(header + "\n".join(events) + "\n")
    print(f"Generated ASS: {ass_path}")

def render_song(audio_file, video_clip, ass_file, output_file):
    print(f"\nRendering {output_file}...")
    ass_escaped = ass_file.replace('\\', '/').replace(':', '\\:')
    
    # Use loop with stream_loop on video
    cmd = [
        'ffmpeg', '-y',
        '-stream_loop', '-1',
        '-i', video_clip,
        '-i', audio_file,
        '-vf', f"scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,ass='{ass_escaped}'",
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '22',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_file
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"✅ Success: {output_file} ({os.path.getsize(output_file)} bytes)")
        return True
    else:
        print("FFmpeg error:", res.stderr[-500:])
        return False

def main():
    songs_to_render = [
        {
            "name": "03_เพลงอังกฤษ_IfClause.mp4",
            "audio": os.path.join(MEDIA_DIR, "eng_ifclause.mp3"),
            "clip": os.path.join(MEDIA_DIR, "eng_clip.mp4"),
            "json": os.path.join(MEDIA_DIR, "eng_aligned.json"),
            "ass": os.path.join(MEDIA_DIR, "eng_lyrics.ass"),
            "highlight": "If"
        },
        {
            "name": "04_เพลงไทย_คำสมาสสนธิ.mp4",
            "audio": os.path.join(MEDIA_DIR, "thai_samasa.mp3"),
            "clip": os.path.join(MEDIA_DIR, "thai_clip.mp4"),
            "json": os.path.join(MEDIA_DIR, "thai_aligned.json"),
            "ass": os.path.join(MEDIA_DIR, "thai_lyrics.ass"),
            "highlight": "สมาสชน... สนธิเชื่อม"
        },
        {
            "name": "05_เพลงคณิต_พีทาโกรัส3วิ.mp4",
            "audio": os.path.join(MEDIA_DIR, "math_pythagoras.mp3"),
            "clip": os.path.join(MEDIA_DIR, "math_pythagoras_clip.mp4"),
            "json": os.path.join(MEDIA_DIR, "pythagoras_aligned.json"),
            "ass": os.path.join(MEDIA_DIR, "pythagoras_lyrics.ass"),
            "highlight": "สาม-สี่-ห้า"
        }
    ]
    
    for s in songs_to_render:
        if not os.path.exists(s['clip']):
            print(f"Skipping {s['name']}, clip not ready yet: {s['clip']}")
            continue
        generate_ass(s['json'], s['ass'], s['highlight'])
        out_path = os.path.join(MEDIA_DIR, s['name'])
        success = render_song(s['audio'], s['clip'], s['ass'], out_path)
        if success:
            # Copy to folders
            for dst_dir in [os.path.join(MEDIA_DIR, "คลิปสำหรับลง_YouTube"), DESKTOP_DIR]:
                if os.path.exists(dst_dir):
                    shutil.copy2(out_path, os.path.join(dst_dir, s['name']))
                    print(f"Copied {s['name']} to {dst_dir}")

if __name__ == '__main__':
    main()
