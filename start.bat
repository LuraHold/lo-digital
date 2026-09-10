@echo off
cd /d "%~dp0"
echo LO Digital LLC  -  http://127.0.0.1:8780
start "" "http://127.0.0.1:8780/"
python -m http.server 8780 --bind 127.0.0.1
