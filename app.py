from flask import Flask, redirect, url_for, render_template, request, session, jsonify, send_from_directory
import youtube_dl
import subprocess
import py_midicsv
app = Flask(__name__)
class MyLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)


def my_hook(d):
    if d['status'] == 'finished':
        print('Done downloading, now converting ...')

def download_youtube(link):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'logger': MyLogger(),
        'progress_hooks': [my_hook],
        'outtmpl': 'input.wav'
    }
    link = 'https://www.youtube.com/watch?v=' + link
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([link])

def convert_midi():
    subprocess.run(['waon','-i', 'input.wav', '-r', '1.5', '-oct', '12'])

def midi_json(output):
    maintain = []
    notes = []
    csv_string = py_midicsv.midi_to_csv(output)
    for idx in range(len(csv_string)):
        current = (csv_string[idx]).strip().split(',')
        if 'Note' not in current[2]:
            continue
        current[4] = int(current[4]) % 12
        if 'on' in current[2]:
            maintain.append([current[4], float(int(current[1])/100)])
        if 'off' in current[2]:
            for idx,note in enumerate(maintain):
                if note[0] == current[4]:
                    d = {}
                    d["pitch"] = current[4]
                    d["start"] = note[1]
                    d["end"] = float(int(current[1])/100)
                    notes.append(d)
                    del maintain[idx]
                    break
    final = {}
    note = {}
    note["id"] = output
    note["notes"] = notes
    final["notes"] = note
    return final

#@app.route('/api/get_notes1', methods=['GET'])
def get_notes1():
     #download_youtube(link)
     #convert_midi()
     notes = midi_json("test.mid")
     print(notes)
     return notes

#@app.route('/api/get_notes', methods=['GET'])
def get_notes():
    #link = request.args.get('link', default = '5d4f8-WTd0U', type = str)
    #download_youtube(link)
    #convert_midi()
    notes = midi_json("test.mid")
    print(notes)
    return notes

if __name__ == "__main__":
    #app.run(port=3001)
    get_notes()
