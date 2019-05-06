@ECHO OFF
:: check if administrator (https://stackoverflow.com/questions/15962307/how-to-check-if-a-user-is-an-administator)
OPENFILES >nul 2>nul
IF ERRORLEVEL 1 (
    GOTO NOTADMINISTRATOR
)

cd %~dp0
:: Kill process listening on ports which we want to use
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :3000') DO IF NOT %%P==0 (TaskKill.exe /PID %%P /F)
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :3001') DO IF NOT %%P==0 (TaskKill.exe /PID %%P /F)
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :9001') DO IF NOT %%P==0 (TaskKill.exe /PID %%P /F)

call hotel stop
call rmdir /s /q %userprofile%\.hotel
call hotel start
call hotel add "npm run start" --name react-client --port 3000
call hotel add "npm run start:storybook" --name Storybook --port 9001
start chrome http://localhost:2000

GOTO DONE

:NOTADMINISTRATOR
@ECHO Run this script in a shell with administrator privileges

:DONE

