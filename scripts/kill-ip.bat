@echo off

if [%1]==[] goto usage
@echo Killing process locking port '%1'
FOR  /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :%1') DO IF NOT %%P==0 (TaskKill.exe /PID %%P /F)
goto :eof

:usage
@echo Usage: %0 ^<PORT^>
exit /B 1