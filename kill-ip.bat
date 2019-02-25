@echo off
@echo Killing process locking port '%1'
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :%1') DO IF NOT %%P==0 (TaskKill.exe /PID %%P /F)
